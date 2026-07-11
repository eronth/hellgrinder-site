import { AllValidTags } from "./tag-types";

// Display advanced items/weapons/perks/trainings?/etc
// "I'm a GM" toggle
// Prone?
// Talk about special tags (area, knockback, hover, flying, soulrend).
// Status rework for duration/stack info.
// Maybe lock status name to status types

type TabType = "home" | "lore" | "how-to-play" | "character-creation" 
  | "character-generator" | "creatures"
  | "equipment-and-perks" | "items" | "magic";

type HeaderSize = 
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 1 | 2 | 3 | 4 | 5 | 6;

type DamageElement = 
  'Metal' | 'Infernal' | 'Abyssal' | 'Verdant' | 'Chthonic' | 'Nethercurrent' | 'Voidyr' 
  | 'Chosen Type' | 'Core' | 'All';
// Overcoming: Metal > Wood > Earth > Water > Fire > Metal
// Generating: Metal > Water > Wood > Fire > Earth > Metal

type ChoiceTagOption = AllValidTags | DamageElement;

type ItemDef = {
  name: string;
  tags: AllValidTags[];
  choiceTags?: {
    tags: ChoiceTagOption[];
    count: number;
  };
  description?: string;
  charges?: number;
  isAdvancedItem?: boolean;
  isChoiceItem?: boolean;
}

type Kit = {
  name: string;
  description: string;
  weapons: Weapon[];
  items: Item[];
  trainings: Training[];
  extraPerkPoints?: number;
  extraSupportKits?: number;
  itemChoiceCount?: number;
}

export type Weapon = ItemDef & {
  effects?: string[];
  attackModes: AttackMode[];
}

export type AttackMode = {
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

export type Damage = {
  value: number | Dice | Dice[],
  type: DamageElement,
}

export type Dice = {
  amount?: number;
  sides: number;
  modifier?: number;
}

type Item = ItemDef & {
  effects: React.ReactNode[];
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

export type StatusEffect = {
  name: string;
  description: string;
  effects: React.ReactNode[];
  x?: number | "X";
  y?: number | "Y";
};

export type ActiveStatusEffect = {
  name: string;
  description: string;
  x?: number;
  y?: number;
}

export type { HeaderSize, Kit, Training, Item, Perk, TabType, DamageElement, ChoiceTagOption };
