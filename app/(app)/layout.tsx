import { BreadCrumbs } from "@/components/ui/BreadCrumbs";
import Link from "next/link";
import styles from "@/styles/layout.module.scss";
import { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-zen_kaku_gothic_new sm:mx-2 sm:w-full md:w-[400px]">
      <div className="">
        <div className="mx-2 my-2">
          <BreadCrumbs />
        </div>
      </div>
      <div className="min-h-[90vh] w-full px-9 py-6">
        {children}
        <Link href="/">
          <div className="mt-12 w-full rounded-lg border border-theme p-2">
            <p className="w-full text-center">ホームへ戻る</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
