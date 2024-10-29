import { AllValidTags } from './tag-types';
import { DamageElement, AttackMode } from './types';


type CoreResist = { modification: 'Resist', type: 'CORE', mod: number };
type CoreAbsorb = { modification: 'Absorb', type: 'CORE', mod: number };
type PromoteAborb = { modification: 'Absorb', type: 'PROMOTE', mod: number };
type PrimaryWeakness = { modification: 'Weak', type: 'REJECT', mod: number };
type SecondaryWeakness = { modification: 'Weak', type: 'DISRUPT', mod: number };
type EffectAll = { modification: 'Resist' | 'Weak' | 'Absorb', type: 'All', mod: number };


type DamageTakenMod = {
  modification: 'Resist' | 'Weak' | 'Absorb';
  type: DamageElement;
  mod: number;
} | CoreResist | CoreAbsorb | PromoteAborb | PrimaryWeakness | SecondaryWeakness | EffectAll;


type Creature = {
  name: string;
  tier: CreatureTier;
  
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


type CreatureTier =
  "Minion" | "Spawn" | "Elite" | "Tormentor" | "Archfiend"
  | "Lord" | "Overlord";

type CreatureTierList = {
  t0: CreatureTier,
  t1: CreatureTier,
  t2: CreatureTier,
  t3: CreatureTier,
  t4: CreatureTier,
  t5: CreatureTier,
  t6: CreatureTier,
};

export type { Creature, DamageTakenMod, CreatureTierList };