"use client";
import { BreadCrumbs } from "@/components/ui/BreadCrumbs";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <main className=" sm:mx-2 sm:w-full md:w-[400px]">
      <BreadCrumbs path={pathname} />
      {children}
    </main>
  );
}
