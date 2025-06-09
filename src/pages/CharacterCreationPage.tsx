import React from "react";
import { Toggle } from '../common-design/Toggle/Toggle';
import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import CharacterCreationRules from "./character-creation-components/CharacterCreationRules";
import CharacterGenerator from "./character-creation-components/CharacterGenerator";
// Todo merge into Character Creation Page as a sub-tab/toggle.

export default function CharacterCreationPage() {
  const page: TabType = 'character-creation';

  // Create a state to toggle rules and creator.
  const [showCreator, setShowCreator] = React.useState(false);

  const toggleLabel = {
    left: 'Character Creation Rules',
    right: 'Character Generator',
  };
  
  return (<div className={'page ' + page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <Toggle 
      className={'character-creation-toggle'}
      label={toggleLabel}
      toggled={showCreator}
      onClick={setShowCreator} />
    <hr />
    {showCreator
      ? <CharacterGenerator />
      : <CharacterCreationRules />
    }
  </div>);
}