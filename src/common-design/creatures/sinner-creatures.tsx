import { Creature } from '../../ts-types/creature-types';
import Tools from '../../common-design/Tools';

const exObj: { [key: string]: Creature } = {
  enragedSinner: {
    name: 'Enraged Sinner',
    tier: Tools.creatureTiers.t2,
    description: 'When a sinner is forced to cease its assigned task, it becomes enraged. once enraged, it will attack without mercy.',
    tags: ['Sinner'],
    health: 55,
    size: 1,
    speed: 7,
    dash: 4,
    damageTakenMods: [
      { modification: 'Resist', type: 'All', mod: 4 },
    ],
    attacks: [{
      name: 'Thrashing',
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      damage: {
        l: { type: 'Metal', value: 5 },
        m: { type: 'Metal', value: 6 },
        h: { type: 'Metal', value: 9 },
      }
    }, {
      name: 'Devour the Obstinate',
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      damage: {
        l: { type: 'Metal', value: 7 },
        m: { type: 'Metal', value: 8 },
        h: { type: 'Metal', value: 11 },
      },
      effects: ['Can only be used against a target that is injured.', 'Has a 1d4 turn cooldown.'],
    }],
    abilities: [],
  }
};

export default exObj;