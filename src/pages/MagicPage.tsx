import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";

export default function MagicPage() {
  const page: TabType = 'magic';

  return (<div className={'page ' + page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
  </div>);
}