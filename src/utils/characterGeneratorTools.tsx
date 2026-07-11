import Tools from "./tools.tsx";
import CombatKits from "../data/equipment/combat-kits.tsx";
import SupportKits from "../data/equipment/support-kits.tsx";
import Perks from "../data/equipment/perks.tsx";
import { SkillChecks } from "../ts-types/tag-types.tsx";
import { DamageElement, Kit, Perk } from "../ts-types/types.tsx";
import _ from "lodash";
import { CharacterDesign } from "../ts-types/player-character-types.tsx";

const firstNames = [
  "Ash", "Steel", "Shadow", "Iron", "Night", "Flame", "Storm", "Ghost", 
  "Blood", "Soul", "War", "Death", "Void", "Crimson", "Thunder", "Dark",
  "Ice", "Wind", "Stone", "Light", "Silver", "Raven", "Wolf", "Ember",
  "Frost", "Thorn", "Viper", "Blade", "Scar", "Grim", "Red", "Hawk", 
  "Hero", "Morning", "Even", "Dawn", "Odd", "Vexing"
];

const lastNames = [
  "Walker", "Heart", "Bane", "Will", "Stalker", "Bearer", "Rider", 
  "Hunter", "Reaper", "Hammer", "Whisper", "Edge", "Strike", "Flame",
  "Runner", "Guard", "Bringer", "Fang", "Claw", "Born", "Sworn",
  "Touched", "Marked", "Bound", "Forged", "Wrought", "Shaper", "Seeker",
  "Slayer", "Keeper", "Thunder", "Warden", "Anvil",
  "Hero", "Carrion", "Dusk", "Gloom", "Shade", "Fury", "Shrike",
  "Steel"
];

const characterDefaults: Omit<CharacterDesign, 'id' | 'name'> = {
  stats: {
    health: { current: 6, max: 6 },
    injuries: 0, speed: 5,
    corruption: 0, safelightShards: 2,
    perkPoints: 2,
    attackBonus: 'Melee',
    customSkill: '',
  },
  startingCombatKits: 1, startingSupportKits: 1,
  kits: [], perks: [], bonuses: [],
  specializationBonus: '', specializationPenalty: '',
  locks: { specialization: false, perks: false, kits: [] },
  inventory: {
    weapons: [],
    items: []
  },
  statusEffects: [],
  notes: ''
};

const specializationOptions: SkillChecks[] = [
    'Might', 'Endurance', 'Agility', 'Stealth' , 'Observation' ,
    'Communication', 'Stoic',
    'Recovery' , 'Corruption',
  ];

function generateRandomCharacter({
  usedNames = [],
}: { usedNames: string[] }): CharacterDesign {
  // Generate a character
  let rand: number;
  const combatKitsArr = Tools.sortKits(CombatKits);
  const supportKitsArr = Tools.sortKits(SupportKits);

  // Start with default values.
  const newChar: CharacterDesign = {
    ...(_.cloneDeep(characterDefaults)),
    //...JSON.parse(JSON.stringify(characterDefaults)),
    id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: getRandomCharacterName({ usedNames })
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
  const chosenCombatKit = Tools.deepCopyKit(combatKitsArr[rand]);
  newChar.startingSupportKits += chosenCombatKit.extraSupportKits ?? 0;
  newChar.stats.perkPoints += chosenCombatKit.extraPerkPoints ?? 0;
  specialKitLogic(chosenCombatKit);
  newChar.kits.push(chosenCombatKit);

  for (let i = 0; i < newChar.startingSupportKits; i++) {
    let rand = Math.floor(Math.random() * supportKitsArr.length);
    while (newChar.kits.includes(supportKitsArr[rand])) {
      rand = Math.floor(Math.random() * supportKitsArr.length);
    }
    const chosenSupportKit = Tools.deepCopyKit(supportKitsArr[rand]);
    specialKitLogic(chosenSupportKit);
    newChar.kits.push(chosenSupportKit);
  }
  newChar.perks = getPerks(newChar.stats.perkPoints);
  handleSelectedPerksLogic({ character: newChar });

  return newChar;
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
    const chosenPerk = Tools.deepCopyPerk(perksArr[rand]);

    spentPoints += chosenPerk.cost;
    perks.push(chosenPerk);
    perksArr.splice(rand, 1);
  }

  return perks;
};

