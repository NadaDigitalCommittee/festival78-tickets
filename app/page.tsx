import { App } from "@/components/App";
import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { SWR } from "@/lib/Swr";
import { validateUUID } from "@/lib/session";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const uuid = await validateUUID();
  const isSecret = searchParams["secret"] === process.env.SECRET ?? "";

  if (!uuid) {
    if (isSecret) {
      //登録ページ
      return (
        <main>
          <Register secret={searchParams["secret"] as string} />
        </main>
      );
    } else {
      return (
        <main>
          <Login />
        </main>
      );
    }
  } else {
    //Webアプリ

    return (
      <main>
        <SWR>
          <App />
        </SWR>
      </main>
    );
  }
}
