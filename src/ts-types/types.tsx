import { AllValidTags } from "./tag-types";

// Display advanced items/weapons/perks/trainings?/etc
// "I'm a GM" toggle
// Prone?
// Talk about special tags (area, knockback, hover, flying, soulrend).
// Status rework for duration/stack info.
// Maybe lock status name to status types

type TabType = 
  "home" | "lore" | "how-to-play"
  | "character-creation" 
  | "character-generator" | "creatures"
  | "equipment-and-perks" | "items" | "magic"
  | "reference";

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

/**
 * A passive, always-on (or conditionally-on) numeric bonus an object grants
 * its owner, in a machine-readable form so character sheets can total them.
 * The `effects`/`description` text remains the source of truth for rules;
 * this only mirrors the summable part.
 */
type GrantedBonus = {
  /** Resist/Absorb/Weak <element> N. */
  defense: 'Resist' | 'Absorb' | 'Weak';
  element: DamageElement;
  value: number;
  /** Qualifier such as 'Front Arc' — kept apart from unconditional totals. */
  condition?: string;
  /** For element 'Chosen Type': the pick made on this character's copy. */
  chosenElement?: DamageElement;
  /** For element 'Chosen Type': allowed picks (defaults to every element). */
  options?: DamageElement[];
} | {
  /** +N tied to a tag (Stealth, Long Range, Melee, ...). */
  tag: AllValidTags;
  value: number;
  condition?: string;
} | {
  /** +N to anything else (Move Speed, Hit Checks, ...). */
  label: string;
  value: number;
  condition?: string;
};

type ItemDef = {
  name: string;
  tags: AllValidTags[];
  choiceTags?: {
    tags: ChoiceTagOption[];
    count: number;
  };
  description?: React.ReactNode;
  charges?: number;
  isAdvancedItem?: boolean;
  isChoiceItem?: boolean;
  bonuses?: GrantedBonus[];
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
  effects?: React.ReactNode[];
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
  charges?: number;
  effects: React.ReactNode[];
  bonuses?: GrantedBonus[];
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

export type { HeaderSize, ItemDef, Kit, Training, Item, Perk, TabType, DamageElement, ChoiceTagOption, GrantedBonus };
