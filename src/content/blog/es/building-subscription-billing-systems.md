---
title: "Construcción de sistemas robustos de facturación por suscripción: ciclo de vida, webhooks e idempotencia"
description: "Guía completa de ingeniería para diseñar arquitecturas de facturación por suscripción listas para producción con Stripe, verificación de webhooks, máquinas de estado idempotentes y sincronización de derechos multiinquilino."
locale: "es"
slug: "building-subscription-billing-systems"
translationKey: "building-subscription-billing-systems"
author: "Girish Lade"
publishedAt: "2024-07-28"
updatedAt: "2026-10-24"
category: "SaaS Architecture"
tags: ["SaaS", "Facturación", "Stripe", "Webhooks", "Arquitectura", "TypeScript"]
coverImage: "/blog-covers/kubernetes-scale.svg"
coverAlt: "Diagrama de arquitectura de sistemas de facturación por suscripción"
draft: false
featured: false
contentType: "architecture"
---

## Introducción: La complejidad de la ingeniería de facturación

En el desarrollo de productos SaaS, a menudo se asume erróneamente que implementar la facturación por suscripción consiste simplemente en integrar un widget de pago y guardar un `subscription_id` en una base de datos. En la práctica, el motor de facturación es uno de los sistemas distribuidos más críticos y sensibles que debe mantener una empresa de software.

Un sistema de facturación confiable debe gestionar con solidez confirmaciones de pago asíncronas, caídas intermitentes de red, eventos de webhook fuera de secuencia, tarjetas de crédito vencidas, actualizaciones de planes con prorrateo (proration) y la sincronización de derechos de acceso multiinquilino (multi-tenant). Un único fallo lógico puede ocasionar fugas de ingresos, pérdida de clientes por bloqueo accidental de servicios o problemas de cumplimiento normativo.

Esta guía presenta un diseño arquitectónico exhaustivo para crear una infraestructura de suscripciones resiliente y escalable. Analizamos la máquina de estados completa de las suscripciones, flujos de pago protegidos, validación criptográfica de webhooks, procesamiento de transacciones idempotente y sincronización de cuotas y capacidades por inquilino.

---

## 1. Arquitectura de alto nivel y separación de responsabilidades

Antes de escribir código, los equipos de desarrollo deben definir una división estricta entre el procesamiento de cobros y las autorizaciones del sistema:

```
[Navegador del Cliente]
       │
       │ 1. Iniciar Pago / Actualizar Tarjeta
       ▼
[Servidor de Aplicación SaaS] ──── 2. Crear Sesión de Pago / Cliente ───► [Stripe / API de Facturación]
       │                                                                            │
       │ 4. Consultar Derechos (DB Local / Caché)                                   │
       ▼                                                                            │ 3. Notificación
[Base de Datos / Redis] ◄─── 5. Manejador de Webhook Idempotente ◄──────────────────┘    Asíncrona
(Inquilinos, Suscripciones, Facturas)
```

### Reglas clave de diseño
1. **Nunca almacenar ni procesar datos bancarios directos:** Bajo ninguna circunstancia los números de tarjeta completos (PAN) ni los códigos de seguridad (CVV) deben tocar sus servidores o bases de datos. Todo ingreso de credenciales debe delegarse a bibliotecas tokenizadas del lado del cliente (como Stripe Elements o portales alojados), reduciendo el alcance al nivel de cumplimiento PCI DSS SAQ A.
2. **Los webhooks como fuente única de verdad:** Nunca asigne privilegios ni modifique el estado de una suscripción directamente en la respuesta HTTP inmediata a una llamada iniciada desde el navegador. Problemas de conexión o el cierre accidental de la pestaña pueden interrumpir el ciclo. Las transiciones en la base de datos deben procesarse exclusivamente a partir de eventos de webhook firmados.
3. **Desacoplar el estado de facturación de las autorizaciones:** Las reglas de acceso de su aplicación no deben depender de identificadores de precios del proveedor. Su lógica debe evaluar condiciones como `tenant.hasFeature('advanced_analytics')`, y nunca `stripe_price_id === 'price_123'`.

---

## 2. Máquina de estados del ciclo de vida de la suscripción

Una suscripción pasa por diversas fases a lo largo de su vigencia:

```
                  ┌──────────────┐
                  │   trialing   │
                  └──────┬───────┘
                         │ Periodo de prueba superado
                         ▼
┌──────────────┐   Pago   ┌──────────────┐   Fallo en   ┌──────────────┐
│  incomplete  ├─────────►│    active    │◄─────────────┤   past_due   │
└──────┬───────┘ Exitoso  └──────┬───────┘     Pago     └──────┬───────┘
       │                         │                             │
       │ Fallo Permanente        │ Cancelación                 │ Intentos
       │ de Pago                 │ o Downgrade                 │ Agotados
       ▼                         ▼                             ▼
┌──────────────┐          ┌──────────────┐              ┌──────────────┐
│  incomplete_ │          │   canceled   │              │    unpaid    │
│   expired    │          └──────────────┘              └──────────────┘
└──────────────┘
```

