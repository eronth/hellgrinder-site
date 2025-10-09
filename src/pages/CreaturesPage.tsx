import React from "react";
import Page from "../common-design/Page";
import { Toggle } from '../common-design/Toggle/Toggle';
import EncounterBuilder from './creature-page-components/EncounterBuilder';
import { TabType } from "../ts-types/types";
import CreatureRules from "./creature-page-components/CreatureRules/CreatureRules";

export default function CreaturesPage() {
  const page: TabType = 'creatures';
  // Create a state to toggle rules and creator with persistent storage
  const [showBuilder, setShowBuilder] = React.useState(() => {
    try {
      const saved = localStorage.getItem('hellgrinder_encounter_builder_toggle_state');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Save toggle state when it changes
  React.useEffect(() => {
    localStorage.setItem('hellgrinder_encounter_builder_toggle_state', JSON.stringify(showBuilder));
  }, [showBuilder]);

  const toggleLabel = {
    left: 'Creature Rules',
    right: 'Encounter Builder',
  };

  return (<Page pageType={page}>
    <Toggle
      className={'character-creation-toggle'}
      label={toggleLabel}
      toggled={showBuilder}
      onClick={setShowBuilder} />
    <hr />
    {showBuilder
      ? <EncounterBuilder />
      : <CreatureRules />
    }
  </Page>);
}