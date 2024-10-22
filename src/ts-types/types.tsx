type HeaderSize = 
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 1 | 2 | 3 | 4 | 5 | 6;

type DamageElement = 
  'Metal' | 'Infernal' | 'Abyssal' | 'Verdant' | 'Chthonic' | 'Nethercurrent' | 'Voidyr' 
  | 'Chosen Type' | 'Core';
// Overcoming: Metal > Wood > Earth > Water > Fire > Metal
// Generating: Metal > Water > Wood > Fire > Earth > Metal

type AttackCheckType = 'Shooting' | 'Melee' | 'Arcane' | 'Thrown';

type SkillCheckType = 'Recovery' | 'Endurance' | 'Stealth' | 'Agility' | 'Observation' | 'Stoic';

type StatusTypes = 'Burning' | 'Frozen' | 'Poisoned' | 'Stunned' | 'Prone' | 'Blinded' | 'Silenced' | 'Confused' | 'Charmed' | 'Frightened' | 'Enraged' | 'Invisible' | 'Incorporeal' | 'Insubstantial' | 'Incapacitated' | 'Restrained' | 'Grappled' | 'Paralyzed' | 'Petrified' | 'Unconscious' | 'Dead';

type Kit = {
  name: string;
  description: string;
  weapons: Weapon[];
  items: Item[];
  trainings: Training[];
}

type Weapon = {
  name: string;
  attackModes: AttackMode[];
  tags: string[];
}

type AttackMode = {
  name?: string;
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
  type: DamageElement,
}

type Item = {
  name: string;
  tags: string[];
  description: string;
  effects: string[];
}

type Training = {
  name: string;
  tags: string[];
  effects: string[];
}

type Perk = {
  name: string;
  description: string;
  cost: number;
}

type TabType = "home" | "story" | "setting" | "how-to-play" | "character-creation" | "additional-equipment" | "advanced-perks" | "items" | "magic" | "creatures";


export type { HeaderSize, Kit, Weapon, AttackMode, Training, Item, Perk, TabType, DamageElement };