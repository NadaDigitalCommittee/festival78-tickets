"use client";
import { ja } from "@/lib/lang/ja";
import { FC } from "react";

type Props = {};

export const Footer: FC<Props> = () => {
  return (
    <footer className="">
      <div className="flex h-28 flex-col">
        <div className="grow"></div>
        <p className="mb-12 text-center text-sm text-gray-500">
          {ja.footer.copyright}
        </p>
      </div>
    </footer>
  );
};
