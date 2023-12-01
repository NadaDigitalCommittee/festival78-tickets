"use client";
import { FC } from "react";
import Image from "next/image";

type Props = {};

export const Footer: FC<Props> = () => {
  return (
    <footer className="">
      <div className="justify-center items-center h-16">
        <p className="text-sm text-gray-500">
          <Image
            src={"/logo-mono-white.svg"}
            height={300}
            width={300}
            alt="logo"
          />
          2024年度 第78回灘校文化祭
        </p>
        <p className="text-sm text-gray-500">©Nada Digital Committee</p>
      </div>
    </footer>
  );
};
