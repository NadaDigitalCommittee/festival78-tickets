"use client";
import { useEvents, useFetch } from "@/lib/client/hooks";
import { FC, useEffect, useRef, useState } from "react";

import { ja } from "@/lib/lang/ja";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Skeleton,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
export const Form: FC = () => {
  const searchParams = useSearchParams();
  const eventId = parseInt(searchParams.get("eventId") ?? "0");
  const timeId = parseInt(searchParams.get("timeId") ?? "0");
  const { events } = useEvents();
  const [selectedEventId, setSelectedEventId] = useState<number>(0);
  const [selectedTimeId, setSelectedTimeId] = useState<number>(0);
  const [participants, setParticipants] = useState<number>(1);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const { onFetch, isFetching } = useFetch<{
    eventId?: number;
    timeId: number;
    participants: number;
  }>("/api/raffle", "POST");
  useEffect(() => {
    if (!events) {
      return;
    }
    const eventIdLength = events?.length ?? 0;
    if (eventId >= eventIdLength) {
      return;
    }
    const timeIdLength = events?.at(eventId)?.time.length ?? 0;
    if (timeId >= timeIdLength) {
      return;
    }
    if (eventIdLength > 0 && eventId) {
      setSelectedEventId(() => eventId);
    }
    if (timeIdLength > 0 && timeId) {
      setSelectedTimeId(() => timeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!events]);

  const requestRaffle = async () => {
    const { response, data } = await onFetch({
      eventId: events?.at(selectedEventId)?.id,
      timeId: selectedTimeId,
      participants: participants,
    });
    if (!data?.ok) {
      toast({
        title: `${ja.toast.error}`,
        description:
          response?.status === 409
            ? `${ja.raffle.error_already_raffled}`
            : data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: `${ja.toast.raffle_completed_short}`,
        description: `${ja.toast.raffle_completed_long}`,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="mt-2 w-full">
      <p className="my-3 text-xl font-bold">{ja.word.form}</p>
      <div className="flex flex-col gap-4">
        {!events ? (
          <>
            <Stack gap={6}>
              <Skeleton height="15px" />
              <Skeleton height="20px" />
              <Skeleton height="15px" />
              <Skeleton height="20px" />
              <Skeleton height="15px" />
              <Skeleton height="20px" />
            </Stack>
          </>
        ) : (
          <>
            <p>{ja.word.event_name}</p>
            <select
              className="w-full rounded-lg border"
              onChange={(e) => {
                setSelectedEventId(e.target.selectedIndex);
                setSelectedTimeId(0);
              }}
              defaultValue={eventId}
            >
              {events?.map((e, i) => (
                <option key={i} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <p>{ja.word.period}</p>
            <select
              className="w-full rounded-lg border"
              onChange={(e) => {
                setSelectedTimeId(e.target.selectedIndex);
              }}
              defaultValue={timeId}
            >
              {events?.[selectedEventId]?.time
                .map((t) => t.toPeriodString())
                .map((s, i) => (
                  <option key={i} value={i}>
                    {s}
                  </option>
                ))}
            </select>
            <p>{ja.word.participants_number}</p>
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

              <div className="">
                <p className="border-b-[1px] border-theme font-bold text-xl mb-2">注意事項</p>
                <p>・同じ時間帯の企画を同時に登録することはできません。</p>
                <p>・朝の企画どうするんだっけ</p>
                <p>・抽選は開始時刻の約30分前に行われます。お早めに登録をお願いします。</p>
                <p>・企画名が「ロボット制作」、「鉄研シミュレーター」の時には、参加者数は<strong>実際に参加する人数</strong>のことを指します。</p>
                <p>・その他の企画では、参加者数とは会場に入る人数のことを指します。</p>
              </div>

            <Button onClick={onOpen} colorScheme="orange">
              {ja.word.raffle}
            </Button>
          </>
        )}
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
              {ja.raffle.raffle_information}
            </AlertDialogHeader>

            <AlertDialogBody flex={"flex"}>
              {ja.raffle.raffle_attention}
              <div className="h-6" />
              <p>
                ・{ja.word.event}:{events?.at(selectedEventId)?.name}
              </p>
              <p>
                ・{ja.word.period}:
                {events
                  ?.at(selectedEventId)
                  ?.time.at(selectedTimeId)
                  ?.toPeriodString()}
              </p>
              <p>
                ・{ja.word.participants_number}:{participants}人
              </p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {ja.word.cancel}
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
                {ja.word.confirmation}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};
