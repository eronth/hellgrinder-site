import { Creature, CreatureTierList } from '../ts-types/creature-types';
import { DamageElement, Weapon, AttackMode, Dice } from '../ts-types/types';
import { Kit, Perk, StatusEffect } from '../ts-types/types';
import {AllValidTags} from "../ts-types/tag-types.tsx";

type deepCopyWeaponOptions = {
  name?: string,
  tags?: AllValidTags[],
  replaceTags?: boolean,
  damageType?: DamageElement | {
    l?: DamageElement,
    m?: DamageElement,
    h?: DamageElement,
  }
};
const deepCopyWeapon = (weapon: Weapon, options?: deepCopyWeaponOptions): Weapon => {
  const weaponCopy = structuredClone(weapon);
  
  if (!options) { return weaponCopy; }
  
  weaponCopy.name = options.name ?? weaponCopy.name;
  
  if (options.tags) {
    if (options.replaceTags) {
      weaponCopy.tags = options.tags;
    } else {
      weaponCopy.tags = [...weaponCopy.tags, ...options.tags];
    }
  }
  
  // Add new damage types if chosen.
  if (options.damageType) {
    if (typeof options.damageType === 'string') {
      weaponCopy.attackModes.forEach(am => {
        // We already know it's not null due to earlier checks!
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        am.damage.l.type = options.damageType;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        am.damage.m.type = options.damageType;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        am.damage.h.type = options.damageType;
      });
    } else { // In this case, we know it's an object with up-to l, m, h
      weaponCopy.attackModes.forEach(am => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (options.damageType.l) { am.damage.l.type = options.damageType.l; }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (options.damageType.m) { am.damage.m.type = options.damageType.m; }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (options.damageType.h) { am.damage.h.type = options.damageType.h; }
      });
    }
  }
  
  return weaponCopy;
}

type deepCopyAttackModeOptions = {
  name?: string,
  tags?: AllValidTags[],
  replaceTags?: boolean,
  effects?: string[],
  replaceEffects?: boolean,
  damage?: {
    l?: {
      value?: number,
      offset?: number,
      type?: DamageElement
    },
    m?: {
      value?: number,
      offset?: number,
      type?: DamageElement
    },
    h?: {
      value?: number,
      offset?: number,
      type?: DamageElement
    },
    baseType?: DamageElement,
  },
};
const deepCopyAttackMode = (attackMode: AttackMode, options?: deepCopyAttackModeOptions): AttackMode => {
  const attackModeCopy = structuredClone(attackMode);
  
  if (!options) { return attackModeCopy; }
  
  attackModeCopy.name = options.name ?? attackModeCopy.name;
  
  if (options.tags) {
    if (options.replaceTags) {
      attackModeCopy.tags = options.tags;
    } else {
      attackModeCopy.tags = [...attackModeCopy.tags, ...options.tags];
    }
  }
  
  if (options.effects) {
    if (options.replaceEffects) {
      attackModeCopy.effects = options.effects;
    } else {
      attackModeCopy.effects = [...(attackModeCopy.effects ?? []), ...options.effects];
    }
  }
  
  // Add new damage types if chosen.
  attackModeCopy.damage = {
    l: {
      value: addOffsetToDamage({
        damage: (options.damage?.l?.value ?? attackModeCopy.damage.l.value),
        offset: (options.damage?.l?.offset ?? 0),
      }),
      type: options.damage?.l?.type ?? options.damage?.baseType ?? attackModeCopy.damage.l.type,
    },
    m: {
      value: addOffsetToDamage({
        damage: (options.damage?.m?.value ?? attackModeCopy.damage.m.value),
        offset: (options.damage?.m?.offset ?? 0),
      }),
      type: options.damage?.m?.type ?? options.damage?.baseType ?? attackModeCopy.damage.m.type,
    },
    h: {
      value: addOffsetToDamage({
        damage: (options.damage?.h?.value ?? attackModeCopy.damage.h.value),
        offset: (options.damage?.h?.offset ?? 0),
      }),
      type: options.damage?.h?.type ?? options.damage?.baseType ?? attackModeCopy.damage.h.type,
    },
  }
  
  return attackModeCopy;
}



