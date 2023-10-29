import { FC } from "react";
import { tv } from "tailwind-variants";

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const base = tv({
  base: "w-full h-full rounded-lg border hover:bg-gray-100 transition duration-300 ease-in-out",
});

export const Button: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button className={base({ className })} onClick={onClick}>
      {children}
    </button>
  );
};
