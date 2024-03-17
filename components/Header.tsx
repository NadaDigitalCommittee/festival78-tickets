"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/layout.module.scss";
import { ja } from "@/lib/lang/ja";

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
          <p>{ja.meta.fest}</p>
          <p className="text-xl font-bold">{ja.word.tickets_system}</p>
        </Link>
        {/* <Link href="/login"><p className="ml-3 text-xl">ログイン</p></Link>   */}
      </div>
    </header>
  );
};
