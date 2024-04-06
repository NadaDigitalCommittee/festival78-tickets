"use client";
import { useEvents, useFetch } from "@/lib/client/hooks";
import { FC, useEffect, useMemo, useRef, useState } from "react";

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
        title: `エラー`,
        description:
          response?.status === 409
            ? `すでに抽選済みか、時間が被っているか、すでに抽選時刻を終了しているため登録できません。`
            : data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      mutate("/result");
      toast({
        title: `抽選完了`,
        description: `抽選登録が完了しました`,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="mt-2 w-full">
      <p className="my-3 text-xl font-bold">抽選フォーム</p>
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
            <p>企画名</p>
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
            <p>時間帯</p>
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
            <p>参加者数</p>
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
                ・抽選は開始時刻の<b>約30分前</b>に行われます。お早めに登録をお願いします。
              </p>
              <p>
                ・ただし、「トイブロックで灘校机椅子を制作体験」の企画に関しては<b>開始45分前</b>に登録を済ませてください。
              </p>
            </div>

            <Button onClick={onOpen} colorScheme="orange">
              抽選
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
              抽選情報
            </AlertDialogHeader>

            <AlertDialogBody flex={"flex"}>
              以下の内容で抽選登録をします。<b>後から取り消すことはできません。</b>
              <div className="h-6" />
              <p>・企画名:{event?.name}</p>
              <p>・時間帯:{time?.toPeriodString()}</p>
              <p>・参加者数:{participants}人</p>
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
