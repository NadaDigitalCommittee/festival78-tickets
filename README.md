# 文化祭抽選券システム

## やることリスト

- [x] 連打対策
- [ ] 同じ時間帯の抽選を登録できないようにする
- [ ] PWA 化
- [ ] 通知
- [ ] タイムテーブル＆企画説明
- [ ] 抽選がすでに終わっている場合は登録できないようにする
- [ ] 参加者数の定義

## Dockerのビルド

```sh
docker build --build-arg MICROCMS_SERVICE_DOMAIN="" --build-arg MICROCMS_API_KEY="" --build-arg NEXT_PUBLIC_ADOBE_FONT_ID="" --build-arg NEXT_PUBLIC_VAPID_PUBLIC_KEY="" --build-arg VAPID_PRIVATE_KEY="" -t festival78-tickets .
```

## api

初めにクッキーから token を取得する。

JWT でデコードすることより uuid を確認してからデータベースにあることを確認する。

JWT で署名が確認できない、もしくは token がない場合は uuid は無視する。

### /login

ユーザーが存在することを確認したのち、クッキーに token を保存。

| parameter | type   |
| --------- | ------ |
| email     | string |

返り値

| parameter | type    |
| --------- | ------- |
| ok        | boolean |

ステータスコード

| コード | エラー内容                           |
| ------ | ------------------------------------ |
| 400    | email の内容が不正、または存在しない |

### /register

secret は登録用リンクから来たことを確認するために必要。

email を用いてユーザーを作成し、クッキーに token を保存。

uuid が指定された場合は、email を更新。

| parameter | type    |
| --------- | ------- |
| email     | string  |
| secret    | string  |
| uuid      | string? |

返り値

| parameter | type    |
| --------- | ------- |
| ok        | boolean |

ステータスコード

| コード | エラー内容         |
| ------ | ------------------ |
| 400    | email の内容が不正 |
| 401    | secret が不正      |
| 409    | email が衝突       |

### user

ユーザーの情報を取得する。

パラメータなし

返り値

| parameter | type    |
| --------- | ------- |
| ok        | boolean |
| email     | string  |

ステータスコード

| コード | エラー内容           |
| ------ | -------------------- |
| 401    | token が不正         |
| 404    | ユーザーが存在しない |

### /raffle

抽選を登録する。

| parameter    | type   |
| ------------ | ------ |
| eventId      | number |
| timeId       | number |
| participants | number |

返り値

| parameter | type    |
| --------- | ------- |
| ok        | boolean |

ステータスコード

| コード | エラー内容                   |
| ------ | ---------------------------- |
| 401    | token が不正                 |
| 400    | パラメータが不正             |
| 409    | すでに同じ抽選を登録している |
