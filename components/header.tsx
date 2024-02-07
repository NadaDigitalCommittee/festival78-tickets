"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/layout.module.scss";

type Props = {};

export const Header: FC<Props> = () => {
  return (
    <header
      className={`mx-auto h-28 w-[1000px] px-3 py-2 font-zen_kaku_gothic_new shadow-md max-sm:w-full ${styles.bg}`}
    >
      <div className="flex items-center">
        <Link href={"/"}>
          <Image src={"/img/logo1.png"} alt="ロゴ" height={100} width={100} />
        </Link>
        <Link href={"/"} className="grow">
          <p>第78回灘校文化祭 </p>
          <p className="text-xl font-bold">抽選券システム</p>
        </Link>
        {/* <Link href="/login"><p className="ml-3 text-xl">ログイン</p></Link> */}
      </div>
    </header>
  );
};
