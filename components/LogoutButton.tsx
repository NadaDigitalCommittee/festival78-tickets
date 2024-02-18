"use client";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export const LogoutButton = () => {
  const [isFetching, setIsFetching] = useState(false);
  return (
    <Button
      onClick={async () => {
        setIsFetching(true);
        await fetch("/api/logout", { method: "GET" });
        setIsFetching(false);
        location.pathname = "/";
      }}
      className="w-full"
      isLoading={isFetching}
    >
      ログアウト(テスト用)
    </Button>
  );
};
