import React from "react";
import CollapsibleSection from "../CollapsibleSection/CollapsibleSection";
import Tools from "../../../common-design/Tools";
import { transformAllCreaturesToFaction } from "../FactionTransformUtils";
import CreatureCard from "../CreatureCard/CreatureCard";
import { Creature } from "../../../ts-types/creature-types";
import './SingleFactionDisplayRegion.css';

type Props = {
  title: string;
  description: string;
  creatureType: string;
  factionCreatures: { [key: string]: Creature };
  genericCreatures: { [key: string]: Creature };
  handleAddToEncounter: (creature: Creature) => void;
};
export default function SingleFactionDisplayRegion({
  title,
  description,
  creatureType,
  factionCreatures,
  genericCreatures,
  handleAddToEncounter
}: Props) {
  const [includeGenerics, setIncludeGenerics] = React.useState(false);

  return <CollapsibleSection
    title={title}
    isOpenByDefault={false}
    description={description}
  >
    <div className="the-prompt">
      Include Generic Creatures?
      <input
        type="checkbox"
        checked={includeGenerics}
        onChange={() => setIncludeGenerics(!includeGenerics)}
      />
    </div>
    <div className='creatures-grid'>
      {Tools
        .sortCreatures({
          ...(includeGenerics
            ? transformAllCreaturesToFaction(genericCreatures, 'Zephpter Swarm') 
            : {}
          ),
          ...factionCreatures
        })
        .map((creature, i) =>
          <CreatureCard
            key={`${creatureType}-creature-${creature.name}-${i}`} 
            data={creature} 
            onAddToEncounter={handleAddToEncounter}
          />
      )}
    </div>
  </CollapsibleSection>;
}
