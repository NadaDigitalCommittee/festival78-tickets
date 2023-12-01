"use client";
import { EVENTS } from "@/lib/constants";
import { useRaffles } from "@/lib/hooks";
import { Flex, Image, SkeletonText, Text } from "@chakra-ui/react";
import { Raffle } from "@prisma/client";
import { FC } from "react";
import Slider from "react-slick";

type Props = {
  raffle: Raffle;
};

const TicketCard: FC<Props> = ({ raffle }) => {
  const event = EVENTS[raffle.eventId];
  const time = event.time[raffle.timeId];
  return (
    <div className="w-full h-64 px-3 py-6">
      <div className=" shadow-lg h-full w-full pt-2">
        <div className="flex flex-col items-center">
          <Text className="">{event.name}</Text>
          <div className="h-10"></div>
          <Text className=" text-3xl font-bold">{time.toPeriodString()}</Text>
          <Text className="bottom-0 text-gray-500">ABC123</Text>
        </div>
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="ml-auto mt-auto"
        ></Image>
      </div>
    </div>
  );
};

export const TicketCardGallery: FC = () => {
  const { raffles } = useRaffles();
  return (
    <Slider dots={true} infinite={true} arrows={true} className="py-2">
      {/* @ts-ignore */}
      {!raffles ? (
        <div className="w-full h-64 px-3 py-6">
          <div className=" shadow-lg h-full w-full">
            <Flex>
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Flex>
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </div>
        </div>
      ) : (
        raffles
          .filter(
            (raffle) => !EVENTS[raffle.eventId].time[raffle.timeId].isTimeOut(),
          )
          .map((raffle, i) => <TicketCard raffle={raffle} key={i} />)
      )}
    </Slider>
  );
};
