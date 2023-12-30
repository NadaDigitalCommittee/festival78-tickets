import { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";

type Props = {
  children?: ReactNode;
  className?: string;
};

const base = tv({
  base: "flex justify-center items-center w-full",
});

export const Center: FC<Props> = ({ children, className }) => {
  return <div className={base({ className })}>{children}</div>;
};
