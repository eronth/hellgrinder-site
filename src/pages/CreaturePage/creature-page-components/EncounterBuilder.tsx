import { useState, useEffect, useRef } from 'react';
// Components
import Tools from "../../../utils/tools";
import CreatureCard from "./CreatureCard/CreatureCard";
import CollapsibleSection from "../creature-page-components/CollapsibleSection/CollapsibleSection";
import FactionSelector from "../creature-page-components/FactionSelector/FactionSelector";
import EncounterSection from "../creature-page-components/EncounterSection";
import EncounterTabsGroup from "./EncounterTabsGroup/EncounterTabsGroup";
import FloatingPanelsContainer from "../../../components/common/FloatingPanels/FloatingPanelsContainer";
import SingleFactionDisplayRegion from './SingleFactionDisplayRegion/SingleFactionDisplayRegion';
// Types
import { Creature } from "../../../ts-types/creature-types";
import { Encounter, EncounterCreature, EncounterSet } from "../../../ts-types/encounter-types";
// Data
import GenCreatures from "../../../data/creatures/generic-creatures";
import RotHostCreatures from "../../../data/creatures/test-creatures";
import ZephpterCreatures from "../../../data/creatures/zephpter-creatures";
import Sinners from "../../../data/creatures/sinner-creatures";
import FactionExamples from "../../../data/creatures/faction-examples";
// Utils
import { transformCreatureToFaction } from "../creature-page-components/FactionTransformUtils";
import { EncounterStorage } from "../../../local-storage/EncounterStorage";

