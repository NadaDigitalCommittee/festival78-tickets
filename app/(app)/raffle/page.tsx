import { Form } from "@/app/(app)/raffle/_components/raffleForm";
import { RaffleList } from "./_components/raffleList";

export default function Page() {
  return (
    <main className="">
      <Form />
      <RaffleList />
    </main>
  );
}
