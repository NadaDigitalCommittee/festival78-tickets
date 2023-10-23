import { FC } from "react";
import { tv } from "tailwind-variants";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const base = tv({
  base: "flex justify-center items-center w-full h-full",
});

export const Center: FC<Props> = ({ children, className }) => {
  return (
    <div className={base({ className })} >
      {children}
    </div>
  );
};