type addOffsetToDamageParams = {
  damage: number | Dice | Dice[],
  offset: number,
}
const addOffsetToDamage =
  ({damage, offset}: addOffsetToDamageParams): number | Dice | Dice[] => {
  if (typeof damage === 'number') {
    return damage + offset;
  } else if (damage.constructor == Array) {
    return (damage as Dice[]).map(d => addOffsetToDice(d, offset));
  } else {
    return addOffsetToDice(damage as Dice, offset);
  }
}
const addOffsetToDice = (dice: Dice, offset: number): Dice => {
  return {
    amount: dice.amount,
    sides: dice.sides,
    modifier: (dice?.modifier ?? 0)+ offset,
  };
}

const getLoremIpsum = () =>
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const creatureTiers: CreatureTierList = {
  t0: 'Minion',
  t1: 'Spawn',
  t2: 'Elite',
  t3: 'Tormentor',
  t4: 'Archfiend',
  t5: 'Lord',
  t6: 'Overlord',
};

function sortCreatures(creatures: { [key: string]: Creature }): Creature[] {
  // First, separate creatures by type/tier
  let ct0Creatures = Object.values(creatures).filter(c => c.tier === creatureTiers.t0);
  let ct1Creatures = Object.values(creatures).filter(c => c.tier === creatureTiers.t1);
  let ct2Creatures = Object.values(creatures).filter(c => c.tier === creatureTiers.t2);
  let ct3Creatures = Object.values(creatures).filter(c => c.tier === creatureTiers.t3);
  let ct4Creatures = Object.values(creatures).filter(c => c.tier === creatureTiers.t4);
  let ct5Creatures = Object.values(creatures).filter(c => c.tier === creatureTiers.t5);
  let ct6Creatures = Object.values(creatures).filter(c => c.tier === creatureTiers.t6);

  // Next, sort each tier by name
  ct0Creatures = ct0Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct1Creatures = ct1Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct2Creatures = ct2Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct3Creatures = ct3Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct4Creatures = ct4Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct5Creatures = ct5Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct6Creatures = ct6Creatures.sort((a, b) => a.name.localeCompare(b.name));

  // Finally, combine all lists and return
  return [...ct0Creatures, ...ct1Creatures, ...ct2Creatures, ...ct3Creatures, ...ct4Creatures, ...ct5Creatures, ...ct6Creatures];
}

const sortWeapons = (weapons: { [key: string]: Weapon }): Weapon[] =>
  Object.values(weapons)
    .sort((a, b) => a.name.localeCompare(b.name));

const sortItems = (items: { [key: string]: Item }): Item[] =>
  Object.values(items)
    .sort((a, b) => a.name.localeCompare(b.name));

const sortKits = (kits: { [key: string]: Kit }): Kit[] => 
  Object.values(kits)
    .sort((a, b) => a.name.localeCompare(b.name));

const sortPerks = (perks: { [key: string]: Perk }): Perk[] => 
  Object.values(perks)
    .sort((a, b) => a.name.localeCompare(b.name));

const sortStatusEffects = (statusEffects: { [key: string]: StatusEffect }): StatusEffect[] =>
  Object.values(statusEffects)
    .sort((a, b) => a.name.localeCompare(b.name));
  // Object.keys(perks)
  //   .sort((a, b) => perks[a].name.localeCompare(perks[b].name))
  //   .map((k) => perks[k]);

// type HeaderTypings = 
//     'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
//     | '1' | '2' | '3' | '4' | '5' | '6'
//     | 1 | 2 | 3 | 4 | 5 | 6;
// const convertHeaderToFull = (hx: HeaderTypings): string => {
//   let returnHx: string = '';

//   if (typeof hx === 'number') { returnHx = hx.toString(); }
//   if (returnHx[0] !== 'h') { returnHx = 'h' + returnHx; }
//   return returnHx;
// }

export default {
  //convertHeaderToFull,
  getLoremIpsum,
  sortWeapons,
  sortItems,
  sortKits,
  sortPerks,
  sortCreatures,
  sortStatusEffects,
  deepCopyWeapon,
  deepCopyAttackMode,
  creatureTiers,
};