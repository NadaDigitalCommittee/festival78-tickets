"use client";
import { useEvents, useFetch } from "@/lib/client/hooks";
import { FC, useRef, useState } from "react";

import {
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Button,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
export const Form: FC = () => {
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<number>(0);
  const [selectedTimeId, setSelectedTimeId] = useState<number>(0);
  const [participants, setParticipants] = useState<number>(1);
  const [raffleMessage, setRaffleMessage] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const { onFetch, isFetching } = useFetch<{
    eventId?: number;
    timeId: number;
    participants: number;
  }>("/api/raffle", "POST");

  const requestRaffle = async () => {
    const { response, data } = await onFetch({
      eventId: events?.at(selectedEvent)?.id,
      timeId: selectedTimeId,
      participants: participants,
    });
    setRaffleMessage(data?.message);
    if (!data?.ok) {
      toast({
        title: "エラー",
        description:
          response?.status === 409 ? "すでに抽選済みです" : data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "抽選完了",
        description: "抽選登録が完了しました",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="mt-2 w-full">
      <div className="flex flex-col gap-4">
        <p>企画名</p>
        <select
          className="w-full rounded-lg border"
          onChange={(e) => {
            setSelectedEvent(e.target.selectedIndex);
            setSelectedTimeId(0);
          }}
        >
          {events?.map((e, i) => (
            <option key={i} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <p>時間帯</p>
        <select
          className="w-full rounded-lg border"
          onChange={(e) => {
            setSelectedTimeId(e.target.selectedIndex);
          }}
        >
          {events?.[selectedEvent]?.time
            .map((t) => t.toPeriodString())
            .map((s, i) => (
              <option value={s} key={i}>
                {s}
              </option>
            ))}
        </select>
        <p>参加人数</p>
        <select
          className="w-full rounded-lg border"
          onChange={(e) => {
            setParticipants(e.target.selectedIndex + 1);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <Button onClick={onOpen} colorScheme="orange">
          抽選する
        </Button>
        <p>{raffleMessage}</p>
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
              登録情報
            </AlertDialogHeader>

            <AlertDialogBody flex={"flex"}>
              以下の内容で抽選登録をします。後から取り消すことはできません。
              <div className="h-6" />
              <p>・企画:{events?.at(selectedEvent)?.name}</p>
              <p>
                ・時間帯:
                {events
                  ?.at(selectedEvent)
                  ?.time.at(selectedTimeId)
                  ?.toPeriodString()}
              </p>
              <p>
                ・参加人数:
                {participants}人
              </p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  await requestRaffle();
                  onClose();
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
    </div>
  );
};