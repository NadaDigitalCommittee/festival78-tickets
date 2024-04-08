import { prisma } from "@/lib/server/db";
import { expect, test } from "@playwright/test";
import { login, randomEmail } from "./util";

const myemail = process.env.TEST_EMAIL;

test("login", async ({ page }) => {
  await login(page, myemail);
  await page.close();
});

test("register", async ({ page }) => {
  await page.goto("http://localhost:3000/register");
  await page.getByRole("button", { name: "次へ" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("checkbox").uncheck();
  await page.getByRole("button", { name: "次へ" }).click();
  await page.getByText("利用規約に同意されないと登録できません。").click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "次へ" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("ababa");
  await page.getByRole("button", { name: "登録" }).click();
  await page.getByText("メールアドレスの形式が正しくありません。").click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").press("Control+a");
  await page.getByRole("textbox").fill("fadsopfj@a.com");
  await page.getByRole("button", { name: "登録" }).click();
  await page.getByRole("textbox").click();
  await page.getByText("この登録リンクは利用できません。").click();
  await page.goto(
    "http://localhost:3000/register?secret=" + process.env.SECRET
  );
  await page.getByRole("button", { name: "次へ" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^利用規約に同意する$/ })
    .click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "次へ" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill(randomEmail());
  await page.getByRole("button", { name: "登録" }).click();
  const user = await prisma.user.findUnique({
    where: {
      email: myemail,
    },
  });
  expect(user).not.toBeNull();
  await page.close();
});

test("timetable", async ({ page }) => {
  await login(page, myemail);
  await page.getByRole("link", { name: "タイムテーブル" }).click();
  await page.close();
});
