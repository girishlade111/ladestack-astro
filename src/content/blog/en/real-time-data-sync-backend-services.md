---
title: "Real-Time Data Synchronization with Modern Backend Services: WebSockets, Change Streams, and CRDTs"
description: "An authoritative engineering guide to real-time data sync across distributed web applications, covering WebSockets, Server-Sent Events, database change data capture (CDC), optimistic UI updates, and conflict resolution."
locale: "en"
slug: "real-time-data-sync-backend-services"
translationKey: "real-time-data-sync-backend-services"
author: "Girish Lade"
publishedAt: "2024-08-25"
updatedAt: "2026-10-24"
category: "Backend as a Service"
tags: ["Real-Time", "WebSockets", "BaaS", "Distributed Systems", "CRDT", "Architecture"]
coverImage: "/blog-covers/cloud-security.svg"
coverAlt: "Real-Time Data Synchronization Architecture Blueprint"
draft: false
featured: false
contentType: "architecture"
---

## Introduction: The Real-Time Paradigm Shift

Modern web applications increasingly demand instant collaboration. Whether building collaborative whiteboards, multiplayer document editors, financial tickers, or live chat support, users expect interface state to synchronize seamlessly without manual page refreshes.

However, achieving high-throughput real-time data synchronization across thousands of concurrent clients is one of the most demanding problems in distributed software engineering. Engineering teams must balance network transport overhead, persistent connection concurrency, database Change Data Capture (CDC), race conditions, and offline conflict resolution.

A naive implementation that broadcasts every database mutation to every client will quickly overwhelm network buffers and lead to state divergence. This guide provides an architectural blueprint for selecting the appropriate transport protocols, managing database change streams, handling optimistic UI updates, and resolving multi-user write conflicts.

---

## 1. Transport Protocol Tradeoffs: Choosing the Right Channel

Before selecting client libraries, teams must choose a transport protocol aligned with their data flow characteristics:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       REAL-TIME TRANSPORT SPECTRUM                          │
├─────────────────────┬───────────────────────────┬───────────────────────────┤
│    Short Polling    │ Server-Sent Events (SSE)  │        WebSockets         │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ • Client-Driven     │ • Unidirectional (S ──► C)│ • Bidirectional (S ◄──► C)│
│ • High HTTP Header  │ • Native HTTP/2 & HTTP/3  │ • Full-Duplex TCP Sockets │
│   Overhead          │ • Automatic Reconnection  │ • Custom Heartbeats &     │
│ • Best for Low-Freq │ • Best for Feeds, AI      │   Framing Required        │
│   Status Updates    │   Streams, Notifications  │ • Best for Multiplayer,   │
│                     │                           │   Gaming, Fast Collab     │
└─────────────────────┴───────────────────────────┴───────────────────────────┘
```

### 1. Server-Sent Events (SSE)
SSE is an open standard (`EventSource` API) delivering UTF-8 text streams over standard HTTP.
- **When to Choose:** Whenever data flow is strictly unidirectional from server to client (e.g. streaming LLM completions, notification feeds, live sports scores, build logs).
- **Architectural Advantages:** Operates seamlessly over HTTP/2 and HTTP/3 multiplexed connections. Handles edge proxies and corporate firewalls without special socket negotiation, and features native browser reconnection out of the box.

### 2. WebSockets (`ws://`, `wss://`)
WebSockets provide persistent, full-duplex TCP connections established via an initial HTTP Upgrade handshake.
- **When to Choose:** True bidirectional, high-frequency interactions (e.g. real-time cursor positions, collaborative canvas editing, in-game movement, low-latency telemetry).
- **Architectural Challenges:** Requires stateful connection tracking. Load balancers must support sticky sessions or route socket frames to a distributed pub/sub cluster (such as Redis or NATS) to broadcast messages across isolated server nodes.

---

## 2. Database Change Data Capture (CDC) Architecture

Real-time synchronization engines typically connect directly to the database transaction log rather than having application code manually push events after every write:

