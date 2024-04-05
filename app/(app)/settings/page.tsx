"use client";

import { useFetch, useUser } from "@/lib/client/hooks";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Skeleton,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";

export default function Page() {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailNotificationRef = useRef<HTMLSelectElement>(null);
  const toast = useToast();
  const { onFetch, isFetching } = useFetch<{
    email: string;
    notification: boolean;
  }>("/api/user", "PUT");
  const submit = async () => {
    const { response, data } = await onFetch({
      email: emailRef.current?.value as string,
      notification: emailNotificationRef.current?.value === "true",
    });

    onClose();
    if (!data.ok) {
      toast({
        title: `エラーが発生しました。`,
        description:
          response?.status === 409
            ? `このメールアドレスはすでに登録されています。`
            : `サーバーエラーが発生しました。`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      location.href = "/";
    }
  };

  return (
    <main>
      {!user ? (
        <Stack gap={6}>
          <Skeleton height="40px" />
          <Skeleton height="20px" />
          <Skeleton height="40px" />
        </Stack>
      ) : (
        <form>
          <p>メールアドレス</p>
          <input
            type="email"
            ref={emailRef}
            className="w-full rounded-lg border"
            defaultValue={user.email ?? ""}
          />
          <p className="text-right text-sm text-blue-500">
            <Link href={"/terms"}>利用規約はこちら</Link>
          </p>
          <p className="mt-4">メールアドレスの当選通知を希望しない</p>
          <select
            className="mb-4 w-full rounded-lg border"
            defaultValue={user.notification ? "true" : "false"}
            ref={emailNotificationRef}
          >
            <option value="true">メール通知を受け取る</option>
            <option value="false">メール通知を受け取らない</option>
          </select>
          <Button colorScheme="orange" onClick={onOpen} width={"100%"}>
            変更
          </Button>
        </form>
      )}

      <div className="mt-12">
        <Accordion>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  各種ID
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <p>{`UUID:${user?.uuid ?? ""}`}</p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent width={"90%"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              登録情報の変更
            </AlertDialogHeader>

            <AlertDialogBody flex={"flex"}>
              以下の内容に変更します。変更は取り消せません。
              <div className="h-6" />
              <p>
                {emailRef.current?.value !== "" &&
                  `・メールアドレス:${emailRef.current?.value}`}
              </p>
              <p>
                {emailNotificationRef.current?.value === "true"
                  ? `・メール通知を受け取る`
                  : `・メール通知を受け取らない`}
              </p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  submit();
                }}
                ml={3}
                isLoading={isFetching}
              >
                確定
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </main>
  );
}
