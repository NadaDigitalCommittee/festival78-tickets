"use client";
import { useFetch } from "@/lib/client/hooks";

import { Button, useToast } from "@chakra-ui/react";
import { FC } from "react";

type Props = {};
export const Notification: FC<Props> = () => {
  const toast = useToast();
  const { onFetch } = useFetch("/api/subscribe", "POST");
  const checkIsWebPushSupported = async () => {
    if (!("Notification" in window)) {
      return false;
    }
    if (!("serviceWorker" in navigator)) {
      return false;
    }
    try {
      const sw = await navigator.serviceWorker.register("/manifest/sw.js");
      if (!("pushManager" in sw)) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
  const subscribe = async () => {
    if (!(await checkIsWebPushSupported())) {
      return toast({
        title: `プッシュ通知が非対応です。`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    const validPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (window.Notification.permission === "default") {
      await window.Notification.requestPermission();
    }
    if (window.Notification.permission === "denied") {
      return toast({
        title: `通知がブロックされています。`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    const registeration =
      await navigator.serviceWorker.register("/manifest/sw.js");
    const subscription = await registeration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: validPublicKey,
    });

    const json = subscription.toJSON();
    if (json.endpoint === null || json.keys === null) {
      return toast({
        title: `プッシュ通知が非対応です。`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    try {
      const data = await onFetch(json);
      const response = data.response;
      if (!response?.ok) {
        return toast({
          title: `プッシュ通知の購読に失敗しました。`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      if (response?.status === 201) {
        return toast({
          title: `プッシュ通知を購読しました。`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      return toast({
        title: `プッシュ通知の購読に失敗しました。`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Button onClick={subscribe} className=" mt-12 w-full">
      プッシュ通知を許可する
    </Button>
  );
};
