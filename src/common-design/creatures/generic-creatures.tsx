import { Creature } from '../../ts-types/creature-types';
import { DamageTakenMod } from '../../ts-types/creature-types';



const coreResist: DamageTakenMod = {
  modification: 'Resist',
  type: 'Core',
  mod: 1,
};
// const coreAbsorb: DamageTakenMod = {
//   modification: 'Absorb',
//   type: 'Core',
//   mod: 1,
// };
const promoteAborb: DamageTakenMod = {
  modification: 'Absorb',
  type: 'Promote',
  mod: 1,
};
// const primaryWeakness: DamageTakenMod = {
//   modification: 'Weak',
//   type: 'Primary',
//   mod: 1,
// };
// const secondaryWeakness: DamageTakenMod = {
//   modification: 'Weak',
//   type: 'Secondary',
//   mod: 1,
// };

const exObj: {
  imp: Creature,
  swarmer: Creature,
  spitter: Creature,
  lansperker: Creature,
  // hellhound: Creature,
  // hellspawn: Creature,
  // hellspawnArchanist: Creature,
  // AllSeeingEyespawn: Creature,
  // malorix: Creature,
  //entombed: Creature,
  // Imps
  // Fiendlings
  // Hellkin
  // Scourgelings
  // Infernal Spawn
  // Ashlings
  // Hellspawn
  // Cindersouls
  // Gorewretches
  // Brimstone Minions
  // Pitfiends
  // Netherlings
  // Malebrutes
  // Emberclaws
  // Flamewretches

  // Inferloth
  // Abyzeth
  // Virektos
  // Skarith
  // Tenebros
  // Xalvoth
  // Gorothon
  // Phantyros
  // Noxalith
  // Zharixis
  // Kalseth
  // Vorakhis
  // Akrethis
  // Sulvithar

} = {
  imp: {
    name: 'Imp',
    type: 'Minion',
    tags: [],
    health: 15,
    size: 1,
    speed: 4,
    dash: 2,
    damageTakenMods: [
      { ...coreResist, mod: 2 },
    ],
    attacks: [{
      name: 'Corrupting Strike',
      damage: {
        l: { value: 1, type: 'Core' },
        m: { value: 2, type: 'Core' },
        h: { value: 3, type: 'Core' },
      },
      tags: ['Melee'],
      effects: ["A creature who reaches 0 health from this attack adds +1 to the Injury Roll."],
    }],
    abilities: [],
    description: 'A small, weak demon. They are quick and can be hard to hit.',
  },
  swarmer: {
    name: 'Swarmer',
    type: 'Minion',
    tags: [],
    health: 12,
    size: 1,
    speed: 6,
    dash: 3,
    damageTakenMods: [ { ...coreResist } ],
    attacks: [{
      name: 'Bite & Claw',
      damage: {
        l: { value: 1, type: 'Core' },
        m: { value: 1, type: 'Core' },
        h: { value: 2, type: 'Core' },
      },
      tags: ['Melee Attack', 'Melee Range'],
      effects: [' If target has 4 or more Swarming minions adjacent, they gain 1 corruption as well.'],
    }],
    abilities: [],
    description: 'A small, weak demon, but they often come in large numbers. Best to clean them out before they overwhelm you.',
  },
  spitter: {
    name: 'Spitter',
    type: 'Minion',
    tags: [],
    health: 10,
    size: 1,
    speed: 4,
    dash: 2,
    damageTakenMods: [ { ...coreResist } ],
    attacks: [{
      name: 'Acid Spit',
      damage: {
        l: { value: 1, type: 'Core' },
        m: { value: 2, type: 'Core' },
        h: { value: 3, type: 'Core' },
      },
      tags: ['Ranged Attack', 'Medium Range'],
      effects: [''],
    }],
    abilities: [],
    description: 'A small, weak demon. They can spit their core type at you from a ',
  },
  lansperker: {
    name: 'Lansperker',
    type: 'Minion',
    tags: [],
    health: 20,
    size: 1,
    speed: 5,
    damageTakenMods: [ { ...coreResist }, { ...promoteAborb } ],
    attacks: [{
      name: 'Lance Thrust',
      damage: {
        l: { value: 2, type: 'Core' },
        m: { value: 3, type: 'Core' },
        h: { value: 4, type: 'Core' },
      },
      tags: ['Melee Attack', 'Melee Range'],
      effects: [],
    }],
    abilities: ['Lansperker\'s [Melee Range] is 2.'],
    description: 'A demon with a long spear, whip, or other reaching weapon.',
  },
};

export default exObj;