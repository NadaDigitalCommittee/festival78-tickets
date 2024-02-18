"use client";
import { useFetch } from "@/lib/client/hooks";
import { Button, useToast } from "@chakra-ui/react";
import { FC, ReactNode, useRef, useState } from "react";
import { RiQuestionnaireFill } from "react-icons/ri";
import { z } from "zod";

import Link from "next/link";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { MdEmail } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { HelpCard } from "../_components/HelpCard";

const Login = () => {
  const ref = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { onFetch, isFetching } = useFetch<{
    email: string;
  }>("/api/login", "POST");
  const [isPosted, setIsPosted] = useState(false);
  const action = async (email: string) => {
    const scheme = z.string().email();
    const result = scheme.safeParse(ref.current?.value);
    if (!result.success) {
      return toast({
        title: "メールアドレスの形式が正しくありません。",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    const { data } = await onFetch({ email: email });
    if (data.ok === true) {
      return setIsPosted(true);
    } else {
      toast({
        title: "メールアドレスが正しくありません。",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="flex w-screen flex-col items-center">
      {isPosted ? (
        <>
          <IconContext.Provider value={{ size: "10em" }}>
            <SiMinutemailer />
          </IconContext.Provider>
          <p>認証メールを送信しました。</p>
          <p>メールボックスを確認してください。</p>
          <div className="px-2">
            <p className="mt-12">認証メールが見当たらない場合</p>
            <div className="mt-2 flex w-full flex-col items-center rounded-lg border lg:w-2/3 ">
              <HelpCard
                icon={<MdEmail />}
                title="迷惑メール"
                content="迷惑メールフォルダに入っている可能性があります。「festival.ticket@nada-sc.jp」からのメールの受信を許可してください。"
              />

              <HelpCard
                icon={<BsExclamationTriangleFill />}
                title="アドレスの打ち間違い"
                content="入力して頂いたメールアドレスが正しくない可能性があります。その場合最初からやり直してください。"
              />
            </div>
            <Link href="/">
              <div className="mt-12 w-full rounded-lg border border-theme p-2">
                <p className="w-full text-center">ホームへ戻る</p>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-12 flex flex-col items-center rounded bg-white px-2 sm:w-[400px] md:w-[550px] lg:w-2/3">
          <p className="mt-12 text-3xl">文化祭抽選券システム</p>
          <p className="mb-6 mt-2 text-2xl">ログイン</p>
          <p className="my-2 text-base">
            メールアドレス<span className="text-red-600">*</span>
          </p>
          <input
            className="h-8 w-[320px] rounded-lg border-2 border-gray-300"
            ref={ref}
            name="email"
            onChange={() => {}}
          ></input>
          <Button
            onClick={() => {
              action(ref.current?.value as string);
            }}
            className="my-4 h-12 w-[320px]"
            colorScheme="orange"
            isLoading={isFetching}
          >
            ログイン
          </Button>

          <div className="my-6 flex w-full flex-col items-center rounded-lg border lg:w-2/3 ">
            <LoginHelpCard
              icon={<RiQuestionnaireFill />}
              title="この画面が表示された場合"
              content={
                <div className="flex flex-col gap-3">
                  <p>①登録フォームでメールアドレスをすでに登録されている方</p>
                  <p>
                    セッションが切れている、もしくは別のブラウザ・端末でログインしている可能性があります。もう一度登録したメールアドレスでログインしてください。
                  </p>
                  <br />
                  <p>②メールアドレスを登録されていない場合</p>
                  <p>
                    パンフレット内に登録リンク用のQRコードがありますので、そちらから登録をお願いします。
                  </p>
                  <br />
                  <p>③何度もこの画面が表示される方</p>
                  <p>
                    ブラウザの設定でCookieがオフになっている、もしくはシークレットモードで閲覧されている可能性があります。それらをオフにしたうえで再度お試しください。
                  </p>
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

const LoginHelpCard: FC<{
  icon: ReactNode;
  title: string;
  content: ReactNode;
}> = ({ icon, title, content }) => {
  return (
    <div className="my-3 flex w-full px-6">
      <span className="mb-auto h-10 w-10 text-4xl">{icon}</span>
      <div className="ml-6 flex flex-col">
        <p className="text-base font-bold">{title}</p>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

export default Login;
