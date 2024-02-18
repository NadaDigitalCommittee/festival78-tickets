// import { TicketCardGallery } from "@/components/TicketCard";
//import { EventTable } from "./ui/EventTable";
import { News } from "@/components/News";
import styles from "@/styles/layout.module.scss";
import Link from "next/link";
import { CiViewTimeline } from "react-icons/ci";
import { HiOutlineTicket } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdEmojiEvents } from "react-icons/md";
import { PiCertificate } from "react-icons/pi";

export default async function App() {
  return (
    <div>
      <div className=" rounded-xl py-6">
        <News compact />
        <div className="grid grid-cols-2 gap-6">
          <Link href={"/timetable"}>
            <div
              className={`flex h-36 flex-col items-center rounded-3xl pt-6 shadow-md   ${styles.bg}`}
            >
              <p>{"タイムテーブル"}</p>
              <div className="my-auto h-20">
                <CiViewTimeline size={"4em"} />
              </div>
            </div>
          </Link>
          <Link href={"/events"}>
            <div
              className={`flex h-36 flex-col items-center rounded-3xl pt-6 shadow-md   ${styles.bg}`}
            >
              <p>{"企画説明"}</p>
              <div className="my-auto h-20">
                <MdEmojiEvents size={"4em"} />
              </div>
            </div>
          </Link>
          <div className="col-span-2">
            <Link href={"/raffle"}>
              <div
                className={`flex h-36 flex-col items-center rounded-3xl pt-6 shadow-md   ${styles.bg}`}
              >
                <p>{"抽選"}</p>
                <div className="my-auto h-20">
                  <HiOutlineTicket size={"4em"} />
                </div>
              </div>
            </Link>
          </div>
          <Link href={"/certifications"}>
            <div
              className={`flex h-36 flex-col items-center rounded-3xl pt-6 shadow-md   ${styles.bg}`}
            >
              <p>{"当選証明書"}</p>
              <div className="my-auto h-20">
                <PiCertificate size={"4em"} />
              </div>
            </div>
          </Link>
          <Link href={"/settings"}>
            <div
              className={`flex h-36 flex-col items-center rounded-3xl pt-6 shadow-md   ${styles.bg}`}
            >
              <p>{"設定"}</p>
              <div className="my-auto h-20">
                <IoSettingsOutline size={"4em"} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* <TicketCardGallery /> */}
      {/* <RaffleResultContext.Provider value={result?.raffle}>
        <div className={result ? "" : " pointer-events-none"}>
          <EventTable />
        </div>
      </RaffleResultContext.Provider> */}
    </div>
  );
}
