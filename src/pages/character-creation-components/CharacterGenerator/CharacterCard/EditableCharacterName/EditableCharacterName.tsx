import React from "react";
import { CharacterDesign } from "../../CharacterGenerator";
import "./EditableCharacterName.css";

type Props = {
  selectedCharacter: CharacterDesign;
  onUpdateName: (name: string) => void;
};
export default function EditableCharacterName({ selectedCharacter, onUpdateName }: Props) {
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [editingName, setEditingName] = React.useState('');

  // Auto-cancel editing when switching characters
  React.useEffect(() => {
    setIsEditingName(false);
    setEditingName('');
  }, [selectedCharacter.id]);

  function startEditingName() {
    if (selectedCharacter) {
      setEditingName(selectedCharacter.name);
      setIsEditingName(true);
    }
  }
  
  function saveNameEdit() {
    if (selectedCharacter && editingName.trim() !== '') {
      onUpdateName(editingName);
    }
    setIsEditingName(false);
    setEditingName('');
  }

  function cancelNameEdit() {
    setIsEditingName(false);
    setEditingName('');
  }
  
  return (<>
    {isEditingName ? (
      <div className="name-edit-container">
        <input
          className="name-edit-input"
          type="text"
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveNameEdit();
            if (e.key === 'Escape') cancelNameEdit();
          }}
          autoFocus
        />
        <button title="Save name"
          className="save-name-btn"
          onClick={saveNameEdit}
        >
          ✓
        </button>
        <button title="Cancel"
          className="cancel-name-btn"
          onClick={cancelNameEdit}
        >
          ✕
        </button>
      </div>
    ) : (
      <span title="Click to edit name"
        className="editable-name"
        onClick={startEditingName}
      >
        {selectedCharacter.name}
      </span>
    )}
  </>);
}