"use client";
import { FC } from "react";
import { State } from "../App";
import { Center } from "../ui/Center";
import { Button } from "../ui/Button";

type Props = {
  state: State;
  setState: (state: State) => void;
};

export const Menu: FC<Props> = ({ state, setState }) => {
  return (
    <div className="flex mx-3 h-24 gap-3">
      <Center
        className={
          state === "Ticket"
            ? "basis-3/5"
            : "basis-1/5" + " border transition-all duration-500 "
        }
      >
        <Button
          onClick={() => {
            setState("Ticket");
          }}
        >
          <p>チケット</p>
        </Button>
      </Center>
      <Center
        className={
          state === "Home"
            ? "basis-3/5"
            : "basis-1/5" + " border transition-all duration-500 ease-in-out"
        }
      >
        <Button
          onClick={() => {
            setState("Home");
          }}
        >
          <p>ホーム</p>
        </Button>
      </Center>
      <Center
        className={
          state === "Settings"
            ? "basis-3/5"
            : "basis-1/5" + " border transition-all duration-500 ease-in-out"
        }
      >
        <Button
          onClick={() => {
            setState("Settings");
          }}
        >
          <p>設定</p>
        </Button>
      </Center>
    </div>
  );
};
