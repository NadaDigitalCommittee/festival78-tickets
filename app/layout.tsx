import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import TypekitLoader from "@/components/TypeKit";
import { SWR } from "@/lib/client/Swr";
import { SessionProvider } from "@/lib/client/context";

import { validateSession } from "@/lib/server/session";
import { Session } from "@/lib/types";
import "@/styles/globals.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Inter, Zen_Kaku_Gothic_New } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const zen_kaku_gothic_new = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-zen-kaku-gothic-new",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tickets.nada-sc.jp"),
  title: {
    default: "第78回灘校文化祭 ODYSSEY",
    template: "%s | 第78回灘校文化祭 ODYSSEY",
  },
  keywords: [
    "灘",
    "灘中学校",
    "灘高校",
    "灘校",
    "文化祭",
    "灘校文化祭",
    "ODYSSEY",
    "nada",
    "festival",
  ],
  description:
    "2024年5月2日・5月3日に開催される第78回灘校文化祭「ODYSSEY」の公式ウェブサイトです。",
  openGraph: {
    type: "website",
    title: "第78回灘校文化祭 ODYSSEY",
    description:
      "2024年5月2日・5月3日に開催される第78回灘校文化祭「ODYSSEY」の公式ウェブサイトです。",
    url: "https://tickets.nada-sc.jp",
    siteName: "第78回灘校文化祭 ODYSSEY",
    locale: "ja_JP",
    images: [
      {
        url: "https://fest.nada-sc.jp/img/ogp.webp",
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
        url: "https://fest.nada-sc.jp/img/ogp.webp",
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
    <html
      lang="ja"
      className={`${[inter, zen_kaku_gothic_new]
        .map((f) => f.variable)
        .join(" ")} bg-neutral-[150]`}
    >
      <body className="font-zen_kaku_gothic_new">
        <Provider session={session}>
          <Header />
          <p className="text-center text-2xl text-red-500">{`${session?.admin ? "管理者権限でログインしているため不必要にいじらないこと。" : ""}`}</p>
          <div className={`min-h-[100lvh] overflow-x-clip`}>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GAID} />
            {children}
          </div>
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
        <ChakraProvider>{children}</ChakraProvider>
        <TypekitLoader />
      </SessionProvider>
    </SWR>
  );
};
