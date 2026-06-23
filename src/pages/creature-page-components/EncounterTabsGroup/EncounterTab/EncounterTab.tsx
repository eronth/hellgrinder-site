import { useRef, useState, useEffect } from "react";
import { Encounter } from "../../../../ts-types/encounter-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './EncounterTab.css';

type Props = {
  id: string;
  encounter: Encounter;
  isActive: boolean;
  canDelete: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
};
export default function EncounterTab({
  id,
  encounter,
  isActive,
  canDelete,
  onSelect,
  onDelete,
  onRename
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(encounter.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditName(encounter.name);
  };

  const handleSaveEdit = () => {
    if (editName.trim()) {
      onRename(id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <div className={`encounter-tab ${isActive ? 'active' : ''}`}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="tab-edit-input"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          autoFocus
        />
      ) : (
        <>
          <button
            className="tab-button"
            onClick={() => onSelect(id)}
            onDoubleClick={handleStartEdit}
            title="Double-click to rename"
          >
            {encounter.name}
          </button>
          {canDelete && (
            <button
              className="tab-delete-btn"
              onClick={() => onDelete(id)}
              title="Delete encounter"
              aria-label={`Delete ${encounter.name}`}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
