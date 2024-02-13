import { EventList } from "@/components/admin/EventList";
import { AdminForm } from "@/components/admin/admin";
import { getEvents } from "@/lib/cms";
import { prisma } from "@/lib/db";
import { RaffleIds } from "@/lib/getRaffleId";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const secret = searchParams.secret;
  if (secret !== process.env.ADMIN_SECRET) {
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
    <main className="mt-3 lg:mx-[100px]">
      <div className="flex flex-col items-center">
        {/* データベースを確認するためのURL、今回はprismaを採用しprisma studioへのリンクを載せている。 */}
        <p className="my-3">
          ・データベースは
          <a
            href={process.env.DB_SITE}
            className=" text-blue-500"
            target="_blank"
          >
            こちら
          </a>
        </p>
        <EventList
          events={events}
          raffleIds={RaffleIds}
          alreadyRaffled={alreadyRaffled}
        />
        <AdminForm secret={secret} />
      </div>
    </main>
  );
}
