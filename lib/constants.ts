import { Time } from "./time";
import { Event } from "./types";

export const isDev = process.env.NODE_ENV === "development";

export const apiBase = isDev ? "/api" : "/api";

export const EVENTS: Event[] = [
  {
    id: 0,
    name: "科学展示",
    time: [new Time(11, 0, 12, 30), new Time(14, 0, 15, 30)],
  },
  {
    id: 1,
    name: "物理実験",
    time: [new Time(10, 0, 11, 0), new Time(12, 0, 13, 0)],
  },
  {
    id: 2,
    name: "化学実験",
    time: [new Time(10, 0, 11, 0), new Time(12, 30, 13, 30)],
  },
  {
    id: 3,
    name: "数学講義",
    time: [new Time(11, 0, 12, 0), new Time(14, 0, 15, 0)],
  },
  {
    id: 4,
    name: "英語スピーキングクラス",
    time: [new Time(13, 0, 14, 0), new Time(15, 0, 16, 0)],
  },
  {
    id: 5,
    name: "プログラミングワークショップ",
    time: [new Time(10, 30, 11, 30), new Time(14, 30, 15, 30)],
  },
  {
    id: 6,
    name: "歴史講座",
    time: [new Time(10, 0, 11, 30), new Time(13, 0, 14, 30)],
  },
  {
    id: 7,
    name: "美術展示",
    time: [new Time(11, 0, 12, 30), new Time(15, 0, 16, 30)],
  },
  {
    id: 8,
    name: "音楽ライブ",
    time: [new Time(12, 0, 13, 30), new Time(14, 0, 15, 30)],
  },
  {
    id: 9,
    name: "ダンスワークショップ",
    time: [new Time(13, 0, 14, 30), new Time(16, 0, 17, 30)],
  },
  {
    id: 10,
    name: "健康セミナー",
    time: [new Time(14, 0, 15, 30), new Time(15, 45, 17, 15)],
  },
  {
    id: 11,
    name: "文学講演",
    time: [new Time(10, 0, 11, 30), new Time(12, 45, 14, 15)],
  },
  {
    id: 12,
    name: "科学展示",
    time: [new Time(11, 0, 12, 30), new Time(14, 0, 15, 30)],
  },
  {
    id: 13,
    name: "料理デモンストレーション",
    time: [new Time(12, 0, 13, 30), new Time(15, 0, 16, 30)],
  },
  {
    id: 14,
    name: "環境セミナー",
    time: [new Time(13, 0, 14, 30), new Time(16, 0, 17, 30)],
  },
  {
    id: 15,
    name: "テクノロジーフォーラム",
    time: [new Time(14, 0, 15, 30), new Time(15, 45, 17, 15)],
  },
];
