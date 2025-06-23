import React from "react";
import Page from "../common-design/Page";
import { Toggle } from '../common-design/Toggle/Toggle';
import CharacterCreationRules from "./character-creation-components/CharacterCreationRules";
import CharacterGenerator from "./character-creation-components/CharacterGenerator/CharacterGenerator";
import { TabType } from "../ts-types/types";
// Todo merge into Character Creation Page as a sub-tab/toggle.

export default function CharacterCreationPage() {
  const page: TabType = 'character-creation';
  // Create a state to toggle rules and creator with persistent storage
  const [showCreator, setShowCreator] = React.useState(() => {
    try {
      const saved = localStorage.getItem('hellgrinder_character_creation_toggle_state');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Save toggle state when it changes
  React.useEffect(() => {
    localStorage.setItem('hellgrinder_character_creation_toggle_state', JSON.stringify(showCreator));
  }, [showCreator]);

  const toggleLabel = {
    left: 'Character Creation Rules',
    right: 'Character Generator',
  };

  return (<Page pageType={page}>
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
  </Page>);
}