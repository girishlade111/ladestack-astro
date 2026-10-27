---
title: "GitOps：Gitを唯一の信頼できる情報源とするインフラおよびKubernetes管理"
description: "宣言的記述、調整ループ（Reconciliation Loop）、プッシュ型とプル型の比較、Argo CD、Flux CD、シークレット管理、ドリフト検出、ポリシー・アズ・コードを網羅したGitOpsアーキテクチャ徹底解説。"
locale: "ja"
slug: "gitops-managing-infrastructure-with-git"
translationKey: "gitops-managing-infrastructure-with-git"
author: "Girish Lade"
publishedAt: "2024-10-20"
updatedAt: "2026-10-25"
category: "DevOps & CI/CD"
tags: ["GitOps", "Kubernetes", "Argo CD", "Flux CD", "DevOps", "Infrastructure as Code", "Continuous Delivery"]
coverImage: "/blog-covers/devops-automation.svg"
coverAlt: "KubernetesとArgo CDによるGitOpsアーキテクチャ図"
draft: false
featured: false
contentType: "deep-dive"
---

## 1. GitOpsの定義：単なるCI/CDパイプライン実行を超えて

現代のクラウドネイティブ運用において、「GitOps」という用語は、単なるCI/CDの自動化やシェルスクリプトをGitリポジトリに保存することと混同されがちです。GitHub ActionsやGitLab CIのランナーからコミットのマージをトリガーにして `kubectl apply` や `terraform apply` を実行することは、**プッシュ型のデプロイ自動化**であり、本来のGitOpsではありません。

GitOpsは、CNCFの**OpenGitOps Working Group**によって定義された、以下の4つの原則に基づく運用モデルです：

1. **宣言的な記述（Declarative Descriptions）**: インフラリソース、ネットワークトポロジ、アプリケーションデプロイ、セキュリティポリシー、リソースクォータなど、システム全体の望ましい状態が手続き型ではなく宣言型で記述されていること。
2. **バージョン管理された不変の状態ストレージ（Versioned & Immutable Storage）**: Gitが唯一の信頼できる情報源（Single Source of Truth: SSOT）として機能し、すべての状態宣言がバージョン管理され、不変であり、暗号署名と変更履歴を保持していること。
3. **自動化されたプルと適用（Automated Pull & Application）**: クラスター内の調整エージェント（In-cluster reconciliation agent）が望ましい状態の変更を継続的にポーリングまたはWebhookで受信し、外部からのクラスター管理者権限を必要とせずにクラスター内部からマニフェストをプルして適用すること。
4. **継続的な状態調整とドリフト検出（Continuous Reconciliation & Drift Detection）**: 調整エージェントが、クラスターの実際の稼働状態（Actual State）とGitに定義された望ましい状態（Desired State）を比較する継続的な制御ループを実行し、帯域外の手動変更や構成ドリフトを能動的に検出して修正すること。

```
+-------------------------------------------------------------------------+
|                              開発者ワークスペース                         |
|                                                                         |
|  git commit -m "feat: scale catalog replicas" && git push               |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                       Gitリポジトリ（唯一の信頼できる情報源: SSOT）         |
|  - manifests/base/catalog.yaml                                          |
|  - overlays/production/kustomization.yaml                              |
+-----------------------------------+-------------------------------------+
                                    |
          調整ループ                | Git Poll / Webhook (プル型)
          クラスター内エージェント    v
+-------------------------------------------------------------------------+
|                  Kubernetesクラスター Ingress / コントロールプレーン        |
|                                                                         |
|  +---------------------+         比較          +---------------------+  |
|  |  GitOpsコントローラー | --------------------> | 実際のクラスター稼働  |  |
|  |  (Argo CD / Flux)   | <-------------------- | 状態 (Kube API)     |  |
|  +---------------------+       ドリフト検出     +---------------------+  |
|             |                                             ^             |
|             +-------- 自動同期 / 自己修復 (Self-Heal) -------+             |
+-------------------------------------------------------------------------+
```

### アーキテクチャ上の本質的相違：プッシュ型 vs. プル型

従来の**プッシュ型CI/CD**では、外部のCIサーバーが本番クラスターの強力な管理者権限（`kubeconfig` やサービスアカウントトークン）を長期保持します。万一CIサーバーが侵害された場合、攻撃者は接続先のクラウドアカウント全体に対するフルアクセス権限を奪取できます。さらに、プッシュ型パイプラインは一度コマンドを実行したら終了するため、管理者が `kubectl edit` などで手動で設定を変更しても、次のコミットプッシュまでCIは一切検知できません。

これに対し、**プル型GitOps**では、クラスターの認証情報がクラスター外部に一切漏洩しません。コントローラーはKubernetesの内部で最小権限のRBACに基づいて動作し、Gitリポジトリに対して読み取り専用（HTTPS/SSH）でアクセスします。手動での無断変更が発生した場合も即座にドリフトアラートが発火し、自己修復機能によってGitの定義通りに自動上書きされます。

---

## 2. 宣言的な望ましい状態とKustomizeによる構成管理

GitOpsリポジトリでは、テンプレートの肥大化を抑えつつ環境ごとの差分を安全に管理するため、**Kustomize**のBase/Overlayパターンが標準的に採用されます。

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
      - op: add
        path: /spec/template/spec/containers/0/resources/limits
        value:
          cpu: "2000m"
          memory: "4Gi"
```

---

## 3. Argo CD vs. Flux CD の選定比較

| 比較項目 | Argo CD | Flux CD (Flux v2) |
| :--- | :--- | :--- |
| **アーキテクチャ** | 集中型アプリケーションコントローラー & Web UI | Unix哲学に基づく疎結合なマイクロコントローラー群 |
| **ユーザーインターフェース** | 洗練されたWeb UI、CLI、REST/gRPC API | Kubernetes CRDとCLI（`flux`）、標準GUIなし |
| **マルチテナンシー** | Projects、SSO連携、Web UIでのきめ細かなRBAC | Kubernetesネイティブの名前空間、RBAC、ServiceAccount |
| **同期エンジン** | 単一の統合アプリケーションコントローラー | 責務分離型（`source`, `kustomize`, `helm` コントローラー） |
| **ユースケース** | 開発者セルフサービス、プラットフォームエンジニアリング | ヘッドレストポロジ、エッジクラスター、基盤インフラ管理 |

---

## 4. GitOpsにおけるシークレット管理

平文の機密情報をGitにコミットすることは厳禁です。現代のGitOpsでは以下の2大パターンが用いられます：

1. **Sealed Secrets（暗号化コミットモデル）**: クライアント側でコントローラーの公開鍵を用いて暗号化し、クラスター内の復号コントローラーのみが標準のKubernetes `Secret` を生成。
2. **External Secrets Operator（外部ボールト連携モデル）**: HashiCorp Vault、AWS Secrets Manager、GCP Secret Managerなどの外部保管庫と連携し、実行時にクラスター内へシークレットを同期。

---

## 5. 制約事項とロールバックの現実

GitOpsは高い透明性と監査性を提供しますが、以下の制約を理解する必要があります：

- **データベースマイグレーションの不可逆性**: Gitのコミットをリバートしても、破壊的なデータベーススキーマ変更は元に戻りません。後方互換性を保つ拡張・縮小（Expand-Contract）パターンの併用が不可欠です。
- **緊急時の自己修復競合**: 障害対応中にオンコールエンジニアが緊急でマニフェストを変更しようとしても、コントローラーの自己修復（Self-Heal）が有効な場合、即座に変更が打ち消されます。緊急同期停止（Break-glass）手順の事前策定が必須です。
