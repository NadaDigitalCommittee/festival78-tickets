"use client";
import { Button } from "@/components/ui/Button";
import { apiBase } from "@/lib/constants";
import Link from "next/link";
import { FC, ReactNode, useRef, useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { MdEmail, MdMobileFriendly, MdOutlineArticle } from "react-icons/md";
import { z } from "zod";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const secret = searchParams.secret as string;
  const ref = useRef<HTMLInputElement>(null);
  const action = async () => {
    const email = ref.current?.value;
    if (!email) {
      return;
    }
    const res = await fetch(`${apiBase}/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        secret: secret,
      }),
    });
    if (res.status === 409) {
      alert("既に同じアドレスが登録されています。");
      return;
    }
    if (res.status === 400) {
      alert("メールアドレスが不正です。");
      return;
    }
    if (res.status === 401) {
      alert(
        "この登録リンクは利用できません。文化祭スタッフにお問い合わせください。",
      );
      return;
    }
    if (res.status === 200) {
      return (location.pathname = "/");
    }
  };
  const [errMessage, setErrMessage] = useState("");

  return (
    <div className="flex flex-col items-center w-screen h-screen ">
      <div className="flex flex-col items-center sm:w-[400px] md:w-[550px] lg:w-2/3 bg-white rounded mt-12 px-2">
        <p className="text-3xl mt-12">文化祭抽選券システム</p>
        <p className="mb-6 mt-2 text-2xl">登録用フォーム</p>

        <p className="">以下の注意事項および利用規約をお読みください。</p>

        <div className="w-full flex flex-col items-center lg:w-2/3 my-6 rounded-lg border ">
          <RegisterHelpCard
            icon={<MdEmail />}
            title="メールへ抽選結果が送信"
            content="入力されたメールアドレスに対して、こちらから当選結果を表示するメールを送信いたします。"
          />

          <RegisterHelpCard
            icon={<MdOutlineArticle />}
            title="スタッフの確認"
            content="メールの内容は抽選結果の証明書となります。現地でスタッフによる確認が行われる可能性があることをご了承ください。"
          />

          <RegisterHelpCard
            icon={<MdMobileFriendly />}
            title="サイト内で確認"
            content="抽選券サイト内で抽選結果を確認することも可能です。"
          />

          <RegisterHelpCard
            icon={<BsExclamationTriangleFill />}
            title="当日のパニック"
            content="システムで障害が起きると、やむを得ず紙抽選となる場合がございます。当日アナウンスをしたりスタッフが説明いたしますので、ご近くのスタッフまでお気軽にお問い合わせください。"
          />
        </div>

        <p>
          利用規約
          <Link href="/terms">はこちら</Link>
        </p>

        <div className="flex flex-col items-center justify-center">
          <p className="text-base my-3">メールアドレス*</p>
          <p className="text-red-500 text-sm h-6">{errMessage}</p>
          <input
            className="w-[280px] h-10 border-2 border-gray-300 rounded-lg"
            ref={ref}
            onChange={() => {
              const scheme = z.string().email();

              if (ref.current?.value === "") {
                return setErrMessage("");
              }
              const result = scheme.safeParse(ref.current?.value);
              if (!result.success) {
                return setErrMessage("メールアドレスが不正です。");
              }
              return setErrMessage("");
            }}
          ></input>
          <Button onClick={action} className="h-12 my-4">
            次へ
          </Button>
          <Button
            onClick={() => {
              location.pathname = "/login";
            }}
            className="h-12 mb-6"
          >
            すでに登録されている方はこちら
          </Button>
        </div>
      </div>
    </div>
  );
}

const RegisterHelpCard: FC<{
  icon: ReactNode;
  title: string;
  content: string;
}> = ({ icon, title, content }) => {
  return (
    <div className="flex px-6 w-full my-3">
      <span className=" text-4xl w-10 h-10 mb-auto">{icon}</span>
      <div className="flex flex-col ml-6">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};
