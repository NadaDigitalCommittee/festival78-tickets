import { FC } from "react";
import styles from "@/styles/logo.module.scss";
import Image from "next/image";

type Props = {
  show: boolean;
};
export const LogoAnim: FC<Props> = ({ show }) => {
  return (
    <div className={`h-[100px] w-[100px] bg-black ${!show && "hidden"}`}>
      <Image
        src="/img/LOGO.svg"
        alt="logo"
        width={100}
        height={100}
        className={`${styles.logo}`}
        color="red"
      />
    </div>
  );
};
