import React from "react";
import { CharacterDesign } from "../../CharacterGenerator";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import TransferAndDeleteConfirmDialog from "./TransferAndDeleteConfirmDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
  character: CharacterDesign;
  characters: CharacterDesign[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterDesign[]>>;
  setSelectedCharacterId: React.Dispatch<React.SetStateAction<string | null>>;
};
export default function DeleteCharacterButton({
  character,
  characters,
  setCharacters,
  setSelectedCharacterId
}: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState<boolean>(false);
  const [isTransferAndDeleteDialogOpen, setIsTransferAndDeleteDialogOpen] = React.useState<boolean>(false);
  const [needsNewCharacter, setNeedsNewCharacter] = React.useState<boolean>(false);

  function onDeleteCharacter(characterId: string) {
    const characterToDelete = characters.find(c => c.id === characterId);
    if (!characterToDelete) return;
    
    const weaponCount = characterToDelete.inventory.weapons.length;
    const itemCount = characterToDelete.inventory.items.length;
    const hasInventory = weaponCount > 0 || itemCount > 0;
    
    if (hasInventory) {
      // Character has inventory items, show transfer dialog
      const otherCharacters = characters.filter(c => c.id !== characterId);
      setNeedsNewCharacter(otherCharacters.length === 0);
      setIsTransferAndDeleteDialogOpen(true);
    } else {
      // No inventory, show regular delete confirmation
      setIsDeleteDialogOpen(true);
    }
  }
  return (<>
    <button 
      className="delete-character-btn" 
      onClick={() => onDeleteCharacter(character.id)}
      title="Delete this character"
    >
      <span className="delete-icon mobile" aria-hidden="true">
        <FontAwesomeIcon icon={faTrash} />
      </span>
      <span className="non-mobile delete-full-text">
        Delete Character
      </span>
    </button>
    <DeleteConfirmDialog
      isOpenReactState={[isDeleteDialogOpen, setIsDeleteDialogOpen]}
      character={character}
      characters={characters}
      setCharacters={setCharacters}
      setSelectedCharacterId={setSelectedCharacterId}
    />
    <TransferAndDeleteConfirmDialog
      isOpenReactState={[isTransferAndDeleteDialogOpen, setIsTransferAndDeleteDialogOpen]}
      character={character}
      characters={characters}
      setCharacters={setCharacters}
      setSelectedCharacterId={setSelectedCharacterId}
      needsNewCharacter={needsNewCharacter}
    />
  </>);
}
