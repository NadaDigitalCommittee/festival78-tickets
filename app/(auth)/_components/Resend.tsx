"use client";
import { FC } from "react";
import { useFetch } from "@/lib/client/hooks";
import { Button, useToast } from "@chakra-ui/react";
import { ja } from "@/lib/lang/ja";
import { MdEmail } from "react-icons/md";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { HelpCard } from "./HelpCard";

type Props = {
  email: string;
};

export const Resend: FC<Props> = ({ email }) => {
  const { onFetch, isFetching } = useFetch<{
    email: string;
  }>("/api/login", "POST");
  const toast = useToast();
  return (
    <>
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
      <Button
        onClick={async () => {
          await onFetch({ email: email });
          toast({
            title: `${ja.toast.resended}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }}
        isLoading={isFetching}
        colorScheme="orange"
        className="w-full "
      >
        {ja.word.resend}
      </Button>
      <Button
        onClick={() => {
          location.reload();
        }}
        colorScheme="orange"
        className="my-6 w-full"
        variant={"outline"}
      >
        {ja.word.return_to_top}
      </Button>
    </>
  );
};
