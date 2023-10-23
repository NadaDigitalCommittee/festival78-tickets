import { FC } from "react";
import { tv } from "tailwind-variants";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const base = tv({
  base: "w-full h-full rounded-lg shadow-lg",
});

export const Card: FC<Props> = ({ children, className }) => {
  return <div className={base({ className })}>{children}</div>;
};
