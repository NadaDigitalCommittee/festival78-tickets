"use client";

import { FC } from "react";

type Props = {};

export const Footer: FC<Props> = () => {
  return (
    <footer className="">
      <div className="flex h-28 flex-col">
        <div className="grow"></div>
        <p className="mb-12 text-center text-sm text-gray-500">
          ©Nada Digital Committee All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
