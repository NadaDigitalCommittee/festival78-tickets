"use client";
import { FC } from "react";
import { State } from "../App";
import { IconType } from "react-icons";
import { Center } from "../ui/Center";
import { Card } from "../ui/Card";

type Props = {
  state: State;
  setState: (state: State) => void;
  className?: string;
  icon: IconType;
};

export const Menu: FC<Props> = ({ state, setState, icon }) => {
  return (
    <div
      onClick={() => {
        setState(state);
      }}
    >
      <Card className="h-[200px]">
        <Center className="flex-col">
          {icon({})}
          <div className="text-xs">{state}</div>
        </Center>
      </Card>
    </div>
  );
};
