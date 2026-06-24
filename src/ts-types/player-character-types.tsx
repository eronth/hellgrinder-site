import { Kit, Perk, Weapon, Item, ActiveStatusEffect } from "./types";

export type CharacterDesign = {
  id: string,
  name: string,
  stats: CharacterStats,
  startingCombatKits: number, startingSupportKits: number,
  kits: Kit[], 
  perks: Perk[], // All perks (starting + acquired)
  bonuses: string[],
  specializationBonus: string, specializationPenalty: string,
  // Separate inventory for items/weapons acquired during play
  inventory: {
    weapons: Weapon[],
    items: Item[]
  },
  // Active status effects with their actual X/Y values
  statusEffects: ActiveStatusEffect[],
  notes: string
};

export type CharacterStats = {
  health: HealthStat;
  injuries: number;
  speed: number;
  corruption: number;
  perkPoints: number;
  safelightShards: number;
  attackBonus: AttackBonusStat;
  customSkill: string;
};

export type AttackBonusStat
  = 'Short Range Shooting'
  | 'Medium Range Shooting'
  | 'Long Range Shooting'
  | 'Melee'
  | 'Arcane'
  | 'Thrown';

export type HealthStat = { current: number, max: number };
