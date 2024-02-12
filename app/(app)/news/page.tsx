/* eslint-disable no-unused-vars */
import { News } from "@/components/News";
import { fetchNews } from "@/lib/fetchNews";

export default async function Page() {
  const news = await fetchNews();
  const emergencyNews = news?.filter((n) => n.type === "emergency");
  const normalNews = news?.filter((n) => n.type !== "emergency");
  return (
    <main>
      <News />
    </main>
  );
}
