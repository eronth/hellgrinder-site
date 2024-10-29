import { Weapon } from '../../ts-types/types';

const exObj: { [key: string]: Weapon } = {
  pistol: {
    name: 'Pistol',
    tags: ['One-Handed'],
    attackModes: [{
      tags: ['Attack', 'Shooting', 'Short Range'],
      damage: {
        l: { value: 3, type: 'Metal' },
        m: { value: 6, type: 'Metal' },
        h: { value: 9, type: 'Metal' },
      },
      effects: ['You can make an attack with this weapon targeting an enemy in your [Peripheral Arc] with a -3 penalty to the Hit Check.'],
    }],
  },
  combatRifle: {
    name: 'Combat Rifle',
    tags: ['Two-Handed'],
    attackModes: [{
      tags: ['Attack', 'Shooting', 'Medium Range'],
      damage: {
        l: { value: 3, type: 'Metal' },
        m: { value: 6, type: 'Metal' },
        h: { value: 9, type: 'Metal' },
      },
    }],
  },
  breachShotgun: {
    name: 'Breach Shotgun',
    tags: [],
    attackModes: [{
      name: 'Close Encounter',
      tags: ['Attack', 'Shooting', 'Short Range'],
      damage: {
        l: { value: 2, type: 'Metal' },
        m: { value: 8, type: 'Metal' },
        h: { value: 9, type: 'Metal' },
      },
    },
      {
        name: 'Crowd Control',
        tags: ['Attack', 'Shooting', 'Medium Range'],
        damage: {
          l: { value: 1, type: 'Metal' },
          m: { value: 3, type: 'Metal' },
          h: { value: 6, type: 'Metal' },
        },
        effects: ['This attack can target up to 3 enemies in your front arc within, so long as all targets are within [Short Range] of each other.'],
      }],
  },
  flameThrower: {
    name: 'Flame Thrower',
    tags: ['Heavy', 'Two-Handed'],
    attackModes: [{
      tags: ['Attack', 'Shooting', 'Short Range'],
      damage: {
        l: { value: 1, type: 'Infernal' },
        m: { value: 4, type: 'Infernal' },
        h: { value: 6, type: 'Infernal' },
      },
      effects: ['This attack targets all creatures in [Short Range] of your front arc.', 'This attack cannot be used beyond [Short Range].'],
    }],
  },
  grenadeLauncher: {
    name: 'Grenade Launcher',
    tags: ['Heavy', 'Two-Handed'],
    attackModes: [{
      tags: ['Attack', 'Shooting', 'Medium Range', 'Long Range'],
      damage: {
        l: { value: 1, type: 'Metal' },
        m: { value: 1, type: 'Metal' },
        h: { value: 3, type: 'Metal' },
      },
      effects: ['Launch a Grenade by making a shooting attack instead of a Thrown Attack. After the attack hits, the grenade detonates on your target\'s hex dealing any damage or effects of the grenade in addition to this attack\'s damage. The attack loses the [Thrown] property.',
        'Grenades launched by this weapon get +1 to their Area.'
      ],
    }],
  },
  sniper: {
    name: 'Sniper Rifle',
    tags: ['Heavy', 'Two-Handed'],
    attackModes: [{
      tags: ['Attack', 'Shooting', 'Single-Shot', 'Long Range'],
      damage: {
        l: { value: 2, type: 'Metal' },
        m: { value: 9, type: 'Metal' },
        h: { value: 12, type: 'Metal' },
      },
      effects: ['After firing, you must to use an Action or Maneuver to reload before you can fire this weapon again.'],
    }],
  },
  
  sword: {
    name: 'Sword',
    tags: ['One-Handed'],
    attackModes: [{
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      damage: {
        l: { value: 5, type: 'Metal' },
        m: { value: 5, type: 'Metal' },
        h: { value: 10, type: 'Metal' },
      },
    }],
  },
  knife: {
    name: 'Knife',
    tags: ['One-Handed'],
    attackModes: [{
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      damage: {
        l: { value: 3, type: 'Metal' },
        m: { value: 3, type: 'Metal' },
        h: { value: 6, type: 'Metal' },
      },
      effects: ['If you move adjacent to an enemy before making this attack, you gain 1 Movement Point.'],
    }],
  },
  zweihander: {
    name: 'Zweihander',
    tags: ['Two-Handed'],
    attackModes: [{
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      damage: {
        l: { value: 7, type: 'Metal' },
        m: { value: 7, type: 'Metal' },
        h: { value: 10, type: 'Metal' },
      },
    }],
  },
  spear: {
    name: 'Spear',
    tags: ['Two-Handed'],
    attackModes: [{
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      damage: {
        l: { value: 5, type: 'Metal' },
        m: { value: 5, type: 'Metal' },
        h: { value: 8, type: 'Metal' },
      },
      effects: [
        'This attack treats Range 2 as if it was Adjacent Range.',
        'You can wield a shield in your off-hand with this weapon with no penalty.',
      ],
    }],
  },
  hatchet: {
    name: 'Hatchet',
    tags: ['One-Handed'],
    attackModes: [{
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      damage: {
        l: { value: 4, type: 'Metal' },
        m: { value: 4, type: 'Metal' },
        h: { value: 7, type: 'Metal' },
      },
    }, {
      tags: ['Attack', 'Thrown', 'Short Range'],
      damage: {
        l: { value: 3, type: 'Metal' },
        m: { value: 3, type: 'Metal' },
        h: { value: 5, type: 'Metal' },
      },
    }],
  
  },

  fragmentationGrenade: {
    name: 'Fragmentation Grenade',
    tags: ['Grenade', 'One-Handed'],
    attackModes: [{
      tags: ['Short Range', 'Medium Range', 'Thrown', { tag: 'Area', value: 1 }],
      damage: {
        l: { value: 9, type: 'Metal' },
        m: { value: 9, type: 'Metal' },
        h: { value: 9, type: 'Metal' },
      },
    }],
  },
  incendiaryGrenade: {
    name: 'Incendiary Grenade',
    tags: ['Grenade', 'One-Handed'],
    attackModes: [{
      tags: ['Short Range', 'Medium Range', 'Thrown', { tag: 'Area', value: 1 }],
      damage: {
        l: { value: 5, type: 'Infernal' },
        m: { value: 5, type: 'Infernal' },
        h: { value: 5, type: 'Infernal' },
      },
      effects: [ 'The area hit by an incendiary grenade is Burning for 1/2/3 turns. Creatures that enter a Burning area or end their turn in a Burning area if they started there (and did not leave) take the grenade’s Infernal Damage again.'],
    }],
  },
  
};

export default exObj;