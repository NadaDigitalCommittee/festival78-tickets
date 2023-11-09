"use client";
import { Button } from "@/components/ui/Button";
import { apiBase } from "@/lib/constants";
import { FC, ReactNode, useRef, useState } from "react";
import { RiQuestionnaireFill } from "react-icons/ri";
import { z } from "zod";

const Login = () => {
  const [errMessage, setErrMessage] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const action = async (email: string) => {
    const scheme = z.string().email();

    if (ref.current?.value === "") {
      return setErrMessage("");
    }
    const result = scheme.safeParse(ref.current?.value);
    if (!result.success) {
      return setErrMessage("メールアドレスが不正です。");
    }
    const res = await fetch(`${apiBase}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    });
    const json = await res.json();
    if (json.ok === true) {
      location.pathname = "/";
    } else {
      alert("メールアドレスが正しくありません。");
    }
  };
  return (
    <div className="flex flex-col items-center w-screen h-screen ">
      <div className="flex flex-col items-center sm:w-[400px] md:w-[550px] lg:w-2/3 bg-white rounded mt-12 px-2">
        <p className="text-3xl mt-12">文化祭抽選券システム</p>
        <p className="mb-6 mt-2 text-2xl">ログイン</p>
        <p className="my-2 text-base">メールアドレス*</p>
        <p className="text-red-500">{errMessage}</p>
        <input
          className="h-8 border-2 w-[320px] border-gray-300 rounded-lg"
          ref={ref}
          name="email"
          onChange={() => {}}
        ></input>
        <Button
          onClick={() => {
            action(ref.current?.value as string);
          }}
          className="h-12 my-4 w-[320px]"
        >
          ログイン
        </Button>

        <div className="w-full flex flex-col items-center lg:w-2/3 my-6 rounded-lg border ">
          <LoginHelpCard
            icon={<RiQuestionnaireFill />}
            title="この画面が表示された場合"
            content={
              <div className="gap-3 flex flex-col">
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
    </div>
  );
};

const LoginHelpCard: FC<{
  icon: ReactNode;
  title: string;
  content: ReactNode;
}> = ({ icon, title, content }) => {
  return (
    <div className="flex px-6 w-full my-3">
      <span className=" text-4xl w-10 h-10 mb-auto">{icon}</span>
      <div className="flex flex-col ml-6">
        <p className="text-base font-bold">{title}</p>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

export default Login;
