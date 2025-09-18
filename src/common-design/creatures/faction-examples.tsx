import { Creature } from "../../ts-types/creature-types";
import StatusKeyword from "../StatusKeyword";
import Tools from "../Tools";

// Example creatures for each faction to showcase color-coding
const exampleCreatures: { [key: string]: Creature } = {
  // Ashborn Legion - Infernal faction
  ashbornWarrior: {
    name: 'Ashborn Warrior',
    tier: Tools.creatureTiers.t1,
    tags: ['Ashborn Legion'],
    health: 16,
    size: 1,
    speed: 5,
    dash: 2,
    damageTakenMods: [
      { modification: 'Resist', type: 'Infernal', mod: 3 },
      { modification: 'Absorb', type: 'Verdant', mod: 1 },
      { modification: 'Weak', type: 'Abyssal', mod: 2 },
      { modification: 'Weak', type: 'Chthonic', mod: 1 },
    ],
    attacks: [{
      name: 'Flaming Blade',
      damage: {
        l: { value: 2, type: 'Infernal' },
        m: { value: 3, type: 'Infernal' },
        h: { value: 4, type: 'Infernal' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: [
        <>
          On Rank 3+ Success, target gains <StatusKeyword effect="immolated" x={1} y={2} />.
        </>
      ],
    }],
    abilities: [
      {
        name: 'Uninflammable',
        description: <>
          Immune to <StatusKeyword effect="immolated" /> status effects.
        </>
      }
    ],
    description: 'A fierce warrior of the Ashborn Legion, wielding weapons wreathed in eternal flame.',
  },

  // Stoneveined Order - Chthonic faction
  stoneveineGuardian: {
    name: 'Stoneveined Guardian',
    tier: Tools.creatureTiers.t2,
    tags: ['Stoneveined Order'],
    health: 24,
    size: 2,
    speed: 3,
    damageTakenMods: [
      { modification: 'Resist', type: 'Chthonic', mod: 4 },
      { modification: 'Resist', type: 'Nethercurrent', mod: 2 },
      { modification: 'Absorb', type: 'Infernal', mod: 1 },
      { modification: 'Weak', type: 'Verdant', mod: 2 },
      { modification: 'Weak', type: 'Voidyr', mod: 1 },
    ],
    attacks: [{
      name: 'Stone Crush',
      damage: {
        l: { value: 3, type: 'Chthonic' },
        m: { value: 4, type: 'Chthonic' },
        h: { value: 6, type: 'Chthonic' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range', {tag: 'Knockback', value: 2}],
      effects: ['On Rank 3+, target is [Prone].'],
    }],
    abilities: [{
      name: '',
      description: <>
        Can add [Knockback 1] to any attack and reduces knockback by -1 for attacks taken.
      </>,
    }],
    description: 'A stalwart defender of the Stoneveined Order, their body infused with living stone.',
  },

  // Vastfathom League - Abyssal faction
  vastfathomReaver: {
    name: 'Vastfathom Reaver',
    tier: Tools.creatureTiers.t1,
    tags: ['Vastfathom League'],
    health: 14,
    size: 1,
    speed: 6,
    dash: 3,
    damageTakenMods: [
      { modification: 'Resist', type: 'Abyssal', mod: 2 },
      { modification: 'Absorb', type: 'Metal', mod: 1 },
      { modification: 'Weak', type: 'Chthonic', mod: 2 },
      { modification: 'Weak', type: 'Nethercurrent', mod: 1 },
    ],
    attacks: [{
      name: 'Abyssal Strike',
      damage: {
        l: { value: 2, type: 'Abyssal' },
        m: { value: 3, type: 'Abyssal' },
        h: { value: 5, type: 'Abyssal' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: ['On Rank 2+, target loses 1 random equipped item for 2 turns.'],
    }],
    abilities: [
      {
        name: '',
        description: <>
          Can breathe underwater and gains +2 to Movement in aquatic environments.
        </>
      }
    ],
    description: 'A greedy member of the Vastfathom League, drawn to wealth and material possessions.',
  },

  // Thornwraith Covenant - Verdant faction
  thornwraithStalker: {
    name: 'Thornwraith Stalker',
    tier: Tools.creatureTiers.t1,
    tags: ['Thornwraith Covenant'],
    health: 12,
    size: 1,
    speed: 5,
    dash: 4,
    damageTakenMods: [
      { modification: 'Resist', type: 'Verdant', mod: 3 },
      { modification: 'Resist', type: 'Infernal', mod: 2 },
      { modification: 'Weak', type: 'Infernal', mod: 4 }, // Special: First Nethercurrent hit deals 4 Infernal
      { modification: 'Weak', type: 'Nethercurrent', mod: 1 },
    ],
    attacks: [{
      name: 'Thorn Lash',
      damage: {
        l: { value: 2, type: 'Verdant' },
        m: { value: 3, type: 'Verdant' },
        h: { value: 4, type: 'Verdant' },
      },
      tags: ['Attack', 'Melee', {tag: 'Range', value: 2}],
      effects: [
        <>
        AAAH ADD ENTANGLED
          {/* On Rank 3+ Success, target is <StatusKeyword effect="Entangled" x={2} /> for 1 turn. */}
        </>
      ],
    }],
    abilities: [
      {
        name: '',
        description: <>
          50% chance to resist any status effect. Regenerates 2 health at start of turn.
        </>
      },
    ],
    description: 'A nature-twisted creature of the Thornwraith Covenant, blending plant and demonic essence.',
  },

  // Wanderlost Crews - Metal faction
  wanderlostScavenger: {
    name: 'Wanderlost Scavenger',
    tier: Tools.creatureTiers.t1,
    tags: ['Wanderlost Crew'],
    health: 15,
    size: 1,
    speed: 4,
    dash: 1,
    damageTakenMods: [
      { modification: 'Resist', type: 'Metal', mod: 3 },
      { modification: 'Absorb', type: 'Chthonic', mod: 1 },
      { modification: 'Weak', type: 'Infernal', mod: 2 },
      { modification: 'Weak', type: 'Nethercurrent', mod: 1 },
    ],
    attacks: [{
      name: 'Scrap Metal Throw',
      damage: {
        l: { value: 2, type: 'Metal' },
        m: { value: 3, type: 'Metal' },
        h: { value: 4, type: 'Metal' },
      },
      tags: ['Attack', 'Thrown', 'Medium Range'],
      effects: ['On Rank 3+, target weapon is disarmed and thrown 2 hexes away.'],
    }],
    abilities: [
      {
        name: '',
        description: <>
          Can steal and use one weapon from defeated enemies per encounter.
        </>
      }
    ],
    description: 'A resourceful member of the Wanderlost Crews, driven by envy to take what others possess.',
  },

  // Umbral Nexus - Voidyr faction
  umbralShade: {
    name: 'Umbral Shade',
    tier: Tools.creatureTiers.t1,
    tags: ['Umbral Nexus'],
    health: 11,
    size: 1,
    speed: 6,
    dash: 3,
    damageTakenMods: [
      { modification: 'Resist', type: 'Voidyr', mod: 4 },
      { modification: 'Resist', type: 'Metal', mod: 5 }, // Non-blessed metals
      { modification: 'Absorb', type: 'Nethercurrent', mod: 1 },
      { modification: 'Weak', type: 'Abyssal', mod: 2 },
      { modification: 'Weak', type: 'Infernal', mod: 1 },
    ],
    attacks: [{
      name: 'Void Touch',
      damage: {
        l: { value: 2, type: 'Voidyr' },
        m: { value: 3, type: 'Voidyr' },
        h: { value: 5, type: 'Voidyr' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: [
        <>
          On Rank 3+, target gains <StatusKeyword effect="enfeebled" x={1} /> for 2 turns.
        </>
      ],
    }],
    abilities: [
      {
        name: 'Incorporeal',
        description: <>
          Can move through solid objects. Weak to blessed weapons.
        </>
      }
    ],
    description: 'A prideful spirit of the Umbral Nexus, existing partially in the void between realms.',
  },

  // Forgefiend Syndicate - Other faction
  forgefiendEngineer: {
    name: 'Forgefiend Engineer',
    tier: Tools.creatureTiers.t2,
    tags: ['Forgefiend Syndicate'],
    health: 18,
    size: 1,
    speed: 4,
    damageTakenMods: [
      { modification: 'Resist', type: 'Metal', mod: 2 },
      { modification: 'Resist', type: 'Infernal', mod: 1 },
      { modification: 'Weak', type: 'Nethercurrent', mod: 2 },
    ],
    attacks: [{
      name: 'Mechanical Cannon',
      damage: {
        l: { value: 3, type: 'Metal' },
        m: { value: 4, type: 'Metal' },
        h: { value: 6, type: 'Metal' },
      },
      tags: ['Attack', 'Shooting', 'Long Range'],
      effects: ['On Rank 2+, gains [Area: 1] dealing 2 damage to adjacent targets.'],
    }],
    abilities: [
      {
        name: '',
        description: <>
          Can deploy mechanical traps as a Maneuver action.
        </>
      }
    ],
    description: 'A master craftsman of the Forgefiend Syndicate, combining demonic power with mechanical ingenuity.',
  },

  // Hand of Death - Other faction  
  handOfDeathAssassin: {
    name: 'Hand of Death Assassin',
    tier: Tools.creatureTiers.t2,
    tags: ['Hand of Death'],
    health: 13,
    size: 1,
    speed: 7,
    dash: 4,
    damageTakenMods: [
      { modification: 'Resist', type: 'Voidyr', mod: 2 },
      { modification: 'Weak', type: 'Verdant', mod: 2 },
      { modification: 'Weak', type: 'Infernal', mod: 1 },
    ],
    attacks: [{
      name: 'Death Strike',
      damage: {
        l: { value: 4, type: 'Voidyr' },
        m: { value: 5, type: 'Voidyr' },
        h: { value: 8, type: 'Voidyr' },
      },
      tags: ['Attack', 'Melee', 'Adjacent Range'],
      effects: ['On Rank 3+, target must make a Corruption save or gain 2 Corruption.'],
    }],
    abilities: [
      {
        name: 'Stealth',
        description: <>
          Invisible until first attack. Critical hits inflict [Doom] status.
        </>,
      }
    ],
    description: 'A deadly agent of the Hand of Death, bringing swift and merciless endings.',
  },

  // Heaven's Host - Other faction
  heavensHostSentinel: {
    name: "Heaven's Host Sentinel",
    tier: Tools.creatureTiers.t2,
    tags: ["Heaven's Host"],
    health: 20,
    size: 1,
    speed: 5,
    dash: 2,
    damageTakenMods: [
      { modification: 'Resist', type: 'Infernal', mod: 4 },
      { modification: 'Resist', type: 'Voidyr', mod: 3 },
      { modification: 'Weak', type: 'Abyssal', mod: 2 },
    ],
    attacks: [{
      name: 'Divine Light',
      damage: {
        l: { value: 3, type: 'Verdant' },
        m: { value: 4, type: 'Verdant' },
        h: { value: 6, type: 'Verdant' },
      },
      tags: ['Attack', 'Arcane', 'Medium Range'],
      effects: ['Deals double damage to undead and demonic creatures.'],
    }],
    abilities: [
      {
        name: 'Aura of Protection',
        description: <>
          Allies within 2 hexes gain +1 to all resistances.
        </>
      }
    ],
    description: 'A righteous warrior from the celestial realms, bringing divine justice to the underworld.',
  },

  // Voidfire Conclave - Other faction
  voidfireCultist: {
    name: 'Voidfire Cultist',
    tier: Tools.creatureTiers.t1,
    tags: ['Voidfire Conclave'],
    health: 12,
    size: 1,
    speed: 4,
    damageTakenMods: [
      { modification: 'Resist', type: 'Voidyr', mod: 2 },
      { modification: 'Resist', type: 'Infernal', mod: 1 },
      { modification: 'Weak', type: 'Verdant', mod: 2 },
      { modification: 'Weak', type: 'Chthonic', mod: 1 },
    ],
    attacks: [{
      name: 'Voidfire Bolt',
      damage: {
        l: { value: 2, type: 'Voidyr' },
        m: { value: 3, type: 'Voidyr' },
        h: { value: 5, type: 'Voidyr' },
      },
      tags: ['Attack', 'Arcane', 'Long Range'],
      effects: [
        <>
          On Rank 3+, target gains <StatusKeyword effect="cursed" /> for 3 turns.
        </>
      ],
    }],
    abilities: [
      {
        name: '',
        description: <>
          Can cast minor void magic as Free Actions.
        </>,
      }
    ],
    description: 'A devoted member of the Voidfire Conclave, wielding the corrupting power of the void.',
  },

  // Witch Coven - Other faction
  witchCovenHexer: {
    name: 'Witch Coven Hexer',
    tier: Tools.creatureTiers.t1,
    tags: ['Witch Coven'],
    health: 10,
    size: 1,
    speed: 4,
    dash: 2,
    damageTakenMods: [
      { modification: 'Resist', type: 'Voidyr', mod: 3 },
      { modification: 'Resist', type: 'Nethercurrent', mod: 2 },
      { modification: 'Weak', type: 'Infernal', mod: 2 },
      { modification: 'Weak', type: 'Metal', mod: 1 },
    ],
    attacks: [{
      name: 'Hex Curse',
      damage: {
        l: { value: 1, type: 'Voidyr' },
        m: { value: 2, type: 'Voidyr' },
        h: { value: 4, type: 'Voidyr' },
      },
      tags: ['Attack', 'Arcane', 'Medium Range'],
      effects: [
        <>
          On any successful hit, 
          target gains <StatusKeyword effect={'enslumbered'} x={2} />.
          If this affects a creature that is already Enslumbered, 
          they instead gain <StatusKeyword effect={'doomed'} x={1} />.
        </>
      ],
    }],
    abilities: [
      {
        name: '',
        description: <>
          Can cast protective wards and offensive hexes as Maneuver actions.
        </>
      }
    ],
    description: 'A cunning spellcaster from a Witch Coven, weaving dark magic and ancient curses.',
  }
};

export default exampleCreatures;
