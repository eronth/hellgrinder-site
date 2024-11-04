import { Weapon } from '../../../ts-types/types';
import DiceTools from '../../../common-design/dice-handling';

const exObj: { [key: string]: Weapon } = {
  brandedGrasp: {
    name: 'Branded Grasp',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Adjacent Range'],
      damage: {
        l: { value: DiceTools.get2d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get2d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get2d8(), type: 'Chosen Type' },
      },
      effects: [''],
    }],
  },
  runeBlast: {
    name: 'Rune Blast',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Medium Range'],
      damage: {
        l: { value: DiceTools.get2d4(-2), type: 'Chosen Type' },
        m: { value: DiceTools.get2d6(-1), type: 'Chosen Type' },
        h: { value: DiceTools.get2d8(-1), type: 'Chosen Type' },
      },
      effects: ['When you hit an enemy that has Resist against your chosen element, you can forgo damage to instead reduce their Resist value against that element by 1 for the rest of the encounter.'],
    }],
  },
  reboundingBolt: {
    name: 'Rebounding Bolt',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Medium Range'],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d10(), type: 'Chosen Type' },
      },
      effects: ['After you hit an enemy with this attack, you can make a free attack against another enemy within Short Range' +
      ' of your initial target. Once per attack.'],
    }],
  },
  arcaneLance: {
    name: 'Arcane Lance',
    tags: ['Two-Handed'],
    isAdvancedItem: true,
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Short Range'],
      damage: {
        l: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d12(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d12(3), type: 'Chosen Type' },
      },
      effects: ['This attack ignores the first 2 points of Resist and Absorb on the target.'],
    }],
  },
  trailblazer: {
    name: 'Trailblazer',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    attackModes: [{
      tags: ['Attack', 'Arcane'],
      damage: {
        l: { value: DiceTools.get2d2(), type: 'Infernal' },
        m: { value: DiceTools.get2d2(), type: 'Infernal' },
        h: { value: DiceTools.get3d2(), type: 'Infernal' },
      },
      effects: [
        'For the rest of yoru turn, each hex you leave is given Trailblazer Hazard that lasts until the start of' +
        'your next turn. Once per round, when an creature enters a hex with Trailblazer Hazard OR if a creature ends their' +
        'turn in a hex with a Trailblazer Hazard, they take Damage based on your Hit Check result.'
      ],
    }],
  },
  flowingCurrent: {
    name: 'Flowing Current',
    tags: ['Two-Handed'],
    isAdvancedItem: true,
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Medium Range'],
      damage: {
        l: { value: DiceTools.get1d2(1), type: 'Nethercurrent' },
        m: { value: DiceTools.get1d2(2), type: 'Nethercurrent' },
        h: { value: DiceTools.get1d2(3), type: 'Nethercurrent' },
      },
      effects: ['After you hit an enemy with this attack, you can make a free attack against another enemy within Short ' +
      'Range of your target. This can repeat any number of against new targets each time.'],
    }],
  }
};

export default exObj;