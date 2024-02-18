import { FC, ReactNode } from "react";

export const HelpCard: FC<{
  icon: ReactNode;
  title: string;
  content: string;
}> = ({ icon, title, content }) => {
  return (
    <div className="my-3 flex w-full px-6">
      <span className="mb-auto h-10 w-10 text-4xl">{icon}</span>
      <div className="ml-6 flex flex-col">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};
