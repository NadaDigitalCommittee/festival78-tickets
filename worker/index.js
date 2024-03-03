"use strict";

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
self.__WB_DISABLE_DEV_LOGS = true;
// listen to message event from window
self.addEventListener("push", (event) => {
  if (self.Notification === null || self.Notification.permission != "granted") {
    return;
  }
  const payload = event.data?.json() ?? null;
  self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: "/img/logo3_sm.png",
    tag: "tag",
  });
});

// HOW TO TEST THIS?
// Run this in your browser console:
//     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
// OR use next-pwa injected workbox object
//     window.workbox.messageSW({command: 'log', message: 'hello world'})
