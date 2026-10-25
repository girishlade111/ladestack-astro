---
title: "Construyendo un API Gateway para Microservicios: Enrutamiento, Autenticación, Rate Limiting y Resiliencia"
description: "Guía integral de arquitectura para producción: proxy inverso, autenticación distribuida, rate limiting con token bucket en Redis, circuit breakers y Envoy."
locale: "es"
slug: "building-api-gateways-microservices"
translationKey: "building-api-gateways-microservices"
author: "Girish Lade"
publishedAt: "2024-09-15"
updatedAt: "2026-10-24"
category: "Microservices"
tags: ["API Gateway", "Microservices", "Envoy", "Redis", "Security", "Architecture", "DevOps"]
coverImage: "/blog-covers/api-architecture.svg"
coverAlt: "Diagrama de arquitectura API Gateway para microservicios"
draft: false
featured: false
contentType: "architecture"
---

## 1. Introducción: Por qué toda arquitectura de microservicios necesita un API Gateway

En arquitecturas distribuidas modernas, permitir que las aplicaciones cliente (navegadores web, aplicaciones móviles o integraciones de terceros) se comuniquen directamente con decenas de microservicios internos constituye un grave antipatrón de diseño.

El modelo de comunicación directa desencadena serios inconvenientes:
- **Fuerte acoplamiento entre clientes y servicios:** Cualquier división, renombre o cambio de ruta exige el despliegue forzoso de nuevas versiones de las apps cliente.
- **Superficie de ataque desmedida:** Exponer cada servicio a la Internet pública fragmenta las reglas de cortafuegos, las políticas CORS y la gestión de certificados TLS.
- **Duplicación de aspectos transversales:** Cada equipo reinventa la validación de tokens JWT, la limitación de peticiones y la trazabilidad, introduciendo vulnerabilidades.
- **Latencia excesiva:** Las aplicaciones móviles deben ejecutar más de una decena de peticiones HTTP en serie para renderizar una única vista.

```
Acceso Directo vs Patrón API Gateway
====================================
Acceso Directo (Antipatrón):
[App Móvil] ──┬──► [Servicio Autenticación :8081]
              ├──► [Servicio Pedidos :8082]
              ├──► [Servicio Pagos :8083]
              └──► [Servicio Inventario :8084]

Patrón API Gateway (Recomendado):
              ┌────────────────────────────────────────────────────────┐
              │                 API Gateway (:443)                     │
              │  - Terminación SSL & Políticas CORS                    │
              │  - Validación Criptográfica JWT & Contexto             │
              │  - Rate Limiting Distribuido con Redis (Token Bucket)  │
              │  - Enrutamiento Inteligente, Timeouts y Circuit Breaker│
              └──────────────────────────┬─────────────────────────────┘
                                         │ Red Privada VPC (mTLS)
                    ┌────────────────────┼────────────────────┐
                    ▼                    ▼                    ▼
            [Servicio Auth]      [Servicio Pedidos]    [Servicio Pagos]
```

El API Gateway actúa como punto único de entrada (proxy inverso) en el perímetro del sistema, centralizando la gestión de los aspectos transversales.

---

## 2. Capacidades esenciales de un Gateway de nivel empresarial

Un API Gateway preparado para entornos de producción debe resolver las siguientes funciones clave con una latencia inferior al milisegundo:

| Capa Funcional | Responsabilidad del Gateway | Mecanismos y Protocolos |
| :--- | :--- | :--- |
| **Proxy Inverso & Enrutamiento** | Conectar rutas externas con instancias internas de microservicios | Coincidencia de prefijos, expresiones regulares, despliegues canary |
| **Autenticación en el Perímetro** | Validar firmas criptográficas de peticiones entrantes | Validación JWT RS256/EdDSA, rotación de claves JWKS, mTLS |
| **Gobernanza & Rate Limiting** | Proteger servicios contra saturación y aplicar cuotas por cliente | Algoritmo distribuido Token Bucket sobre Redis |
| **Resiliencia del Sistema** | Evitar caídas en cascada frente a fallos parciales | Timeouts estrictos, reintentos con backoff exponencial, disyuntores |
| **Observabilidad Distribuida** | Garantizar trazabilidad de transacciones extremo a extremo | Estándar W3C TraceContext (`traceparent`), OpenTelemetry |
| **Traducción de Protocolos** | Desacoplar clientes de protocolos internos de alto rendimiento | Conversión de HTTP/1.1・HTTP/2 externo a gRPC/Protobuf interno |

---

## 3. Autenticación y Defensa en Profundidad (Defense in Depth)

### Principio Fundamental: La autenticación en el Gateway no sustituye la autorización en el servicio
Un error común entre los equipos es asumir que «como la petición ya superó la validación JWT en el Gateway, los microservicios internos no necesitan comprobar permisos».

