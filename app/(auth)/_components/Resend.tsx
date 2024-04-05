"use client";
import { useFetch } from "@/lib/client/hooks";
import { Button, useToast } from "@chakra-ui/react";
import { FC } from "react";

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
          title: `再送信しました。`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }}
      isLoading={isFetching}
      colorScheme="orange"
      className="w-full "
    >
      再送信
    </Button>
  );
};
