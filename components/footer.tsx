"use client";
import { FC } from "react";
import Image from "next/image";

type Props = {};

export const Footer: FC<Props> = () => {
  return (
    <footer className="">
      <div className="h-16 items-center justify-center">
        <p className="text-sm text-gray-500">©Nada Digital Committee</p>
      </div>
    </footer>
  );
};
