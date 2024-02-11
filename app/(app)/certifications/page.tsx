import { getEvents } from "@/lib/cms";
import { number, z } from "zod";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { prisma } from "@/lib/db";
import { validateSession } from "@/lib/session";
import { Certification } from "@/components/Certification";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const events = await getEvents();
  const eventId = Number(searchParams["eventId"]);
  const timeId = Number(searchParams["timeId"]);
  const session = await validateSession();

  const raffles = await prisma.raffle.findMany({
    where: {
      userId: session?.uuid,
      result: {
        in: ["WIN"],
      },
    },
  });

  const index = raffles.findIndex(
    (r) => r.eventId === eventId && r.timeId === timeId
  );

  const certificationData: {
    raffleId?: string;
    eventName?: string;
    eventTime?: string;
  }[] = [];
  const a = raffles.map((r) =>
    (async () => {
      const event = events.find((e) => e.id === r.eventId);
      const time = event?.time?.[r.timeId];
      const raffleId = (
        await prisma.event.findUnique({
          where: {
            unique_event: {
              eventId: r.eventId,
              timeId: r.timeId,
            },
          },
        })
      )?.raffleId;
      certificationData.push({
        raffleId: raffleId,
        eventName: event?.name,
        eventTime: time?.toPeriodString(),
      });
    })()
  );
  await Promise.all(a);

  return (
    <main>
      <Accordion defaultIndex={index}>
        {certificationData.map((data) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {data.eventName}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              <Certification
                raffleId={data.raffleId}
                eventName={data.eventName}
                eventTime={data.eventTime}
              />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}