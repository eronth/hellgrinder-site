import DemonClans from "./demon-clans/DemonClans";
import OtherFactions from "./other-factions/OtherFactions";
import Locations from "./locations/Locations";

export default function SettingPage() {
  const page = 'setting';

  return (<div className={page}>
    <DemonClans />
    <hr />
    <OtherFactions />
    <hr />
    <Locations />  
  </div>);
}