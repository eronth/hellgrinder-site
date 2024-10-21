import { DamageElement } from './types';

type DamageMod = {
  modification: 'Resist' | 'Weak' | 'Absorb';
  type: DamageElement;
  mod: number;
}

type Creature = {
  name: string;
  description: string;
  damageMods: DamageMod[];
  tags: string[];

};

export type { Creature };