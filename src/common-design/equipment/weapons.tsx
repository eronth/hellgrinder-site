import { WeaponType } from '../../ts-types/types';

const pistol: WeaponType = {
  name: 'Pistol',
  tags: ['One-Handed'],
  attackModes: [{
    tags: ['Short Range', 'Shooting Attack'],
    damage: {
      l: { value: 3, type: 'Metal' },
      m: { value: 6, type: 'Metal' },
      h: { value: 9, type: 'Metal' },
    },
    effects: ['You can make an attack with this weapon targeting an enemy in your [Peripheral Arc] with a -3 penalty to the Hit Check.'],
  }],
};

const combatRifle: WeaponType = {
  name: 'Combat Rifle',
  tags: ['Two-Handed'],
  attackModes: [{
    tags: ['Medium Range', 'Shooting Attack'],
    damage: {
      l: { value: 3, type: 'Metal' },
      m: { value: 6, type: 'Metal' },
      h: { value: 9, type: 'Metal' },
    },
  }],
};

const sword: WeaponType = {
  name: 'Sword',
  tags: ['One-Handed'],
  attackModes: [{
    tags: ['Melee Attack'],
    damage: {
      l: { value: 5, type: 'Metal' },
      m: { value: 5, type: 'Metal' },
      h: { value: 10, type: 'Metal' },
    },
  }],
};

const knife: WeaponType = {
  name: 'Knife',
  tags: ['One-Handed'],
  attackModes: [{
    tags: ['Melee Attack'],
    damage: {
      l: { value: 3, type: 'Metal' },
      m: { value: 3, type: 'Metal' },
      h: { value: 6, type: 'Metal' },
    },
    effects: ['If you move adjacent to an enemy before making this attack, you gain 1 Movement Point.'],
  }],
};

function deepCopyWeapon(weapon: WeaponType): WeaponType {
  return JSON.parse(JSON.stringify(weapon));
}

export { deepCopyWeapon, pistol, combatRifle, sword, knife };