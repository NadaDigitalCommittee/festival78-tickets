# 抽選券システムのドキュメント

## はじめに

昨年度までの灘校文化祭ではクラブ・サークルの人気企画に対し、文化委員会が一つの教室で整理券を配り抽選を行っていた。今年度からはオンラインサイトによるシステムを導入し、抽選業務を完全に自動化するのが抽選券システムである。

基本的な技術構成について、以下に示す。

Next.jsのApp Routerでフロントエンドおよびバックエンドを一つのプロジェクトで管理する。また、Prismaを使ってPostgresに接続し、データベースを管理する。

一部UIライブラリとしてChakra UIを採用している。

## 外部連携

- MicroCMS
- Google Gmail API

## [デプロイ方法]("/deploy")

## 環境変数
- `SECRET` : 登録リンクにアクセスする
- `JWTSECRET` : セッションの暗号化に伴うJWTの暗号化に使う文字列
- `ADMIN_SECRET` : 管理者用のパスワード
- `CLUB_SECRET` : クラブ用のパスワード

- `POSTGRES_PRISMA_URL` : PrismaのPostgres接続用URL
- `POSTGRES_URL_NON_POOLING` : PrismaのPostgres接続用URL
- `MICROCMS_SERVICE_DOMAIN` : MicroCMSのサービスドメイン
- `MICROCMS_API_KEY` : MicroCMSのAPIキー
- `NEXT_PUBLIC_ADOBE_FONT_ID` : Adobe FontsのフォントID

- `GOOGLE_USER` : Gmailの送信元メールアドレス
- `GOOGLE_CLIENT_ID` : GmailのOAuthクライアントID
- `GOOGLE_CLIENT_SECRET` : GmailのOAuthクライアントシークレット
- `GOOGLE_REFRESH_TOKEN` : GmailのOAuthリフレッシュトークン

- `HOST` : サイトのホスト名
- `DISCORD_WEBHOOK_URL` : デバッグ用のDiscordのWebhook URL

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` : Web PushのVAPID公開鍵
- `VAPID_PRIVATE_KEY` : Web PushのVAPID秘密鍵

## データベーススキーマ

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native"]
}

datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}

model User {
  uuid         String   @id @default(uuid())
  email        String   @unique
  notification Boolean  @default(true)
  raffle       Raffle[]
  pushNotification PushNotification[]
}

model Raffle {
  uuid         String @id @default(uuid())
  eventId      Int
  timeId       Int
  userId       String
  participants Int
  result       Result @default(PROCESSING)
  user         User   @relation(fields: [userId], references: [uuid])

  @@unique([eventId, timeId, userId], name: "unique_raffle")
}

model PushNotification{
  uuid String @id @default(uuid())
  userId String
  endpoint String
  p256dh String
  auth String
  user User @relation(fields: [userId], references: [uuid])
}

enum Result {
  WIN
  LOSE
  PROCESSING
}
```

## 抽選仕様

### 当選ID

当選IDは、イベント名、時間帯、当日の日付ごとに一意のIDを持つ。具体的にはこれらの文字列をハッシュ化することで生成される。


## 各フォルダーの説明

### app

next.jsのapp routerが入っている。

#### (admin)

管理者用ページ。

##### (admin)/admin?secret={ADMIN_SECRET}

管理者用ページ。サーバーの管理や技術的な操作を行うことのできる人物がいないときにこのページにアクセスしてもらう。

##### (admin)/club?secret={CLUB_SECRET}

クラブ用ページ。クラブの代表者が抽選IDを確認するために使う一覧ページ。

#### (auth)

認証ページ。

##### (auth)/login

ログインページ。メールアドレスを入力し、届く確認メールからログインする。

##### (auth)/register?secret={SECRET}

登録ページ。

- 注意事項を読む。
- 利用規約を読む。
- メールアドレスを入力し、登録ボタンを押す。
- 認証メールが届く。

このページは当日のパンフレットおよびポスターからしかアクセスできない。(secretが必要)

#### (app)

アプリ本体。セッション処理についてはmiddlewareを参照。

##### (app)/certifications

当選証明書を一覧で表示する。

`/certifications?eventId={eventId}&timeId={timeId}`とすれば、対応する抽選IDの当選証明書を一番に表示する。

##### (app)/events

イベント一覧を表示する。

`/events?eventId={eventId}&timeId={timeId}`とすれば、対応する抽選IDのイベントを一番に表示する。

##### (app)/news

お知らせ一覧を表示する。`components/NewsList`を参照。

##### (app)/news?id={id}

お知らせの詳細を表示する。idがMicroCMSの記事IDに対応する場合と、抽選データのUUIDに対応する場合がある。

