type HeaderSizeType = 
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 1 | 2 | 3 | 4 | 5 | 6;

type DamageElementType = 'Metal' | 'Infernal' | 'Abyssal' | 'Verdant' | 'Chthonic' | 'Nethercurrent' | 'Voidyr' | 'Chosen Type';
// Overcoming: Metal > Wood > Earth > Water > Fire > Metal
// Generating: Metal > Water > Wood > Fire > Earth > Metal

type AttackCheckType = 'Shooting' | 'Melee' | 'Arcane' | 'Thrown';

type SkillCheckType = 'Recovery' | 'Endurance' | 'Stealth' | 'Agility' | 'Observation';

type KitType = {
  name: string;
  description: string;
  weapons: WeaponType[];
  items: ItemType[];
  trainings: TrainingType[];
}

type WeaponType = {
  name: string;
  attackModes: AttackModeType[];
  tags: string[];
}

type AttackModeType = {
  name?: string;
  tags: string[];
  damage: {
    l: DamageType;
    m: DamageType;
    h: DamageType;
  };
  effects?: string[];
}

type DamageType = {
  value: number,
  type: DamageElementType,
}

type ItemType = {
  name: string;
  tags: string[];
  description: string;
  effects: string[];
}

type TrainingType = {
  name: string;
  tags: string[];
  effects: string[];
}

export type { HeaderSizeType, KitType, WeaponType, AttackModeType, TrainingType, ItemType };