import { NewsList } from "@/components/NewsList";

import { Notification } from "@/components/Notification";
import { CiViewTimeline } from "react-icons/ci";
import { HiOutlineTicket } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdEmojiEvents } from "react-icons/md";
import { PiCertificate } from "react-icons/pi";
import { Menu } from "./_components/Menu";

export default async function App() {
  return (
    <div>
      <div className=" rounded-xl py-6">
        <NewsList compact />
        <p className="mb-3 font-bold">メニュー</p>
        <div className="grid grid-cols-2 gap-6">
          <Menu
            title={"タイムテーブル"}
            icon={CiViewTimeline}
            path="/timetable"
          />
          <Menu title="企画説明" icon={MdEmojiEvents} path="/events" />
          <div className="col-span-2">
            <Menu title="抽選" icon={HiOutlineTicket} path="/raffle" />
          </div>
          <Menu
            title="当選証明書"
            icon={PiCertificate}
            path="/certifications"
          />
          <Menu title="設定" icon={IoSettingsOutline} path="/settings" />
        </div>
        <Notification />
      </div>
    </div>
  );
}
