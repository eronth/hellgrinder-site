type HeaderSizeType = 
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 1 | 2 | 3 | 4 | 5 | 6;




type Kit = {
  name: string;
  description: string;
  weapons: Weapon[];
  items: Item[];
  trainings: KitTraining[];
}


type Weapon = {
  name: string;
  attackModes: AttackMode[];
}

type AttackMode = {
  tags: string[];
  damage: {
    l: Damage;
    m: Damage;
    h: Damage;
  };
  effects?: string[];
}

type Damage = {
  value: number,
  type: string,
}

type Item = {
  name: string;
  tags: string[];
  description: string;
  effects: string[];
}

type KitTraining = {
  name: string;
  effect: string[];
}

export type { HeaderSizeType, Kit };