import React, { useMemo } from "react";
import { TabType, Kit, Perk, Weapon, Item, StatusEffect } from "../../../ts-types/types.tsx";
import CharacterGeneratorTools from "../../../common-design/CharacterGeneratorTools.tsx";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog.tsx";
import FloatingPanelsContainer from "../FloatingPanels/FloatingPanelsContainer.tsx";
import ImportExportPanel from "./ImportExportPanel.tsx";
import NotificationToast, { Notification } from "./NotificationToast.tsx";
import { CharacterStats } from "./CharacterStatsGrid/CharacterStatsGrid.tsx";

import { CharacterStorage } from "../../../common-design/utils/CharacterStorage.tsx";

import './CharacterGenerator.css';
import CharacterCard from "./CharacterCard/CharacterCard.tsx";

// Active status effect with actual X/Y values
export type ActiveStatusEffect = {
  effect: StatusEffect;
  x?: number;
  y?: number;
};

export type CharacterDesign = {
  id: string,
  name: string,
  stats: CharacterStats,
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

export type AttackBonusStat
  = 'Short Range Shooting'
  | 'Medium Range Shooting'
  | 'Long Range Shooting'
  | 'Melee'
  | 'Arcane'
  | 'Thrown';
export type HealthStat = { current: number, max: number };


export default function CharacterGenerator() {
  const page: TabType = 'character-generator';
  const [characters, setCharacters] = React.useState([] as CharacterDesign[]);
  const [selectedCharacterId, setSelectedCharacterId] = React.useState(null as string | null);


  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const hasShownInitialLoadNotification = React.useRef(false);
  
  const [clearAllConfirmDialog, setClearAllConfirmDialog] = React.useState<{
    isOpen: boolean;
    characterCount: number;
  }>({
    isOpen: false,
    characterCount: 0
  });
  
  const selectedCharacter = useMemo(() => 
    characters.find(c => c.id === selectedCharacterId) || null
  , [characters, selectedCharacterId]);

  function generateCharacter() {
    const newChar: CharacterDesign = CharacterGeneratorTools.generateRandomCharacter({
      usedNames: characters.map(c => c.name)
    });
    setCharacters(prev => [...prev, newChar]);
    setSelectedCharacterId(newChar.id);
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

  // Load characters from storage on component mount
  React.useEffect(() => {
    const { characters: savedCharacters, selectedCharacterId: savedSelectedId } = CharacterStorage.loadCharacters();
    if (savedCharacters.length > 0) {
      setCharacters(savedCharacters);
      if (savedSelectedId && savedCharacters.find(c => c.id === savedSelectedId)) {
        setSelectedCharacterId(savedSelectedId);
      }
      // Only show notification on first load to avoid duplicates in development
      if (!hasShownInitialLoadNotification.current) {
        showNotification('success', `Loaded ${savedCharacters.length} saved character(s)`);
        hasShownInitialLoadNotification.current = true;
      }
    }
  }, []);

  // Auto-save characters when they change
  React.useEffect(() => {
    if (characters.length > 0) {
      CharacterStorage.autoSave(characters, selectedCharacterId || undefined);
    }
  }, [characters, selectedCharacterId]);

  // Notification management
  const showNotification = (type: Notification['type'], message: string, duration?: number) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const notification: Notification = { id, type, message, duration };
    setNotifications(prev => [...prev, notification]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Import/Export handlers
  const handleCharactersImported = (importedCharacters: CharacterDesign[], importedSelectedId?: string) => {
    setCharacters(importedCharacters);
    if (importedSelectedId && importedCharacters.find(c => c.id === importedSelectedId)) {
      setSelectedCharacterId(importedSelectedId);
    } else if (importedCharacters.length > 0) {
      setSelectedCharacterId(importedCharacters[0].id);
    } else {
      setSelectedCharacterId(null);
    }
  };

  const handleError = (message: string) => {
    showNotification('error', message);
  };

  const handleSuccess = (message: string) => {
    showNotification('success', message);
  };

  return (<div className={page}>
    <p>
      On this page, you are able to quickly generate a new character at the
      click of a button. Use this to quickly make your first character, or
      to get back into a fight with the least delay possible.
    </p>
    
    <FloatingPanelsContainer
      isDiceRollerVisible={!!selectedCharacter}
      activeStatusEffects={selectedCharacter?.statusEffects ?? []}
      characterName={selectedCharacter ? selectedCharacter.name : 'No Character Selected'}
    />
    
    <div className="character-selector">
      <button className="generate-character-btn magical-button" onClick={generateCharacter}>Generate Character</button>
      {characters.length > 0 && (
        <span>
          <label htmlFor="character-select" className="character-select">Select Character: </label>
          <select
            id="character-select"
            value={selectedCharacterId || ''}
            onChange={(e) => setSelectedCharacterId(e.target.value || null)}
          >
            <option value="">-- Select a character --</option>
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
        </span>
      )}
      {characters.length > 1 && (
        <button
          className="clear-all-btn"
          onClick={clearAllCharacters}
        >
          Clear All Characters
        </button>
      )}
    </div>

    <div className="generated-character-display">
      {
        selectedCharacter != null
        ? <CharacterCard
            character={selectedCharacter}
            characters={characters}
            setCharacters={setCharacters}
            setSelectedCharacterId={setSelectedCharacterId}
          />
        : null
      }
    </div>
    <hr />

    {/* Confirm Dialog */}
    <ConfirmDialog
      isOpen={clearAllConfirmDialog.isOpen}
      onClose={cancelClearAllCharacters}
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
    />

    <ImportExportPanel
      characters={characters}
      selectedCharacterId={selectedCharacterId || undefined}
      onCharactersImported={handleCharactersImported}
      onError={handleError}
      onSuccess={handleSuccess}
    />

    <NotificationToast
      notifications={notifications}
      onDismiss={dismissNotification}
    />
  </div>);
}