import type { Kit } from '../../ts-types/types.tsx';
// Data
import MeleeWeapons from './weapons/melee-weapons.tsx';
import ShootingWeapons from './weapons/shooting-weapons.tsx';
import ThrownWeapons from './weapons/thrown-weapons.tsx';
// Components
import SkillCheck from '../../components/keywords/SkillCheck/SkillCheck.tsx';
import Range from '../../components/keywords/Range/Range.tsx';
import CheckResultsGrid from '../../pages/HowToPlayPage/how-to-play-components/CheckResultsGrid/CheckResultsGrid.tsx';
// Functions
import Tools from '../../utils/tools.tsx';


// Todo - Add descriptions to all kits.

const exObj: { [key: string]: Kit } = {
  medic: {
    name: 'Medic',
    description: "",
    weapons: [],
    items: [{
      name: 'Medkit',
      tags: [],
      description: 'Your medkit has 3 uses.',
      effects: [<>
        You may spend a use of your medkit to heal an ally who has a Critical Injury.
        Roll a <SkillCheck tags={['Medical']} />.
        <CheckResultsGrid className="swap-equipment-grid" results={{
          r2: <>Spend 2 uses of the medkit to remove the Critical Injury.</>,
          r1: <>Spend 2 uses of the medkit to remove the Critical Injury, but deal 3 damage to the ally.</>,
          r0: <>Spend 1 use of the medkit, but gain no other benefit.</>,
          r3: <>Spend 1 use of the medkit to remove the Critical Injury.</>,
        }} />
      </>],
    }],
    trainings: [{
      name: 'Medical Expertise',
      tags: [],
      effects: ['You and allies get +1 to all Recovery Skill Checks.',
        'You and all allies get +1 to health restored from Recovery Skill Checks.'
      ],
      bonuses: [
        { tag: 'Recovery', value: 1 },
        { label: 'Health from Recovery Checks', value: 1 },
      ],
    }, {
      name: 'Medical Miracle',
      tags: [],
      effects: [
        <>Allies within <Range type='long' /> of you do not die when they take a Critical Injury.
        Instead, they fall prone and unconscous.</>
      ], 
    }],
  },

  grenadeStash: {
    name: 'Grenade Stash',
    description: "The Grenade Stash kit is for the soldier who just needs a little extra boom.",
    weapons: [
      { ...Tools.deepCopyWeapon(ThrownWeapons.fragmentationGrenade) },
      { ...Tools.deepCopyWeapon(ThrownWeapons.incendiaryGrenade) }
    ],
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
      effects: ['You get +2 to all [Observation Skill Checks].', ''],
      bonuses: [{ tag: 'Observation', value: 2 }],
    }, {
      name: 'Communicator',
      tags: ['Maneuver'],
      effects: ['Whenever you use the [Call Out] Maneuver, allies get a +4 bonus instead of +1. Additionally, allies get +2 to damage dealt by the attack.'], 
    }],
  },

  shadowOp: {
    name: 'Shadow Op',
    description: "The Shadow Op kit is for the soldier who prefers to strike from the shadows.",
    weapons: [
      { ...Tools.deepCopyWeapon(ShootingWeapons.pistol) },
      { ...Tools.deepCopyWeapon(MeleeWeapons.knife) },
    ],
    items: [],
    trainings: [{
      name: 'Stealth Training',
      tags: [],
      effects: ['You get +2 to all Stealth Skill Checks.'],
      bonuses: [{ tag: 'Stealth', value: 2 }],
    }, {
      name: 'Assassin',
      tags: ['Attack'],
      effects: ['Rear Arc attacks made with your Knife get and +5 to damage.'],
      bonuses: [{ label: 'Damage', value: 5, condition: 'Knife, Rear Arc' }],
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
      tags: ['Arcane', { Cursed: 4 }],
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
      effects: [<>You get +1 to all <SkillCheck tags={['Observation']} plural />.</>],
      bonuses: [{ tag: 'Observation', value: 1 }],
    }],
    trainings: [{
      name: 'Tarot Reader',
      tags: ['Arcane', 'Maneuver'],
      effects: ['When you perform the [Study Creature] Maneuver, as long as you don\'t get a Failure, you treat your Success Rank as once Rank higher.'],
    }, {
      name: 'Fate Shaper',
      tags: ['Arcane', 'Reaction', { Cursed: 2 }],
      effects: ['Once per combat, you can set the result of a dice on any roll that is not made by you and does not target/affect you.'],
    }],
  },
};

export default exObj;