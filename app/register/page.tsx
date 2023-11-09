import { Register } from "./register";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const secret = searchParams.secret as string;
  return <Register secret={secret} />;
}
