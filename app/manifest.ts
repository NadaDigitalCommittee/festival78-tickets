import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#f69435",
    background_color: "#f69435",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "灘校文化祭 抽選システム",
    short_name: "灘校文化祭 抽選システム",
    serviceworker: {
      src: "/manifest/sw.js",
    },
    icons: [
      {
        src: "/img/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/img/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/img/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/img/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
