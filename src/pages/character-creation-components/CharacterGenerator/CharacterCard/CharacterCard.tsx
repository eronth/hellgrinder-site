import React from "react";
import { CharacterDesign } from "../CharacterGenerator";
import CharacterStartingStatsTable, { CharacterStats } from "../CharacterStartingStatsTable";
import InventoryManager from "../InventoryManager";
import StatusEffectsManager from "../StatusEffectsManager";
import EditableCharacterName from "./EditableCharacterName/EditableCharacterName.tsx";
import CharacterPerksDisplay from "./CharacterPerksDisplay/CharacterPerksDisplay.tsx";
import CharacterInventoryDisplay from "./CharacterInventoryDisplay/CharacterInventoryDisplay.tsx";
import DeleteCharacterButton from "./DeleteCharacterButton/DeleteCharacterButton.tsx";
import CharacterKitsDisplay from "./CharacterKitsDisplay/CharacterKitsDisplay.tsx";

type Props = {
  character: CharacterDesign;
  characters: CharacterDesign[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterDesign[]>>;
  setSelectedCharacterId: React.Dispatch<React.SetStateAction<string | null>>;
};
export default function CharacterCard({
  character,
  characters,
  setCharacters,
  setSelectedCharacterId,
}: Props) {

  function updateCharacterName(newName: string) {
    if (newName.trim() === '') return;
    
    setCharacters(prev => 
      prev.map(c => 
        c.id === character.id 
          ? { ...c, name: newName.trim() }
          : c
      )
    );
  }

  function updateCharacterStats(newStats: CharacterStats) {
    const combinedStats = {
      ...character.stats,
      ...newStats
    };

    setCharacters(prev => 
      prev.map(c => 
        c.id === character.id
          ? { ...c, stats: combinedStats }
          : c
      )
    );
  }

  function updateCharacter(characterId: string, updates: Partial<CharacterDesign>) {
    setCharacters(prev => 
      prev.map(char => 
        char.id === characterId 
          ? { ...char, ...updates }
          : char
      )
    );
  }

  return (<>
    <div className="name-header">
      <div className="character-name">
        <EditableCharacterName
          selectedCharacter={character}
          onUpdateName={updateCharacterName}
        />
      </div>
      <div>
        {/* Status Effects Manager */}
        <StatusEffectsManager
          character={character}
          selectedCharacterId={character.id}
          onUpdateCharacter={updateCharacter}
        />
        {character.id && (
          <DeleteCharacterButton
            character={character}
            setSelectedCharacterId={setSelectedCharacterId}
            characters={characters}
            setCharacters={setCharacters}
          />
        )}
      </div>
    </div>        
    <div className="col-handler">          
      <div>
        <CharacterStartingStatsTable
          currentHealth={character.stats.health.current}
          maxHealth={character.stats.health.max}
          injuries={character.stats.injuries}
          speed={character.stats.speed}
          corruption={character.stats.corruption}
          perkPoints={character.stats.perkPoints}
          safelightShards={character.stats.safelightShards}
          attackBonus={character.stats.attackBonus}
          isEditable={true}
          onStatsChange={(newStats) => updateCharacterStats(newStats)}
        />
        <div className="specialization-block">
          <div className="title">Specializations</div>
          <div>+3 [{character.specializationBonus} Checks] (bonus)</div>
          <div>-5 [{character.specializationPenalty} Checks] (penalty)</div>
        </div>

        <CharacterPerksDisplay character={character} />
      </div>
      <CharacterKitsDisplay character={character} />
    </div>
    <div className="inventory-button-container">
      {/* Inventory Manager */}
      <InventoryManager
        characters={characters}
        selectedCharacterId={character.id}
        onUpdateCharacter={updateCharacter}
      />
    </div>
    <div>
      <CharacterInventoryDisplay character={character} />
    </div>
  </>);
}