```
[PostgreSQL Database]
        │
        ▼ 1. Transaction Committed to Write-Ahead Log (WAL)
[Logical Replication Plugin] (pgoutput / wal2json)
        │
        ▼ 2. Decoded Change Stream
[Realtime Gateway Service] (Elixir Phoenix / Node.js Cluster)
        │
        ├───────────────────────────────────────────────────────┐
        │ 3. Filter by Tenant & Channel Authorization           │
        ▼                                                       ▼
[Subscribed Client A]                                   [Subscribed Client B]
(Browser WebSocket)                                     (Mobile WebSocket)
```

### PostgreSQL Logical Replication in Practice
In modern BaaS architectures (such as Supabase Realtime), PostgreSQL's native logical decoding stream publishes row-level changes:

```sql
-- Create publication for tables requiring real-time broadcast
CREATE PUBLICATION supabase_realtime FOR TABLE documents, comments;

-- Set replica identity to full to capture both old and new record states during updates
ALTER TABLE documents REPLICA IDENTITY FULL;
```

When a record updates in `documents`, the engine extracts the change payload, checks Row Level Security (RLS) rules against the user's JWT, and broadcasts the event only to authorized sockets.

---

## 3. Client-Side Subscription & Optimistic Updates

Waiting for server confirmation before updating client UI creates sluggish interactions. High-performance collaborative tools implement **Optimistic UI Updates** paired with deterministic rollback:

```typescript
// Optimistic UI pattern with TanStack Query / React Query
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DocumentUpdate {
  id: string;
  title: string;
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedDoc: DocumentUpdate) => {
      const res = await fetch(`/api/documents/${updatedDoc.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedDoc.title }),
      });
      if (!res.ok) throw new Error('Failed to update document');
      return res.json();
    },

    // 1. Optimistic Update Phase
    onMutate: async (updatedDoc) => {
      // Cancel outgoing refetches to prevent overwriting optimistic state
      await queryClient.cancelQueries({ queryKey: ['document', updatedDoc.id] });

      // Snapshot previous state for rollback
      const previousDoc = queryClient.getQueryData(['document', updatedDoc.id]);

      // Optimistically update cache immediately
      queryClient.setQueryData(['document', updatedDoc.id], (old: any) => ({
        ...old,
        title: updatedDoc.title,
      }));

      return { previousDoc };
    },

    // 2. Rollback Phase (if mutation fails)
    onError: (err, updatedDoc, context) => {
      if (context?.previousDoc) {
        queryClient.setQueryData(['document', updatedDoc.id], context.previousDoc);
      }
      console.error('Optimistic update failed; rolled back to previous state.', err);
    },

    // 3. Reconcile with Server Source of Truth
    onSettled: (data, error, updatedDoc) => {
      queryClient.invalidateQueries({ queryKey: ['document', updatedDoc.id] });
    },
  });
}
```

---

## 4. Conflict Resolution: LWW vs. CRDTs

When multiple users mutate the same resource concurrently, systems must resolve conflicting states deterministically without data loss.

```
                    ┌──────────────────────────────────────────────┐
                    │          CONFLICT RESOLUTION STRATEGY         │
                    └──────────────────────┬───────────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    │                                             │
                    ▼                                             ▼
       [Last-Write-Wins (LWW)]                       [CRDTs: Yjs / Automerge]
  • Simplest to implement                       • Mathematically guarantees convergence
  • High risk of silent overwrites              • Zero data loss across concurrent edits
  • Best for independent fields / counters      • Best for rich-text, canvases, trees
```

### 1. Last-Write-Wins (LWW)
In an LWW system, every update carries an epoch timestamp or monotonically increasing version number. The update with the highest timestamp overwrites prior values.
- **Pitfall:** System clock skew across distributed servers can cause valid newer writes to be discarded silently. Always use server-assigned timestamps or logical Lamport clocks rather than client device clocks.

### 2. Conflict-Free Replicated Data Types (CRDTs)
For rich-text collaborative editors (like Notion or Google Docs), character-by-character changes cannot be merged with LWW. Libraries such as **Yjs** and **Automerge** treat documents as a directed acyclic graph of operations that can be merged in any order to arrive at identical final states:

```typescript
// Collaborative text synchronization using Yjs and WebSockets
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// 1. Initialize shared Yjs document
const ydoc = new Y.Doc();

