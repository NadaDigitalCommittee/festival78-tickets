"use client";
import { useEvents, useFetch } from "@/lib/client/hooks";
import { FC, useEffect, useMemo, useRef, useState } from "react";

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
import { mutate } from "swr";
export const Form: FC = () => {
  const searchParams = useSearchParams();
  const eventId = useMemo(
    () => parseInt(searchParams.get("eventId") ?? "0"),
    [searchParams]
  );
  const timeId = useMemo(
    () => parseInt(searchParams.get("timeId") ?? "0"),
    [searchParams]
  );
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
    console.log("why", !!events);
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
      console.log("set", eventId);
      setSelectedEventId(eventId);
    }
    if (timeIdLength > 0 && timeId) {
      setSelectedTimeId(timeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!events]);

  const event = useMemo(
    () => events?.at(selectedEventId),
    [events, selectedEventId]
  );
  const time = useMemo(
    () => event?.time.at(selectedTimeId),
    [event, selectedTimeId]
  );

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
            ? `${ja.raffle.error_already_raffled_or_conflict}`
            : data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      mutate("/result");
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
        {!events || !time ? (
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
              value={selectedEventId}
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
              value={selectedTimeId}
            >
              {events?.[selectedEventId]?.time
                .map((t) => t.toPeriodString())
                .map((s, i) => (
                  <option key={i} value={i}>
                    {s}
                  </option>
                ))}
            </select>
            {events.at(selectedEventId)?.onlyParticipants ? (
              <p>
                ・参加者数は<b>実際に企画に参加される</b>
                方のみをカウントします。保護者が立ち見をされる場合は保護者を人数に含めないでください。
              </p>
            ) : (
              <p>
                ・参加者数は<b>会場に入場される方全員</b>をカウントします。
              </p>
            )}
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
            </select>

            <div className="">
              <p className="mb-2 border-b-[1px] border-theme text-xl font-bold">
                注意事項
              </p>
              <p>・同じ時間帯の企画を同時に登録することはできません。</p>
              <p>・開始時刻が9:25までの企画は抽選券不要です。</p>
              <p>
                ・抽選は開始時刻の約30分前に行われます。お早めに登録をお願いします。
              </p>
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
                ・{ja.word.event}:{event?.name}
              </p>
              <p>
                ・{ja.word.period}:{time?.toPeriodString()}
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
