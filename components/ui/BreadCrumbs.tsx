"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FC } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";

type Props = {
  path: string;
};

export const BreadCrumbs: FC<Props> = ({ path }) => {
  const paths = path.split("/").filter((p) => p !== "");
  const hrefs = paths.map((p, i) => paths.slice(0, i + 1).join("/"));

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem key={0}>
        <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
      </BreadcrumbItem>
      {paths.map((p, i) => (
        <BreadcrumbItem key={i + 1}>
          <BreadcrumbLink href={hrefs[i]}>{p}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