function handleSelectedPerksLogic({ character }: { character: CharacterDesign }) {
  let perksCost = 0;
  character.perks.forEach((p: Perk) => {
    specialPerkLogic(p);
    perksCost += p.cost
    character.stats.corruption += p.startingCorruption ?? 0;
  });
  character.stats.perkPoints -= perksCost;
};

function specialKitLogic(_kit: Kit) {
  // Reserved for future kit-specific logic at generation time.
};

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

function generateBaseCharacter({ usedNames }: { usedNames: string[] }): CharacterDesign {
  return {
    ...(_.cloneDeep(characterDefaults)),
    id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: getRandomCharacterName({ usedNames })
  };
}

function randomizeSpecialization(): { bonus: string; penalty: string } {
  const so = [...specializationOptions];
  const bonusIdx = Math.floor(Math.random() * so.length);
  const bonus = so[bonusIdx];
  so.splice(bonusIdx, 1);
  return { bonus, penalty: so[Math.floor(Math.random() * so.length)] };
}

function selectKit(kitName: string, kitList: Kit[]): Kit | null {
  const found = kitList.find(k => k.name === kitName);
  if (!found) return null;
  const clone = Tools.deepCopyKit(found);
  specialKitLogic(clone);
  return clone;
}

function randomizeCombatKit(usedKitNames: string[] = []): { kit: Kit; extraSupportKits: number; extraPerkPoints: number } {
  const arr = Tools.sortKits(CombatKits);
  const available = arr.filter(k => !usedKitNames.includes(k.name));
  const pool = available.length > 0 ? available : arr;
  const kit = Tools.deepCopyKit(pool[Math.floor(Math.random() * pool.length)]);
  specialKitLogic(kit);
  return { kit, extraSupportKits: kit.extraSupportKits ?? 0, extraPerkPoints: kit.extraPerkPoints ?? 0 };
}

function randomizeSupportKit(usedKitNames: string[] = []): Kit {
  const arr = Tools.sortKits(SupportKits);
  const available = arr.filter(k => !usedKitNames.includes(k.name));
  const pool = available.length > 0 ? available : arr;
  const kit = Tools.deepCopyKit(pool[Math.floor(Math.random() * pool.length)]);
  specialKitLogic(kit);
  return kit;
}

function randomizePerks(totalPerkPoints: number): { perks: Perk[]; remainingPoints: number } {
  const perks = getPerks(totalPerkPoints);
  perks.forEach(p => specialPerkLogic(p));
  const spent = perks.reduce((sum, p) => sum + p.cost, 0);
  return { perks, remainingPoints: totalPerkPoints - spent };
}

function selectPerk(perk: Perk): Perk {
  const clone = Tools.deepCopyPerk(perk);
  specialPerkLogic(clone);
  return clone;
}

function getAllCombatKits(): Kit[] {
  return Tools.sortKits(CombatKits);
}

function getAllSupportKits(): Kit[] {
  return Tools.sortKits(SupportKits);
}

function getAllPerks(): Perk[] {
  return Tools.sortPerks(Perks);
}

function getRandomCharacterName({ usedNames }: {usedNames: string[]}): string {
  // Generate random combinations until we find a unique one
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops
  
  while (attempts < maxAttempts) {
    const firstNameIndex = Math.floor(Math.random() * firstNames.length);
    const lastNameIndex = Math.floor(Math.random() * lastNames.length);
    const generatedName = `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
    
    if (!usedNames.includes(generatedName)) {
      return generatedName;
    }
    attempts++;
  }
  
  // Fallback if we somehow can't generate a unique name
  return `Character ${usedNames.length + 1}`;
}

export { specializationOptions };

export default {
  generateRandomCharacter,
  generateBaseCharacter,
  randomizeSpecialization,
  selectKit,
  randomizeCombatKit,
  randomizeSupportKit,
  randomizePerks,
  selectPerk,
  getAllCombatKits,
  getAllSupportKits,
  getAllPerks,
};
