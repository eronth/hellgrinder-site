import React from "react";
import { TabType, Kit, Perk, DamageElement } from "../../ts-types/types.tsx";
import { SkillChecks } from "../../ts-types/tag-types.tsx";

import KitComponent from "./kits/Kit.tsx";
import PerkComponent from "./perks/PerkComponent.tsx";

import Tools from "../../common-design/Tools.tsx";

import CombatKits from "../../common-design/equipment/combat-kits.tsx";
import SupportKits from "../../common-design/equipment/support-kits.tsx";
import Perks from "../../common-design/equipment/perks.tsx";
import CharacterStartingStatsTable from "./CharacterStartingStatsTable.tsx";

import './CharacterGenerator.css';

type CharDesign = {
  id: string,
  name: string,
  health: number, injuries: number, speed: number,
  corruption: number, safelightShards: number,
  startingPerkPoints: number,
  startingCombatKits: number, startingSupportKits: number,
  kits: Kit[], perks: Perk[], bonuses: string[],
  specializationBonus: string, specializationPenalty: string,
};

export default function CharacterGenerator() {
  
  const page: TabType = 'character-generator';
  const [characters, setCharacters] = React.useState([] as CharDesign[]);
  const [selectedCharacterId, setSelectedCharacterId] = React.useState(null as string | null);
  
  const selectedCharacter = characters.find(c => c.id === selectedCharacterId) || null;
  
  const characterNames = [
    "Ash Walker", "Steel Heart", "Shadow Bane", "Iron Will", "Night Stalker",
    "Flame Bearer", "Storm Rider", "Ghost Walker", "Blood Hunter", "Soul Reaper",
    "War Hammer", "Death Whisper", "Void Walker", "Crimson Edge", "Thunder Strike",
    "Dark Flame", "Ice Heart", "Wind Runner", "Stone Guard", "Light Bringer"
  ];
  const characterDefaults: Omit<CharDesign, 'id' | 'name'> = {
    health: 6, injuries: 0, speed: 5,
    corruption: 0, safelightShards: 2,
    startingPerkPoints: 2,
    startingCombatKits: 1, startingSupportKits: 1,
    kits: [], perks: [], bonuses: [],
    specializationBonus: '', specializationPenalty: '',
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
    newChar.startingPerkPoints += chosenCombatKit.extraPerkPoints ?? 0;
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
    }    newChar.perks = getPerks(newChar.startingPerkPoints);
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
      character.corruption += p.startingCorruption ?? 0;
    });
    character.startingPerkPoints -= perksCost;
    
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
  }
  function deleteCharacter(characterId: string) {
    setCharacters(prev => prev.filter(c => c.id !== characterId));
    if (selectedCharacterId === characterId) {
      const remainingChars = characters.filter(c => c.id !== characterId);
      setSelectedCharacterId(remainingChars.length > 0 ? remainingChars[0].id : null);
    }
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

  function clearAllCharacters() {
    setCharacters([]);
    setSelectedCharacterId(null);
  }
    return (<div className={page}>
    <p>
      On this page, you are able to quickly generate a new character at the
      click of a button. Use this to quickly make your first character, or
      to get back into a fight with the least delay possible.
    </p>
    
    
      <div className="character-selector">
        <button onClick={generateCharacter}>Generate Character</button>
        {characters.length > 0 && (
          <>
            <label htmlFor="character-select" className="character-select">Select Character: </label>
            <select
              id="character-select"
              value={selectedCharacterId || ''}
              onChange={(e) => setSelectedCharacterId(e.target.value || null)}
            >
              <option value="">-- Select a character --</option>
              {characters.map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name}
                </option>
              ))}
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
          <div className="character-name">{selectedCharacter.name}</div>
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
        <div className="col-handler">
          <div>
            <CharacterStartingStatsTable corruption={selectedCharacter.corruption} perkPoints={selectedCharacter.startingPerkPoints}/>
            <div className="specialization-block">
              <div className="title">Specializations</div>
              <div>+3 [{selectedCharacter.specializationBonus} Checks] (bonus)</div>
              <div>-5 [{selectedCharacter.specializationPenalty} Checks] (penalty)</div>
            </div>
            {selectedCharacter.perks.map((p, i) =>
              <PerkComponent key={`perk-${i}`} perk={p}/>
            )}
          </div>
          
          {selectedCharacter.kits.map((k, i) =>
            <KitComponent key={`kit-${i}`} kit={k}/>
          )}
        
        </div>
      </div>
      : <div className="generated-character-display"></div>
    }
    <hr />
  </div>);
}