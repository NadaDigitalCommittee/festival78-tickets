"use client";
import { useFetch } from "@/lib/client/hooks";
import { Button, useToast } from "@chakra-ui/react";
import { FC, ReactNode, useRef, useState } from "react";
import { RiQuestionnaireFill } from "react-icons/ri";
import { z } from "zod";

import { ja } from "@/lib/lang/ja";
import { IconContext } from "react-icons/lib";
import { SiMinutemailer } from "react-icons/si";
import { Resend } from "../_components/Resend";
import { HelpCard } from "../_components/HelpCard";
import { MdEmail } from "react-icons/md";
import { BsExclamationTriangleFill } from "react-icons/bs";

const Login = () => {
  const ref = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { onFetch, isFetching } = useFetch<{
    email: string;
  }>("/api/login", "POST");
  const [isPosted, setIsPosted] = useState(false);
  const [email, setEmail] = useState(""); // 再度送信用
  const action = async (email: string) => {
    const scheme = z.string().email();
    const result = scheme.safeParse(ref.current?.value);
    if (!result.success) {
      return toast({
        title: `${ja.toast.error_email_scheme}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    const { data } = await onFetch({ email: email });
    if (data.ok === true) {
      setEmail(email);
      return setIsPosted(true);
    } else {
      toast({
        title: `${ja.toast.error_email_not_correct}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="flex flex-col items-center">
      {isPosted ? (
        <div className="mt-12 px-2">
          <div className="flex flex-col items-center">
          <IconContext.Provider value={{ size: "10em" }}>
            <SiMinutemailer />
          </IconContext.Provider>
          <p>{ja.auth.submit_verification_email}</p>
          <p>{ja.auth.confirm_email}</p></div>
          <p className="mt-12 font-bold">{ja.auth.case_resend}</p>
          <div className="mt-2 flex w-full flex-col items-center rounded-lg border lg:w-2/3 ">
            <HelpCard
              icon={<MdEmail />}
              title={ja.word.spam}
              content={ja.auth.allow_email}
            />

            <HelpCard
              icon={<BsExclamationTriangleFill />}
              title={ja.auth.mistyped_email}
              content={ja.auth.mistyped_email_long}
            />
          </div>
          <p className="mb-3 mt-6 font-bold">{ja.auth.case1}</p>
          <Resend email={email} />
          <Button
            onClick={() => {
              location.href = "/";
              location.reload();
            }}
            colorScheme="orange"
            className="my-6 w-full"
            variant={"outline"}
          >
            {ja.word.return_to_top}
          </Button>
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center rounded bg-white px-2">
          <p className="mt-12 text-3xl">{ja.word.tickets_system}</p>
          <p className="mb-6 mt-2 text-2xl">{ja.word.login}</p>
          <p className="my-2 text-base">
            {ja.word.email}
            <span className="text-red-600">*</span>
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
            {ja.word.login}
          </Button>

          <div className="my-6 flex w-full flex-col items-center rounded-lg border">
            <LoginHelpCard
              icon={<RiQuestionnaireFill />}
              title={ja.auth.case2}
              content={
                <div className="flex flex-col gap-3">
                  <p>{ja.auth.solution_1}</p>
                  <p>{ja.auth.solution_1_long}</p>
                  <br />
                  <p>{ja.auth.solution_2}</p>
                  <p>{ja.auth.solution_2_long}</p>
                  <br />
                  <p>{ja.auth.solution_3}</p>
                  <p>{ja.auth.solution_3_long}</p>
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
