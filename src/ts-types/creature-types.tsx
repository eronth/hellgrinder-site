import { DamageElement, AttackMode } from './types';

type DamageTakenMod = {
  modification: 'Resist' | 'Weak' | 'Absorb';
  type: DamageElement;
  mod: number;
}

type Creature = {
  name: string;
  type: "Minion" | "Spawn" | "Elite" | "Tormentor" | "Arhfiend" 
  | "Lord" | "Overlord";
  
  tags: string[];
  
  health: number;
  speed: number;
  size: number;
  
  damageTakenMods: DamageTakenMod[];
  attacks: AttackMode[];
  abilities: string[];
  
  description: string;
};

export type { Creature };