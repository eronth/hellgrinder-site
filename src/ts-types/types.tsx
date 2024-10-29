import { AllValidTags } from "./tag-types";

type HeaderSize = 
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 1 | 2 | 3 | 4 | 5 | 6;

type DamageElement = 
  'Metal' | 'Infernal' | 'Abyssal' | 'Verdant' | 'Chthonic' | 'Nethercurrent' | 'Voidyr' 
  | 'Chosen Type' | 'Core';
// Overcoming: Metal > Wood > Earth > Water > Fire > Metal
// Generating: Metal > Water > Wood > Fire > Earth > Metal

type StatusTypes = 
  'Burning' | 'Frozen' | 'Poisoned' | 'Stunned' | 'Prone' | 'Blinded' | 'Silenced' | 'Confused' | 'Charmed' | 'Frightened' | 'Enraged' | 'Invisible' | 'Incorporeal' | 'Insubstantial' | 'Incapacitated' | 'Restrained' | 'Grappled' | 'Paralyzed' | 'Petrified' | 'Unconscious' | 'Dead';
  // Blinded X, Brittle X, Doomed X, Enfeebled X, Envigorated, Frenzied, Imolated X for Y,
  // Lost X, Shaken, Silenced X, Slowed X, Terrified

type Kit = {
  name: string;
  description: string;
  weapons: Weapon[];
  items: Item[];
  trainings: Training[];
  extraPerkPoints?: number;
  extraSupportKits?: number;
}

type Weapon = {
  name: string;
  attackModes: AttackMode[];
  tags: AllValidTags[];
}

type AttackMode = {
  name?: string;
  charges?: number;
  tags: AllValidTags[];
  damage: {
    l: Damage;
    m: Damage;
    h: Damage;
  };
  effects?: string[];
}

type Damage = {
  value: number,
  type: DamageElement,
}

type Item = {
  name: string;
  tags: AllValidTags[];
  description: string;
  effects: string[];
}

type Training = {
  name: string;
  tags: AllValidTags[];
  effects: string[];
}

type Perk = {
  name: string;
  description: string;
  cost: number;
  startingCorruption?: number;
}

type TabType = "home" | "story" | "setting" | "how-to-play" | "character-creation" 
  | "character-generator" | "creatures"
  | "additional-equipment" | "advanced-perks" | "items" | "magic";


export type { HeaderSize, Kit, Weapon, AttackMode, Training, Item, Perk, TabType, DamageElement };