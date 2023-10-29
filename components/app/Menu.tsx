"use client";
import { FC } from "react";
import { State } from "../App";
import { Center } from "../ui/Center";
import { Button } from "../ui/Button";
import { IoSettingsOutline } from "react-icons/io5";
import { MdHome, MdOutlineArticle } from "react-icons/md";
import { tv } from "tailwind-variants/dist/index.js";

type Props = {
  state: State;
  setState: (state: State) => void;
  className?: string;
};

export const Menu: FC<Props> = ({ state, setState, className }) => {
  return (
    <div className={tv({ base: "flex mx-3 h-24 gap-3" })(className)}>
      <Center className="basis-1/3 transition-all duration-500">
        <Button
          onClick={() => {
            setState("Ticket");
          }}
        >
          <p>チケット</p>
          <Center className="text-3xl">
            <MdOutlineArticle />
          </Center>
        </Button>
      </Center>
      <Center className="basis-1/3 transition-all duration-500 ease-in-out">
        <Button
          onClick={() => {
            setState("Home");
          }}
        >
          <p>ホーム</p>
          <Center className="text-3xl">
            <MdHome />
          </Center>
        </Button>
      </Center>
      <Center className="basis-1/3 transition-all duration-500 ease-in-out">
        <Button
          onClick={() => {
            setState("Settings");
          }}
        >
          <p>設定</p>
          <Center className="text-3xl">
            <IoSettingsOutline />
          </Center>
        </Button>
      </Center>
    </div>
  );
};
