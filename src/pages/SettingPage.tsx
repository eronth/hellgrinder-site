import GameTitle from "../GameTitle";
import DemonClans from "./settings-components/demon-clans/DemonClans";
import OtherFactions from "./settings-components/other-factions/OtherFactions";
import Locations from "./settings-components/locations/Locations";
import NavTabs from "../common-design/nav/NavTabs";

export default function SettingPage() {
  return (<div className='setting'>
    <GameTitle />
    <NavTabs />
    <DemonClans />
    <hr />
    <OtherFactions />
    <hr />
    <Locations />
    <hr />
  </div>);
}