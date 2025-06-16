import { Creature, CreatureAbility } from "../../ts-types/creature-types";
import Tools from "../Tools";

const arc: CreatureAbility = {
  name: 'Arc',
  description: <>
    At the start of the round, this creature may
    draw a line between itself and another creature with "Arc".
    All non-Zephpter creatures touched by that Arc are targeted by a
    2/3/4 [Arcane] Nethercurrent attack.
  </>
};

const exObj: { [key: string]: Creature } = {
  zephilim: {
    name: 'Zephilim',
    tier: Tools.creatureTiers.t2,
    tags: ['Zephpter Horde'],
    health: 8, size: 1,
    speed: 7, dash: 5,
    damageTakenMods: [
      { modification: 'Resist', type: 'Nethercurrent', mod: 2 },
      { modification: 'Absorb', type: 'Voidyr', mod: 1 },
      { modification: 'Weak', type: 'Chthonic', mod: 1 },
      { modification: 'Weak', type: 'Metal', mod: 1 },
    ],
    attacks: [
      {
        name: 'Currental',
        damage: {
          l: { value: 2, type: 'Nethercurrent' },
          m: { value: 3, type: 'Nethercurrent' },
          h: { value: 4, type: 'Nethercurrent' },
        },
        tags: ['Attack', 'Melee', 'Adjacent Range'],
      },
    ],
    abilities: [arc],
    description: '',
  },
  elzid: {
    name: 'Elzid',
    tier: Tools.creatureTiers.t1,
    tags: ['Zephpter Horde'],
    health: 6, size: 1,
    speed: 6, dash: 4,
    damageTakenMods: [
      { modification: 'Resist', type: 'Nethercurrent', mod: 1 },
      { modification: 'Absorb', type: 'Voidyr', mod: 1 },
      { modification: 'Weak', type: 'Chthonic', mod: 1 },
    ],
    attacks: [
      {
        name: 'Zip',
        damage: {
          l: { value: 1, type: 'Nethercurrent' },
          m: { value: 2, type: 'Nethercurrent' },
          h: { value: 3, type: 'Nethercurrent' },
        },
        tags: ['Attack', 'Arcane', 'Short Range'],
      },
    ],
    abilities: [arc],
    description: '',
  },
  magid: {
    name: 'Magid',
    tier: Tools.creatureTiers.t3,
    tags: ['Zephpter Horde'],
    health: 6, size: 1,
    speed: 3, dash: 1,
    damageTakenMods: [
      { modification: 'Resist', type: 'Nethercurrent', mod: 1 },
      { modification: 'Absorb', type: 'Voidyr', mod: 7 },
      { modification: 'Weak', type: 'Chthonic', mod: 3 },
      { modification: 'Weak', type: 'Metal', mod: 4 },
    ],
    attacks: [
      {
        name: 'Magi Bolt',
        damage: {
          l: { value: 1, type: 'Nethercurrent' },
          m: { value: 2, type: 'Nethercurrent' },
          h: { value: 7, type: 'Nethercurrent' },
        },
        tags: ['Attack', 'Arcane', 'Long Range'],
      },
      {
        name: 'Magi Blast',
        damage: {
          l: { value: 3, type: 'Nethercurrent' },
          m: { value: 3, type: 'Nethercurrent' },
          h: { value: 3, type: 'Nethercurrent' },
        },
        tags: ['Attack', 'Arcane', 'Medium Range'],
      }
    ],
    abilities: [
      arc,
      {
        name: '',
        description: <>
          If this creature targets a creature that was hit by the
          Arc ability this round, it gets +3 to its Hit Check.
        </>
      }
    ],
    description: '',
  }
  // TODO add more creatures
};

export default exObj;