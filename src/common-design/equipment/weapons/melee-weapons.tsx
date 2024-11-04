import { Weapon } from '../../../ts-types/types';
import DiceTools from '../../../common-design/dice-handling';

const exObj: { [key: string]: Weapon } = {
  sword: {
    name: 'Sword',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    attackModes: [{
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      damage: {
        l: { value: DiceTools.get2d4(1), type: 'Metal' },
        m: { value: DiceTools.get2d4(1), type: 'Metal' },
        h: { value: DiceTools.get3d4(3), type: 'Metal' },
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
        l: { value: DiceTools.get1d4(1), type: 'Metal' },
        m: { value: DiceTools.get1d4(1), type: 'Metal' },
        h: { value: DiceTools.get2d6(1), type: 'Metal' },
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
        l: { value: DiceTools.get3d4(), type: 'Metal' },
        m: { value: DiceTools.get3d4(), type: 'Metal' },
        h: { value: DiceTools.get4d4(2), type: 'Metal' },
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
        l: { value: DiceTools.get2d4(1), type: 'Metal' },
        m: { value: DiceTools.get2d4(1), type: 'Metal' },
        h: { value: DiceTools.get2d4(4), type: 'Metal' },
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
        l: { value: DiceTools.get2d4(), type: 'Metal' },
        m: { value: DiceTools.get2d4(), type: 'Metal' },
        h: { value: DiceTools.get2d4(4), type: 'Metal' },
      },
    }, {
      tags: ['Attack', 'Thrown', 'Short Range'],
      damage: {
        l: { value: DiceTools.get2d4(-1), type: 'Metal' },
        m: { value: DiceTools.get2d4(-1), type: 'Metal' },
        h: { value: DiceTools.get2d4(1), type: 'Metal' },
      },
    }],
  },
  drownerHook: {
    name: 'Drowner Hook',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    attackModes: [{
      tags: ['Attack', 'Melee', 'Short Range'],
      damage: {
        l: { value: DiceTools.get2d4(1), type: 'Abyssal' },
        m: { value: DiceTools.get2d4(1), type: 'Abyssal' },
        h: { value: DiceTools.get3d4(3), type: 'Abyssal' },
      },
      effects: [
        'When you hit an enemy with this weapon, you can move them a number of spaces in any direction equal to ' +
        'the Success Rank in any direction.'
      ],
    }],
  }
};

export default exObj;