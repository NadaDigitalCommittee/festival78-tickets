# 抽選券システムのドキュメント

## はじめに

昨年度までの灘校文化祭ではクラブ・サークルの人気企画に対し、文化委員会が一つの教室で整理券を配り抽選を行っていた。今年度からはオンラインサイトによるシステムを導入し、抽選業務を完全に自動化するのが抽選券システムである。

## 外部連携

- MicroCMS
- Google Gmail API

## 環境変数
- `SECRET` : セッションの暗号化に使う文字列
- `JWTSECRET` : JWTの暗号化に使う文字列
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

## 各フォルダーの説明

### app

next.jsのapp routerが入っている。

#### (admin)

管理者用ページ。

##### (admin)/admin

管理者用ページ。サーバーの管理や技術的な操作を行うことのできる人物がいないときにこのページにアクセスしてもらう。
