import { AllValidTags } from "./tag-types";

// Crit attacks do what?
// Display advanced items/weapons/perks/trainings?/etc
// "I'm a GM" toggle
// Clean up tabs
// Clean up homepage tabs?
// Prone?
// Talk about special tags (area, knockback, hover, flying, soulrend).
// Status rework for duration/stack info.
// Maybe lock status name to status types

type HeaderSize = 
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 1 | 2 | 3 | 4 | 5 | 6;

type DamageElement = 
  'Metal' | 'Infernal' | 'Abyssal' | 'Verdant' | 'Chthonic' | 'Nethercurrent' | 'Voidyr' 
  | 'Chosen Type' | 'Core';
// Overcoming: Metal > Wood > Earth > Water > Fire > Metal
// Generating: Metal > Water > Wood > Fire > Earth > Metal

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type StatusTypes =
  'Burning' | 'Frozen' | 'Poisoned' | 'Stunned' | 'Prone'
  | 'Blinded' | 'Silenced' | 'Confused' | 'Charmed' | 'Frightened'
  | 'Enraged' | 'Invisible' | 'Incorporeal' | 'Insubstantial'
  | 'Incapacitated' | 'Restrained' | 'Grappled' | 'Paralyzed'
  | 'Petrified' | 'Unconscious' | 'Dead' | 'Entangled';
  // Blinded X, Brittle X, Doomed X, Enfeebled X, Envigorated, Frenzied, Imolated X for Y,
  // Lost X, Shaken, Silenced X, Slowed X, Terrified

type ItemDef = {
  name: string;
  tags: AllValidTags[];
  description?: string;
  isAdvancedItem?: boolean;
}

type Kit = {
  name: string;
  description: string;
  weapons: Weapon[];
  items: Item[];
  trainings: Training[];
  extraPerkPoints?: number;
  extraSupportKits?: number;
}

type Weapon = ItemDef & {
  attackModes: AttackMode[];
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
  effects?: React.ReactNode[];
}

type Damage = {
  value: number | Dice | Dice[],
  type: DamageElement,
}

type Dice = {
  amount?: number;
  sides: number;
  modifier?: number;
}

type Item = ItemDef & {
  effects: string[];
}

type Training = {
  name: string;
  tags: AllValidTags[];
  effects: string[];
}

type Perk = ItemDef & {
  cost: number;
  startingCorruption?: number;
  healthModifier?: number;
  speedModifier?: number;
  injuriesModifier?: number;
  safelightShardsModifier?: number;
}

type TabType = "home" | "story-and-setting" | "how-to-play" | "character-creation" 
  | "character-generator" | "creatures"
  | "additional-equipment" | "advanced-perks" | "items" | "magic";

type StatusEffect = {
  name: string;
  description: string;
  effects: React.ReactNode[];
  x?: number | "X";
  y?: number | "Y";
};

export type { HeaderSize, Kit, Weapon, AttackMode, Training, Item, Perk, TabType, DamageElement, StatusEffect, Dice };