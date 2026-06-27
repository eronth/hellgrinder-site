import React from "react";
import CollapsibleSection from "../CollapsibleSection/CollapsibleSection";
import Tools from "../../../../../utils/tools";
import { transformAllCreaturesToFaction } from "../FactionTransformUtils";
import CreatureCard from "../CreatureCard/CreatureCard";
import { Creature } from "../../../../../ts-types/creature-types";
import { FactionTag } from "../../../../../ts-types/tag-types";
import './SingleFactionDisplayRegion.css';

type Props = {
  faction: FactionTag;
  description: string;
  factionCreatures: { [key: string]: Creature };
  genericCreatures: { [key: string]: Creature };
  handleAddToEncounter: (creature: Creature, factionKey: FactionTag) => void;
};
export default function SingleFactionDisplayRegion({
  faction,
  description,
  factionCreatures,
  genericCreatures,
  handleAddToEncounter,
}: Props) {

  const dashedFaction = faction.toLowerCase().replace(/\s+/g, '-');
  const className = `faction faction-${dashedFaction}`;

  const storageKeyBase = `faction-${dashedFaction}`;
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
    title={faction}
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
            ? transformAllCreaturesToFaction(genericCreatures, faction) 
            : {}
          ),
          ...factionCreatures
        })
        .map((creature, i) =>
          <CreatureCard
            key={`${dashedFaction}-creature-${creature.name}-${i}`} 
            data={creature}
            factionKey={faction}
            onAddToEncounter={handleAddToEncounter}
          />
      )}
    </div>
  </CollapsibleSection>;
}
