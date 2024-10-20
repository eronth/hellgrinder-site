import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";

export default function HowToPlayPage() {
  const page: TabType = 'how-to-play';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    {/* <RulesSections /> */}
    <hr />
  </div>);
}