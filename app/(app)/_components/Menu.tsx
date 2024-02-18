import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons/lib";
import styles from "@/styles/layout.module.scss";

type Props = {
  icon: IconType;
  title: string;
  path: string;
};

export const Menu: FC<Props> = ({ icon, title, path }) => {
  return (
    <Link href={path}>
      <div
        className={`flex h-36 flex-col items-center rounded-3xl pt-6 shadow-md   ${styles.bg}`}
      >
        <p>{title}</p>
        <div className="my-auto h-20">{icon({ size: "4em" })}</div>
      </div>
    </Link>
  );
};
