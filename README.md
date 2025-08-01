# rolex-chart(楽天市場 Rolex価格推移ビジュアライザ)

## 🎯 プロダクト概要

本プロダクトは、楽天市場の価格データを活用し、Rolex腕時計の価格変動を可視化するWebアプリケーションです。ユーザーはモデルや型番を選択することで、過去の価格推移を1ヶ月・3ヶ月・6ヶ月・1年単位で折れ線グラフとして確認することができます。

本リリースでは、楽天API連携は未実装とし、テストデータによる動作確認・ユーザー反応の検証を目的としたプロトタイプを開発します。

---

## 🧭 開発目的

* Rolex価格の動向に関心を持つユーザー向けに価値提供
* 市場ニーズの仮説検証（価格推移可視化の有用性、検索行動の実態把握）
* データビジュアライゼーションに関するUI/UXのプロトタイプ構築

---

## 🏗 想定ユーザー

* Rolexの購入・売却を検討中の個人ユーザー
* 腕時計専門店や転売事業者などのリセラー
* 時計の価格変動に興味があるマーケットアナリスト

---

## 🛠 機能要件

### 1. モデル検索・選択機能

* 「Rolexを探す」ページで、代表的なモデル一覧（例：Submariner, Datejustなど）を表示
* モデル名または画像で選択可能 ※ 画像は初期実装では表示しない。著作権論点発生 & 楽天で閲覧可能であるため。

### 2. 型番選択・詳細表示機能

* モデルページにて、各モデルの代表的な型番一覧を表示
* 型番を選ぶことで、該当アイテムの詳細ページへ遷移

### 3. 価格推移グラフ表示

* アイテム詳細ページにて、以下の期間の価格変動を折れ線グラフで表示：

  * 直近1ヶ月
  * 直近3ヶ月
  * 直近6ヶ月
  * 直近1年
* 初期実装では楽天APIは未接続。テストデータによる表示のみ実装する

### 4. プレリリース向け制限事項

* 検索・選択可能なモデル・型番は10件以内に限定
* UIはPCとスマホ双方に対応したレスポンシブ設計を想定
* 外部公開用のLPまたは共有URL付きプロトタイプとして完成させる

---

## 💡 技術スタック

* **フレームワーク**: Next.js 14 (App Router)
* **言語**: TypeScript
* **スタイリング**: Tailwind CSS
* **チャート**: Chart.js + react-chartjs-2
* **コンテナ**: Docker
* **デプロイ**: Vercel / Netlify対応

---

## 🚀 開発環境セットアップ

### 前提条件

- Docker
- Docker Compose (または `docker compose` コマンド)

### 開発環境の起動

```bash
# 開発環境を起動
docker compose up --build

# バックグラウンドで起動する場合
docker compose up -d --build
```

開発サーバーは `http://localhost:3000` で起動します。

### 本番環境のビルド・実行

```bash
# 本番環境用のビルド・実行
docker compose -f docker-compose.prod.yml up --build

# バックグラウンドで起動する場合
docker compose -f docker-compose.prod.yml up -d --build
```

### 開発時の便利コマンド

```bash
# コンテナ内でコマンドを実行
docker compose exec rolex-chart npm run build
docker compose exec rolex-chart npm run lint

# ログの確認
docker compose logs -f rolex-chart

# コンテナの停止
docker compose down
```

---

## 📊 テストデータ仕様

```json
{
  "model": "Submariner",
  "reference": "126610LN",
  "prices": {
    "2024-07-01": 1550000,
    "2024-07-08": 1570000,
    "2024-07-15": 1560000,
    "2024-07-22": 1580000,
    "2024-07-29": 1600000
  }
}
```

※ 各modelにはタグを設定できるようにして、当該タグによるchart表示ができる設計を残して

---

## 🚀 フェーズ構成（予定）

| フェーズ  | 内容                                                |
| ----- | ------------------------------------------------- |
| フェーズ0 | モデル/型番選択UI、価格グラフのUIモック＋テストデータでの表示                 |
| フェーズ1 | 楽天APIとの接続（Keyword Search API or Item Ranking API） |
| フェーズ2 | データ更新・スケジューラー整備、価格推移の自動収集機構                       |
| フェーズ3 | 検索UIの改良（フリーワード、カテゴリ）、モデル追加                        |
| フェーズ4 | ユーザー登録・お気に入り登録、通知機能などの拡張                          |

---

## 📣 プレリリース後の検証項目

* どのモデル・型番がよく閲覧されるか（需要把握）
* 価格変動に対する反応（SNSシェア、リンク保存等）
* UIの分かりやすさ・改善点（簡易アンケート設置を想定）

---

## 📁 プロジェクト構造

```
rolex-chart/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── models/            # モデル関連ページ
│   │   └── page.tsx           # ホームページ
│   ├── components/            # Reactコンポーネント
│   ├── data/                  # テストデータ
│   ├── types/                 # TypeScript型定義
│   └── utils/                 # ユーティリティ関数
├── Dockerfile                 # 開発環境用Dockerfile
├── Dockerfile.prod           # 本番環境用Dockerfile
├── docker-compose.yml        # 開発環境用docker-compose
├── docker-compose.prod.yml   # 本番環境用docker-compose
└── README.md
```
