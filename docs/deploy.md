# デプロイのやり方

## 1.サーバーを用いる

gh actionsでdockerのbuildを自動化しているので、それを用いる。

以下サーバーのシェル

dockerのインストール

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

dockerログイン

```sh
docker login -u {ユーザー名} -p {PAT} ghcr.io
```

nginxブランチをクローンする

今回はnginxのコンテナを使ってdocker composeする。

```sh
git clone -b nginx https://github.com/NadaDigitalCommittee/festival78-tickets.git
```

```
mv festival78-tickets/* ./
mkdir ssl
touch ssl/server.crt ssl/server.key
touch .env
```

nanoエディタなどでssl情報と.envファイルを書き込む。

今回はcloudflareのssl証明書を利用する。(SSL/TLS->Origin Server)

```sh
#書き込み
```

`docker compose up`
