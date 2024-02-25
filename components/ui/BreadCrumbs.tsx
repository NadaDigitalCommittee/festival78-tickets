"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FC } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
import { ja } from "@/lib/lang/ja";

type Props = {};

const pathNames = new Map<string, string>([
  ["terms", ja.word.terms],
  ["timetable", ja.word.timetable],
  ["certifications", ja.word.raffle_certification],
  ["settings", ja.word.setting],
  ["raffle", ja.word.raffle],
  ["events", ja.word.event_discription],
  ["news", ja.word.news],
]);

export const BreadCrumbs: FC<Props> = () => {
  const path = usePathname();

  const paths = path.split("/").filter((p) => p !== "");
  const hrefs = paths.map((_, i) => paths.slice(0, i + 1).join("/"));

  return paths.length !== 0 ? (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem key={0}>
        <BreadcrumbLink href="/" color={`${"GrayText"}`}>
          {ja.word.top}
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
