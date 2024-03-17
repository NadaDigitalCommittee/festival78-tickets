"use client";
import { FC } from "react";
import { useFetch } from "@/lib/client/hooks";
import { Button, useToast } from "@chakra-ui/react";
import { ja } from "@/lib/lang/ja";

type Props = {
  email: string;
};

export const Resend: FC<Props> = ({ email }) => {
  const { onFetch, isFetching } = useFetch<{
    email: string;
  }>("/api/login", "POST");
  const toast = useToast();
  return (
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
  );
};
