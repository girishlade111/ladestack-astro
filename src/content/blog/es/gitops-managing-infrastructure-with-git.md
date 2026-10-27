---
title: "GitOps: Gestión de Infraestructura y Kubernetes con Git como Única Fuente de Verdad"
description: "Guía arquitectónica exhaustiva sobre GitOps: estado declarativo, bucles de reconciliación continua, comparación Push vs Pull, Argo CD, Flux CD, gestión de secretos y Policy-as-Code."
locale: "es"
slug: "gitops-managing-infrastructure-with-git"
translationKey: "gitops-managing-infrastructure-with-git"
author: "Girish Lade"
publishedAt: "2024-10-20"
updatedAt: "2026-10-25"
category: "DevOps & CI/CD"
tags: ["GitOps", "Kubernetes", "Argo CD", "Flux CD", "DevOps", "Infrastructure as Code", "Continuous Delivery"]
coverImage: "/blog-covers/devops-automation.svg"
coverAlt: "Arquitectura GitOps con Kubernetes y Argo CD"
draft: false
featured: false
contentType: "deep-dive"
---

## 1. Definiendo GitOps: Más Allá de la Ejecución de Pipelines CI/CD

En las operaciones cloud-native modernas, el concepto **GitOps** suele confundirse con la simple automatización de CI/CD o el almacenamiento de scripts Bash en un repositorio de Git. Ejecutar `kubectl apply` o `terraform apply` desde un runner de GitHub Actions o GitLab CI tras una fusión de código es una **automatización de despliegue basada en Push**, y no GitOps en su definición estricta.

Definido por el grupo de trabajo **OpenGitOps (CNCF)**, GitOps se estructura sobre cuatro principios fundamentales:

1. **Descripciones Declarativas**: Todo el estado del sistema (recursos de infraestructura, redes, despliegues, políticas y cuotas) se define de forma puramente declarativa.
2. **Almacenamiento de Estado Versionado e Inmutable**: Git actúa como la única fuente de verdad (Single Source of Truth, SSOT), con un registro auditable y firmas criptográficas.
3. **Extracción y Aplicación Automatizada (Pull-based)**: Un agente de reconciliación interno al clúster sondea o escucha cambios para aplicar las declaraciones desde dentro, sin requerir credenciales maestras expuestas hacia el exterior.
4. **Reconciliación Continua y Detección de Desviaciones (Drift Detection)**: El controlador compara permanentemente el estado real del clúster con el estado deseado en Git, corrigiendo de manera autónoma cualquier modificación manual no autorizada (Self-Healing).

```
+-------------------------------------------------------------------------+
|                           Espacio de Trabajo del Desarrollador          |
|  git commit -m "feat: scale catalog replicas" && git push               |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                  Repositorio Git (Única Fuente de Verdad: SSOT)         |
|  - manifests/base/catalog.yaml                                          |
|  - overlays/production/kustomization.yaml                              |
+-----------------------------------+-------------------------------------+
                                    |
          Bucle de Reconciliación   | Git Poll / Webhook (Modelo Pull)
          Agente Interno al Clúster v
+-------------------------------------------------------------------------+
|                  Clúster Kubernetes / Plano de Control                  |
|                                                                         |
|  +---------------------+        Comparación     +---------------------+ |
|  | Controlador GitOps  | -------------------->  | Estado Real del     | |
|  |  (Argo CD / Flux)   | <--------------------  | Clúster (Kube API)  | |
|  +---------------------+      Detecta Desviación+---------------------+ |
|             |                                             ^             |
|             +-------- Auto-Corrección / Self-Heal --------+             |
+-------------------------------------------------------------------------+
```

### La Diferencia Esencial: Push vs. Pull

- **Modelo Push**: Servidores de CI externos almacenan credenciales con privilegios elevados (`kubeconfig`). Si la plataforma de CI sufre una brecha, los atacantes obtienen acceso total al clúster. Además, las modificaciones manuales directas (`kubectl edit`) no son detectadas por el CI.
- **Modelo Pull**: Las credenciales de administración nunca abandonan el clúster. El operador interno opera con permisos mínimos de lectura hacia Git y sobreescribe de inmediato cualquier cambio manual no autorizado.

---

## 2. Gestión Declarativa de Entornos con Kustomize

El patrón Base y Overlays de Kustomize permite gestionar entornos de staging y producción sin caer en la duplicación masiva de código:

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

## 3. Comparativa: Argo CD vs. Flux CD

- **Argo CD**: Destaca por su consola Web completa, soporte corporativo para SSO y gestión de proyectos multi-inquilino. Es la opción preferida para plataformas de autoservicio para desarrolladores.
- **Flux CD**: Diseñado bajo la filosofía Unix con microcontroladores desacoplados sin interfaz gráfica nativa. Altamente optimizado para clústeres perimetrales (Edge) y orquestación pura de infraestructura.

---

## 4. Gestión de Secretos y Advertencias de Rollback

- **Secretos**: Prohibido almacenar claves en texto claro en Git. Se implementa **Sealed Secrets** (cifrado asimétrico en cliente) o **External Secrets Operator** (sincronización dinámica con Vault o gestores de secretos cloud).
- **Rollback**: Revertir un commit en Git no revierte alteraciones destructivas en esquemas de bases de datos. Para evitar caídas de servicio, es obligatorio aplicar el patrón Expand-Contract en las migraciones de datos.
