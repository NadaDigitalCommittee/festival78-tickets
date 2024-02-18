"use client";

import { Terms } from "@/components/Terms/Terms";
import { useFetch } from "@/lib/client/hooks";
import {
  Box,
  Button,
  Progress,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepStatus,
  Stepper,
  Text,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { MdEmail, MdMobileFriendly, MdOutlineArticle } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { HelpCard } from "../_components/HelpCard";

const steps: {
  title: string;
}[] = [
  {
    title: "注意事項",
  },
  {
    title: "利用規約",
  },
  {
    title: "メールアドレス入力",
  },
];

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const secret = searchParams.secret as string;
  const ref = useRef<HTMLInputElement>(null);
  const termsAgreeCheckBoxRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const nextStep = () => {
    window.scrollTo(0, 0);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const prevStep = () => {
    window.scrollTo(0, 0);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const { onFetch } = useFetch<{
    email: string;
    secret: string;
  }>("/api/register", "POST");
  const action = async () => {
    const email = ref.current?.value;
    if (!email) {
      toast({
        title: "メールアドレスを入力してください。",
        status: "error",
        duration: 9000,
      });
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
      nextStep();
    }
  };

  return (
    <div className="flex w-screen flex-col items-center px-3">
      <p className="mt-12 text-3xl">文化祭抽選券システム</p>
      <p className="mb-6 mt-2 text-2xl">登録用フォーム</p>
      <Box className="relative w-full">
        <Stepper size="sm" index={activeStep} gap="0" colorScheme="orange">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator bg="white">
                <StepStatus complete={<StepIcon />} />
                <StepStatus incomplete={<StepNumber />} />
                <StepStatus active={<StepNumber />} />
              </StepIndicator>
            </Step>
          ))}
        </Stepper>
        {activeStep < steps.length && (
          <Text mb={8}>
            {activeStep + 1}.{steps.at(activeStep)?.title}
          </Text>
        )}
        <Progress
          value={(activeStep / (steps.length - 1)) * 100}
          position="absolute"
          height="3px"
          width="full"
          top="10px"
          zIndex={-1}
          colorScheme="orange"
        />
      </Box>

      <div className="flex flex-col items-center rounded bg-white px-2 sm:w-[400px] md:w-[550px] lg:w-2/3">
        {(() => {
          switch (activeStep) {
            case 0:
              return (
                <>
                  <p className="">以下の注意事項をお読みください。</p>

                  <div className="my-6 flex w-full flex-col items-center rounded-lg border lg:w-2/3 ">
                    <HelpCard
                      icon={<MdEmail />}
                      title="メールへ抽選結果が送信"
                      content="入力されたメールアドレスに対して、こちらから当選結果を表示するメールを送信いたします。"
                    />

                    <HelpCard
                      icon={<MdOutlineArticle />}
                      title="スタッフの確認"
                      content="メールの内容は抽選結果の証明書となります。現地でスタッフによる確認が行われる可能性があることをご了承ください。"
                    />

                    <HelpCard
                      icon={<MdMobileFriendly />}
                      title="サイト内で確認"
                      content="抽選券サイト内で抽選結果を確認することも可能です。"
                    />

                    <HelpCard
                      icon={<BsExclamationTriangleFill />}
                      title="当日のパニック"
                      content="システムで障害が起きると、やむを得ず紙抽選となる場合がございます。当日アナウンスをしたりスタッフが説明いたしますので、ご近くのスタッフまでお気軽にお問い合わせください。"
                    />
                  </div>
                  <Button
                    onClick={nextStep}
                    className="h-12 w-[280px]"
                    colorScheme="orange"
                  >
                    次へ
                  </Button>
                </>
              );
            case 1:
              return (
                <>
                  <p>以下の利用規約をお読みください。</p>
                  <div className="my-6 h-screen overflow-y-scroll border border-dotted border-theme px-4">
                    <Terms />
                  </div>
                  <div className="mb-6 flex w-[280px] items-center">
                    <input
                      type="checkbox"
                      className="mr-1 h-4 w-4"
                      ref={termsAgreeCheckBoxRef}
                    />
                    <label>利用規約に同意する</label>
                  </div>
                  <Button
                    onClick={() => {
                      if (!termsAgreeCheckBoxRef.current?.checked) {
                        return toast({
                          title: "利用規約に同意されないと登録できません。",
                          status: "error",
                          duration: 3000,
                        });
                      }
                      nextStep();
                    }}
                    className="mb-6 h-12 w-[280px]"
                    colorScheme="orange"
                  >
                    次へ
                  </Button>
                  <Button
                    onClick={prevStep}
                    className="h-12 w-[280px]"
                    variant={"outline"}
                  >
                    戻る
                  </Button>
                </>
              );
            case 2:
              return (
                <>
                  <p className="my-3 text-base">
                    登録用メールアドレスを入力してください。
                  </p>
                  <input
                    className="h-10 w-[280px] rounded-lg border-2 border-gray-300"
                    ref={ref}
                  ></input>
                  <Button
                    onClick={action}
                    className="my-4 mb-6 h-12 w-[280px]"
                    colorScheme="orange"
                    isLoading={isLoading}
                  >
                    次へ
                  </Button>
                  <Button
                    onClick={prevStep}
                    className="mb-6 h-12 w-[280px]"
                    variant={"outline"}
                  >
                    戻る
                  </Button>
                  <Button
                    onClick={() => {
                      location.pathname = "/login";
                    }}
                    className="mt-6 h-12 w-[280px]"
                    variant={"outline"}
                  >
                    すでに登録されている方はこちら
                  </Button>
                </>
              );
            case 3:
              return (
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
              );
          }
        })()}
      </div>
    </div>
  );
}
