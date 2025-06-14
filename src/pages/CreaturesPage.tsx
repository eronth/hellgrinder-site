import React, { useState } from 'react';
// Components
import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import GenericToNongenericTable from "./creature-page-components/GenericToNongenericTable";
import Tools from "../common-design/Tools";
import CreatureCard from "./creature-page-components/CreatureCard";
import CollapsibleSection from "./creature-page-components/CollapsibleSection";
import FactionSelector from "./creature-page-components/FactionSelector";
// Types
import { TabType } from "../ts-types/types";
// Data
import GenCreatures from "../common-design/creatures/generic-creatures";
import ZephpterCreatures from "../common-design/creatures/zephpter-creatures";
import Sinners from "../common-design/creatures/sinner-creatures";
import FactionExamples from "../common-design/creatures/faction-examples";
// Utils
import { transformCreatureToFaction } from "./creature-page-components/FactionTransformUtils";

export default function CreaturesPage() {
  const page: TabType = 'creatures';
  const [selectedFaction, setSelectedFaction] = useState<string>('Generic');

  const handleFactionChange = (faction: string) => {
    setSelectedFaction(faction);
  };

  return (<div className={'page ' + page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
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
            <CreatureCard key={`faction-example-${creature.name}-${i}`} data={creature} />
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
      
      <GenericToNongenericTable />
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
            <CreatureCard key={`sinner-creature-${creature.name}-${i}`} data={creature} />
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
            <CreatureCard key={`zephpter-creature-${creature.name}-${i}`} data={creature} />
        )}
      </div>
    </CollapsibleSection>
    
  </div>);
}