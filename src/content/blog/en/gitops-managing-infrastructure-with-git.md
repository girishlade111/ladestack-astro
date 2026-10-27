---
title: "GitOps: Managing Infrastructure and Kubernetes with Git as Single Source of Truth"
description: "Deep-dive architectural guide to GitOps: declarative desired state, reconciliation loops, pull vs push workflows, Argo CD, Flux CD, secret management, drift detection, and policy-as-code."
locale: "en"
slug: "gitops-managing-infrastructure-with-git"
translationKey: "gitops-managing-infrastructure-with-git"
author: "Girish Lade"
publishedAt: "2024-10-20"
updatedAt: "2026-10-25"
category: "DevOps & CI/CD"
tags: ["GitOps", "Kubernetes", "Argo CD", "Flux CD", "DevOps", "Infrastructure as Code", "Continuous Delivery"]
coverImage: "/blog-covers/devops-automation.svg"
coverAlt: "GitOps Architecture with Kubernetes and Argo CD"
draft: false
featured: false
contentType: "deep-dive"
---

## 1. Defining GitOps: Beyond Pipeline Execution

Modern cloud-native operations frequently misuse **GitOps** as a marketing synonym for general CI/CD automation or storing shell scripts inside a version control repository. Running `kubectl apply` or `terraform apply` from a GitHub Actions runner or GitLab CI worker upon a commit merge is **push-based deployment automation**, not GitOps.

GitOps is a specific operational operating model defined by the **OpenGitOps Working Group** (CNCF) around four core principles:

1. **Declarative Descriptions**: The entire system state—infrastructure resources, networking topology, application deployments, security policies, and resource quotas—is described declaratively rather than imperatively.
2. **Versioned and Immutable State Storage**: Git serves as the canonical single source of truth (SSOT). All state declarations are version-controlled, immutable, cryptographically signed, and preserved with historical provenance.
3. **Automated State Pull and Application**: In-cluster software reconciliation agents continuously poll or listen via webhooks for desired state changes, pulling declarations directly into the runtime environment without requiring external cluster admin privileges.
4. **Continuous State Reconciliation and Drift Detection**: The reconciliation agent executes a continuous control loop comparing actual live cluster state against the desired Git state, actively detecting out-of-band mutations and correcting configuration drift.

```
+-------------------------------------------------------------------------+
|                              Developer Workspace                        |
|                                                                         |
|  git commit -m "feat: scale catalog replicas" && git push               |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                       Git Repository (Single Source of Truth)           |
|  - manifests/base/catalog.yaml                                          |
|  - overlays/production/kustomization.yaml                              |
+-----------------------------------+-------------------------------------+
                                    |
          Reconciliation Loop       | Git Poll / Webhook (Pull-Based)
          In-Cluster Agent          v
+-------------------------------------------------------------------------+
|                  Kubernetes Cluster Ingress / Control Plane             |
|                                                                         |
|  +---------------------+        Compare        +---------------------+  |
|  |  GitOps Controller  | --------------------> | Actual Live Cluster |  |
|  |  (Argo CD / Flux)   | <-------------------- | State (Kube API)    |  |
|  +---------------------+       Detect Drift    +---------------------+  |
|             |                                             ^             |
|             +-------- Corrective Sync / Self-Heal --------+             |
+-------------------------------------------------------------------------+
```

### The Architectural Distinction: Push vs. Pull

In traditional **push-based CI/CD**, an external pipeline engine maintains long-lived cluster credentials (such as cluster admin `kubeconfig` or service account tokens). If the CI server is compromised, attackers inherit full execution rights across targeted cloud clusters. Furthermore, push pipelines execute fire-and-forget commands; if a cluster administrator manually alters a Deployment replica count or ingress rule via the Kubernetes CLI (`kubectl edit`), the CI pipeline remains completely oblivious until the next code push.

In **pull-based GitOps**, credentials never leave the Kubernetes cluster. An internal operator runs inside the control plane with scoped role-based access control (RBAC). It periodically syncs against Git over read-only HTTPS/SSH. Unapproved manual runtime edits trigger drift alarms and can be automatically overwritten by self-healing reconciliation loops.

---

## 2. Declarative Desired State and Reconciliation Loops

The heart of GitOps is the **Kubernetes reconciliation loop**, conceptually rooted in control theory:

$$\text{Error}(t) = \text{State}_{\text{desired}}(t) - \text{State}_{\text{actual}}(t)$$

When $\text{Error}(t) \neq 0$, the controller executes actions to converge actual state back toward desired state.

### Manifest Structuring: Base and Overlays with Kustomize

A robust GitOps repository separates raw configuration definitions from environment-specific overrides without template sprawl:

```
gitops-repository/
├── apps/
│   └── ecommerce-service/
│       ├── base/
│       │   ├── deployment.yaml
│       │   ├── service.yaml
│       │   └── kustomization.yaml
│       └── overlays/
│           ├── staging/
│           │   ├── kustomization.yaml
│           │   └── patches/
│           │       └── replica-patch.yaml
│           └── production/
│               ├── kustomization.yaml
│               └── patches/
│                   ├── replica-patch.yaml
│                   └── resource-limits.yaml
└── infrastructure/
    ├── cert-manager/
    └── ingress-nginx/
```

Here is an example `apps/ecommerce-service/overlays/production/kustomization.yaml` utilizing native Kustomize features:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../base

namespace: ecommerce-production

images:
  - name: ghcr.io/ladestack/ecommerce-service
    newTag: v2.14.0

patches:
  - target:
      kind: Deployment
      name: ecommerce-service
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 12
      - op: add
        path: /spec/template/spec/containers/0/resources/limits
        value:
          cpu: "2000m"
          memory: "4Gi"
