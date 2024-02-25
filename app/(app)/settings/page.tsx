"use client";

import { useFetch, useUser } from "@/lib/client/hooks";
import { ja } from "@/lib/lang/ja";
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
import React, { useRef } from "react";

export default function Page() {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailNotificationRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { onFetch, isFetching } = useFetch<{
    email: string;
    notification: boolean;
  }>("/api/user", "PUT");
  const submit = async () => {
    const { response, data } = await onFetch({
      email: emailRef.current?.value as string,
      notification: !emailNotificationRef.current?.checked,
    });

    onClose();
    if (!data.ok) {
      toast({
        title: `${ja.toast.error_occured}`,
        description:
          response?.status === 409
            ? `${ja.toast.error_email_already_exists}`
            : `${ja.toast.error_server}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <main>
      <form>
        <p>{ja.word.email}</p>
        <input
          type="email"
          ref={emailRef}
          className="w-full rounded-lg border"
        />
        <p className="text-right text-sm text-blue-500">
          <Link href={"/terms"}>{ja.settings.guide_for_terms}</Link>
        </p>
        <input type="checkbox" ref={emailNotificationRef} className="my-4" />
        <label>{ja.settings.not_want_email_winning_notification}</label>
        <Button colorScheme="orange" onClick={onOpen} width={"100%"}>
          {ja.word.update}
        </Button>
      </form>

      <div className="mt-12">
        <Accordion>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {ja.word.list_id}
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
              {ja.settings.update_information_short}
            </AlertDialogHeader>

            <AlertDialogBody flex={"flex"}>
              {ja.settings.update_information_long}
              <div className="h-6" />
              <p>
                {emailRef.current?.value !== "" &&
                  `${ja.word.email}:${emailRef.current?.value}`}
              </p>
              <p>{`${
                !emailNotificationRef.current?.checked
                  ? `・${ja.settings.notification_ok}`
                  : `・${ja.settings.notification_ng}`
              }`}</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {ja.word.cancel}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  submit();
                }}
                ml={3}
                isLoading={isFetching}
              >
                {ja.word.confirmation}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </main>
  );
}
