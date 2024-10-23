import { AllValidTags } from './tag-types';
import { DamageElement, AttackMode } from './types';


type CoreResist = { modification: 'Resist', type: 'CORE', mod: number };
type CoreAbsorb = { modification: 'Absorb', type: 'CORE', mod: number };
type PromoteAborb = { modification: 'Absorb', type: 'PROMOTE', mod: number };
type PrimaryWeakness = { modification: 'Weak', type: 'REJECT', mod: number };
type SecondaryWeakness = { modification: 'Weak', type: 'DISRUPT', mod: number };


type DamageTakenMod = {
  modification: 'Resist' | 'Weak' | 'Absorb';
  type: DamageElement;
  mod: number;
} | CoreResist | CoreAbsorb | PromoteAborb | PrimaryWeakness | SecondaryWeakness;

type Creature = {
  name: string;
  type: "Minion" | "Spawn" | "Elite" | "Tormentor" | "Arhfiend" 
  | "Lord" | "Overlord";
  
  tags: AllValidTags[];
  
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