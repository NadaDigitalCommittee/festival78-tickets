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
import { ja } from "@/lib/lang/ja";
type Props = {};

export const RaffleList: FC<Props> = () => {
  const { raffles } = useRaffles();
  const { events } = useEvents();

  return (
    <div className="mt-6">
      <p className="my-3 text-xl font-bold">{ja.raffle.raffle_state}</p>
      {raffles?.length === 0 && <p>{ja.raffle.no_raffle_history}</p>}
      <Accordion>
        <>
          {!!raffles || (
            <Stack>
              <Skeleton height="45px" />
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
              <p>{`${ja.word.participants_number}:${data.participants}`}</p>
              <p>
                {data.result === "PROCESSING"
                  ? `${ja.word.raffling}`
                  : data.result === "WIN"
                    ? `${ja.word.win}`
                    : `${ja.word.lose}`}
              </p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
