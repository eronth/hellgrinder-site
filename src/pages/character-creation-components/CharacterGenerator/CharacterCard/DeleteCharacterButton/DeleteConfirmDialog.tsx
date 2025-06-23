import React from "react";
import ConfirmDialog from "../../ConfirmDialog";
import { CharacterDesign } from "../../CharacterGenerator";

type Props = {
  isOpenReactState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  character: CharacterDesign;
  characters: CharacterDesign[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterDesign[]>>;
  setSelectedCharacterId: React.Dispatch<React.SetStateAction<string | null>>;
};
export default function DeleteConfirmDialog({
  isOpenReactState,
  character,
  characters,
  setCharacters,
  setSelectedCharacterId
}: Props) {
  const [isOpen, setIsOpen] = isOpenReactState;

  function cancelDeleteCharacter() {
    setIsOpen(false);
  }

  function confirmDeleteCharacter() {
    setCharacters(prev => prev.filter(c => c.id !== character.id));
    const remainingChars = characters.filter(c => c.id !== character.id);
    setSelectedCharacterId(
      (remainingChars.length > 0)
      ? remainingChars[0].id
      : null
    );

    setIsOpen(false);
  }

  return (<>
    <ConfirmDialog
      isOpen={isOpen}
      title="Delete Character"
      message={`Are you sure you want to delete "${character.name}"? This action cannot be undone.`}
      buttons={[
        {
          text: "Cancel",
          onClick: cancelDeleteCharacter,
          variant: 'secondary'
        },
        {
          text: "Delete",
          onClick: confirmDeleteCharacter,
          variant: 'danger',
          autoFocus: true
        }
      ]}
    />
  </>);
}
