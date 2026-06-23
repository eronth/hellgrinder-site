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
  onReorder: (newOrder: string[]) => void;
  allIds: string[];
};

export default function EncounterTab({
  id,
  encounter,
  isActive,
  canDelete,
  onSelect,
  onDelete,
  onRename,
  onReorder,
  allIds
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(encounter.name);
  const [draggedOverId, setDraggedOverId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);

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

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverId(id);
  };

  const handleDragLeave = () => {
    setDraggedOverId(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');

    if (draggedId !== id) {
      const draggedIndex = allIds.indexOf(draggedId);
      const targetIndex = allIds.indexOf(id);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newOrder = [...allIds];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedId);
        onReorder(newOrder);
      }
    }

    setDraggedOverId(null);
  };

  return (
    <div
      ref={tabRef}
      className={`encounter-tab ${isActive ? 'active' : ''} ${draggedOverId === id ? 'drag-over' : ''}`}
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
            title="Double-click to rename, drag to reorder"
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
