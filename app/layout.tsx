import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import TypekitLoader from "@/components/TypeKit";
import { SWR } from "@/lib/client/Swr";
import { SessionProvider } from "@/lib/client/context";
import { ja } from "@/lib/lang/ja";
import { validateSession } from "@/lib/server/session";
import { Session } from "@/lib/types";
import "@/styles/globals.scss";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next";
import { Inter, Zen_Kaku_Gothic_New } from "next/font/google";
import { ReactNode } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const zen_kaku_gothic_new = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-zen-kaku-gothic-new",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tickets.nada-sc.jp"),
  title: {
    default: ja.meta.title,
    template: ja.meta.title_template,
  },
  keywords: [
    "灘",
    "灘中学校",
    "灘高校",
    "灘校",
    "文化祭",
    "灘校文化祭",
    ja.meta.fest_concept,
    "nada",
    "festival",
  ],
  description: ja.meta.description,
  openGraph: {
    type: "website",
    title: ja.meta.title,
    description:
      "2024年5月2日・5月3日に開催される第77回灘校文化祭「ODYSSEY」の公式ウェブサイトです。",
    url: "https://tickets.nada-sc.jp",
    siteName: ja.meta.site_name,
    locale: "ja_JP",
    images: [
      {
        url: "https://fest.nada-sc.jp/img/ogp.png",
        width: 2000,
        height: 1125,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nada_festival",
    images: [
      {
        url: "https://fest.nada-sc.jp/img/ogp.png",
        width: 2000,
        height: 1125,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "360",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await validateSession();
  return (
    <html lang="ja">
      <body
        className={`${[inter, zen_kaku_gothic_new]
          .map((f) => f.variable)
          .join(" ")} bg-neutral-[150]`}
      >
        <Provider session={session}>
          <Header />
          <p className="text-center text-2xl text-red-500">{`${session?.admin ? "管理者権限でログインしているため不必要にいじらないこと。" : ""}`}</p>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

const Provider = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session;
}) => {
  return (
    <SWR>
      <SessionProvider value={session}>
        <div
          className={`min-h-[100lvh] overflow-x-hidden font-zen_kaku_gothic_new`}
        >
          <ChakraProvider>{children}</ChakraProvider>
        </div>
        <TypekitLoader />
      </SessionProvider>
    </SWR>
  );
};
