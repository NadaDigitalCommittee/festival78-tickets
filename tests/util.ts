import { prisma } from "@/lib/server/db";
import { generateSession } from "@/lib/server/session";
import { Page } from "@playwright/test";

export function randomEmail() {
  return "a" + Math.random().toString(36).slice(-8) + "@example.com";
}
export async function login(page: Page, email: string) {
  await page.goto(`${process.env.HOST}/login`);
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill(email);
  await page.getByRole("button", { name: "ログイン" }).click();
  await page.getByRole("button", { name: "再送信" }).click();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const token = await generateSession(user?.uuid ?? "", user?.email ?? "");
  await page.goto(`${process.env.HOST}/verify?token=${token}`);
}
