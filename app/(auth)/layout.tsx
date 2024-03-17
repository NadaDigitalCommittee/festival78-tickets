import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-[90vh] max-w-[800px] max-md:w-[360px] md:w-[60vw]">
      {children}
    </div>
  );
}
