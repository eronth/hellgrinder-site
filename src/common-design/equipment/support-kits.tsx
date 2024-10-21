import type { Kit } from '../../ts-types/types.tsx';
import { deepCopyWeapon, pistol, knife } from './weapons.tsx';

const exObj: {
  cardMystic: Kit,
  grenadeStash: Kit,
  medic: Kit,
  recon: Kit,
  shadowOp: Kit,
  sigilBearer: Kit,
} = {
  medic: {
    name: 'Medic',
    description: "",
    weapons: [],
    items: [{
      name: 'Medkit',
      tags: [],
      description: 'Your medkit has 3 uses.',
      effects: ['You may spend a use of your medkit to heal an ally who has a Critical Injury. Remove the Critical Injury and restore max health.'],
    }],
    trainings: [{
      name: 'Medical Expertise',
      tags: [],
      effects: ['You and allies get +1 to all Recovery Skill Checks.', 'You and all allies get +1 to health restored from Recovery Skill Checks.'], 
    }, {
      name: 'Medical Miracle',
      tags: [],
      effects: ['Allies within [Long Range] of you do not die when they take a Critical Injury. Instead, they fall prone and unconscous.'], 
    }],
  },

  grenadeStash: {
    name: 'Grenade Stash',
    description: "The Grenade Stash kit is for the soldier who just needs a little extra boom.",
    weapons: [{
      name: 'Fragmentation Grenade',
      tags: ['Grenade'],
      attackModes: [{
        tags: ['Short Range', 'Medium Range', 'Thrown', 'Area: 1'],
        damage: {
          l: { value: 9, type: 'Metal' },
          m: { value: 9, type: 'Metal' },
          h: { value: 9, type: 'Metal' },
        },
      }],
    }, {
      name: 'Incendiary Grenade',
      tags: ['Grenade'],
      attackModes: [{
        tags: ['Short Range', 'Medium Range', 'Thrown', 'Area: 1'],
        damage: {
          l: { value: 5, type: 'Infernal' },
          m: { value: 5, type: 'Infernal' },
          h: { value: 5, type: 'Infernal' },
        },
        effects: [ 'The area hit by an incendiary grenade is Burning for 1/2/3 turns. Creatures that enter a Burning area or end their turn in a Burning area if they started there (and did not leave) take the grenade’s Infernal Damage again.'],
      }],
    }],
    items: [],
    trainings: [{
      name: 'Supply Stash',
      tags: [],
      effects: ['You start with 2 Fragmentation Grenades and 2 Incendiary Grenades.', 'Whenever you return to the squad camp, you if you have less than 2 Fragmentation Grenades, you may gain enough to have 2. You may do the same for Incendiary Grenades.'], 
    }],
  },

  recon: {
    name: 'Recon',
    description: "",
    weapons: [],
    items: [],
    trainings: [{
      name: 'Instrument Analyst',
      tags: [],
      effects: ['You get +2 to all Observation Skill Checks.', ''], 
    }, {
      name: 'Communicator',
      tags: ['Maneuver'],
      effects: ['Whenever you use the [Call Out] Maneuver, allies get a +4 bonus instead of +1. Additionally, allies get +2 to damage dealt by the attack.'], 
    }],
  },

  shadowOp: {
    name: 'Shadow Op',
    description: "The Shadow Op kit is for the soldier who prefers to strike from the shadows.",
    weapons: [{
      ...deepCopyWeapon(pistol),
    }, {
      ...deepCopyWeapon(knife),
    }],
    items: [],
    trainings: [{
      name: 'Stealth Training',
      tags: [],
      effects: ['You get +2 to all Stealth Skill Checks.'], 
    }, {
      name: 'Assassin',
      tags: ['Attack'],
      effects: ['Rear Arc attacks made with your Knife get and +5 to damage.'], 
    }],
  },

  sigilBearer: {
    name: 'Sigil Bearer',
    description: "The sigil bearer has learned to read the ancient sigils of arcane. They can use these sigils to magically enhance their equipment.",
    weapons: [],
    items: [{
      name: 'Sigilized Shades',
      tags: ['Arcane'],
      description: 'Your shades gleam with hellish powers, a sigil secretly etched into the frame.',
      effects: ['You cannot be blinded.'],
    },
    {
      name: 'Levity Boots',
      tags: ['Arcane'],
      description: 'Your scribed boots glow menicingly.',
      effects: ['Once per combat, you can ignore all difficult terrain and terrain effects for one turn.'],
    }],
    trainings: [{
      name: 'Sigil Scribe',
      tags: ['Arcane'],
      effects: ['Any time you get a new weapon, you can add a sigil to it. This sigil modifies the weapon\'s damage type to the type of your choice.'],
    }],
  },

  cardMystic: {
    name: 'Card Mystic',
    description: "The card mystic has learned to read the mystic imbued cards of the world. They can use these cards to predict the future, manipulate the present, and know the unknown.",
    weapons: [],
    items: [{
      name: 'Mystic Deck',
      tags: ['Arcane'],
      description: 'Your tarot deck is a powerful tool for divination.',
      effects: ['You get +1 to all [Observation Skill Checks].'],
    }],
    trainings: [{
      name: 'Tarot Reader',
      tags: ['Arcane', 'Maneuver'],
      effects: ['When you perform the [Study Creature] Maneuver, as long as you don\'t get a Failure, you treat your result as once Success Tier higher.'],
    }, {
      name: 'Fate Shaper',
      tags: ['Arcane', 'Reaction'],
      effects: ['Once per combat, you can set the result of a dice on any roll that is not made by you and does not target/affect you.'],
    }],
  },
};

export default exObj;