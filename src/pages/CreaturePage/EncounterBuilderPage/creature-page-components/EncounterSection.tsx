import React, { useRef } from 'react';
import { Encounter } from '../../../../ts-types/encounter-types';
import CreatureCard from './CreatureCard/CreatureCard';
import CollapsibleSection from './CollapsibleSection/CollapsibleSection';
import { EncounterStorage } from '../../../../local-storage/EncounterStorage';
import { getCreatureTierCounts, formatTierCounts } from '../../../../utils/encounterUtils';

type Props = {
  encounter: Encounter;
  onRemoveCreature: (id: string) => void;
  onHealthChange: (id: string, newHealth: number) => void;
  onClearEncounter: () => void;
  onImportEncounter?: (encounter: Encounter) => void;
};

export default function EncounterSection({
  encounter,
  onRemoveCreature,
  onHealthChange,
  onClearEncounter,
  onImportEncounter
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const creatureCount = encounter.creatures.length;
  const tierCounts = getCreatureTierCounts(encounter);
  const tierCountsStr = formatTierCounts(tierCounts);

  const title = `${encounter.name} Encounter (${creatureCount} creature${creatureCount !== 1 ? 's' : ''})`;
  const description = tierCountsStr
    ? `Current encounter setup ${tierCountsStr}. Click creature health values to edit them.`
    : 'Current encounter setup. Click creature health values to edit them.';

  const handleExportEncounter = () => {
    EncounterStorage.exportSingleEncounter(encounter);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImportEncounter) {
      try {
        const imported = await EncounterStorage.importEncounterSet(file);
        const first = Object.values(imported)[0];
        if (first) onImportEncounter(first);
      } catch (error) {
        console.error('Failed to import encounter:', error);
        alert('Failed to import encounter. Please check the file format.');
      }
    }
    event.target.value = '';
  };

  return (
    <CollapsibleSection
      title={title}
      isOpenByDefault={true}
      description={description}
      className="encounter-section"
      storageKey={`encounter-${encounter.id}-open`}
    >
      <div className="encounter-controls">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button
          className="import-encounter-btn"
          onClick={handleImportClick}
          title="Import encounter from file"
        >
          Import
        </button>
        <button
          className="export-encounter-btn"
          onClick={handleExportEncounter}
          title="Export encounter to file"
        >
          Export
        </button>
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
            factionKey={encounterCreature.factionKey}
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
