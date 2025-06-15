import React from 'react';
import { Encounter } from '../../ts-types/encounter-types';
import CreatureCard from './CreatureCard';
import CollapsibleSection from './CollapsibleSection';

type Props = {
  encounter: Encounter;
  onRemoveCreature: (id: string) => void;
  onHealthChange: (id: string, newHealth: number) => void;
  onClearEncounter: () => void;
};

export default function EncounterSection({ 
  encounter, 
  onRemoveCreature, 
  onHealthChange, 
  onClearEncounter 
}: Props) {
  const creatureCount = encounter.creatures.length;
  const title = `Encounter (${creatureCount} creature${creatureCount !== 1 ? 's' : ''})`;
  
  if (creatureCount === 0) {
    return null; // Don't show the section if there are no creatures
  }

  return (
    <CollapsibleSection
      title={title}
      isOpenByDefault={true}
      description="Current encounter setup. Click creature health values to edit them."
      className="encounter-section"
    >
      <div className="encounter-controls">
        <button 
          className="clear-encounter-btn"
          onClick={onClearEncounter}
          title="Clear all creatures from encounter"
        >
          Clear Encounter
        </button>
      </div>
      
      <div className='creatures-grid encounter-grid'>
        {encounter.creatures.map((encounterCreature) => (
          <CreatureCard
            key={encounterCreature.id}
            data={encounterCreature.creature}
            isEncounterMode={true}
            encounterCreature={encounterCreature}
            onRemoveFromEncounter={onRemoveCreature}
            onHealthChange={onHealthChange}
          />
        ))}
      </div>
    </CollapsibleSection>
  );
}
