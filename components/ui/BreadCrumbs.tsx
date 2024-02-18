"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FC } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";

type Props = {
  // path: string;
};

const pathNames = new Map<string, string>([
  ["terms", "利用規約"],
  ["timetable", "タイムテーブル"],
  ["certifications", "当選証明書"],
  ["settings", "設定"],
  ["raffle", "抽選"],
  ["events", "企画説明"],
  ["news", "お知らせ"],
]);

export const BreadCrumbs: FC<Props> = () => {
  const path = usePathname();

  const paths = path.split("/").filter((p) => p !== "");
  const hrefs = paths.map((_, i) => paths.slice(0, i + 1).join("/"));

  return paths.length !== 0 ? (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem key={0}>
        <BreadcrumbLink href="/" color={`${"GrayText"}`}>
          ホーム
        </BreadcrumbLink>
      </BreadcrumbItem>
      {paths.map((p, i) => {
        const name = pathNames.get(p);

        return (
          name && (
            <BreadcrumbItem key={i + 1}>
              <BreadcrumbLink
                href={`/${hrefs[i]}`}
                color={`${paths.length === i && "GrayText"}`}
              >
                {name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )
        );
      })}
    </Breadcrumb>
  ) : (
    <></>
  );
};
