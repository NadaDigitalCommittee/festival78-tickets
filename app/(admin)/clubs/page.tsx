import { EventList } from "@/components/admin/EventList";
import { getEvents } from "@/lib/cms";
import { prisma } from "@/lib/db";
import { RaffleIds } from "@/lib/getRaffleId";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const secret = searchParams.secret;
  if (secret !== process.env.CLUB_SECRET) {
    return (
      <main>
        <p>
          URLのsecretが不正です。この画面が出た際は、文化委員会抽選券班に問い合わせてください。
        </p>
      </main>
    );
  }

  const events = await getEvents();

  const data = await prisma.raffle.findMany({
    where: {
      result: "WIN",
    },
    select: {
      eventId: true,
      timeId: true,
    },
  });
  const alreadyRaffled = data
    .map((b) => JSON.stringify(b))
    .filter((b, i, c) => c.indexOf(b) === i)
    .map((b) => JSON.parse(b)) as { eventId: number; timeId: number }[];
  return (
    <main className="flex flex-col items-center justify-center">
      <p className="mt-2">クラブ・サークル責任者用 抽選結果確認</p>
      <p className=" my-3 text-red-500">※このURLを外部の者に公開しないこと。</p>
      <p className="my-3">
        ・各自の企画の抽選IDとお客さんの提示するIDが同じであることを確認してください。
      </p>
      <EventList
        events={events}
        raffleIds={RaffleIds}
        alreadyRaffled={alreadyRaffled}
      />
    </main>
  );
}