```

---

## 3. Argo CD vs. Flux CD: Architecture and Trade-Offs

Both **Argo CD** and **Flux CD** are CNCF Graduated projects providing production-grade GitOps controllers. However, their internal architectural models diverge significantly:

| Dimension | Argo CD | Flux CD (Flux v2) |
| :--- | :--- | :--- |
| **Architectural Model** | Centralized Application Controller & Web UI | Unix-philosophy composable micro-controllers |
| **Control Interface** | Dedicated Web UI, CLI, and REST/gRPC API | Kubernetes CRDs, CLI (`flux`), no default GUI |
| **Multi-Tenancy** | Projects, SSO integrations, RBAC via Web UI | Native Kubernetes namespaces, RBAC, ServiceAccounts |
| **Reconciliation Engine** | Monolithic application controller daemon | Granular operators (`source-controller`, `kustomize-controller`, `helm-controller`) |
| **Repository Sync** | Polls Git (default 3m) or GitHub/GitLab webhook | Git, OCI registries, S3-compatible buckets |
| **Best Suited For** | Developer self-service portals, enterprise platform teams | Headless GitOps, edge clusters, embedded infrastructure orchestration |

### Argo CD Application CRD Example

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ecommerce-production
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: production-platform
  source:
    repoURL: 'https://github.com/ladestack/gitops-deployments.git'
    targetRevision: main
    path: apps/ecommerce-service/overlays/production
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: ecommerce-production
  syncPolicy:
    automated:
      prune: true      # Automatically delete resources removed from Git
      selfHeal: true   # Revert out-of-band manual edits
    syncOptions:
      - CreateNamespace=true
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
```

---

## 4. Secret Management in GitOps: The Sealed and External Secret Models

Never commit plaintext secrets into Git, even in private repositories. Two industry-standard architectural models resolve the secret storage dilemma:

### 1. Asymmetric Encryption via Sealed Secrets

Using Bitnami **Sealed Secrets**, secrets are encrypted client-side using an asymmetric public key. The resulting `SealedSecret` CRD is safe to commit to public Git repositories. Only the in-cluster controller holding the private key can decrypt the data into a standard Kubernetes `Secret`.

```bash
# Encrypt local secret with the controller's public key
kubeseal --controller-namespace kube-system \
  --controller-name sealed-secrets-controller \
  --format yaml < secret.yaml > sealed-secret.yaml
```

### 2. External Secrets Operator (ESO) Pattern

The **External Secrets Operator** reconciles external secret vaults (HashiCorp Vault, AWS Secrets Manager, Google Secret Manager, Azure Key Vault) directly into native Kubernetes Secrets.

```
Git (Secret Definition) ----> ExternalSecret CRD
                                    |
                             ESO In-Cluster Operator
                                    |
                             Pulls Secret Data via OIDC / IAM
                                    |
                             HashiCorp Vault / Cloud Secret Manager
                                    |
                             Mounts native k8s Secret into Pod
```

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-credentials
  namespace: ecommerce-production
spec:
  refreshInterval: "1h"
  secretStoreRef:
    name: vault-backend
    kind: ClusterSecretStore
  target:
    name: db-credentials-live
    creationPolicy: Owner
  data:
    - secretKey: DB_PASSWORD
      remoteRef:
        key: production/database
        property: password
```

---

## 5. Policy-as-Code and Guardrails: Kyverno & Gatekeeper

Without validation gates, a pull request merging invalid manifests could disrupt production immediately upon synchronization. **Policy-as-code** validates manifests both pre-commit via CLI linters and admission-time via Kubernetes Admission Controllers.

### Pre-Admission Validation with Kyverno

Kyverno policies inspect incoming resource configurations against enterprise standards:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-run-as-non-root
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: check-security-context
      match:
        any:
          - resources:
              kinds:
                - Pod
      validate:
        message: "Running as root is forbidden. Set securityContext.runAsNonRoot to true."
        pattern:
          spec:
            securityContext:
              runAsNonRoot: true
            containers:
              - securityContext:
                  runAsNonRoot: true
                  allowPrivilegeEscalation: false
```

---

## 6. Practical Limitations, Failure Modes, and Rollback Hazards

GitOps provides high visibility, but engineering teams must understand its architectural constraints:

1. **Rollback Limitations**: Reverting a Git commit (`git revert HEAD`) triggers a cluster reconciliation to previous manifests. However, stateful data migrations (e.g., destructive database schema changes) **cannot** be rolled back by Git alone. Stateful workloads require deliberate backward-compatible database schema practices.
2. **Reconciliation Storms**: Syncing hundreds of applications simultaneously following a cluster migration can overwhelm the Kubernetes API server and Git host rate limits. Staggered sync windows and webhook notifications must be configured.
3. **Drift vs. Imperative Escalation**: During catastrophic production incidents, on-call engineers may need to manually modify resources via `kubectl`. If `selfHeal` is enabled with zero pause controls, the GitOps controller will continuously fight the operator, re-applying the broken configuration. Production clusters must document an emergency sync suspension procedure (`argocd app set --self-heal=false`).

---

## Summary Checklist for Production GitOps

- [x] Version control used as single source of truth for all Kubernetes resources.
- [x] Zero direct CI/CD push access to production Kubernetes API endpoints.
- [x] In-cluster reconciliation operator running with least-privilege RBAC.
- [x] Secrets encrypted (SealedSecrets) or dynamically pulled from external vaults (ESO).
- [x] Policy-as-code admission controllers blocking misconfigured manifests.
- [x] Branch protection and PR peer review enforced on all GitOps branches.
- [x] Documented break-glass procedure to temporarily pause automated reconciliation during outages.
