import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import Tools from "../common-design/Tools";

export default function CreaturesPage() {
  const page: TabType = 'creatures';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
    <p>{Tools.getLoremIpsum()}</p>
    <hr />
  </div>);
}