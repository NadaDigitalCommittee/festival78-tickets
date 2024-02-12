import { BreadCrumbs } from "@/components/ui/BreadCrumbs";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-zen_kaku_gothic_new">
      <div className="mx-auto w-[1000px]">
        <div className="mx-2 my-2">
          <BreadCrumbs />
        </div>
      </div>
      <div className="mx-auto min-h-[90vh] max-w-[800px] px-9 py-6 max-md:w-[360px] md:w-[60vw]">
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
