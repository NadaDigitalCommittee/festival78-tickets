"use client";

import { useFetch } from "@/lib/client/hooks";
import { Button, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { FC, ReactNode, useRef, useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { MdEmail, MdMobileFriendly, MdOutlineArticle } from "react-icons/md";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const secret = searchParams.secret as string;
  const ref = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { onFetch } = useFetch<{
    email: string;
    secret: string;
  }>("/api/register", "POST");
  const action = async () => {
    const email = ref.current?.value;
    if (!email) {
      return;
    }
    setIsLoading(true);
    const { response } = await onFetch({ email: email, secret: secret });
    setIsLoading(false);
    console.log(response);
    if (response?.status === 409) {
      toast({
        title: "既に同じアドレスが登録されています。",
        status: "error",
        duration: 9000,
      });
      return;
    }
    if (response?.status === 400) {
      toast({
        title: "メールアドレスが不正です。",
        status: "error",
        duration: 9000,
      });
      return;
    }
    if (response?.status === 401) {
      toast({
        title:
          "この登録リンクは利用できません。文化委員スタッフにお問い合わせください。",
        status: "error",
        duration: 9000,
      });
      return;
    }
    if (response?.status === 201) {
      return (location.pathname = "/");
    }
  };

  return (
    <div className="flex w-screen flex-col items-center ">
      <div className="mt-12 flex flex-col items-center rounded bg-white px-2 sm:w-[400px] md:w-[550px] lg:w-2/3">
        <p className="mt-12 text-3xl">文化祭抽選券システム</p>
        <p className="mb-6 mt-2 text-2xl">登録用フォーム</p>

        <p className="">以下の注意事項および利用規約をお読みください。</p>

        <div className="my-6 flex w-full flex-col items-center rounded-lg border lg:w-2/3 ">
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
          利用規約は
          <Link href="/terms" className="text-blue-500 underline">
            こちら
          </Link>
        </p>

        <div className="flex flex-col items-center justify-center">
          <p className="my-3 text-base">メールアドレス*</p>
          <input
            className="h-10 w-[280px] rounded-lg border-2 border-gray-300"
            ref={ref}
          ></input>
          <Button
            onClick={action}
            className="my-4 h-12"
            colorScheme="orange"
            isLoading={isLoading}
          >
            次へ
          </Button>
          <Button
            onClick={() => {
              location.pathname = "/login";
            }}
            className="mb-6 h-12"
            variant={"outline"}
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
    <div className="my-3 flex w-full px-6">
      <span className="mb-auto h-10 w-10 text-4xl">{icon}</span>
      <div className="ml-6 flex flex-col">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};
