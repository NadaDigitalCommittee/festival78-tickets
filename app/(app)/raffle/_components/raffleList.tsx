"use client";
import { useEvents, useRaffles } from "@/lib/client/hooks";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";

type Props = {};

export const RaffleList: FC<Props> = () => {
  const { raffles } = useRaffles();
  const { events } = useEvents();

  return (
    <div className="mt-6">
      <p className="my-3 text-xl font-bold">抽選状況</p>
      {raffles?.length === 0 && <p>当選履歴がありません。</p>}
      <Accordion>
        <>
          {!!raffles || (
            <Stack>
              <Skeleton height="45px" />
            </Stack>
          )}
        </>
        {raffles?.map((data) => (
          <AccordionItem key={data.eventId + data.timeId}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {`${events?.at(data.eventId)?.name}(${events?.at(data.eventId)?.time?.[data.timeId]?.toPeriodString()})`}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              <p>{`参加者数 : ${data.participants}`}</p>
              <p>
                {data.result === "PROCESSING"
                  ? `抽選中`
                  : data.result === "WIN"
                    ? `当選`
                    : `落選`}
              </p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
