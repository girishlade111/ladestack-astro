---
title: "GitOps: Git을 단일 진실 공급원으로 활용한 인프라 및 쿠버네티스 관리"
description: "선언적 시스템 정의, 지속적 조정 루프(Reconciliation Loop), 푸시 vs 풀 방식 비교, Argo CD 및 Flux CD 아키텍처, 시크릿 관리, 정책 기반 코드 제어를 다루는 GitOps 심층 가이드."
locale: "ko"
slug: "gitops-managing-infrastructure-with-git"
translationKey: "gitops-managing-infrastructure-with-git"
author: "Girish Lade"
publishedAt: "2024-10-20"
updatedAt: "2026-10-25"
category: "DevOps & CI/CD"
tags: ["GitOps", "Kubernetes", "Argo CD", "Flux CD", "DevOps", "Infrastructure as Code", "Continuous Delivery"]
coverImage: "/blog-covers/devops-automation.svg"
coverAlt: "쿠버네티스와 Argo CD를 활용한 GitOps 아키텍처 다이어그램"
draft: false
featured: false
contentType: "deep-dive"
---

## 1. GitOps의 본질: 단순 CI/CD 파이프라인과의 차이점

클라우드 네이티브 환경에서 GitOps는 단순한 CI/CD 자동화나 Git 리포지토리에 스크립트를 보관하는 행위로 오해되곤 합니다. GitHub Actions나 GitLab CI 러너에서 마스터 브랜치 머지를 감지해 `kubectl apply`를 실행하는 것은 **푸시(Push) 기반 배포 자동화**일 뿐, 엄밀한 의미의 GitOps가 아닙니다.

CNCF **OpenGitOps Working Group**에 따른 GitOps의 핵심 4대 원칙은 다음과 같습니다:

1. **선언적 시스템 기술 (Declarative Descriptions)**: 인프라, 네트워크, 배포 사양, 보안 정책 등 전체 시스템 상태가 절차적이 아닌 선언적 매니페스트로 정의되어야 합니다.
2. **버전 관리되는 불변 저장소 (Versioned & Immutable State Storage)**: Git이 단일 진실 공급원(SSOT)으로 작동하며, 모든 이력이 암호학적으로 서명되고 추적 가능해야 합니다.
3. **자동화된 상태 가져오기 (Automated Pull Agent)**: 클러스터 내부의 조정 에이전트가 Git의 선언을 주기적으로 폴링하거나 웹훅으로 수신하여 내부에서 직접 클러스터 상태로 반영해야 합니다.
4. **지속적인 상태 조정 및 드리프트 감지 (Continuous Reconciliation & Drift Detection)**: 실제 클러스터 상태와 Git에 정의된 상태를 끊임없이 비교하여 임의의 수동 변경(Drift)을 자동으로 탐지하고 자가 치유(Self-healing)해야 합니다.

```
+-------------------------------------------------------------------------+
|                               개발자 워크스페이스                         |
|  git commit -m "feat: scale catalog replicas" && git push               |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                       Git 리포지토리 (단일 진실 공급원: SSOT)               |
|  - manifests/base/catalog.yaml                                          |
|  - overlays/production/kustomization.yaml                              |
+-----------------------------------+-------------------------------------+
                                    |
          조정 루프 (클러스터 내부)     | Git Poll / Webhook (풀 방식)
          In-Cluster Agent          v
+-------------------------------------------------------------------------+
|                  Kubernetes 클러스터 Ingress / 컨트롤 플레인               |
|                                                                         |
|  +---------------------+         비교          +---------------------+  |
|  |  GitOps 컨트롤러     | --------------------> | 실제 클러스터 실행    |  |
|  |  (Argo CD / Flux)   | <-------------------- | 상태 (Kube API)     |  |
|  +---------------------+       드리프트 감지     +---------------------+  |
|             |                                             ^             |
|             +-------- 자동 동기화 / 자가 치유 (Self-Heal) ----+             |
+-------------------------------------------------------------------------+
```

### 아키텍처적 차이: 푸시(Push) vs. 풀(Pull)

- **푸시 모델**: 외부 CI 러너가 프로덕션 클러스터의 관리자 자격 증명(`kubeconfig`)을 보관하므로 CI가 해킹당하면 인프라 전체가 장악됩니다. 또한 `kubectl edit` 등의 수동 변경을 감지할 수 없습니다.
- **풀 모델**: 자격 증명이 클러스터 외부로 유출되지 않으며, 내부 컨트롤러가 읽기 전용으로 Git을 바라봅니다. 수동 수정 발생 시 즉각 감지하여 Git 사양으로 덮어씁니다.

---

## 2. Kustomize 기반 환경별 오버레이 관리

Base/Overlay 패턴을 사용하면 중복 선언 없이 프로덕션 및 스테이징 환경의 리소스 요구사항을 명확히 분리할 수 있습니다.

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

## 3. Argo CD vs Flux CD 핵심 비교

- **Argo CD**: 직관적인 웹 대시보드, 엔터프라이즈 SSO 통합, 멀티테넌시 프로젝트 관리에 강점을 지니며 개발자 셀프서비스 플랫폼에 적합합니다.
- **Flux CD**: Unix 철학에 입각한 경량 마이크로 컨트롤러 구조로, GUI 없이 순수 선언적 CRD 및 쿠버네티스 네이티브 RBAC을 선호하는 환경에 최적화되어 있습니다.

---

## 4. GitOps 시크릿 관리와 롤백의 한계

- **시크릿 보안**: 평문 시크릿은 절대 Git에 커밋하지 않으며, **Sealed Secrets**(클라이언트 암호화 커밋) 또는 **External Secrets Operator**(Vault, AWS/GCP Secret Manager 동적 연동)를 적용합니다.
- **롤백 주의점**: Git 커밋 롤백이 데이터베이스 스키마 변경을 자동으로 복원하지는 못하므로, 무중단 배포를 위한 확장-축소(Expand-Contract) 데이터베이스 패턴이 병행되어야 합니다.
