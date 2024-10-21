import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import Tools from "../common-design/Tools";

export default function AdditionalEquipmentPage() {
  const page: TabType = 'additional-equipment';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
    <p>{Tools.getLoremIpsum()}</p>
    <hr />
  </div>);
}