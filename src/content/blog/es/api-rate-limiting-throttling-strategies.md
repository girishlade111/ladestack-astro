---
title: "Estrategias de Rate Limiting y Throttling de API: Guía de Arquitectura de Producción"
description: "Guía técnica de ingeniería sobre algoritmos de limitación de tasa (Rate Limiting) y regulación de flujo (Throttling). Implementación atómica de Token Bucket en Redis con scripts Lua y cabeceras HTTP estándar."
locale: "es"
slug: "api-rate-limiting-throttling-strategies"
translationKey: "api-rate-limiting-throttling-strategies"
author: "Girish Lade"
publishedAt: "2024-09-09"
updatedAt: "2026-10-24"
category: "Backend"
tags: ["Diseño de APIs", "Rate Limiting", "Redis", "Sistemas Distribuidos", "Ingeniería Backend", "Seguridad"]
coverImage: "/blog-covers/api-rate-limiting.svg"
coverAlt: "Diagrama de Arquitectura de Rate Limiting y Throttling de API"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "deep-dive"
---

Las aplicaciones web modernas y las arquitecturas de API distribuidas están sujetas a una volatilidad continua en sus patrones de tráfico. Ya sean picos repentinos causados por campañas de difusión, barridos exhaustivos de rastreadores web, bucles descontrolados de reintento de clientes o ataques maliciosos de denegación de servicio (DoS), una API desprovista de mecanismos de conformación de tráfico (Traffic Shaping) constituye un riesgo crítico para el negocio.

La **limitación de tasa (Rate Limiting)** y la **regulación de flujo (Throttling)** son salvaguardas arquitectónicas indispensables. Mientras que el rate limiting fija el volumen máximo de peticiones que un cliente puede emitir en un intervalo temporal específico, el throttling modula activamente el ritmo de procesamiento para salvaguardar las bases de datos y garantizar la equidad de recursos entre múltiples clientes.

En este análisis técnico exhaustivo, evaluamos los fundamentos matemáticos de los principales algoritmos de control de tráfico e implementamos un motor atómico de Token Bucket en Redis.

---

## Comparativa de los Algoritmos Esenciales de Rate Limiting

Cada algoritmo de control de tráfico representa un compromiso diferente entre coste computacional, consumo de memoria y capacidad de absorción de ráfagas (bursts).

```
+---------------------------+-------------------+--------------------+------------------------+
| Algoritmo                 | Consumo de Memoria| Manejo de Ráfagas  | Precisión de Ventana   |
+---------------------------+-------------------+--------------------+------------------------+
| Ventana Fija (Fixed)      | O(1) por cliente  | Vulnerable pico 2x | Impreciso en bordes    |
| Registro Deslizante (Log) | O(N) peticiones   | Fluido y exacto    | Precisión matemática   |
| Contador Deslizante       | O(1) por cliente  | Promedio suave     | Aproximado (~99%)      |
| Cubo de Fichas (Token)    | O(1) por cliente  | Ráfagas hasta C    | Recarga continua exacta|
| Cubo Perforado (Leaky)    | O(N) profundidad  | Flujo de salida fijo| Descarta si saturado  |
+---------------------------+-------------------+--------------------+------------------------+
```

### 1. Contador de Ventana Fija (Fixed Window Counter)
Segmenta el tiempo en intervalos estáticos (por ejemplo, 60 segundos). Si el contador supera el umbral $L$, las solicitudes posteriores se rechazan.
- **Vulnerabilidad de frontera:** Si un cliente envía 100 peticiones en el segundo 59 y otras 100 en el segundo 61, el sistema procesará 200 operaciones en solo 2 segundos, duplicando la tasa permitida y pudiendo colapsar los servicios internos.

### 2. Cubo de Fichas (Token Bucket)
El estándar indiscutible en pasarelas como Cloudflare y AWS API Gateway. Un cubo con capacidad $C$ se recarga continuamente a una tasa $R$ de fichas por segundo. Cada petición entrante consume una ficha; si el cubo queda vacío, se responde con un código HTTP `429 Too Many Requests`. Este diseño tolera ráfagas puntuales de hasta $C$ solicitudes, garantizando que el consumo en régimen sostenido no sobrepase la tasa $R$.

---

## Implementación de Producción: Token Bucket Atómico con Redis y Lua

En sistemas distribuidos con múltiples nodos de servidores sin estado, mantener contadores en la memoria local de cada servidor provoca una fragmentación de las cuotas. Centralizar el estado en Redis es imprescindible, pero las secuencias habituales de lectura-modificación-escritura provocan condiciones de carrera (Race Conditions).

Para garantizar la atomicidad total, encapsulamos la lógica de cálculo y deducción en un **script Lua en Redis**:

```lua
-- KEYS[1]: Clave de la cubeta (ej: "ratelimit:user_1024")
-- ARGV[1]: Capacidad máxima (límite de ráfaga)
-- ARGV[2]: Tasa de recarga por segundo
-- ARGV[3]: Marca de tiempo Unix actual (en segundos con decimales)
-- ARGV[4]: Fichas solicitadas (generalmente 1)

local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local data = redis.call("HMGET", key, "tokens", "last_updated")
local tokens = tonumber(data[1])
local last_updated = tonumber(data[2])

if tokens == nil then
    tokens = capacity
    last_updated = now
else
    local elapsed = math.max(0, now - last_updated)
    tokens = math.min(capacity, tokens + (elapsed * refill_rate))
    last_updated = now
end

if tokens >= requested then
    tokens = tokens - requested
    redis.call("HMSET", key, "tokens", tokens, "last_updated", last_updated)
    local ttl = math.ceil(capacity / refill_rate) * 2
    redis.call("EXPIRE", key, ttl)
    return {1, math.floor(tokens)} -- Permitido: [1, fichas restantes]
else
    redis.call("HMSET", key, "tokens", tokens, "last_updated", last_updated)
    return {0, math.floor(tokens)} -- Rechazado: [0, fichas restantes]
end
```

### Integración en Middleware con TypeScript

```typescript
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });

export interface RateLimitResult {
  allowed: boolean;
  remainingTokens: number;
  retryAfterSeconds?: number;
}

export async function checkRateLimit(
  clientId: string,
  capacity: number = 60,
  refillRate: number = 1.0 // 1 ficha/seg = 60 peticiones/minuto sostenidas
): Promise<RateLimitResult> {
  const key = `ratelimit:${clientId}`;
  const now = Date.now() / 1000;

  const [allowed, remaining] = (await redis.evalSha(LUA_SCRIPT_SHA, {
    keys: [key],
    arguments: [
      capacity.toString(),
      refillRate.toString(),
      now.toString(),
      '1'
    ],
  })) as [number, number];

  if (allowed === 1) {
    return { allowed: true, remainingTokens: remaining };
  }

  const retryAfter = Math.ceil((1 - remaining) / refillRate);
  return {
    allowed: false,
    remainingTokens: 0,
    retryAfterSeconds: Math.max(1, retryAfter),
  };
}
```

---

## Cabeceras HTTP Estandarizadas

Transmitir los datos de control de cuota a los clientes evita ciclos de sondeo innecesarios y fomenta el uso de estrategias de backoff exponencial:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 12
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 12

{
  "error": "rate_limit_exceeded",
  "message": "Límite de peticiones alcanzado. Por favor, espere antes de reintentar.",
  "retry_after_seconds": 12
}
```
