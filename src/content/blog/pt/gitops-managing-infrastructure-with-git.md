---
title: "GitOps: Gerenciamento de Infraestrutura e Kubernetes com Git como Fonte Única da Verdade"
description: "Guia arquitetural aprofundado sobre GitOps: estado declarativo, loops de reconciliação contínua, comparação Push vs Pull, Argo CD, Flux CD, gestão de segredos e conformidade com Policy-as-Code."
locale: "pt"
slug: "gitops-managing-infrastructure-with-git"
translationKey: "gitops-managing-infrastructure-with-git"
author: "Girish Lade"
publishedAt: "2024-10-20"
updatedAt: "2026-10-25"
category: "DevOps & CI/CD"
tags: ["GitOps", "Kubernetes", "Argo CD", "Flux CD", "DevOps", "Infrastructure as Code", "Continuous Delivery"]
coverImage: "/blog-covers/devops-automation.svg"
coverAlt: "Arquitetura GitOps com Kubernetes e Argo CD"
draft: false
featured: false
contentType: "deep-dive"
---

## 1. Definindo GitOps: Indo Além dos Pipelines de CI/CD

Nas operações modernas em nuvem, o termo **GitOps** é frequentemente reduzido a uma simples automação de pipeline ou ao armazenamento de scripts dentro de um repositório Git. Executar `kubectl apply` ou `terraform apply` a partir de um runner do GitHub Actions ou GitLab CI disparado por um merge é uma **automação de deploy baseada em Push**, e não GitOps em seu sentido estrito.

Definido pelo grupo de trabalho **OpenGitOps (CNCF)**, o GitOps fundamenta-se em quatro princípios essenciais:

1. **Descrições Declarativas**: Todo o estado do sistema (infraestrutura, topologia de rede, implantações, políticas e cotas) é descrito de forma declarativa.
2. **Armazenamento de Estado Imutável e Versionado**: O Git atua como a única fonte da verdade (Single Source of Truth, SSOT), mantendo um histórico auditável e imutável.
3. **Puxada Automatizada de Estado (Pull-based)**: Um agente de reconciliação interno ao cluster monitora o repositório e puxa as declarações a partir de dentro, sem necessitar de credenciais administrativas externas expostas.
4. **Reconciliação Contínua e Detecção de Desvios (Drift Detection)**: O controlador compara constantemente o estado real do cluster com o estado desejado no Git, corrigindo de forma autônoma alterações manuais não autorizadas (Self-Healing).

```
+-------------------------------------------------------------------------+
|                           Espaço de Trabalho do Desenvolvedor           |
|  git commit -m "feat: scale catalog replicas" && git push               |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                  Repositório Git (Fonte Única da Verdade: SSOT)         |
|  - manifests/base/catalog.yaml                                          |
|  - overlays/production/kustomization.yaml                              |
+-----------------------------------+-------------------------------------+
                                    |
          Loop de Reconciliação     | Git Poll / Webhook (Modelo Pull)
          Agente Interno do Cluster v
+-------------------------------------------------------------------------+
|                  Cluster Kubernetes / Painel de Controle                |
|                                                                         |
|  +---------------------+        Comparação      +---------------------+ |
|  | Controlador GitOps  | -------------------->  | Estado Real do      | |
|  |  (Argo CD / Flux)   | <--------------------  | Cluster (Kube API)  | |
|  +---------------------+      Detecta Desvio    +---------------------+ |
|             |                                             ^             |
|             +-------- Auto-Correção / Self-Heal ----------+             |
+-------------------------------------------------------------------------+
```

### A Distinção Estrutural: Push vs. Pull

- **Modelo Push**: Servidores de CI externos armazenam credenciais com privilégios de administrador (`kubeconfig`). Se o CI for comprometido, os invasores ganham controle irrestrito sobre o cluster. Edições manuais em tempo de execução (`kubectl edit`) passam despercebidas.
- **Modelo Pull**: Nenhuma credencial de administração sai do cluster. O agente interno possui permissões restritas e sobrescreve imediatamente qualquer alteração manual realizada fora do Git.

---

## 2. Gerenciamento Declarativo com Kustomize

O padrão Base e Overlays do Kustomize permite segregar parâmetros de ambientes (staging e production) sem duplicação de manifests:

```yaml
# apps/ecommerce-service/overlays/production/kustomization.yaml
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
```

---

## 3. Argo CD vs. Flux CD: Decisão Arquitetural

- **Argo CD**: Interface web intuitiva, suporte a Single Sign-On (SSO) corporativo e RBAC multi-inquilino. Ideal para plataformas de autoatendimento para desenvolvedores.
- **Flux CD**: Filosofia Unix com microcontroladores modulares sem interface nativa. Excelente para clusters periféricos (Edge) e orquestração de infraestrutura de baixo nível.

---

## 4. Gestão de Segredos e Limitações de Rollback

- **Segredos**: Nunca comitar credenciais em texto claro. Utiliza-se **Sealed Secrets** (criptografia assimétrica local) ou o **External Secrets Operator** (integração dinâmica com HashiCorp Vault ou KMS em nuvem).
- **Rollback**: Fazer `revert` de um commit Git não reverte alterações destrutivas em bancos de dados. É indispensável o uso do padrão Expand-Contract para garantir implantações com zero downtime.
