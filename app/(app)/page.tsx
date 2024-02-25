import { NewsList } from "@/components/NewsList";
import { ja } from "@/lib/lang/ja";
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
        <p className="mb-3 font-bold">{ja.word.menu}</p>
        <div className="grid grid-cols-2 gap-6">
          <Menu
            title={ja.word.timetable}
            icon={CiViewTimeline}
            path="/timetable"
          />
          <Menu
            title={ja.word.event_discription}
            icon={MdEmojiEvents}
            path="/events"
          />
          <div className="col-span-2">
            <Menu
              title={ja.word.raffle}
              icon={HiOutlineTicket}
              path="/raffle"
            />
          </div>
          <Menu
            title={ja.word.raffle_certification}
            icon={PiCertificate}
            path="/certifications"
          />
          <Menu
            title={ja.word.setting}
            icon={IoSettingsOutline}
            path="/settings"
          />
        </div>
      </div>
    </div>
  );
}
