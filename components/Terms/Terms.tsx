import { FC } from "react";
import styles from "@/styles/news.module.scss";

export const Terms: FC = () => (
  <div className={`${styles.content} [&>] py-12`}>
    <h1>第78回灘校文化祭抽選券システム利用規約とプライバシーポリシー</h1>
    <h2>利用規約</h2>
    <p>
      灘校生徒会（以下、「生徒会」）が提供する第78回灘校文化祭抽選券システム（以下、「本システム」）を利用する方は、この利用規約（以下、「本規約」）をよくお読みの上、同意される場合のみ利用することができます。
    </p>

    <h3>第1条（適用）</h3>
    <p>
      本規約は、本システムを利用する方（以下、「利用者」）と生徒会との間の本システムに関わる一切の関係に適用されます。
    </p>

    <h3>第2条（同意事項）</h3>
    <p>利用者は、本システムを利用するにあたり、以下の内容に同意します。</p>
    <ul>
      <li>
        生徒会は、本システムにおける連絡の目的で利用者のメールアドレスを利用する。
      </li>
    </ul>

    <h3>第3条（禁止事項）</h3>
    <p>
      利用者は、本システムを利用するにあたり、以下の行為を行わないことを約束します。
    </p>
    <ul>
      <li>本システムのURLを生徒会の許可なく不特定多数に送信する行為</li>
      <li>
        複数のメールアドレスを用いて、同一の人物であるにも関わらず、ひとつの企画に同時に登録する行為
      </li>
      <li>本システムの利用に関連して、法令または公序良俗に違反する行為</li>
      <li>
        本システムの利用に関連して、生徒会または第三者の権利を侵害する行為
      </li>
      <li>本システムの利用に関連して、生徒会または第三者に損害を与える行為</li>
      <li>その他、生徒会が不適切と判断する行為</li>
    </ul>

    <h3>第4条（免責事項）</h3>
    <p>
      本システムが利用者の登録に対し抽選を行い不当な結果を出す等のトラブルを引き起こしても、生徒会は責任を負いません。
    </p>
    <p>ただし、以下の場合については処置を行います。</p>
    <ul>
      <li>本システムがダウンした場合</li>
      <li>
        本システムに抽選の継続が困難であると判断される程重大なバグが発見された場合
      </li>
    </ul>
    <p>処置の詳細については、利用規約第5条を参照してください。</p>

    <h3>第5条（注意事項）</h3>
    <p>本システムが以下のトラブルを引き起こした時、</p>
    <ul>
      <li>本システムがダウンした場合</li>
      <li>
        本システムに抽選の継続が困難であると判断される程重大なバグが発見された場合
      </li>
    </ul>
    <p>生徒会は抽選券システムを停止し、「整理券」に変更します。</p>
    <p>ただし、「整理券」のシステムとは以下のことを指します。</p>
    <ul>
      <li>
        「抽選企画」は本来抽選券システムでの抽選が必要であったはずの企画のことを指します。
      </li>
      <li>
        抽選企画の各会場の責任者が定員分の数字が書かれた紙を用意し、来場した方に渡します。
      </li>
      <li>紙を受け取った方のみが、抽選企画に参加することができます。</li>
    </ul>

    <p>
      参加者数の定義は、企画によって異なる場合があります。詳細は各企画のページにて確認してください。
    </p>

    <h3>第6条（利用規約の変更）</h3>
    <p>
      生徒会は、利用者に事前に通知することなく、本規約を変更することができるものとします。
    </p>

    <h3>第7条（お問い合わせ窓口）</h3>
    <p>
      本規約に関するお問い合わせは、「festival.ticket@nada-sc.jp」までお願いいたします。
    </p>

    <h2>プライバシーポリシー</h2>
    <p>
      生徒会は、利用者の個人情報を適切に取り扱うために、以下のプライバシーポリシー（以下、「本ポリシー」）を定めます。
    </p>

    <h3>第1条（個人情報）</h3>
    <p>
      本ポリシーにおいて、「個人情報」とは、利用者のメールアドレスを指します。
    </p>

    <h3>第2条（個人情報を収集・利用する目的）</h3>
    <p>生徒会は、利用者から収集した個人情報を以下の目的で利用します。</p>
    <ul>
      <li>抽選結果を通知するため</li>
      <li>文化祭に関するお知らせを送信するため</li>
    </ul>

    <h3>第3条（個人情報の第三者提供）</h3>
    <p>
      生徒会は以下の場合を除いて、利用者の同意のない限り個人情報を第三者に提供することはありません。{" "}
    </p>
    <ul>
      <li>法令に基づく場合</li>
      <li>生徒会が運営するサービスの提供のために必要な場合</li>
    </ul>

    <h3>第4条（個人情報の開示）</h3>
    <p>
      生徒会は、利用者から個人情報の開示を求められた場合、利用者が本人であることを確認した上で、個人情報を開示します。
    </p>

    <h3>第5条（個人情報の訂正および削除）</h3>
    <p>
      生徒会は、利用者から個人情報の訂正および削除の求めがあった場合、利用者が本人であることを確認した上で、個人情報の訂正および削除を行います。
    </p>

    <h3>第6条（お問い合わせ窓口）</h3>
    <p>
      本ポリシーに関するお問い合わせは、「festival.ticket@nada-sc.jp」までお願いいたします。
    </p>
  </div>
);
