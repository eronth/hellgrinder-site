import { Weapon } from '../../../ts-types/types';

const exObj: { [key: string]: Weapon } = {
  pistol: {
    name: 'Pistol',
    tags: ['One-Handed'],
    isAdvancedItem: false,
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
    isAdvancedItem: false,
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
    tags: ['Two-Handed'],
    isAdvancedItem: false,
    attackModes: [{
      name: 'Close Encounter',
      tags: ['Attack', 'Shooting', 'Short Range'],
      damage: {
        l: { value: 2, type: 'Metal' },
        m: { value: 8, type: 'Metal' },
        h: { value: 9, type: 'Metal' },
      },
    }, {
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
    isAdvancedItem: true,
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
    isAdvancedItem: true,
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
    isAdvancedItem: true,
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
};

export default exObj;