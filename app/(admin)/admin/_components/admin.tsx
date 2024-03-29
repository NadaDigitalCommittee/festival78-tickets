"use client";
import { useEvents, useFetch } from "@/lib/client/hooks";
import { ja } from "@/lib/lang/ja";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FC, MutableRefObject, ReactNode, useRef, useState } from "react";
type Props = {};

export const AdminForm: FC<Props> = () => {
  const { events } = useEvents();
  const {
    isOpen: isOpenReset,
    onOpen: onOpenReset,
    onClose: onCloseReset,
  } = useDisclosure();
  const {
    isOpen: isOpenRaffle,
    onOpen: onOpenRaffle,
    onClose: onCloseRaffle,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [selectedTimeId, setSelectedTimeId] = useState(0);
  const toast = useToast();
  const { onFetch, isFetching } = useFetch<{
    eventId?: number;
    timeId: number;
    capacity?: number;
  }>("/api/exec", "POST");

  const requestRaffle = async () => {
    if (isFetching) {
      return toast({
        title: `${ja.toast.raffling}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    const { data } = await onFetch({
      eventId: events?.at(selectedEventId)?.id,
      timeId: selectedTimeId,
      capacity: events?.at(selectedEventId)?.capacity,
    });
    if (data.ok) {
      toast({
        title: `${ja.toast.raffle_executed}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: `${ja.toast.raffle_not_executed}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const requestReset = async () => {
    onCloseReset();
    await fetch("/api/reset", {});
    toast({
      title: `${ja.toast.reset_raffle}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div className="mt-2 grid gap-3 sm:grid-cols-1 md:grid-cols-2">
      <div>
        <p>・{ja.word.event_name}</p>
        <select
          className="border border-black"
          onChange={(e) => {
            setSelectedEventId(e.target.selectedIndex);
          }}
        >
          {events?.map((e, i) => (
            <option key={i} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <p>・{ja.word.period}</p>
        <select
          className="border border-black"
          onChange={(e) => {
            setSelectedTimeId(e.target.selectedIndex);
          }}
        >
          {events
            ?.at(selectedEventId)
            ?.time.map((t) => t.toPeriodString())
            .map((s, i) => (
              <option value={s} key={i}>
                {s}
              </option>
            ))}
        </select>
        <p>・これらのボタンを押すときは注意してください。</p>
        <div className="mt-6 flex flex-col gap-12">
          <Button onClick={onOpenRaffle} isLoading={isFetching}>
            抽選ボタン
          </Button>
          <Button onClick={onOpenReset} colorScheme="red">
            リセットボタン
          </Button>
        </div>
        <Alert
          isOpen={isOpenReset}
          onClose={onCloseReset}
          cancelRef={cancelRef}
          onClick={requestReset}
          body={
            <div className="text-4xl text-red-500">
              <p>抽選情報をリセットします。</p>
              <p>これは1日目と2日目の間に実行するものです。</p>
              <p>本当に実行しますか？</p>
            </div>
          }
        />
        <Alert
          isOpen={isOpenRaffle}
          onClose={onCloseRaffle}
          cancelRef={cancelRef}
          onClick={requestRaffle}
          body={
            <div className="text-xl">
              <p>抽選を実行します。</p>
              <p>本当に実行しますか？</p>
              <p>
                ・時間帯:
                {events
                  ?.at(selectedEventId)
                  ?.time?.at(selectedTimeId)
                  ?.toPeriodString()}
              </p>
              <p>・企画名:{events?.at(selectedEventId)?.name}</p>
            </div>
          }
        />
      </div>
    </div>
  );
};
const Alert: FC<{
  isOpen: boolean;
  onClose: () => void;
  cancelRef: MutableRefObject<HTMLButtonElement | null>;
  onClick: () => void;
  body: ReactNode;
}> = ({ isOpen, onClick, onClose, cancelRef, body }) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent width={"80%"}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            危険な操作
          </AlertDialogHeader>

          <AlertDialogBody flex={"flex"}>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClick();
              }}
              ml={3}
            >
              確定
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
