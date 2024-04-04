import { LogoutButton } from "@/components/LogoutButton";
import { BreadCrumbs } from "@/components/ui/BreadCrumbs";
import { ja } from "@/lib/lang/ja";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="mx-auto w-[1000px]">
        <div className="mx-2 my-2">
          <BreadCrumbs />
        </div>
      </div>
      <div className="mx-auto min-h-[90vh] max-w-[800px] px-6 py-6 max-md:w-[360px] md:w-[60vw]">
        {children}
        <Link href="/">
          <div className="mt-6 w-full rounded-lg border border-theme p-2">
            <p className="w-full text-center">{ja.word.return_to_top}</p>
          </div>
        </Link>
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
}
