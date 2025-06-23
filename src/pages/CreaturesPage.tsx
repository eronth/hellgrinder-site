import React, { useState, useEffect } from 'react';
// Components
import Tools from "../common-design/Tools";
import CreatureCard from "./creature-page-components/CreatureCard";
import CollapsibleSection from "./creature-page-components/CollapsibleSection";
import FactionSelector from "./creature-page-components/FactionSelector";
import EncounterSection from "./creature-page-components/EncounterSection";
import FloatingPanelsContainer from "./character-creation-components/FloatingPanels/FloatingPanelsContainer";
// Types
import { TabType } from "../ts-types/types";
import { Creature } from "../ts-types/creature-types";
import { Encounter, EncounterCreature } from "../ts-types/encounter-types";
// Data
import GenCreatures from "../common-design/creatures/generic-creatures";
import ZephpterCreatures from "../common-design/creatures/zephpter-creatures";
import Sinners from "../common-design/creatures/sinner-creatures";
import FactionExamples from "../common-design/creatures/faction-examples";
// Utils
import { transformCreatureToFaction } from "./creature-page-components/FactionTransformUtils";
import { EncounterStorage } from "../common-design/utils/EncounterStorage";
import Page from '../common-design/Page';

export default function CreaturesPage() {
  const page: TabType = 'creatures';
  const [selectedFaction, setSelectedFaction] = useState<string>('Generic');
  const [encounter, setEncounter] = useState<Encounter>({ creatures: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load encounter from localStorage on component mount
  useEffect(() => {
    const savedEncounter = EncounterStorage.loadCurrentEncounter();
    setEncounter(savedEncounter);
    setIsLoaded(true);
  }, []);

  // Save encounter to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      EncounterStorage.saveCurrentEncounter(encounter);
    }
  }, [encounter, isLoaded]);

  const handleFactionChange = (faction: string) => {
    setSelectedFaction(faction);
  };

  const handleAddToEncounter = (creature: Creature) => {
    const newEncounterCreature: EncounterCreature = {
      id: `encounter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      creature: creature,
      currentHealth: creature.health,
      maxHealth: creature.health
    };
    
    setEncounter(prev => ({
      ...prev,
      creatures: [...prev.creatures, newEncounterCreature]
    }));
  };

  const handleRemoveFromEncounter = (id: string) => {
    setEncounter(prev => ({
      ...prev,
      creatures: prev.creatures.filter(c => c.id !== id)
    }));
  };

  const handleHealthChange = (id: string, newHealth: number) => {
    setEncounter(prev => ({
      ...prev,
      creatures: prev.creatures.map(c => 
        c.id === id ? { ...c, currentHealth: newHealth } : c
      )
    }));
  };

  const handleClearEncounter = () => {
    const emptyEncounter = { creatures: [] };
    setEncounter(emptyEncounter);
    EncounterStorage.clearEncounterStorage();
  };

  const handleImportEncounter = (importedEncounter: Encounter) => {
    setEncounter(importedEncounter);
  };

  const hasEncounterCreatures = encounter.creatures.length > 0;

  return (<Page pageType={page}>

    {/* Encounter Section - appears at top when there are creatures */}
    <EncounterSection
      encounter={encounter}
      onRemoveCreature={handleRemoveFromEncounter}
      onHealthChange={handleHealthChange}
      onClearEncounter={handleClearEncounter}
      onImportEncounter={handleImportEncounter}
    />
    
    {/* Floating Panels for Dice Roller - only show when encounter is active */}
    {hasEncounterCreatures && (
      <FloatingPanelsContainer
        isDiceRollerVisible={true}
        activeStatusEffects={[]}
        characterName="Encounter"
      />
    )}
    
    <h2>Enemies</h2>
      <p>Enemies mark the threats the players may face in combat. An enemy doesn’t follow the same injury system as players do. Instead, when an enemy hits 0 health, they are defeated. Generally, it is up to the player who deals the final hit whether a defeated enemy is left unconscious, as a corpse, or completely banished from the area. Some enemies may have abilities based on which defeat state is chosen, but most are simply defeated at that point.</p>
    <hr />
    <p>There are many types of creatures in the Underworld.</p>
    <>
      <h3>Enemy Tiers</h3>
      {/* TODO Pull this in dynamically. */}
      {/* TODO Add descriptions to each tier. */}
      <p>Enemy Types: Minion, Hellspawn, Tormentor, Archfiend, Lord, Overlord</p>
      <p>Enemies should be tough. Archfiends should be a hell of a battle, Lords and Overlords should be virtually unbeatable. Probably not worth even statting out.</p>
    </>

    <CollapsibleSection 
      title="Faction Examples" 
      isOpenByDefault={true}
      description="Example creatures from each major faction, showcasing the faction-based color-coding system."
      className="faction-examples"
    >
      <div className='creatures-grid'>
        {Tools
          .sortCreatures(FactionExamples)
          .map((creature, i) => 
            <CreatureCard 
              key={`faction-example-${creature.name}-${i}`} 
              data={creature} 
              onAddToEncounter={handleAddToEncounter}
            />
        )}
      </div>
    </CollapsibleSection>

    <CollapsibleSection 
      title="Generic Enemies"
      isOpenByDefault={false}
      description="Generic types of demons that can be customized using the faction selector below."
    >
      <p>
        These are generic types of demons, perfect when trying to run demons.
        You can fill out encounters by picking some of these enemies, and updating them accordingly.
        Using the table below, you can see which placeholder value should be swapped for which types.
      </p>
      
      <FactionSelector 
        selectedFaction={selectedFaction}
        onFactionChange={handleFactionChange}
      />
      
      {/* <GenericToNongenericTable /> */}
      <br />
      <div className='creatures-grid'>
        {Tools
          .sortCreatures(GenCreatures)
          .map((creature, i) => {
            const transformedCreature = transformCreatureToFaction(creature, selectedFaction);
            return (
              <CreatureCard 
                key={`generic-creature-${creature.name}-${selectedFaction}-${i}`} 
                data={transformedCreature}
                onAddToEncounter={handleAddToEncounter}
              />
            );
          })
        }
      </div>
    </CollapsibleSection>
    <CollapsibleSection 
      title="Sinners"
      isOpenByDefault={false}
      description="The damned, compelled to eternal punishment for their sins."
    >
      <p>
        Sinners are often thought to be the damned, compelled to eternal punishment for their sins. Though this is unconfirmed.
        Sinners are default passive and often willing to help, though their compelled punishment often leads them to be
        incapable of providing much help beyond information. Should a sinner be prevented from completing its task, it will
        become extremely aggressive towards the ones who interrupt.
      </p>
      <div className='creatures-grid'>
        {Tools
          .sortCreatures(Sinners)
          .map((creature, i) =>
            <CreatureCard 
              key={`sinner-creature-${creature.name}-${i}`} 
              data={creature} 
              onAddToEncounter={handleAddToEncounter}
            />
        )}
      </div>
    </CollapsibleSection>
    <CollapsibleSection 
      title="Zephpter Horde"
      isOpenByDefault={false}
      description="Nethercurrent-wielding creatures of the Zephpter faction."
    >
      <div className='creatures-grid'>
        {Tools
          .sortCreatures(ZephpterCreatures)
          .map((creature, i) =>
            <CreatureCard 
              key={`zephpter-creature-${creature.name}-${i}`} 
              data={creature} 
              onAddToEncounter={handleAddToEncounter}
            />
        )}
      </div>
    </CollapsibleSection>
    
  </Page>);
}