// 2. Connect to real-time sync server
const provider = new WebsocketProvider(
  'wss://sync.yourdomain.com',
  'document-room-xyz',
  ydoc
);

// 3. Define shared collaborative text type
const ytext = ydoc.getText('codemirror-content');

// 4. Listen for concurrent remote updates
ytext.observe((event) => {
  console.log('Remote delta applied deterministically:', event.changes.delta);
});

// Mutate text locally; automatically broadcast and merged
ytext.insert(0, 'Hello Collaborative World!\n');
```

---

## 5. Connection Lifecycle, Reconnection & Backoff

Mobile devices and distributed web clients frequently encounter network transitions (e.g. switching from Wi-Fi to cellular, passing through tunnels). A production WebSocket manager must implement exponential backoff with jitter to prevent "thundering herd" spikes against server clusters upon recovery:

```typescript
export class ResilientWebSocket {
  private url: string;
  private ws: WebSocket | null = null;
  private retryCount = 0;
  private maxDelay = 30000; // 30s max backoff
  private heartbeatInterval: any;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('Realtime socket connected.');
      this.retryCount = 0;
      this.startHeartbeat();
    };

    this.ws.onclose = () => {
      this.cleanupHeartbeat();
      this.scheduleReconnect();
    };

    this.ws.onerror = (err) => {
      console.error('Socket error:', err);
      this.ws?.close();
    };
  }

  private scheduleReconnect() {
    // Exponential backoff: base 1000ms * 2^attempts + random jitter
    const delay = Math.min(
      this.maxDelay,
      1000 * Math.pow(2, this.retryCount) + Math.random() * 1000
    );
    this.retryCount++;

    console.log(`Scheduling reconnect in ${Math.round(delay)}ms...`);
    setTimeout(() => this.connect(), delay);
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 25000);
  }

  private cleanupHeartbeat() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
  }
}
```

---

## 6. Real-Time Channel Security & Ephemeral Tokens

Connecting to a real-time gateway requires rigorous authentication:
1. **Never pass API keys in plain text URL queries:** Query parameters frequently leak into edge proxy logs, browser histories, and monitoring traces.
2. **Short-Lived Ephemeral Ticket Handshake:** Clients exchange their long-lived session cookie/JWT via a secure HTTP POST for a short-lived (e.g., 60-second), single-use connection ticket, which is presented during the WebSocket upgrade handshake.
3. **Channel-Level Authorization Guards:** Validate tenant boundaries whenever a socket attempts to join a topic (e.g., `room:tenant_123:project_456`). Sockets belonging to `tenant_999` must be rejected immediately with an authorization fault.

---

## Conclusion & Architectural Summary

Building reliable real-time experiences requires moving past basic pub/sub socket demos to engineering for edge cases:
- Use **Server-Sent Events** for unidirectional streaming and **WebSockets** for bidirectional collaboration.
- Leverage **Database Change Streams (CDC)** to keep the database as the sole source of truth.
- Implement **Optimistic UI Updates** with deterministic client rollbacks.
- Resolve state conflicts using **server-assigned Lamport clocks** for simple data or **CRDTs (Yjs)** for rich collaborative text.
- Guard reconnection spikes with **exponential backoff and full jitter**.

### Related Architecture Guides
- For comparing backend engines supporting real-time subscriptions, see [BaaS Platforms Compared: Firebase vs Supabase vs Appwrite](/blog/baas-platforms-compared-firebase-supabase-appwrite).
- For edge compute triggers and background event processing, read [Building Serverless Backends with BaaS](/blog/building-serverless-backends-with-baas).
