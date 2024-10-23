import { Creature } from '../../ts-types/creature-types';
import { DamageTakenMod } from '../../ts-types/creature-types';

const ct0 = 'Minion';
const ct1 = 'Spawn';
const ct2 = 'Elite';
const ct3 = 'Tormentor';
const ct4 = 'Arhfiend';
const ct5 = 'Lord';
const ct6 = 'Overlord';

const coreResist: DamageTakenMod = {
  modification: 'Resist',
  type: 'CORE',
  mod: 1,
};
const coreAbsorb: DamageTakenMod = {
  modification: 'Absorb',
  type: 'CORE',
  mod: 1,
};
const promoteAborb: DamageTakenMod = {
  modification: 'Absorb',
  type: 'PROMOTE',
  mod: 1,
};
const primaryWeakness: DamageTakenMod = {
  modification: 'Weak',
  type: 'REJECT',
  mod: 2,
};
const secondaryWeakness: DamageTakenMod = {
  modification: 'Weak',
  type: 'DISRUPT',
  mod: 1,
};

// imp: Creature,
// swarmer: Creature,
// spitter: Creature,
// lansperker: Creature,
// lasherator: Creature,
// hellhound: Creature,
// tenebros: Creature,
// wreislander: Creature,
// hellspawn: Creature,
// archanistStudent: Creature,
// allSeeingEyespawn: Creature,
const exObj: { [key: string]: Creature } = {
  imp: {
    name: 'Imp',
    type: ct0,
    tags: [],
    health: 15,
    size: 1,
    speed: 4,
    dash: 2,
    damageTakenMods: [
      { ...coreResist, mod: 2 },
      { ...promoteAborb, mod: 1 },
      {...primaryWeakness, mod: 3},
      {...secondaryWeakness, mod: 3}
    ],
    attacks: [{
      name: 'Arcane Bolt',
      damage: {
        l: { value: 1, type: 'Core' },
        m: { value: 2, type: 'Core' },
        h: { value: 3, type: 'Core' },
      },
      tags: ['Attack', 'Arcane', 'Short Range'],
    },
    {
      name: 'Corrupting Strike',
      damage: {
        l: { value: 1, type: 'Core' },
        m: { value: 2, type: 'Core' },
        h: { value: 4, type: 'Core' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: ["A creature who reaches 0 health from this attack adds +1 to the Injury Roll."],
    }],
    abilities: ['Imps have [Flying].'],
    description: 'A small, weak demon. They are quick and can be hard to hit.',
  },
  swarmer: {
    name: 'Swarmer',
    type: ct0,
    tags: [],
    health: 12,
    size: 1,
    speed: 6,
    dash: 3,
    damageTakenMods: [ { ...coreResist }, {...primaryWeakness}, {...secondaryWeakness} ],
    attacks: [{
      name: 'Bite & Claw',
      damage: {
        l: { value: 1, type: 'Core' },
        m: { value: 1, type: 'Core' },
        h: { value: 2, type: 'Core' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: [' If target has 4 or more Swarming minions adjacent, they gain 1 corruption as well.'],
    }],
    abilities: [],
    description: 'A small, weak demon, but they often come in large numbers. Best to clean them out before they overwhelm you.',
  },
  spitter: {
    name: 'Spitter',
    type: ct0,
    tags: [],
    health: 8,
    size: 1,
    speed: 4,
    damageTakenMods: [ { ...coreResist }, {...primaryWeakness}, {...secondaryWeakness} ],
    attacks: [{
      name: 'Vile Spit',
      damage: {
        l: { value: 1, type: 'Core' },
        m: { value: 2, type: 'Core' },
        h: { value: 3, type: 'Core' },
      },
      tags: ['Attack', 'Shooting', 'Medium Range'],
      effects: ['On a Full Success, the attack gains the [Area: 1] tag, this deals only 1 damage to creatures other than the target.'],
    }],
    abilities: [],
    description: 'A small, weak demon. They can spit their core type at you from a range away.',
  },
  lansperker: {
    name: 'Lansperker',
    type: ct1,
    tags: [],
    health: 20,
    size: 1,
    speed: 5,
    damageTakenMods: [ { ...coreResist }, { ...promoteAborb, mod: 2 }, {...primaryWeakness}, {...secondaryWeakness} ],
    attacks: [{
      name: 'Lance Thrust',
      damage: {
        l: { value: 2, type: 'Core' },
        m: { value: 3, type: 'Core' },
        h: { value: 4, type: 'Core' },
      },
      tags: ['Attack', 'Melee', 'Short Range'],
      effects: ['Attacks at range 3 get -3 to [Hit Checks].'],
    }],
    abilities: [],
    description: 'A demon with a long spear, whip, or other reaching weapon.',
  },
  lasherator: {
    name: 'Lasherator',
    type: ct1,
    tags: [],
    health: 15,
    size: 1,
    speed: 4,
    dash: 1,
    damageTakenMods: [ { ...coreResist, mod: 3 }, { ...promoteAborb }, {...primaryWeakness}, {...secondaryWeakness} ],
    attacks: [{
      name: 'Lash',
      damage: {
        l: { value: 3, type: 'Core' },
        m: { value: 4, type: 'Core' },
        h: { value: 4, type: 'Core' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: [],
    }],
    abilities: ['Lasherator\'s can perform a Shove against creatures within their Shove range to pull them to a space next to the Lasherator.'],
    description: 'A demon with a whip, hook, or other entangling weapon. They are quick to pull you out of safety and into their range.',
  },
  hellhound: {
    name: 'Hellhound',
    type: ct0,
    tags: [],
    health: 8,
    size: 1,
    speed: 6,
    dash: 2,
    damageTakenMods: [ { ...coreResist }, { ...promoteAborb }, {...primaryWeakness, mod: 1},],
    attacks: [{
      name: 'Bite',
      damage: {
        l: { value: 3, type: 'Core' },
        m: { value: 3, type: 'Core' },
        h: { value: 4, type: 'Core' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: ['A complete success also gives the target the [Bleeding] status effect.'],
    }],
    abilities: ['Hellhounds have a +2 bonus to all Observation Skill Checks.', 'Hellhounts without a master can, with great effort, be tamed.'],
    description: 'A demon that looks like a hound draped in demonic powers. They are fiercely loyal to their masters.',
  },
  tenebros: {
    name: 'Tenebros',
    type: ct1,
    tags: [],
    health: 10,
    size: 1,
    speed: 5,
    damageTakenMods: [
      { ...coreResist, mod: 4 },
      { ...coreAbsorb, mod: 3 },
      { ...promoteAborb, mod: 5 },
      {...primaryWeakness},
      {...secondaryWeakness}
    ],
    attacks: [{
      name: 'Shadow Strike',
      damage: {
        l: { value: 2, type: 'Core' },
        m: { value: 3, type: 'Core' },
        h: { value: 4, type: 'Core' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: [],
    }],
    abilities: [
      'The Tenebros can use a [Shadow Step] Maneuver. When they do, they teleport 3⬣.'
    ],
    description: 'A demon with a hardy form. They are resistant to most forms of damage.',
  },
  wreislander: {
    name: 'Wreislander',
    type: ct2,
    tags: [],
    health: 20,
    size: 3,
    speed: 4,
    damageTakenMods: [ { ...coreResist, mod: 2 }, { ...promoteAborb, mod: 2 }, {...primaryWeakness}, {...secondaryWeakness} ],
    attacks: [{
      name: 'Crushing Blow',
      damage: {
        l: { value: 4, type: 'Core' },
        m: { value: 5, type: 'Core' },
        h: { value: 6, type: 'Core' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: ['On a Full Success, the target is [Prone].'],
    }],
    abilities: ['Wreislanders [Resist All 5] until they take either DISRUPT or REJECT damage.'],
    description: 'A large demon that can crush you with a mighty blow. They exude a powerful aura that protects them from harm until disrupted.',
  },
  hellspawn: {
    name: 'Aggressor Hellspawn',
    type: ct1,
    tags: [],
    health: 16,
    size: 1,
    speed: 6,
    damageTakenMods: [ { ...coreResist, mod: 2 }, { ...promoteAborb, mod: 2 }, {...primaryWeakness}, {...secondaryWeakness} ],
    attacks: [{
      name: 'Rending Gash',
      damage: {
        l: { value: 3, type: 'Core' },
        m: { value: 4, type: 'Core' },
        h: { value: 5, type: 'Core' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: ['On Moderate Success, gain 1 charge of Reaping.'],
    },
    {
      name: "Reaping Slash (0 Charges)",
      damage: {
        l: { value: 4, type: 'Core' },
        m: { value: 4, type: 'Core' },
        h: { value: 6, type: 'Core' },
      },
      tags: ['Attack', 'Melee', {tag: 'Range', value: 2}],
      effects: ['Aggressor Hellspwan heals for the amount of damage dealt.'],
    },
    {
      name: 'Quick Bolt',
      damage: {
        l: { value: 2, type: 'Core' },
        m: { value: 3, type: 'Core' },
        h: { value: 3, type: 'Core' },
      },
      tags: ['Attack', 'Shooting', 'Medium Range'],
      effects: ['On a Full Success, the target is [Burning] for 1 turn.'],
    }],
    abilities: [],
    description: '',
  },
  archanistStudent: {
    name: 'Anarchist Student',
    type: ct1,
    tags: [],
    health: 10,
    size: 1,
    speed: 4,
    damageTakenMods: [ { ...coreResist, mod: 2 }, { ...promoteAborb, mod: 4 }, {...primaryWeakness, mod: 3}, {...secondaryWeakness, mod: 2} ],
    attacks: [{
      name: 'Arcane Bolt',
      damage: {
        l: { value: 2, type: 'Core' },
        m: { value: 3, type: 'Core' },
        h: { value: 4, type: 'Core' },
      },
      tags: ['Shooting', 'Medium Range', 'Short Range', 'Arcane'],
      effects: ['On a Full Success, the target is [Silenced] for 1 turn.'],
    }],
    abilities: ['Maneuver: Deal 2 Core Damage against all creatures within Melee Range and knock them 2 hex away.'],
    description: '',
  },
  allSeeingEyespawn: {
    name: 'All-Seeing Eyespawn',
    type: ct1,
    tags: [],
    health: 10,
    size: 1,
    speed: 4,
    dash: -1,
    damageTakenMods: [ { ...coreResist, mod: 2 }, { ...promoteAborb }, {...primaryWeakness}, {...secondaryWeakness} ],
    attacks: [{
      name: 'Eye Beam',
      damage: {
        l: { value: 2, type: 'Core' },
        m: { value: 3, type: 'Core' },
        h: { value: 5, type: 'Core' },
      },
      tags: ['Shooting', 'Arcane', 'Medium Range'],
      effects: ['This attack can target 2 enemies.'],
    }],
    abilities: ['All-Seeing Eyespawn has 2 two-hex front-arcs, all other areas are considered flank-arcs. This creature has no rear-arc.'],
    description: '',
  },
};

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

export default exObj;