import { DamageElement, AttackMode } from './types';


type CoreResist = { modification: 'Resist', type: 'Core', mod: number };
type CoreAbsorb = { modification: 'Absorb', type: 'Core', mod: number };
type PromoteAborb = { modification: 'Absorb', type: 'Promote', mod: number };
type PrimaryWeakness = { modification: 'Weak', type: 'Primary', mod: number };
type SecondaryWeakness = { modification: 'Weak', type: 'Secondary', mod: number };


type DamageTakenMod = {
  modification: 'Resist' | 'Weak' | 'Absorb';
  type: DamageElement;
  mod: number;
} | CoreResist | CoreAbsorb | PromoteAborb | PrimaryWeakness | SecondaryWeakness;

type Creature = {
  name: string;
  type: "Minion" | "Spawn" | "Elite" | "Tormentor" | "Arhfiend" 
  | "Lord" | "Overlord";
  
  tags: string[];
  
  health: number;
  speed: number;
  dash?: number;
  size: number;
  
  damageTakenMods: DamageTakenMod[];
  attacks: AttackMode[];
  abilities: string[];
  
  description: string;
};

export type { Creature, DamageTakenMod };