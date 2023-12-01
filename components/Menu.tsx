"use client";
import { FC } from "react";
import { IconType } from "react-icons";
import { Center } from "./ui/Center";
import { Card } from "./ui/Card";

type Props = {
  className?: string;
  icon: IconType;
};

export const Menu: FC<Props> = ({ icon }) => {
  return (
    <div
      onClick={() => {
        //setState(state);
      }}
    >
      <Card className="h-[200px]">
        <Center className="flex-col">
          {icon({})}
          <div className="text-xs">{}</div>
        </Center>
      </Card>
    </div>
  );
};
