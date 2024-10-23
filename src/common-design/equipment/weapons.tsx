import { Weapon } from '../../ts-types/types';

const pistol: Weapon = {
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
};

const combatRifle: Weapon = {
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
};

const sword: Weapon = {
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
};

const knife: Weapon = {
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
};

function deepCopyWeapon(weapon: Weapon): Weapon {
  return JSON.parse(JSON.stringify(weapon));
}

export { deepCopyWeapon, pistol, combatRifle, sword, knife };