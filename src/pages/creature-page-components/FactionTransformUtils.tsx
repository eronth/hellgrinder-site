import React from 'react';
import Tools from "../../common-design/Tools";
import RuleKeyword from '../../common-design/RuleKeyword';
import { Creature, CreatureAbility, CreatureTier, DamageTakenMod } from '../../ts-types/creature-types';
import { AttackMode, DamageElement } from '../../ts-types/types';
import StatusKeyword from '../../common-design/StatusKeyword';

type PrimaryDamageAndGeneric = DamageElement | 'Core Type';
type AbsorbDamageAndGeneric = DamageElement | 'PROMOTE';
type WeaknessDamageAndGeneric = DamageElement | 'REJECT' | 'DISRUPT';

export type FactionData = {
  name: string;
  primary: PrimaryDamageAndGeneric;
  absorb: AbsorbDamageAndGeneric;
  weaknesses: [WeaknessDamageAndGeneric, WeaknessDamageAndGeneric];
  abilities?: FactionAbility[];
  cssClass: string;
};

type FactionAbility = CreatureAbility & {
  permittedTiers: 'all' | CreatureTier[];
};

const shakeoffStatus = <>
  50% chance to resist any status effect. 
</>;

export const FACTION_DATA: { [key: string]: FactionData } = {
  'Generic': {
    name: 'Generic',
    primary: 'Core Type',
    absorb: 'PROMOTE',
    weaknesses: ['REJECT', 'DISRUPT'],
    cssClass: 'faction-generic'
  },
  'Thornwraith Covenant': {
    name: 'Thornwraith Covenant',
    primary: 'Verdant',
    absorb: 'Abyssal',
    weaknesses: ['Metal', 'Voidyr'],
    abilities: [
      {
        name: 'Nethercurrent',
        description: <>
          The first time a Thornwraith is hit with Nethercurrent 
          Damage, they take an additional 4 Infernal Damage which ignores resistances.
        </>,
        permittedTiers: 'all'
      },
      {
        name: 'Infernal Resiliency',
        description: <>
          Thornwraith has [Resist Infernal 2].
        </>,
        permittedTiers: 'all'
      },
      {
        name: 'Verdancy',
        description: shakeoffStatus,
        permittedTiers: 'all'
      }
    ],
    cssClass: 'faction-thornwraith-covenant'
  },
  'Stoneveined Order': {
    name: 'Stoneveined Order',
    primary: 'Chthonic',
    absorb: 'Infernal',
    weaknesses: ['Verdant', 'Voidyr'],
    abilities: [
      {
        name: 'Unyielding',
        description: shakeoffStatus,
        permittedTiers: 'all'
      },
      {
        name: 'Inconductive',
        description: <>
          Gain Resist Nethercurrent 2.
        </>,
        permittedTiers: 'all'
      },
      {
        name: 'Hardy',
        description: <>
          Stoneveined gets extra health based on type.
        </>,
        permittedTiers: 'all'
      },
      {
        name: 'Impactful',
        description: <>
          Stoneveined can add [Knockback 1] to any
          attack they make and reduces knockback by -1 for any
          attack they take.
        </>,
        permittedTiers: [
          ...Tools.getCreatureTiersRange(0, 1)
        ]
      },
      {
        name: 'Super Impactful',
        description: <>
          Stoneveined can add [Knockback 2] to any
          attack they make and reduces knockback by -2 for any
          attack they take.
        </>,
        permittedTiers: [
          ...Tools.getCreatureTiersRange(2, 'max')
        ]
      },
      {
        name: 'Lumbering',
        description: <>
          Stoneveined get -1 to their Move Speed -3 to their
          Dash Bonus.
        </>,
        permittedTiers: 'all'
      }
    ], 
    cssClass: 'faction-stoneveined-order'
  },
  'Vastfathom League': {
    name: 'Vastfathom League',
    primary: 'Abyssal',
    absorb: 'Metal',
    weaknesses: ['Chthonic', 'Nethercurrent'],
    abilities: [
      {
        name: 'Glider',
        description: <>
          Gains [Hover]. Gains [Flying] instead if in a Shoalpocked Expanse area.
        </>,
        permittedTiers: 'all'
      },
      {
        name: 'The Depths of Uncertainty',
        description: <>
          This creature can make a +2 Skill Check. On a Rank 1 Success, it can
          grant a creature in Immediate Range <RuleKeyword keyword="Grim Uncertainty" />.
          On a Rank 2 Success, it can target a creature 
          within <RuleKeyword keyword="Medium Range" /> instead.
          On Rank 3 Success, add <StatusKeyword effect="enslumbered" x={1} /> to the effect.
        </>,
        permittedTiers: 'all'
      }
    ],
    cssClass: 'faction-vastfathom-league'
  },
  'Ashborn Legion': {
    name: 'Ashborn Legion',
    primary: 'Infernal',
    absorb: 'Verdant',
    weaknesses: ['Abyssal', 'Chthonic'],
    abilities: [
      {
        name: 'Heat-Death',
        description: <>
          When Ashborn Legion dies, it explodes in a burst of Infernal energy,
          dealing Infernal damage equal to Tier+1 to all adjacent creatures.
          <br />
          All non-Ashborn Legion creatures hit by this must get Rank 2 or higher
          on a [] Skill Check or gain [Blinded 1].
        </>,
        permittedTiers: 'all'
      },
      {
        name: 'Incinerators',
        description: <>
          When hitting a creature with an attack that deals Infernal damage,
          if that creature is adjacent to two other Ashborn Legion creatures,
          that creature must make Rank 2 a [Stoic Agility] Skill Check. 
          Rank 1: [Immolated 1 for 1]. Rank 0: [Immolated 1 for 2].
        </>,
        permittedTiers: 'all'
      }
    ],
    cssClass: 'faction-ashborn-legion'
  },
  'Wanderlost Crews': {
    name: 'Wanderlost Crews',
    primary: 'Metal',
    absorb: 'Chthonic',
    weaknesses: ['Infernal', 'Nethercurrent'],
    cssClass: 'faction-wanderlost-crews'
  },
  'Zephpter Horde': {
    name: 'Zephpter Horde',
    primary: 'Nethercurrent',
    absorb: 'Voidyr',
    weaknesses: ['Chthonic', 'Metal'],
    abilities: [
      {
        name: 'Netherburn',
        description: <>
          Attacks with [Nethercurrent] damage have a 25% chance to deal
          Infernal or Abyssal (GM's choice) damage instead.
        </>,
        permittedTiers: 'all'
      },
      {
        name: 'Windtouched',
        description: <>
          Randomly either gain [Hover] or increase Move Speed by +2.
          Creatures that are CT2 or greater, they gain [Flying] 
          instead of [Hover].
        </>,
        permittedTiers: [
          ...Tools.getCreatureTiersRange(0, 1)
        ]
      },
      {
        name: 'Windborne',
        description: <>
          Randomly either gain [Flying] or increase Move Speed by +2.
        </>,
        permittedTiers: [
          ...Tools.getCreatureTiersRange(2, 'max')
        ]
      }
    ],
    cssClass: 'faction-zephpter-horde'
  },
  'Umbral Nexus': {
    name: 'Umbral Nexus',
    primary: 'Voidyr',
    absorb: 'Nethercurrent',
    weaknesses: ['Abyssal', 'Infernal'],
    abilities: [
      {
        name: 'Uncanny Durability',
        description: <>
        Gain [Resist Metal 5] against non-blessed metals.
        </>,
        permittedTiers: 'all'
      },
      {
        name: 'Blessed Aversions',
        description: <>
          Gain [Weak Blessed Metal 5] and [Weak Blessed Fire 5].
        </>,
        permittedTiers: 'all'
      }
    ],
    cssClass: 'faction-umbral-nexus'
  }
};

export function transformCreatureToFaction(creature: Creature, factionKey: string): Creature {
  // No transformation needed for Generic
  if (factionKey === 'Generic') { return creature; }

  const faction = FACTION_DATA[factionKey];
  if (!faction) { return creature; }

  // Create a deep copy of the creature
  const transformedCreature: Creature = JSON.parse(JSON.stringify(creature));

  // Add faction tag
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  transformedCreature.tags = [faction.name, ...transformedCreature.tags];

  // Transform damage taken mods
  transformedCreature.damageTakenMods = transformedCreature.damageTakenMods.map(mod => {
    switch (mod.type) {
      case 'CORE':
        return { ...mod, type: faction.primary } as DamageTakenMod;
      case 'PROMOTE':
        return { ...mod, type: faction.absorb } as DamageTakenMod;
      case 'REJECT':
        return { ...mod, type: faction.weaknesses[0] } as DamageTakenMod;
      case 'DISRUPT':
        return { ...mod, type: faction.weaknesses[1] } as DamageTakenMod;
      default:
        return mod;
    }
  });

  // Transform attack damage types from Core to faction primary
  transformedCreature.attacks = transformedCreature.attacks.map(attack => ({
    ...attack,
    damage: {
      l: attack.damage.l.type === 'Core'
        ? { ...attack.damage.l, type: faction.primary } as AttackMode['damage']['l']
        : attack.damage.l,
      m: attack.damage.m.type === 'Core' 
        ? { ...attack.damage.m, type: faction.primary } as AttackMode['damage']['m']
        : attack.damage.m,
      h: attack.damage.h.type === 'Core' 
        ? { ...attack.damage.h, type: faction.primary } as AttackMode['damage']['h']
        : attack.damage.h,
    }
  }));

  // Add special faction abilities if they exist
  if (faction.abilities) {
    transformedCreature.abilities = [
      ...transformedCreature.abilities,
      ...faction.abilities
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
  // if (factionKey === 'Zephpter Horde') {
  //   if (transformedCreature.tier === 'Elite' || transformedCreature.tier === 'Tormentor' || 
  //       transformedCreature.tier === 'Archfiend' || transformedCreature.tier === 'Lord' || 
  //       transformedCreature.tier === 'Overlord') {
  //     transformedCreature.abilities = [
  //       ...transformedCreature.abilities.filter(a => !a.includes('[Flying]')),
  //       'Has [Flying].'
  //     ];
  //   } else {
  //     transformedCreature.speed += 2;
  //   }
  // }

  return transformedCreature;
}
