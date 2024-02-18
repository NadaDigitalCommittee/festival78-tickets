/* eslint-disable no-unused-vars */
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { validateApiHandler } from "../handler";
import { Api } from "@/lib/types";

export const GET = validateApiHandler<Api<{}>>(async (_request, session) => {
  if (session?.uuid !== "admin") {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  testRaffle(0, 0);
  testRaffle(0, 1);
  testRaffle(1, 0);
  return NextResponse.json({ ok: true, data: {} });
});

async function testUser() {
  console.log("start");
  for (let i = 0; i < 100; i++) {
    console.log("created");
    await prisma.user.create({
      data: {
        email: randomString(10),
      },
    });
    console.log("created");
  }
}

async function testRaffle(eventId: number, timeId: number) {
  console.log("start");
  const users = await prisma.user.findMany({ take: 100 });
  for (let i = 0; i < 100; i++) {
    await prisma.raffle.create({
      data: {
        userId: users[i].uuid,
        eventId: eventId,
        timeId: timeId,
        participants: randomInt(3),
      },
    });
    console.log("created");
  }
}

function randomString(num: number) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < num; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
}
function randomInt(num: number) {
  return Math.floor(Math.random() * (num - 1) + 1);
}

testUser();
