import GameTitle from "../GameTitle";
import DemonClans from "./settings-components/demon-clans/DemonClans";
import OtherFactions from "./settings-components/other-factions/OtherFactions";
import Locations from "./settings-components/locations/Locations";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";

export default function SettingPage() {
  const page: TabType = 'setting';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <DemonClans />
    <hr />
    <OtherFactions />
    <hr />
    <Locations />
    <hr />
  </div>);
}