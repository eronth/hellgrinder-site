import { Weapon } from '../../../ts-types/types';

const exObj: { [key: string]: Weapon } = {
  sword: {
    name: 'Sword',
    tags: ['One-Handed'],
    isAdvancedItem: false,
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
    isAdvancedItem: false,
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
    isAdvancedItem: false,
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
    isAdvancedItem: false,
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
    isAdvancedItem: false,
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
};

export default exObj;