import { useMemo, useState } from "react";
import ConfirmDialog from "../../ConfirmDialog";
import { CharacterDesign } from "../../CharacterGenerator";
import CharacterGeneratorTools from "../../../../../common-design/CharacterGeneratorTools";

type Props = {
  isOpenReactState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  character: CharacterDesign;
  characters: CharacterDesign[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterDesign[]>>;
  setSelectedCharacterId: React.Dispatch<React.SetStateAction<string | null>>;
  needsNewCharacter?: boolean;
};
export default function TransferAndDeleteConfirmDialog({
  isOpenReactState,
  character,
  characters,
  setCharacters,
  setSelectedCharacterId,
  needsNewCharacter = false,
}: Props) {

  const [isOpen, setIsOpen] = isOpenReactState;
  const [targetCharacterId, setTargetCharacterId] = useState<string>('');
  
  const dialogMessage = useMemo(() => {  
    const weaponCount = character.inventory.weapons.length;
    const itemCount = character.inventory.items.length;

    const itemText = weaponCount > 0 && itemCount > 0 
      ? `${weaponCount} weapon${weaponCount !== 1 ? 's' : ''} and ${itemCount} item${itemCount !== 1 ? 's' : ''}`
      : weaponCount > 0 
        ? `${weaponCount} weapon${weaponCount !== 1 ? 's' : ''}`
        : `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
    
    if (needsNewCharacter) {
      return `"${character.name}" has ${itemText}. Would you like to generate a new character and transfer the items to them?`;
    } else {
      return `"${character.name}" has ${itemText}. Would you like to transfer them to another character?`;
    }
  }, [character, needsNewCharacter]);


  function cancelInventoryTransfer() {
    setIsOpen(false);
  }

  function confirmDeleteCharacterWithoutTransfer() {
    setCharacters(prev => prev.filter(c => c.id !== character.id));
    const remainingChars = characters.filter(c => c.id !== character.id);
    setSelectedCharacterId(
      (remainingChars.length > 0)
      ? remainingChars[0].id
      : null
    );

    setIsOpen(false);
  }

  function confirmDeleteCharacterWithInventoryTransfer() {
    const characterToDelete = characters.find(c => c.id === character.id);
    if (!characterToDelete) return;

    let finalTargetId = targetCharacterId;

    if (needsNewCharacter) {
      const newChar: CharacterDesign = CharacterGeneratorTools.generateRandomCharacter({
        usedNames: characters.map(c => c.name)
      });
      
      // Add the new character to the list
      setCharacters(prev => [...prev.filter(c => c.id !== character.id), newChar]);
      finalTargetId = newChar.id;
      
      // Transfer inventory to the new character
      newChar.inventory = {
        weapons: [...characterToDelete.inventory.weapons],
        items: [...characterToDelete.inventory.items]
      };
      
      // Set the new character as selected
      setSelectedCharacterId(newChar.id);
    } else {
      // Transfer inventory to existing character
      const targetCharacter = characters.find(c => c.id === finalTargetId);
      if (targetCharacter) {
        const updatedInventory = {
          weapons: [...targetCharacter.inventory.weapons, ...characterToDelete.inventory.weapons],
          items: [...targetCharacter.inventory.items, ...characterToDelete.inventory.items]
        };
        
        // Update the target character and remove the deleted character
        setCharacters(prev => 
          prev
            .filter(c => c.id !== character.id)
            .map(c => c.id === finalTargetId ? { ...c, inventory: updatedInventory } : c)
        );
        
        // Update selected character if needed
        setSelectedCharacterId(targetCharacter.id);
      }
    }

    setIsOpen(false);
  }

  return (<>
    <ConfirmDialog
      isOpen={isOpen}
      title="Transfer Inventory"
      message={dialogMessage}
      buttons={[
        {
          text: "Cancel",
          onClick: cancelInventoryTransfer,
          variant: 'secondary'
        },
        {
          text: "Delete Without Transfer",
          onClick: confirmDeleteCharacterWithoutTransfer,
          variant: 'danger'
        },
        {
          text: needsNewCharacter ? "Generate & Transfer" : "Transfer",
          onClick: confirmDeleteCharacterWithInventoryTransfer,
          variant: 'primary',
          autoFocus: true        }
      ]}
    >
      {isOpen && !needsNewCharacter && (
        <div className="transfer-options">
          <label htmlFor="inventory-transfer-target">Transfer to:</label>
          <select
            id="inventory-transfer-target"
            value={targetCharacterId}
            onChange={(e) => setTargetCharacterId(e.target.value)}
          >
            {characters.filter(c => c.id !== character.id).map(char => (
              <option key={char.id} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </ConfirmDialog>
  </>);
}