Si el Gateway resulta vulnerado o si se origina una llamada interna en la red privada, los servicios quedan completamente desprotegidos. Es obligatorio aplicar **Defensa en Profundidad**:

```
Flujo de Defensa en Profundidad
-------------------------------
[Cliente]
   │ 1. Authorization: Bearer <JWT>
   ▼
[API Gateway]
   │ 2. Valida la firma del JWT con las claves públicas JWKS en caché local
   │ 3. Comprueba expiración (exp) y emisor (iss); bloquea credenciales falsas (401)
   │ 4. Transforma los claims validados en cabeceras internas de confianza:
   │    - X-User-Id: 98412
   │    - X-User-Roles: billing_admin,user
   │    - X-Tenant-Id: tenant_corp_a
   ▼
[Microservicio Interno (Pedidos/Pagos)]
   │ 5. Verifica la conexión segura mTLS procedente del gateway
   │ 6. Evalúa localmente si los roles de X-User-Roles tienen acceso a la acción
   │ 7. Ejecuta la lógica de negocio
```

---

## 4. Rate Limiting Distribuido: Algoritmo Token Bucket en Redis

Los contadores locales en memoria no funcionan en infraestructuras orquestadas que escalan horizontalmente (HPA). Si el número de réplicas sube de 2 a 20, la cuota permitida se multiplica por diez.

La ejecución de scripts atómicos en Lua sobre Redis garantiza un control riguroso de concurrencia:

```lua
-- Redis Token Bucket Rate Limiting (Script Lua Atómico)
-- KEYS[1]: Clave de limitación (ej: ratelimit:tenant_123:orders)
-- ARGV[1]: Capacidad máxima del cubo (Burst)
-- ARGV[2]: Tasa de reposición de tokens (Tokens / Segundo)
-- ARGV[3]: Timestamp Unix actual (segundos)
-- ARGV[4]: Tokens solicitados en la petición (típicamente 1)

local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local fill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local data = redis.call('HMGET', key, 'tokens', 'last_updated')
local tokens = tonumber(data[1])
local last_updated = tonumber(data[2])

if not tokens then
    tokens = capacity
    last_updated = now
else
    local elapsed = math.max(0, now - last_updated)
    tokens = math.min(capacity, tokens + (elapsed * fill_rate))
    last_updated = now
end

if tokens >= requested then
    tokens = tokens - requested
    redis.call('HMSET', key, 'tokens', tokens, 'last_updated', last_updated)
    redis.call('EXPIRE', key, math.ceil(capacity / fill_rate) * 2)
    return {1, math.floor(tokens)} -- 1 = Permitido
else
    redis.call('HMSET', key, 'tokens', tokens, 'last_updated', last_updated)
    return {0, 0} -- 0 = Denegado (429 Too Many Requests)
end
```

---

## 5. Patrones de Resiliencia: Timeouts, Reintentos y Circuit Breakers

1. **Timeouts Precisos:** El tiempo de espera del gateway debe ser estrictamente menor que el timeout del servicio destino para evitar agotar los pools de conexión.
2. **Reintentos Idempotentes:** Solo las operaciones idempotentes (GET, PUT, DELETE) pueden reintentarse de forma automática. Reintentar un POST de pago genera cobros duplicados.
3. **Disyuntores (Circuit Breakers):** Cuando un servicio acumula más de un 50% de fallos, el circuito se abre (OPEN), rechazando peticiones de inmediato y devolviendo una respuesta degradada.

---

## 6. Comparativa Tecnológica: Envoy vs NGINX vs Kong

| Parámetro | Envoy Proxy | NGINX (Open Source / Plus) | Kong Gateway |
| :--- | :--- | :--- | :--- |
| **Lenguaje Base** | C++ (Mínima latencia y control de memoria) | C (Arquitectura orientada a eventos robusta) | Lua / OpenResty (sobre NGINX) |
| **Actualización** | Dinámica vía xDS API sin reinicios | Estática mediante recarga de procesos workers | Dinámica con REST API y decK |
| **Protocolos** | HTTP/1.1, HTTP/2, HTTP/3, gRPC | HTTP/1.1, HTTP/2, gRPC reverse proxy | HTTP/1.1, HTTP/2, gRPC |
| **Extensibilidad** | Filtros WebAssembly (Wasm) y C++ | Módulos en C, njs | Plugins en Lua y Wasm |
| **Uso Ideal** | Cloud Native, Kubernetes Ingress, Service Mesh | Distribución estática, proxy inverso simple | Plataforma de APIs empresarial |

---

## 7. API Gateway frente a Service Mesh

- **API Gateway (Tráfico Norte-Sur):** Gestiona el tráfico perimetral desde clientes externos hacia la red privada (autenticación, cobro, cuotas y control de versiones de API).
- **Service Mesh (Tráfico Este-Oeste):** Administra la comunicación interna entre microservicios (Istio, Linkerd), proporcionando cifrado mTLS automático y enrutamiento canario.
