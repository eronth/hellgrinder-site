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
  className: string;
};
export default function SingleFactionDisplayRegion({
  title,
  description,
  creatureType,
  factionCreatures,
  genericCreatures,
  handleAddToEncounter,
  className
}: Props) {
  const storageKeyBase = `faction-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const [includeGenerics, setIncludeGenerics] = React.useState(() => {
    const stored = localStorage.getItem(`${storageKeyBase}-include-generics`);
    return stored === 'true';
  });

  // Extract variant name from className (e.g., "faction faction-rot-host" -> "rot-host")
  const variantMatch = className?.match(/faction-(\w+-?\w+)/);
  const variant = variantMatch ? variantMatch[1] : undefined;

  const handleIncludeGenericsChange = () => {
    const next = !includeGenerics;
    setIncludeGenerics(next);
    localStorage.setItem(`${storageKeyBase}-include-generics`, String(next));
  };

  return <CollapsibleSection
    title={title}
    isOpenByDefault={false}
    description={description}
    className={className}
    variant={variant as 'default' | 'faction-examples' | undefined}
    storageKey={`${storageKeyBase}-open`}
  >
    <div className="the-prompt">
      Include Generic Creatures?
      <input
        type="checkbox"
        checked={includeGenerics}
        onChange={handleIncludeGenericsChange}
      />
    </div>
    <div className='creatures-grid'>
      {Tools
        .sortCreatures({
          ...(includeGenerics
            ? transformAllCreaturesToFaction(genericCreatures, title) 
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
