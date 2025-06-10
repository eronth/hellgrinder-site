import React from "react";
import { TabType, Kit, Perk, DamageElement, Weapon, Item, StatusEffect } from "../../ts-types/types.tsx";
import { SkillChecks } from "../../ts-types/tag-types.tsx";

import KitComponent from "./kits/Kit.tsx";
import PerkComponent from "./perks/PerkComponent.tsx";
import WeaponComponent from "./kits/weapon/WeaponComponent.tsx";
import ItemComponent from "./kits/item/ItemComponent.tsx";

import Tools from "../../common-design/Tools.tsx";

import CombatKits from "../../common-design/equipment/combat-kits.tsx";
import SupportKits from "../../common-design/equipment/support-kits.tsx";
import Perks from "../../common-design/equipment/perks.tsx";
import CharacterStartingStatsTable from "./CharacterStartingStatsTable.tsx";
import ConfirmDialog from "./ConfirmDialog.tsx";
import InventoryManager from "./InventoryManager.tsx";
import StatusEffectsManager from "./StatusEffectsManager.tsx";
import FloatingStatusEffects from "./FloatingStatusEffects.tsx";

import './CharacterGenerator.css';

// Active status effect with actual X/Y values
export type ActiveStatusEffect = {
  effect: StatusEffect;
  x?: number;
  y?: number;
};

export type CharDesign = {
  id: string,
  name: string,
  stats: CharStats,
  startingCombatKits: number, startingSupportKits: number,
  kits: Kit[], 
  perks: Perk[], // All perks (starting + acquired)
  bonuses: string[],
  specializationBonus: string, specializationPenalty: string,
  // Separate inventory for items/weapons acquired during play
  inventory: {
    weapons: Weapon[],
    items: Item[]
  },
  // Active status effects with their actual X/Y values
  statusEffects: ActiveStatusEffect[]
};

export type CharStats = {
  health: { current: number, max: number };
  injuries: number;
  speed: number;
  corruption: number;
  perkPoints: number;
  safelightShards: number;
  attackBonus: 'Short Range Shooting' | 'Medium Range Shooting' | 'Long Range Shooting' | 'Melee',
};

