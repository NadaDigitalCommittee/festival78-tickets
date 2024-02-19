"use client";
import { useEvents, useRaffles } from "@/lib/client/hooks";
import { FC } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
type Props = {};

export const RaffleList: FC<Props> = () => {
  const { raffles } = useRaffles();
  const { events } = useEvents();

  return (
    <div className="mt-6">
      <p className="my-3 text-xl font-bold">抽選状況</p>
      {raffles?.length === 0 && <p>抽選はありません</p>}
      <Accordion>
        <>
          {raffles || (
            <Stack>
              <Skeleton height="15px" />
              <Skeleton height="15px" />
              <Skeleton height="15px" />
            </Stack>
          )}
        </>
        {raffles?.map((data) => (
          <AccordionItem key={data.eventId}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {`${events?.at(data.eventId)?.name}(${events?.at(data.eventId)?.time?.[data.timeId]?.toPeriodString()})`}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              {data.result === "PROCESSING"
                ? "抽選中"
                : data.result === "WIN"
                  ? "当選"
                  : "落選"}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
