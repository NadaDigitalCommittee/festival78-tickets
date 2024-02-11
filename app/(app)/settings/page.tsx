"use client";

import { useUser } from "@/lib/client/hooks";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useRef, useState } from "react";

export default function Page() {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailNotificationRef = useRef<HTMLInputElement>(null);
  const [isServing, setIsServing] = useState(false);
  const toast = useToast();
  const submit = async () => {
    setIsServing(true);
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        notification: !emailNotificationRef.current?.checked,
      }),
    });
    setIsServing(false);
    onClose();
    const data = await res.json();
    if (!data.ok) {
      toast({
        title: "エラーが発生しました",
        description:
          res.status === 409
            ? "メールアドレスが重複しています。"
            : "サーバーエラーが発生しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  //console.log(emailNotificationRef.current?.value)
  return (
    <main>
      <form>
        <p>メールアドレス</p>
        <input
          type="email"
          ref={emailRef}
          className="w-full rounded-lg border"
        />
        <p className="text-right text-sm text-blue-500">
          <Link href={"/terms"}>利用規約はこちら</Link>
        </p>
        <input type="checkbox" ref={emailNotificationRef} className="my-4" />
        <label>メールアドレスの当選通知を希望しない</label>
        <Button colorScheme="orange" onClick={onOpen} width={"100%"}>
          変更
        </Button>
      </form>

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
          <AlertDialogContent width={"80%"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              登録情報の変更
            </AlertDialogHeader>

            <AlertDialogBody flex={"flex"}>
              以下の内容に変更します。変更は取り消せません。
              <div className="h-6" />
              <p>
                {emailRef.current?.value !== "" &&
                  `。メールアドレス:${emailRef.current?.value}`}
              </p>
              <p>{`${
                !emailNotificationRef.current?.checked
                  ? "・メール通知をする"
                  : "・メール通知をしない"
              }`}</p>
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
