import React, { useState } from 'react';
import { EncounterSet, Encounter } from '../../../ts-types/encounter-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './EncounterTabs.css';

type Props = {
  encounterSet: EncounterSet;
  onSelectEncounter: (encounterId: string) => void;
  onAddEncounter: () => void;
  onDeleteEncounter: (encounterId: string) => void;
  onRenameEncounter: (encounterId: string, newName: string) => void;
};

export default function EncounterTabs({
  encounterSet,
  onSelectEncounter,
  onAddEncounter,
  onDeleteEncounter,
  onRenameEncounter
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveEdit = (id: string) => {
    if (editingName.trim()) {
      onRenameEncounter(id, editingName.trim());
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="encounter-tabs">
      <div className="tabs-container">
        {Object.entries(encounterSet.encounters).map(([id, encounter]: [string, Encounter]) => (
          <div
            key={id}
            className={`tab ${id === encounterSet.activeEncounterId ? 'active' : ''}`}
          >
            {editingId === id ? (
              <input
                type="text"
                className="tab-edit-input"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleSaveEdit(id)}
                onKeyDown={(e) => handleKeyDown(e, id)}
                autoFocus
              />
            ) : (
              <>
                <button
                  className="tab-button"
                  onClick={() => onSelectEncounter(id)}
                  onDoubleClick={() => handleStartEdit(id, encounter.name)}
                  title="Double-click to rename"
                >
                  {encounter.name}
                </button>
                {Object.keys(encounterSet.encounters).length > 1 && (
                  <button
                    className="tab-delete-btn"
                    onClick={() => onDeleteEncounter(id)}
                    title="Delete encounter"
                    aria-label={`Delete ${encounter.name}`}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </>
            )}
          </div>
        ))}
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