### Definición de estados y estrategia de gestión
- `incomplete`: Estado inicial cuando el cobro requiere autenticación bancaria adicional (3D Secure / SCA) antes de la activación.
- `active`: El cobro se procesó con éxito; todos los recursos y cuotas del plan están disponibles.
- `past_due`: La renovación del periodo falló (tarjeta vencida, fondos insuficientes). **No revoque el acceso de forma inmediata**. Inicie procesos de cobro automatizado (dunning) y muestre avisos en la interfaz durante este periodo de gracia.
- `canceled`: Suscripción cancelada por el usuario o por el sistema. Por norma general, el acceso se mantiene hasta el final del periodo ya facturado (`cancel_at_period_end: true`).
- `unpaid`: Estado final cuando los reintentos automáticos se agotan sin éxito. Dependiendo de las políticas de la organización, la cuenta pasa a un plan gratuito o a modo de solo lectura.

---

## 3. Verificación criptográfica de webhooks y procesamiento idempotente

Los webhooks de Stripe se transmiten mediante peticiones HTTP POST. Debido a la naturaleza impredecible de las redes públicas, Stripe aplica reintentos automáticos con retroceso exponencial. Este diseño introduce dos premisas técnicas esenciales:
1. **Entrega de al menos una vez (At-Least-Once Delivery):** El servidor puede recibir exactamente el mismo payload en más de una ocasión.
2. **Entrega fuera de secuencia (Out-of-Order Delivery):** Un evento `invoice.payment_succeeded` puede recibirse antes que `customer.subscription.created` debido a rutas concurrentes.

### Verificación de la firma de seguridad
Para neutralizar ataques de suplantación, cada webhook entrante debe validarse contra la clave secreta compartida utilizando la cabecera `Stripe-Signature`.

Ejemplo de controlador en TypeScript con Express:

```typescript
import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from './db';
import { processWebhookEvent } from './billingService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// IMPORTANTE: El endpoint debe recibir el Buffer sin procesar para verificar la firma
export const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];

  if (!sig || typeof sig !== 'string') {
    res.status(400).send('Cabecera Stripe-Signature ausente o inválida');
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Fallo en verificación del webhook: ${err.message}`);
    res.status(400).send(`Error en Webhook: ${err.message}`);
    return;
  }

  try {
    await processWebhookEvent(event);
    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`Error al procesar webhook ${event.id}:`, err);
    // Responder con código 500 le indica a Stripe que reintente el envío
    res.status(500).json({ error: 'Fallo de procesamiento interno' });
  }
};
```

---

## 4. Esquema relacional y registro de idempotencia

Para evitar efectos colaterales repetidos (como emitir facturas por duplicado o enviar correos de confirmación múltiples), implemente una **Tabla de Idempotencia** en PostgreSQL:

```sql
-- 1. Tabla de auditoría y control de idempotencia
CREATE TABLE billing_webhook_events (
    id VARCHAR(255) PRIMARY KEY, -- ID de Evento de Stripe (ej. evt_1Oxxxx)
    event_type VARCHAR(100) NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payload JSONB NOT NULL
);

