import { Creature } from "../../ts-types/creature-types";
import Tools from "../Tools";


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
    abilities: [],
    description: '',
  },
  // TODO add more creatures
};

export default exObj;