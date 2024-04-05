import { fetchNews } from "@/lib/server/fetchNews";
import { News } from "@/lib/types";
import styles from "@/styles/news.module.scss";

export default async function Page({ params }: { params: { id: string } }) {
  let news: News | undefined = undefined;
  news = (await fetchNews(["cms"])).find((news) => news.id === params.id);
  if (!news) {
    news = (await fetchNews(["raffle"])).find((news) => news.id === params.id);
  }
  return (
    <main>
      {!news ? (
        <div className="flex h-full w-full items-center justify-center">
          <p>記事が見つかりませんでした。</p>
        </div>
      ) : (
        <div className={styles.content}>
          <h1>{news.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: news.body }} />
        </div>
      )}
    </main>
  );
}
