import { EncounterSet } from '../../../ts-types/encounter-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EncounterTab from './EncounterTab/EncounterTab';
import './EncounterTabsGroup.css';

type Props = {
  encounterSet: EncounterSet;
  onSelectEncounter: (encounterId: string) => void;
  onAddEncounter: () => void;
  onDeleteEncounter: (encounterId: string) => void;
  onRenameEncounter: (encounterId: string, newName: string) => void;
  onReorderEncounters: (newOrder: string[]) => void;
};

export default function EncounterTabsGroup({
  encounterSet,
  onSelectEncounter,
  onAddEncounter,
  onDeleteEncounter,
  onRenameEncounter,
  onReorderEncounters
}: Props) {
  const canDeleteEncounter = Object.keys(encounterSet.encounters).length > 1;

  return (
    <div className="encounter-tabs">
      <div className="tabs-container">
        {encounterSet.order.map((id) => {
          const encounter = encounterSet.encounters[id];
          if (!encounter) return null;

          return (
            <EncounterTab
              key={id}
              id={id}
              encounter={encounter}
              isActive={id === encounterSet.activeEncounterId}
              canDelete={canDeleteEncounter}
              onSelect={onSelectEncounter}
              onDelete={onDeleteEncounter}
              onRename={onRenameEncounter}
              onReorder={onReorderEncounters}
              allIds={encounterSet.order}
            />
          );
        })}
      </div>
      <button
        className="add-encounter-btn"
        onClick={onAddEncounter}
        title="Create new encounter"
        aria-label="Add new encounter"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