-- 2. Tabla de suscripciones por inquilino
CREATE TABLE tenant_subscriptions (
    tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_price_id VARCHAR(255),
    plan_tier VARCHAR(50) NOT NULL DEFAULT 'free',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tenant_subscriptions_customer ON tenant_subscriptions(stripe_customer_id);
```

### Procesamiento transaccional e idempotente

```typescript
import { db } from './db';
import Stripe from 'stripe';

export async function processWebhookEvent(event: Stripe.Event): Promise<void> {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    // 1. Comprobar si el evento ya fue registrado previamente
    const existing = await client.query(
      'SELECT id FROM billing_webhook_events WHERE id = $1 FOR UPDATE',
      [event.id]
    );

    if (existing.rows.length > 0) {
      console.log(`Evento ${event.id} ya procesado. Omitiendo.`);
      await client.query('ROLLBACK');
      return;
    }

    // 2. Insertar el identificador en el registro de idempotencia
    await client.query(
      'INSERT INTO billing_webhook_events (id, event_type, payload) VALUES ($1, $2, $3)',
      [event.id, event.type, JSON.stringify(event)]
    );

    // 3. Ejecutar la lógica de negocio correspondiente al evento
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscriptionState(client, subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(client, subscription);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleFailedPayment(client, invoice);
        break;
      }
      default:
        console.log(`Tipo de evento no manejado: ${event.type}`);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
```

---

## 5. Sincronización del estado de suscripción y caché de derechos

Al registrar un cambio de plan, los datos de Stripe deben mapearse a los niveles de servicio propios de la aplicación y almacenarse en Redis para consultas inmediatas:

```typescript
import { PoolClient } from 'pg';
import Stripe from 'stripe';
import { redisClient } from './redis';

const PRICE_TIER_MAP: Record<string, string> = {
  'price_pro_monthly': 'pro',
  'price_pro_yearly': 'pro',
  'price_enterprise_monthly': 'enterprise',
};

async function syncSubscriptionState(client: PoolClient, sub: Stripe.Subscription): Promise<void> {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const priceId = sub.items.data[0]?.price.id;
  const tier = PRICE_TIER_MAP[priceId] || 'free';

  // Actualizar base de datos principal
  const result = await client.query(
    `UPDATE tenant_subscriptions
     SET stripe_subscription_id = $1,
         stripe_price_id = $2,
         plan_tier = $3,
         status = $4,
         current_period_start = to_timestamp($5),
         current_period_end = to_timestamp($6),
         cancel_at_period_end = $7,
         updated_at = NOW()
     WHERE stripe_customer_id = $8
     RETURNING tenant_id`,
    [
      sub.id,
      priceId,
      tier,
      sub.status,
      sub.current_period_start,
      sub.current_period_end,
      sub.cancel_at_period_end,
      customerId,
    ]
  );

  if (result.rows.length === 0) {
    throw new Error(`Inquilino no encontrado para el cliente Stripe ${customerId}`);
  }

  const tenantId = result.rows[0].tenant_id;

  // Actualizar caché de derechos en Redis
  const cacheKey = `entitlements:tenant:${tenantId}`;
  const entitlementData = {
    tier,
    status: sub.status,
    canAccessAI: tier === 'pro' || tier === 'enterprise',
    seatLimit: tier === 'enterprise' ? 100 : tier === 'pro' ? 10 : 1,
    currentPeriodEnd: sub.current_period_end,
  };

  await redisClient.set(cacheKey, JSON.stringify(entitlementData), 'EX', 86400); // 24 horas TTL
}
```

---

## 6. Prorrateo (Proration), Actualizaciones y Cambios de Plan

Cuando un usuario actualiza o degrada su plan a mitad de ciclo, Stripe calcula automáticamente los importes proporcionales:

1. **Facturación Inmediata (`proration_behavior: 'always_invoice'`):**
   - Recomendado para ascensos de categoría (ej. de Starter a Pro).
   - Genera una factura inmediata con el diferencial por los días restantes del ciclo.
   - Habilita las nuevas capacidades de inmediato.
2. **Prorrateo al Cierre de Periodo (`proration_behavior: 'create_prorations'`):**
   - El saldo a favor o en contra se aplica en la factura habitual del siguiente periodo.
   - Reduce las microtransacciones bancarias en la tarjeta.
3. **Sin Prorrateo (`proration_behavior: 'none'`):**
   - Se utiliza cuando los cambios entran en vigencia estrictamente a partir del siguiente ciclo de facturación.

```typescript
// Ejemplo: Actualización de suscripción con facturación inmediata de prorrateo
export async function upgradeSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'always_invoice',
    payment_behavior: 'error_if_incomplete',
  });
}
```

---

## 7. Gestión de cobros fallidos y procesos de cobro automatizado (Dunning)

Los fallos de renovación ocurren regularmente por vencimiento de tarjetas o bloqueos preventivos de entidades bancarias. La falta de gestión sobre el evento `invoice.payment_failed` puede acarrear interrupciones no deseadas:

1. **Configurar Stripe Smart Retries:** Active en el panel de Stripe el motor de reintentos optimizado mediante machine learning.
2. **Secuencias de Notificación Automatizadas:** Monitoree eventos como `invoice.payment_action_required` o `customer.subscription.updated` para enviar correos automáticos al titular con enlace directo al Portal del Cliente.
3. **Margen de Tolerancia:** Conserve el estado `past_due` entre 7 y 14 días sin suspender las operaciones habituales. Suspenda el servicio únicamente cuando el estado pase a `unpaid` o `canceled`.

---

## 8. Errores arquitectónicos comunes a evitar

- **Guardar información confidencial de pago:** No almacene números de tarjeta ni códigos CVV en sus bases de datos. Utilice exclusivamente PaymentMethods y Customer IDs tokenizados.
- **Autorización síncrona en redirección:** No cree cuentas ni active privilegios directamente en la página de retorno tras el checkout. El cliente puede cerrar la ventana antes de que la redirección complete la petición.
- **Modificación del cuerpo de la petición en middlewares:** Middlewares habituales como `express.json()` alteran el buffer original de la petición, impidiendo la verificación de la firma. Emplee siempre `express.raw({ type: 'application/json' })` en las rutas receptoras de webhooks.
- **Desfase en relojes de servidores:** Verifique que los servidores utilicen sincronización horaria vía NTP para descartar rechazos por marcas temporales inválidas en las firmas.

---

## Conclusión y lecturas recomendadas

Un sistema de facturación por suscripción empresarial es, ante todo, un problema de sincronización coherente de estados a través de fronteras distribuidas. Al aplicar verificación criptográfica estricta, mantener un registro de idempotencia transaccional y desligar las autorizaciones internas de las tarifas del proveedor, su producto SaaS podrá escalar con absoluta solidez operativa.

### Guías de arquitectura relacionadas
- Para estrategias de particionamiento de bases de datos, consulte [Patrones de arquitectura SaaS multiinquilino](/blog/multi-tenant-saas-architecture-patterns).
- Para salvaguardar sus APIs contra saturación o abusos, explore [Estrategias de limitación y control de tráfico en APIs](/blog/api-rate-limiting-throttling-strategies).
