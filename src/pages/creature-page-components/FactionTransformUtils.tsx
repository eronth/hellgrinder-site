import { Creature } from '../../ts-types/creature-types';
import { DamageElement } from '../../ts-types/types';

export type FactionData = {
  name: string;
  primary: DamageElement;
  absorb: DamageElement;
  weaknesses: [DamageElement, DamageElement];
  special?: string;
  cssClass: string;
};

export const FACTION_DATA: { [key: string]: FactionData } = {
  'Generic': {
    name: 'Generic',
    primary: 'Core',
    absorb: 'PROMOTE',
    weaknesses: ['REJECT', 'DISRUPT'],
    cssClass: 'faction-generic'
  },
  'Thornwraith Conclave': {
    name: 'Thornwraith Conclave',
    primary: 'Verdant',
    absorb: 'Abyssal',
    weaknesses: ['Metal', 'Voidyr'],
    special: 'The first time a Thornwraith is hit with Nethercurrent, they take 4 Infernal Damage (ignores resistances). Thornwraith has a 50% chance to resist any status effect. Thornwraith has [Resist Infernal 2].',
    cssClass: 'faction-thornwraith-covenant'
  },
  'Stoneveined Order': {
    name: 'Stoneveined Order',
    primary: 'Chthonic',
    absorb: 'Infernal',
    weaknesses: ['Verdant', 'Voidyr'],
    special: 'Gain Resist Nethercurrent for each listed Resist as well. Stoneveined gets extra health based on type. Stoneveined can add [Knockback 1] to any attack they make and reduces knockback by -1 for any attack they take.',
    cssClass: 'faction-stoneveined-order'
  },
  'Vastfathom League': {
    name: 'Vastfathom League',
    primary: 'Abyssal',
    absorb: 'Metal',
    weaknesses: ['Chthonic', 'Nethercurrent'],
    cssClass: 'faction-vastfathom-league'
  },
  'Ashborn Legion': {
    name: 'Ashborn Legion',
    primary: 'Infernal',
    absorb: 'Verdant',
    weaknesses: ['Abyssal', 'Chthonic'],
    cssClass: 'faction-ashborn-legion'
  },
  'Wanderlost Clans': {
    name: 'Wanderlost Clans',
    primary: 'Metal',
    absorb: 'Chthonic',
    weaknesses: ['Infernal', 'Nethercurrent'],
    cssClass: 'faction-wanderlost-clans'
  },
  'Zephpter Horde': {
    name: 'Zephpter Horde',
    primary: 'Nethercurrent',
    absorb: 'Voidyr',
    weaknesses: ['Chthonic', 'Metal'],
    special: 'Randomly either gain [Hover] or increase Move Speed by +2. Creatures that are CT2 or greater, they gain [Flying] instead of [Hover]. 25% chance for attacks to deal Abyssal instead of Nethercurrent.',
    cssClass: 'faction-zephpter-horde'
  },
  'Umbral Nexus': {
    name: 'Umbral Nexus',
    primary: 'Voidyr',
    absorb: 'Nethercurrent',
    weaknesses: ['Abyssal', 'Infernal'],
    special: 'Gain [Resist Metal 5] against non-blessed metals. Gain [Weak Blessed Metal 5] and [Weak Blessed Fire 5].',
    cssClass: 'faction-umbral-nexus'
  }
};

export function transformCreatureToFaction(creature: Creature, factionKey: string): Creature {
  if (factionKey === 'Generic') {
    return creature; // Return original for generic
  }

  const faction = FACTION_DATA[factionKey];
  if (!faction) {
    return creature;
  }

  // Create a deep copy of the creature
  const transformedCreature: Creature = JSON.parse(JSON.stringify(creature));

  // Add faction tag
  transformedCreature.tags = [faction.name, ...transformedCreature.tags];

  // Transform damage taken mods
  transformedCreature.damageTakenMods = transformedCreature.damageTakenMods.map(mod => {
    switch (mod.type) {
      case 'CORE':
        return { ...mod, type: faction.primary };
      case 'PROMOTE':
        return { ...mod, type: faction.absorb };
      case 'REJECT':
        return { ...mod, type: faction.weaknesses[0] };
      case 'DISRUPT':
        return { ...mod, type: faction.weaknesses[1] };
      default:
        return mod;
    }
  });

  // Transform attack damage types from Core to faction primary
  transformedCreature.attacks = transformedCreature.attacks.map(attack => ({
    ...attack,
    damage: {
      l: attack.damage.l.type === 'Core' 
        ? { ...attack.damage.l, type: faction.primary }
        : attack.damage.l,
      m: attack.damage.m.type === 'Core' 
        ? { ...attack.damage.m, type: faction.primary }
        : attack.damage.m,
      h: attack.damage.h.type === 'Core' 
        ? { ...attack.damage.h, type: faction.primary }
        : attack.damage.h,
    }
  }));

  // Add special faction abilities if they exist
  if (faction.special) {
    transformedCreature.abilities = [
      ...transformedCreature.abilities,
      `Faction Bonus: ${faction.special}`
    ];
  }

  // Add faction-specific health bonus for Stoneveined Order
  if (factionKey === 'Stoneveined Order') {
    const tierHealthBonus = {
      'Minion': 2,
      'Spawn': 3,
      'Elite': 4,
      'Tormentor': 5,
      'Archfiend': 6,
      'Lord': 7,
      'Overlord': 8
    };
    const bonus = tierHealthBonus[transformedCreature.tier as keyof typeof tierHealthBonus] || 1;
    transformedCreature.health += bonus;
  }

  // Add movement bonus for Zephpter Horde
  if (factionKey === 'Zephpter Horde') {
    if (transformedCreature.tier === 'Elite' || transformedCreature.tier === 'Tormentor' || 
        transformedCreature.tier === 'Archfiend' || transformedCreature.tier === 'Lord' || 
        transformedCreature.tier === 'Overlord') {
      transformedCreature.abilities = [
        ...transformedCreature.abilities.filter(a => !a.includes('[Flying]')),
        'Has [Flying].'
      ];
    } else {
      transformedCreature.speed += 2;
    }
  }

  return transformedCreature;
}
