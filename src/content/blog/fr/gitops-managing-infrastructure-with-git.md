---
title: "GitOps : Gestion des infrastructures et de Kubernetes avec Git comme source unique de vérité"
description: "Guide architectural complet sur GitOps : déclaratif, boucles de réconciliation, comparaison Push vs Pull, Argo CD, Flux CD, gestion des secrets, détection de dérive et Policy-as-Code."
locale: "fr"
slug: "gitops-managing-infrastructure-with-git"
translationKey: "gitops-managing-infrastructure-with-git"
author: "Girish Lade"
publishedAt: "2024-10-20"
updatedAt: "2026-10-25"
category: "DevOps & CI/CD"
tags: ["GitOps", "Kubernetes", "Argo CD", "Flux CD", "DevOps", "Infrastructure as Code", "Continuous Delivery"]
coverImage: "/blog-covers/devops-automation.svg"
coverAlt: "Architecture GitOps avec Kubernetes et Argo CD"
draft: false
featured: false
contentType: "deep-dive"
---

## 1. Définir le GitOps : Au-delà de l'exécution de pipelines CI/CD

Dans les opérations cloud-native, le terme **GitOps** est fréquemment confondu avec la simple automatisation de scripts CI/CD ou le stockage de manifests dans un dépôt Git. Déclencher un `kubectl apply` ou `terraform apply` depuis un exécuteur GitHub Actions ou GitLab CI lors de la fusion d'un commit constitue une **automatisation de déploiement basée sur le modèle Push**, et non du GitOps.

Selon le groupe de travail **OpenGitOps (CNCF)**, le GitOps repose sur quatre principes fondateurs :

1. **Descriptions déclaratives** : L'état complet du système (infrastructure, réseau, déploiements, politiques de sécurité) est décrit de manière déclarative.
2. **Stockage d'état immuable et versionné** : Git constitue la source unique de vérité (Single Source of Truth, SSOT), avec historique immuable et traçabilité cryptographique.
3. **Extraction et application automatisées (Pull-based)** : Un agent de réconciliation interne au cluster interroge continuellement Git et applique l'état souhaité depuis l'intérieur, sans requérir de privilèges administrateur externes.
4. **Réconciliation continue et détection de dérive (Drift Detection)** : Le contrôleur compare en permanence l'état réel du cluster avec l'état souhaité défini dans Git, et corrige automatiquement toute modification manuelle hors bande (Self-Healing).

```
+-------------------------------------------------------------------------+
|                           Espace de travail développeur                 |
|  git commit -m "feat: scale catalog replicas" && git push               |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                  Dépôt Git (Source unique de vérité : SSOT)             |
|  - manifests/base/catalog.yaml                                          |
|  - overlays/production/kustomization.yaml                              |
+-----------------------------------+-------------------------------------+
                                    |
          Boucle de réconciliation | Sondage Git / Webhook (Modèle Pull)
          Agent interne au cluster  v
+-------------------------------------------------------------------------+
|                  Cluster Kubernetes / Plan de contrôle                  |
|                                                                         |
|  +---------------------+        Comparaison     +---------------------+ |
|  | Contrôleur GitOps   | -------------------->  | État réel           | |
|  |  (Argo CD / Flux)   | <--------------------  | en production       | |
|  +---------------------+      Détection dérive  +---------------------+ |
|             |                                             ^             |
|             +-------- Auto-correction / Self-Heal --------+             |
+-------------------------------------------------------------------------+
```

### Distinction fondamentale : Push vs. Pull

- **Modèle Push** : Le serveur CI externe conserve les identifiants d'administration du cluster (`kubeconfig`). En cas de compromission du CI, l'ensemble du cluster est exposé. Les modifications manuelles (`kubectl edit`) ne sont pas détectées avant le prochain push.
- **Modèle Pull** : Les identifiants ne quittent jamais le cluster. L'opérateur interne dispose d'un accès en lecture seule à Git et écrase immédiatement toute modification manuelle non approuvée.

---

## 2. Gestion déclarative des environnements avec Kustomize

Le modèle Base/Overlay de Kustomize permet d'isoler les configurations spécifiques aux environnements staging et production sans duplication de manifests :

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

## 3. Comparatif : Argo CD vs. Flux CD

- **Argo CD** : Interface web intuitive, gestion avancée du SSO d'entreprise et multi-tenance par projet. Idéal pour les portails de libre-service développeur.
- **Flux CD** : Philosophie Unix avec micro-contrôleurs modulaires et légers, sans interface graphique par défaut. Conçu pour les architectures headless et les clusters périphériques (Edge).

---

## 4. Gestion des secrets et limites du rollback

- **Secrets** : Ne jamais stocker de secrets en clair dans Git. Utiliser **Sealed Secrets** (chiffrement asymétrique côté client) ou **External Secrets Operator** (synchronisation dynamique avec HashiCorp Vault ou des coffres-forts cloud).
- **Rollback** : Annuler un commit Git ne restaure pas les données d'une base de données ayant subi une migration destructive. Il convient d'appliquer la stratégie Expand-Contract pour garantir des mises à jour sans rupture.
