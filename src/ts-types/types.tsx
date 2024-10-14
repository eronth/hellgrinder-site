type HeaderSizeType = 
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 1 | 2 | 3 | 4 | 5 | 6;

type KitType = {
  name: string;
  description: string;
  weapons: WeaponType[];
  items: ItemType[];
  trainings: KitTrainingType[];
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
  type: string,
}

type ItemType = {
  name: string;
  tags: string[];
  description: string;
  effects: string[];
}

type KitTrainingType = {
  name: string;
  effect: string[];
}

export type { HeaderSizeType, KitType, WeaponType, AttackModeType };