import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";

export default function CharacterCreationPage() {
  const page: TabType = 'character-creation';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    {/* <CharacterCreationPage /> */}
    <hr />
  </div>);
}