export default function EncounterBuilder() {
  const [selectedFaction, setSelectedFaction] = useState<string>('Generic');
  const [encounterSet, setEncounterSet] = useState<EncounterSet>({
    encounters: {},
    activeEncounterId: '',
    order: []
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const importAllFileInputRef = useRef<HTMLInputElement>(null);

  // Load encounters from localStorage on component mount
  useEffect(() => {
    const savedEncounterSet = EncounterStorage.loadEncounterSet();
    setEncounterSet(savedEncounterSet);
    setIsLoaded(true);
  }, []);

  // Save encounters to localStorage whenever they change (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      console.log('================================');
      console.log('Encounter set updated:', encounterSet);
      EncounterStorage.saveEncounterSet(encounterSet);
    }
  }, [encounterSet, isLoaded]);

  const handleFactionChange = (faction: string) => {
    setSelectedFaction(faction);
  };

  const activeEncounter = encounterSet.encounters[encounterSet.activeEncounterId];

  const handleAddToEncounter = (creature: Creature) => {
    if (!activeEncounter) { return; }

    const newEncounterCreature: EncounterCreature = {
      id: `encounter-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      creature: creature,
      currentHealth: creature.health,
      maxHealth: creature.health
    };

    setEncounterSet(prev => ({
      ...prev,
      encounters: {
        ...prev.encounters,
        [prev.activeEncounterId]: {
          ...activeEncounter,
          creatures: [...activeEncounter.creatures, newEncounterCreature]
        }
      }
    }));
  };

  const handleRemoveFromEncounter = (id: string) => {
    if (!activeEncounter) return;

    setEncounterSet(prev => ({
      ...prev,
      encounters: {
        ...prev.encounters,
        [prev.activeEncounterId]: {
          ...activeEncounter,
          creatures: activeEncounter.creatures.filter(c => c.id !== id)
        }
      }
    }));
  };

  const handleHealthChange = (id: string, newHealth: number) => {
    if (!activeEncounter) return;

    setEncounterSet(prev => ({
      ...prev,
      encounters: {
        ...prev.encounters,
        [prev.activeEncounterId]: {
          ...activeEncounter,
          creatures: activeEncounter.creatures.map(c =>
            c.id === id ? { ...c, currentHealth: newHealth } : c
          )
        }
      }
    }));
  };

  const handleClearEncounter = () => {
    if (!activeEncounter) return;

    setEncounterSet(prev => ({
      ...prev,
      encounters: {
        ...prev.encounters,
        [prev.activeEncounterId]: {
          ...activeEncounter,
          creatures: []
        }
      }
    }));
  };

  const handleSelectEncounter = (encounterId: string) => {
    setEncounterSet(prev => ({
      ...prev,
      activeEncounterId: encounterId
    }));
  };

  const handleAddEncounter = () => {
    const existingNames = Object.values(encounterSet.encounters).map(e => e.name);
    let newName = 'New Encounter';
    let counter = 1;
    while (existingNames.includes(newName)) {
      newName = `New Encounter ${++counter}`;
    }

    const newEncounterSet = EncounterStorage.createEncounter(newName, encounterSet);
    setEncounterSet(newEncounterSet);
  };

  const handleDeleteEncounter = (encounterId: string) => {
    if (confirm(`Delete encounter? This cannot be undone.`)) {
      const newEncounterSet = EncounterStorage.deleteEncounter(encounterId, encounterSet);
      setEncounterSet(newEncounterSet);
    }
  };

  const handleRenameEncounter = (encounterId: string, newName: string) => {
    const newEncounterSet = EncounterStorage.renameEncounter(encounterId, newName, encounterSet);
    setEncounterSet(newEncounterSet);
  };

  const handleReorderEncounters = (newOrder: string[]) => {
    const newEncounterSet = EncounterStorage.reorderEncounters(newOrder, encounterSet);
    setEncounterSet(newEncounterSet);
  };

  const handleImportEncounter = (importedEncounter: Encounter) => {
    // Add imported encounter to the set
    setEncounterSet(prev => ({
      ...prev,
      encounters: {
        ...prev.encounters,
        [importedEncounter.id]: importedEncounter
      },
      activeEncounterId: importedEncounter.id,
      order: [...prev.order, importedEncounter.id]
    }));
  };

  const handleExportAllEncounters = () => {
    EncounterStorage.exportEncounterSet(encounterSet);
  };

  const handleImportAllEncounters = () => {
    importAllFileInputRef.current?.click();
  };

  const handleImportAllFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imported = await EncounterStorage.importEncounterSet(file);
        setEncounterSet(prev => {
          const firstNewId = Object.keys(imported)[0];
          return {
            ...prev,
            encounters: { ...prev.encounters, ...imported },
            order: [...prev.order, ...Object.keys(imported)],
            activeEncounterId: firstNewId ?? prev.activeEncounterId
          };
        });
      } catch (error) {
        console.error('Failed to import encounters:', error);
        alert('Failed to import encounters. Please check the file format.');
      }
    }
    event.target.value = '';
  };

  const hasEncounterCreatures: boolean = (activeEncounter?.creatures.length ?? 0) > 0;

  if (!isLoaded || !activeEncounter) {
    return <div style={{ minHeight: '100vh' }} />;
  }

  return (<>

    {/* Encounter Tabs - for switching between encounters */}
    <EncounterTabsGroup
      encounterSet={encounterSet}
      onSelectEncounter={handleSelectEncounter}
      onAddEncounter={handleAddEncounter}
      onDeleteEncounter={handleDeleteEncounter}
      onRenameEncounter={handleRenameEncounter}
      onReorderEncounters={handleReorderEncounters}
      onImportEncounters={handleImportAllEncounters}
      onExportEncounters={handleExportAllEncounters}
    />
    <input
      ref={importAllFileInputRef}
      type="file"
      accept=".json"
      style={{ display: 'none' }}
      onChange={handleImportAllFileChange}
    />

    {/* Encounter Section - appears at top when there are creatures */}
    <EncounterSection
      encounter={activeEncounter}
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
    <p>
      Enemies mark the threats the players may face in combat.
      An enemy doesn't follow the same injury system as players do.
      Instead, when an enemy hits 0 health, they are defeated. Generally,
      it is up to the player who deals the final hit whether a defeated
      enemy is left unconscious, as a corpse, or completely banished
      from the area. Some enemies may have abilities based on which
      defeat state is chosen, but most are simply defeated at that point.
    </p>
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
      className="faction faction-examples"
      variant="faction-examples"
      storageKey="eb-faction-examples-open"
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
      storageKey="eb-generic-enemies-open"
    >
      <p>
        These are generic examples of common types of demons, perfect when trying to run demons.
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
    <SingleFactionDisplayRegion
      className='faction faction-rot-host'
      title="Rot Host"
      description="The Rot Host is a curse that has bled out from gates to hell, corrupting people into unrecognizable monstrosities."
      creatureType="rot-host"
      factionCreatures={RotHostCreatures}
      genericCreatures={GenCreatures}
      handleAddToEncounter={handleAddToEncounter}
    />
    <SingleFactionDisplayRegion
      className='faction faction-zephpter-swarm'
      title="Zephpter Swarm"
      description="Nethercurrent-wielding creatures of the Zephpter faction."
      creatureType="zephpter"
      factionCreatures={ZephpterCreatures}
      genericCreatures={GenCreatures}
      handleAddToEncounter={handleAddToEncounter}
    />
    <CollapsibleSection
      title="Sinners"
      isOpenByDefault={false}
      description="The damned, compelled to eternal punishment for their sins."
      storageKey="eb-sinners-open"
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
  </>);
}
