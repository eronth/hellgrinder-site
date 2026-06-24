import React from "react";
// Common Components
import Page from "../../components/common/Page/Page";
import { Toggle } from '../../components/common/generic/Toggle/Toggle';
// Types
import { TabType } from "../../ts-types/types";
// Components
import EncounterBuilder from './creature-page-components/EncounterBuilder';
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