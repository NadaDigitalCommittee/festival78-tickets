import { sendNotification, setVapidDetails } from "web-push";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};
setVapidDetails(
  "mailto:festival.tickets@nada-sc.jp",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
export async function sendPushNotification(
  subscription: {
    endpoint: string;
    p256dh: string;
    auth: string;
  },
  payload: {
    title: string;
    body: string;
  }
) {
  sendNotification(
    {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth,
      },
    },
    JSON.stringify(payload)
  );
}