export default function CharacterGenerator() {
  const page: TabType = 'character-generator';
  const [characters, setCharacters] = React.useState([] as CharDesign[]);
  const [selectedCharacterId, setSelectedCharacterId] = React.useState(null as string | null);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [editingName, setEditingName] = React.useState('');
    // Confirm dialog states
  const [deleteConfirmDialog, setDeleteConfirmDialog] = React.useState<{
    isOpen: boolean;
    characterId: string;
    characterName: string;
  }>({
    isOpen: false,
    characterId: '',
    characterName: ''
  });

  const [inventoryTransferDialog, setInventoryTransferDialog] = React.useState<{
    isOpen: boolean;
    characterId: string;
    characterName: string;
    weaponCount: number;
    itemCount: number;
    targetCharacterId: string;
    willCreateNewCharacter: boolean;
  }>({
    isOpen: false,
    characterId: '',
    characterName: '',
    weaponCount: 0,
    itemCount: 0,
    targetCharacterId: '',
    willCreateNewCharacter: false
  });
  
  const [clearAllConfirmDialog, setClearAllConfirmDialog] = React.useState<{
    isOpen: boolean;
    characterCount: number;
  }>({
    isOpen: false,
    characterCount: 0
  });
  
  const selectedCharacter = characters.find(c => c.id === selectedCharacterId) || null;
  
  const characterNames = [
    "Ash Walker", "Steel Heart", "Shadow Bane", "Iron Will", "Night Stalker",
    "Flame Bearer", "Storm Rider", "Ghost Walker", "Blood Hunter", "Soul Reaper",
    "War Hammer", "Death Whisper", "Void Walker", "Crimson Edge", "Thunder Strike",
    "Dark Flame", "Ice Heart", "Wind Runner", "Stone Guard", "Light Bringer"
  ];
  const characterDefaults: Omit<CharDesign, 'id' | 'name'> = {
    stats: {
      health: { current: 6, max: 6 },
      injuries: 0, speed: 5,
      corruption: 0, safelightShards: 2,
      perkPoints: 2,
      attackBonus: 'Melee',
    },    startingCombatKits: 1, startingSupportKits: 1,
    kits: [], perks: [], bonuses: [],
    specializationBonus: '', specializationPenalty: '',
    inventory: {
      weapons: [],
      items: []
    },
    statusEffects: []
  };
  const specializationOptions: SkillChecks[] = [
  'Might', 'Endurance', 'Agility', 'Stealth' , 'Observation' ,
  'Communication', 'Stoic',
  'Recovery' , 'Corruption',
  ];
  function generateCharacter() {
    // Generate a character
    let rand: number;
    const combatKitsArr = Tools.sortKits(CombatKits);
    const supportKitsArr = Tools.sortKits(SupportKits);

    // Start with default values.
    const newChar: CharDesign = {
      ...JSON.parse(JSON.stringify(characterDefaults)),
      id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: getRandomCharacterName()
    };

    // Determine specialization bonus and penalty
    const so = [...specializationOptions]
    rand = Math.floor(Math.random() * so.length);
    newChar.specializationBonus = so[rand];
    so.splice(rand, 1);
    rand = Math.floor(Math.random() * so.length);
    newChar.specializationPenalty = so[rand];

    // Determine starting combat kit
    rand = Math.floor(Math.random() * combatKitsArr.length);
    const chosenCombatKit = structuredClone(combatKitsArr[rand]);
    newChar.startingSupportKits += chosenCombatKit.extraSupportKits ?? 0;
    newChar.stats.perkPoints += chosenCombatKit.extraPerkPoints ?? 0;
    specialKitLogic(chosenCombatKit);
    newChar.kits.push(chosenCombatKit);

    for (let i = 0; i < newChar.startingSupportKits; i++) {
      let rand = Math.floor(Math.random() * supportKitsArr.length);
      while (newChar.kits.includes(supportKitsArr[rand])) {
        rand = Math.floor(Math.random() * supportKitsArr.length);
      }
      const chosenSupportKit = structuredClone(supportKitsArr[rand]);
      specialKitLogic(chosenSupportKit);
      newChar.kits.push(chosenSupportKit);
    }
    newChar.perks = getPerks(newChar.stats.perkPoints);
    handleSelectedPerksLogic({ character: newChar });

    setCharacters(prev => [...prev, newChar]);
    setSelectedCharacterId(newChar.id);
  }

  
  function getPerks(perkPoints: number) {
    const perksArr: Perk[] = [...Tools.sortPerks(Perks)];

    const perks: Perk[] = [];
    let spentPoints = 0;
    while(spentPoints < perkPoints) {
      let retries = 100;
      let rand = Math.floor(Math.random() * perksArr.length);
      while ((perks.includes(perksArr[rand]) || spentPoints + perksArr[rand].cost > perkPoints) && retries > 0) {
        rand = Math.floor(Math.random() * perksArr.length);
        retries--;
      }
      
      if (retries <= 0) { break; }
      const chosenPerk = structuredClone(perksArr[rand]);

      spentPoints += chosenPerk.cost;
      perks.push(chosenPerk);
      perksArr.splice(rand, 1);
    }

    return perks;
  }
  
  function handleSelectedPerksLogic({ character }: { character: CharDesign }) {
    let perksCost = 0;
    character.perks.forEach((p: Perk) => {
      specialPerkLogic(p);
      perksCost += p.cost
      character.stats.corruption += p.startingCorruption ?? 0;
    });
    character.stats.perkPoints -= perksCost;

  }
  
  
  
  function specialKitLogic(kit: Kit) {
    if (kit.name === "Helltouched") {
      const damageTypes: DamageElement[] = ['Metal', 'Infernal', 'Abyssal', 'Verdant', 'Chthonic', 'Nethercurrent', 'Voidyr'];
      const rand = Math.floor(Math.random() * damageTypes.length);
      kit.weapons[0].attackModes[0].damage.l.type = damageTypes[rand];
      kit.weapons[0].attackModes[0].damage.m.type = damageTypes[rand];
      kit.weapons[0].attackModes[0].damage.h.type = damageTypes[rand];
      kit.weapons[0].attackModes[0].effects = [`When you hit an an enemy that has Resist ${damageTypes[rand]} to ${damageTypes[rand]} Damage, you can forgo damage to reduce their Resist ${damageTypes[rand]} by 1 for the rest of the encounter.`];
    } else if (kit.name === "Relic Worker") {
      // Randomly remove all but 3 relics
      while (kit.items.length > 4) { // Do 4 to keep the description chunk.
        // Randomly choose any item NOT INCLUDING the description block to remove.
        const rand = Math.floor(Math.random() * (kit.items.length-1)) + 1;
        kit.items.splice(rand, 1);
      }
    }
  }
  
  function specialPerkLogic(perk: Perk) {
    if (perk.name === "Hellspawn") {
      const damageTypes: DamageElement[] = ['Infernal', 'Abyssal', 'Verdant', 'Chthonic', 'Nethercurrent', 'Voidyr'];
      const rand = Math.floor(Math.random() * damageTypes.length);
      perk.description = `You are a creature of the nether realms, or at least partially. `
        + `You are aligned with ${damageTypes[rand]}. `
        + `Your melee attacks can deal ${damageTypes[rand]} instead of their default type. `
        + `You also gain Absorb ${damageTypes[rand]} 1.`;
    }
  }  function deleteCharacter(characterId: string) {
    const characterToDelete = characters.find(c => c.id === characterId);
    if (!characterToDelete) return;
    
    const characterName = characterToDelete.name;
    const weaponCount = characterToDelete.inventory.weapons.length;
    const itemCount = characterToDelete.inventory.items.length;
    const hasInventory = weaponCount > 0 || itemCount > 0;
    
    if (hasInventory) {
      // Character has inventory items, show transfer dialog
      const otherCharacters = characters.filter(c => c.id !== characterId);
      const willCreateNewCharacter = otherCharacters.length === 0;
      
      setInventoryTransferDialog({
        isOpen: true,
        characterId,
        characterName,
        weaponCount,
        itemCount,
        targetCharacterId: willCreateNewCharacter ? '' : otherCharacters[0].id,
        willCreateNewCharacter
      });
    } else {
      // No inventory, show regular delete confirmation
      setDeleteConfirmDialog({
        isOpen: true,
        characterId,
        characterName
      });
    }
  }
  
  function confirmDeleteCharacter() {
    const { characterId } = deleteConfirmDialog;
    
    setCharacters(prev => prev.filter(c => c.id !== characterId));
    if (selectedCharacterId === characterId) {
      const remainingChars = characters.filter(c => c.id !== characterId);
      setSelectedCharacterId(remainingChars.length > 0 ? remainingChars[0].id : null);
    }
    
    setDeleteConfirmDialog({ isOpen: false, characterId: '', characterName: '' });
  }
    function cancelDeleteCharacter() {
    setDeleteConfirmDialog({ isOpen: false, characterId: '', characterName: '' });
  }

  function confirmInventoryTransfer() {
    const { characterId, targetCharacterId, willCreateNewCharacter } = inventoryTransferDialog;
    const characterToDelete = characters.find(c => c.id === characterId);
    if (!characterToDelete) return;

    let finalTargetId = targetCharacterId;

    if (willCreateNewCharacter) {
      // Generate a new character to receive the inventory
      const newChar: CharDesign = {
        ...JSON.parse(JSON.stringify(characterDefaults)),
        id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: getRandomCharacterName()
      };
      
      // Add the new character to the list
      setCharacters(prev => [...prev.filter(c => c.id !== characterId), newChar]);
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
            .filter(c => c.id !== characterId)
            .map(c => c.id === finalTargetId ? { ...c, inventory: updatedInventory } : c)
        );
        
        // Update selected character if needed
        if (selectedCharacterId === characterId) {
          setSelectedCharacterId(finalTargetId);
        }
      }
    }

    setInventoryTransferDialog({
      isOpen: false,
      characterId: '',
      characterName: '',
      weaponCount: 0,
      itemCount: 0,
      targetCharacterId: '',
      willCreateNewCharacter: false
    });
  }

  function cancelInventoryTransfer() {
    // Show regular delete confirmation instead
    const { characterId, characterName } = inventoryTransferDialog;
    
    setInventoryTransferDialog({
      isOpen: false,
      characterId: '',
      characterName: '',
      weaponCount: 0,
      itemCount: 0,
      targetCharacterId: '',
      willCreateNewCharacter: false
    });
    
    setDeleteConfirmDialog({
      isOpen: true,
      characterId,
      characterName
    });
  }
  function getRandomCharacterName(): string {
    const usedNames = characters.map(c => c.name);
    const availableNames = characterNames.filter(name => !usedNames.includes(name));
    
    if (availableNames.length === 0) {
      return `Character ${characters.length + 1}`;
    }
    
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    return availableNames[randomIndex];
  }

  // Group identical perks and count them
  function groupPerks(perks: Perk[]): Array<{ perk: Perk; count: number }> {
    const perkGroups = new Map<string, { perk: Perk; count: number }>();
    
    perks.forEach(perk => {
      const key = perk.name; // Group by perk name
      if (perkGroups.has(key)) {
        perkGroups.get(key)!.count++;
      } else {
        perkGroups.set(key, { perk: perk, count: 1 });
      }
    });
    
    // Sort alphabetically by perk name
    return Array.from(perkGroups.values()).sort((a, b) => 
      a.perk.name.localeCompare(b.perk.name)
    );
  }

  function clearAllCharacters() {
    const characterCount = characters.length;
    
    setClearAllConfirmDialog({
      isOpen: true,
      characterCount
    });
  }
  
  function confirmClearAllCharacters() {
    setCharacters([]);
    setSelectedCharacterId(null);
    setClearAllConfirmDialog({ isOpen: false, characterCount: 0 });
  }
  
  function cancelClearAllCharacters() {
    setClearAllConfirmDialog({ isOpen: false, characterCount: 0 });
  }
  function updateCharacterName(characterId: string, newName: string) {
    if (newName.trim() === '') return;
    
    setCharacters(prev => 
      prev.map(char => 
        char.id === characterId 
          ? { ...char, name: newName.trim() }
          : char
      )
    );
  }

  function updateCharacterStats(characterId: string, newStats: CharStats) {
    console.log('Characters before update:', characters);
    console.log('Updating character stats for ID:', characterId, 'with new stats:', newStats);
    const charToUpdate = characters.find(c => c.id === characterId);
    if (!charToUpdate) return;
    charToUpdate.stats = {
      ...charToUpdate.stats,
      ...newStats
    };

    setCharacters(prev => 
      prev.map(char => 
        char.id === characterId 
          ? { ...char, stats: charToUpdate.stats }
          : char
      )
    );
    console.log('Characters after update:', characters);
  }

  function updateCharacter(characterId: string, updates: Partial<CharDesign>) {
    setCharacters(prev => 
      prev.map(char => 
        char.id === characterId 
          ? { ...char, ...updates }
          : char
      )
    );
  }

  function startEditingName() {
    if (selectedCharacter) {
      setEditingName(selectedCharacter.name);
      setIsEditingName(true);
    }
  }

  function saveNameEdit() {
    if (selectedCharacter && editingName.trim() !== '') {
      updateCharacterName(selectedCharacter.id, editingName);
    }
    setIsEditingName(false);
    setEditingName('');
  }

  function cancelNameEdit() {
    setIsEditingName(false);
    setEditingName('');
  } // Auto-cancel editing when switching characters
  React.useEffect(() => {
    setIsEditingName(false);
    setEditingName('');
  }, [selectedCharacterId]);

  return (<div className={page}>
    <p>
      On this page, you are able to quickly generate a new character at the
      click of a button. Use this to quickly make your first character, or
      to get back into a fight with the least delay possible.
    </p>
    <FloatingStatusEffects
      statusEffects={selectedCharacter?.statusEffects ?? []}
      characterName={selectedCharacter ? selectedCharacter.name : 'No Character Selected'}    />
    <div className="character-selector">
      <button className="generate-character-btn magical-button" onClick={generateCharacter}>Generate Character</button>
      {characters.length > 0 && (
        <>
          <label htmlFor="character-select" className="character-select">Select Character: </label>
          <select
            id="character-select"
            value={selectedCharacterId || ''}
            onChange={(e) => setSelectedCharacterId(e.target.value || null)}
          >              <option value="">-- Select a character --</option>
            {characters.map((character) => {
              const kitNames = character.kits.length > 0 
                ? character.kits.map(kit => kit.name).join(', ')
                : 'No kits';
              return (
                <option key={character.id} value={character.id}>
                  {character.name}
                  &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  {kitNames}
                </option>
              );
            })}
          </select>
        </>
      )}
      {characters.length > 1 && (
        <button
          className="clear-all-btn"
          onClick={clearAllCharacters}
          style={{ marginLeft: '1rem' }}
        >
          Clear All Characters
        </button>
      )}
    </div>
    
    {selectedCharacter != null
    ? <div className="generated-character-display">
        <div className="name-header">
          <div className="character-name">
            {isEditingName ? (
              <div className="name-edit-container">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveNameEdit();
                    if (e.key === 'Escape') cancelNameEdit();
                  }}
                  className="name-edit-input"
                  autoFocus
                />
                <button onClick={saveNameEdit} className="save-name-btn" title="Save name">
                  ✓
                </button>
                <button onClick={cancelNameEdit} className="cancel-name-btn" title="Cancel">
                  ✕
                </button>
              </div>
            ) : (
              <span onClick={startEditingName} className="editable-name" title="Click to edit name">
                {selectedCharacter.name}
              </span>
            )}
          </div>
          <div>
            {/* Status Effects Manager */}
            <StatusEffectsManager
              characters={characters}
              selectedCharacterId={selectedCharacter.id}
              onUpdateCharacter={updateCharacter}
            />
            {selectedCharacterId && (
              <button 
                className="delete-character-btn" 
                onClick={() => deleteCharacter(selectedCharacterId)}
                title="Delete this character"
              >
                Delete Character
              </button>
            )}
          </div>
        </div>        
        <div className="col-handler">          
          <div>
            <CharacterStartingStatsTable
              currentHealth={selectedCharacter.stats.health.current}
              maxHealth={selectedCharacter.stats.health.max}
              injuries={selectedCharacter.stats.injuries}
              speed={selectedCharacter.stats.speed}
              corruption={selectedCharacter.stats.corruption}
              perkPoints={selectedCharacter.stats.perkPoints}
              safelightShards={selectedCharacter.stats.safelightShards}
              attackBonus={selectedCharacter.stats.attackBonus}
              isEditable={true}
              onStatsChange={(newStats) => updateCharacterStats(selectedCharacter.id, newStats)}
            />            <div className="specialization-block">
              <div className="title">Specializations</div>
              <div>+3 [{selectedCharacter.specializationBonus} Checks] (bonus)</div>
              <div>-5 [{selectedCharacter.specializationPenalty} Checks] (penalty)</div>
            </div>
            
            {groupPerks(selectedCharacter.perks).map((perkGroup, i) =>
              <PerkComponent 
                key={`perk-${i}`} 
                perk={perkGroup.perk} 
                count={perkGroup.count}
              />
            )}
          </div>
            {selectedCharacter.kits.map((k, i) =>
            <KitComponent key={`kit-${i}`} kit={k}/>
          )}
        </div>
        <div className="inventory-button-container">
          {/* Inventory Manager */}
          <InventoryManager
            characters={characters}
            selectedCharacterId={selectedCharacter.id}
            onUpdateCharacter={updateCharacter}
          />
        </div>
        <div>
          {/* Display inventory items */}
          {(selectedCharacter.inventory.weapons.length > 0 || selectedCharacter.inventory.items.length > 0) && (
            <div className="inventory-display">
              <div className="inventory-title">Acquired Equipment</div>
              <div className="col-handler">
                {selectedCharacter.inventory.weapons.map((w, i) =>
                  <WeaponComponent key={`inventory-weapon-${i}`} weapon={w} />
                )}
                {selectedCharacter.inventory.items.map((item, i) =>
                  <ItemComponent key={`inventory-item-${i}`} item={item} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      : <div className="generated-character-display"></div>
    }
    <hr />
    
    {/* Confirm Dialogs */}    <ConfirmDialog
      isOpen={deleteConfirmDialog.isOpen}
      title="Delete Character"
      message={`Are you sure you want to delete "${deleteConfirmDialog.characterName}"? This action cannot be undone.`}
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
    />      <ConfirmDialog
      isOpen={clearAllConfirmDialog.isOpen}
      title="Clear All Characters"
      message={`Are you sure you want to delete all ${clearAllConfirmDialog.characterCount} character${clearAllConfirmDialog.characterCount !== 1 ? 's' : ''}? This action cannot be undone.`}
      buttons={[
        {
          text: "Cancel",
          onClick: cancelClearAllCharacters,
          variant: 'secondary'
        },
        {
          text: "Clear All",
          onClick: confirmClearAllCharacters,
          variant: 'danger',
          autoFocus: true
        }
      ]}
    /><ConfirmDialog
      isOpen={inventoryTransferDialog.isOpen}
      title="Transfer Inventory"
      message={(() => {
        const { characterName, weaponCount, itemCount, willCreateNewCharacter } = inventoryTransferDialog;
        const itemText = weaponCount > 0 && itemCount > 0 
          ? `${weaponCount} weapon${weaponCount !== 1 ? 's' : ''} and ${itemCount} item${itemCount !== 1 ? 's' : ''}`
          : weaponCount > 0 
            ? `${weaponCount} weapon${weaponCount !== 1 ? 's' : ''}`
            : `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
        
        if (willCreateNewCharacter) {
          return `"${characterName}" has ${itemText}. Would you like to generate a new character and transfer the items to them?`;
        } else {
          return `"${characterName}" has ${itemText}. Would you like to transfer them to another character?`;
        }
      })()}
      buttons={[
        {
          text: "Cancel",
          onClick: () => setInventoryTransferDialog({
            isOpen: false,
            characterId: '',
            characterName: '',
            weaponCount: 0,
            itemCount: 0,
            targetCharacterId: '',
            willCreateNewCharacter: false
          }),
          variant: 'secondary'
        },
        {
          text: "Delete Without Transfer",
          onClick: cancelInventoryTransfer,
          variant: 'danger'
        },
        {
          text: inventoryTransferDialog.willCreateNewCharacter ? "Generate & Transfer" : "Transfer",
          onClick: confirmInventoryTransfer,
          variant: 'primary',
          autoFocus: true        }
      ]}
    >
      {inventoryTransferDialog.isOpen && !inventoryTransferDialog.willCreateNewCharacter && (
        <div className="transfer-options">
          <label htmlFor="inventory-transfer-target">Transfer to:</label>
          <select
            id="inventory-transfer-target"
            value={inventoryTransferDialog.targetCharacterId}
            onChange={(e) => setInventoryTransferDialog(prev => ({
              ...prev,
              targetCharacterId: e.target.value
            }))}
          >
            {characters.filter(c => c.id !== inventoryTransferDialog.characterId).map(char => (
              <option key={char.id} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </ConfirmDialog>
  </div>);
}