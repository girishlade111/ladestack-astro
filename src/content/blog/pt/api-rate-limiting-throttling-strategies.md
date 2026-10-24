---
title: "Estratégias de Rate Limiting e Throttling de API: Guia de Arquitetura para Produção"
description: "Guia técnico de engenharia sobre algoritmos de limitação de taxa (Rate Limiting) e controle de vazão (Throttling). Implementação atômica de Token Bucket com Redis e Lua, e cabeçalhos HTTP padronizados."
locale: "pt"
slug: "api-rate-limiting-throttling-strategies"
translationKey: "api-rate-limiting-throttling-strategies"
author: "Girish Lade"
publishedAt: "2024-09-09"
updatedAt: "2026-10-24"
category: "Backend"
tags: ["Design de APIs", "Rate Limiting", "Redis", "Sistemas Distribuídos", "Engenharia Backend", "Segurança"]
coverImage: "/blog-covers/api-rate-limiting.svg"
coverAlt: "Diagrama de Arquitetura de Rate Limiting e Throttling de APIs"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "deep-dive"
---

Aplicações web modernas e arquiteturas de APIs distribuídas operam sob constante volatilidade de tráfego. Sejam picos repentinos gerados por campanhas de marketing, varreduras automatizadas de bots de busca, loops infinitos de retentativas ou ataques maliciosos de negação de serviço (DoS), uma API sem mecanismos de controle de tráfego constitui uma vulnerabilidade crítica de infraestrutura.

O **Rate Limiting (limitação de taxa)** e o **Throttling (controle de vazão)** representam salvaguardas arquiteturais fundamentais. Enquanto o rate limiting impõe o número máximo de requisições que um cliente pode disparar dentro de uma janela temporal, o throttling regula ativamente o ritmo de processamento para resguardar bancos de dados e garantir a distribuição equitativa de recursos computacionais entre múltiplos clientes.

Neste guia técnico, examinamos os modelos matemáticos dos principais algoritmos de limitação e implementamos um motor atômico de Token Bucket baseado em Redis e scripts Lua.

---

## Comparativo dos Principais Algoritmos de Rate Limiting

Cada algoritmo estabelece um equilíbrio específico entre custo computacional, uso de memória e tolerância a rajadas de requisições (bursts).

```
+---------------------------+-------------------+--------------------+------------------------+
| Algoritmo                 | Pegada de Memória | Tolerância a Rajada| Precisão de Janela     |
+---------------------------+-------------------+--------------------+------------------------+
| Janela Fixa (Fixed)       | O(1) por cliente  | Vulnerável a pico 2x| Distorção nas bordas   |
| Log Deslizante (Log)      | O(N) requisições  | Fluido e exato     | Precisão absoluta      |
| Contador Deslizante       | O(1) por cliente  | Média ponderada    | Aproximação (~99%)     |
| Balde de Fichas (Token)   | O(1) por cliente  | Permite rajadas C  | Recarga contínua exata |
| Balde Furado (Leaky)      | O(N) profundidade | Fluxo de saída fixo| Rejeita se cheio       |
+---------------------------+-------------------+--------------------+------------------------+
```

### 1. Contador de Janela Fixa (Fixed Window Counter)
Divide o tempo em blocos estáticos (por exemplo, 60 segundos). Quando o contador atinge o limite $L$, as requisições subsequentes são bloqueadas.
- **Vulnerabilidade de borda:** Se um cliente disparar 100 requisições no segundo 59 e outras 100 no segundo 61, o servidor processará 200 operações em apenas 2 segundos, dobrando a carga prevista e podendo paralisar os nós de processamento.

### 2. Balde de Fichas (Token Bucket)
Padrão de excelência adotado por gateways como Cloudflare e AWS API Gateway. Um reservatório com capacidade máxima $C$ é reabastecido continuamente a uma taxa constante $R$ de fichas por segundo. Cada requisição consome uma ficha; caso o balde se esgote, a API responde com HTTP `429 Too Many Requests`. O modelo absorve naturalmente rajadas pontuais de até $C$ requisições, enquanto garante que o consumo em regime contínuo nunca ultrapasse a taxa $R$.

---

## Implementação em Produção: Token Bucket Atômico com Redis e Lua

Em arquiteturas distribuídas com múltiplos nós de servidores stateless, armazenar contadores na memória local de cada máquina gera inconsistências graves nos limites globais. Centralizar o estado no Redis é mandatório; porém, operações convencionais de leitura-modificação-escrita causam condições de corrida (Race Conditions).

A solução definitiva consiste em encapsular toda a lógica em um **script Lua no Redis**, executado de maneira estritamente atômica:

```lua
-- KEYS[1]: Chave do balde (ex: "ratelimit:user_1024")
-- ARGV[1]: Capacidade máxima do balde (burst limit)
-- ARGV[2]: Taxa de recarga por segundo
-- ARGV[3]: Timestamp Unix atual (com precisão de milissegundos)
-- ARGV[4]: Fichas requisitadas (normalmente 1)

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
    return {0, math.floor(tokens)} -- Bloqueado: [0, fichas restantes]
end
```

### Middleware em TypeScript

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
  refillRate: number = 1.0 // 1 ficha/segundo = 60 requisições/minuto
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

## Cabeçalhos HTTP Padronizados

Para orientar os clientes a implementarem rotinas saudáveis de backoff exponencial em vez de loops de tentativas desenfreadas, forneça os cabeçalhos do padrão IETF:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 12
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 12

{
  "error": "rate_limit_exceeded",
  "message": "Limite de requisições atingido. Por favor, aguarde antes de tentar novamente.",
  "retry_after_seconds": 12
}
```
