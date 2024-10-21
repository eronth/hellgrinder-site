import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import KitsListDisplayComponent from "./character-creation-components/KitsListDisplayComponent.tsx";
import PerksListDisplayComponent from "./character-creation-components/PerksListDisplayComponent";
import CreationCoreRules from "./character-creation-components/CreationCoreRules.tsx";

export default function CharacterCreationPage() {
  const page: TabType = 'character-creation';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <CreationCoreRules />
    <hr />
    <KitsListDisplayComponent />
    <hr />
    <PerksListDisplayComponent />
    <hr />
  </div>);
}