//@/components/RaffleNews.tsx,@/components/Terms.tsxは集約化していない。 

export const ja = {
  meta: {
    title: "第78回灘校文化祭 ODYSSEY",
    title_template: "%s | 第78回灘校文化祭 ODYSSEY",
    description:
      "2024年5月2日・5月3日に開催される第77回灘校文化祭「ODYSSEY」の公式ウェブサイトです。",
    site_name: "第78回灘校文化祭 ODYSSEY",
    fest_concept: "ODYSSEY",
    fest: "第78回灘校文化祭",
  },
  word: {
    id: "ID",
    list_id: "各種ID",
    event: "企画",
    event_name: "企画名",
    event_discription: "企画説明",
    period: "時間帯",
    capacity: "定員",
    raffleId: "当選ID",
    raffle: "抽選",
    raffling: "抽選中",
    error: "エラー",
    success: "成功",
    form: "抽選フォーム",
    participants_number: "参加者数",
    cancel: "キャンセル",
    confirmation: "確定",
    win: "当選",
    lose: "落選",
    email: "メールアドレス",
    update: "変更",
    return_to_top: "トップへ戻る",
    menu: "メニュー",
    timetable: "タイムテーブル",
    raffle_certification: "当選証明書",
    setting: "設定",
    spam: "迷惑メール",
    resend: "再送信",
    login: "ログイン",
    tickets_system: "抽選券システム",
    registeration_form: "登録フォーム",
    next: "次へ",
    back: "戻る",
    register: "登録",
    top: "トップ",
    terms: "利用規約",
    news: "お知らせ",
    description: "詳細",
    verification_url: "認証URL",
  },
  raffle: {
    no_win_history: "当選履歴がありません。",
    no_raffle_history: "抽選履歴がありません。",
    error_already_raffled: "すでに抽選済みです。",
    raffle_information: "抽選情報",
    raffle_attention:
      "以下の内容で抽選登録をします。後から取り消すことはできません。",
    raffle_state: "抽選状況",
  },
  news: {
    no_news: "記事が見つかりませんでした。",
    guide_for_past_news: "過去のお知らせはこちら",
    win:{
        title: "「{0}」への当選のお知らせ",
        compact_body:"「{0}」(時間帯:{1})の企画に当選しましたので、お知らせします。",
        body: "へ当選しましたので、当選番号をお知らせします。",        
        body2: "詳しくはこちら",
    },
    lose:{
        title: "「{0}」への落選のお知らせ",
        compact_body:"厳正なる抽選の結果、誠に残念ながら「{0}」(時間帯:{1})の企画に落選となりました。",
        body: "申し訳ございません。「{0}」(時間帯:「{1}」)の企画に落選してしまいました。",
    }
  },
  auth: {
    //ログイン
    submit_verification_email: "認証メールを送信しました。",
    confirm_email: "メールボックスを確認してください。",
    //再送信
    case_resend: "認証メールが見当たらない場合",
    allow_email:
      "迷惑メールフォルダに入っている可能性があります。「festival.ticket@nada-sc.jp」からのメールの受信を許可してください。",
    mistyped_email: "アドレスの打ち間違い",
    mistyped_email_long:
      "入力して頂いたメールアドレスが正しくない可能性があります。その場合最初からやり直してください。",
    case1: "それでも解決しない場合",
    case2: "この画面が表示された場合",
    solution_1: "①登録フォームでメールアドレスをすでに登録されている方",
    solution_1_long:
      "セッションが切れている、もしくは別のブラウザ・端末でログインしている可能性があります。もう一度登録したメールアドレスでログインしてください。",
    solution_2: "②メールアドレスを登録されていない場合",
    solution_2_long:
      "パンフレット内に登録リンク用のQRコードがありますので、そちらから登録をお願いします。",
    solution_3: "③何度もこの画面が表示される方",
    solution_3_long:
      "ブラウザの設定でCookieがオフになっている、もしくはシークレットモードで閲覧されている可能性があります。それらをオフにしたうえで再度お試しください。",
    //登録
    read_notes: "以下の注意事項をお読みください。",
    note_1: "メールへ抽選結果を送信",
    note_1_long:
      "入力されたメールアドレスに対して、こちらから当選結果を表示するメールを送信いたします。",
    note_2: "スタッフの確認",
    note_2_long:
      "メールの内容は抽選結果の証明書となります。現地でスタッフによる確認が行われる可能性があることをご了承ください。",
    note_3: "サイト内で確認",
    note_3_long: "抽選券サイト内で抽選結果を確認することも可能です。",
    note_4: "当日のパニック",
    note_4_long:
      "システムで障害が起きると、やむを得ず紙抽選となる場合がございます。当日アナウンスをしたりスタッフが説明いたしますので、ご近くのスタッフまでお気軽にお問い合わせください。",
    read_terms: "以下の利用規約をお読みください。",
    agree_terms: "利用規約に同意する",
    fill_email: "登録用メールアドレスを入力してください。",
    guide_for_login: "ログインはこちら",
  },
  settings: {
    guide_for_terms: "利用規約はこちら",
    not_want_email_winning_notification: "メールアドレスの当選通知を希望しない",
    update_information_short: "登録情報の変更",
    update_information_long: "以下の内容に変更します。変更は取り消せません。",
    notification_ok: "メール通知を受け取る",
    notification_ng: "メール通知を受け取らない",
  },
  toast: {
    raffle_completed_long: "抽選登録が完了しました",
    raffle_completed_short: "抽選完了",
    raffling: "抽選中",
    raffle_executed: "抽選が実行されました。",
    raffle_not_executed: "抽選が実行されませんでした。",
    reset_raffle: "抽選情報をリセットしました。",
    error: "エラー",
    error_occured: "エラーが発生しました。",
    error_email_already_exists: "このメールアドレスはすでに登録されています。",
    error_server: "サーバーエラーが発生しました。",
    error_email_scheme: "メールアドレスの形式が正しくありません。",
    error_email_not_correct: "メールアドレスが正しくありません。",
    error_email_not_filled: "メールアドレスが入力されていません。",
    error_url_not_available: "この登録リンクは利用できません。",
    ask_for_staff: "文化委員スタッフにお問い合わせください。",
    error_terms_not_checked: "利用規約に同意されないと登録できません。",
    resended: "再送信しました。",
  },
  email: {
    name: "灘校文化祭 抽選券システム",
    verfication: {
      title: "【第78回灘校文化祭】本人確認メール",
      title_head: "本人確認のお知らせ",
      body: `この度は、灘校文化祭 抽選券システムをご利用頂き有難うございます。
            当システムは本人確認のためにメールアドレスでの認証を行っております。
            以下の認証URLにて、本人確認を完了させてください。
            また不明な点がございましたら、近くの文化委員までお問い合わせください。`,
    },
    footer: {
      text1:
        "このメールは灘校生徒会によって作成されたものであり、送信者の同意を得た上で送信しています。",
      text2: "メールの配信停止をする場合は下記のURLに従ってください。",
    },
  },
  footer: {
    copyright: "©Nada Digital Committee All Rights Reserved.",
  },
};

