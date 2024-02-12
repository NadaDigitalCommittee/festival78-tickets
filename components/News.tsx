import { fetchNews } from "@/lib/fetchNews";
import Link from "next/link";
import { FC } from "react";
import { IoMdAlert, IoMdInformationCircle } from "react-icons/io";

type Props = {
  compact?: boolean;
};

export const News: FC<Props> = async ({ compact }) => {
  const news = await fetchNews();
  const emergencyNews = news?.filter((n) => n.type === "emergency");
  const normalNews = news?.filter((n) => n.type !== "emergency");
  return (
    <div className="mb-6">
      <p className="mb-2">お知らせ</p>
      {emergencyNews?.map((n) => (
        <div key={n.id} className="mb-4 rounded-md bg-red-100 p-4">
          <div className="mb-1 flex">
            <IoMdAlert size={"1.4rem"} color="red" />
            {n.title}
          </div>
          <p className="line-clamp-2 w-full text-sm text-[#4d5156]">
            {n.compactBody}
          </p>

          <p className="text-right text-sm text-blue-500 underline">
            <Link href={`/news/${n.id}`}>詳細</Link>
          </p>
        </div>
      ))}
      {normalNews?.map(
        (n, i) =>
          (i < 3 - (emergencyNews ?? []).length || !compact) && (
            <div
              key={n.id}
              className={`mb-4 rounded-md ${
                n.type === "win" ? "bg-green-100" : "bg-gray-100"
              } p-4`}
            >
              <div className="mb-1 flex">
                <IoMdInformationCircle
                  size={"1.4rem"}
                  color={`${n.type == "win" ? "green" : "gray"}`}
                />
                {n.title}
              </div>
              <p className="line-clamp-1 w-full text-sm text-[#4d5156]">
                {n.compactBody}
              </p>
              <p className="text-right text-sm text-blue-500 underline">
                <Link href={`/news/${n.id}`}>詳細</Link>
              </p>
            </div>
          )
      )}
      {compact && (
        <p className="text-right text-blue-500">
          <Link href={"/news"}>過去のお知らせはこちら</Link>
        </p>
      )}
    </div>
  );
};
