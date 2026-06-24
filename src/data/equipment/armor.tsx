import type { Item } from '../../ts-types/types';

const exObj: { [key: string]: Item } = {
  bulletproofVest: {
    name: 'Bulletproof Vest',
    tags: ['Armor'],
    isAdvancedItem: false,
    effects: ['You gain [Resist Metal 1].'],
  },
  backplate: {
    name: 'Backplate',
    tags: ['Armor'],
    isAdvancedItem: false,
    effects: ['You gain [Resist Metal 3] against attacks in your Rear Arc.'],
  },
  shield: {
    name: 'Shield',
    tags: ['Armor'],
    isAdvancedItem: false,
    effects: ['You gain [Resist Metal 3] against attacks in your Front Arc.',
      'As a maneuver, you can give up above effect for the following:',
      'You gain [Resist Metal 1] against attacks in your Left and Right Arcs.'],
  },
  heavyArmor: {
    name: 'Heavy Armor',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'Extra plating to protect yourself on the battlefield.',
    effects: ['Gain [Resist Any (Except Metal) 1]', 'Gain [Resist Metal 3]'],
  },
  forceField: {
    name: 'Force Field',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'A shield of energy that protects you from harm.',
    effects: [
      'You and allies within 1 hex of you gain [Resist All 1] against Attacks that are not [Adjacent Range].'
    ],
  },
  reactiveArmor: {
    name: 'Reactive Armor',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'Armor that reacts to incoming attacks.',
    effects: [
      'Each time you take damage from an attack, you gain 1 stack of [Resist 1] against that attack type. ' +
      ' Stacks reset at the end of your turn.'
    ],
  },
  slickSuit: {
    name: 'Slick Suit',
    tags: ['Armor'],
    isAdvancedItem: false,
    description: 'A suit that makes you harder to hit and looks good doing it.',
    effects: [
      'Attacks against you have -1 to their Hit Checks.'
    ],
  },
  quickstrideSuit: {
    name: 'Quickstride Suit',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'A suit that makes you faster.',
    effects: ['Gain +1 to your Move Speed.'],
  },
  shadowCloak: {
    name: 'Shadow Cloak',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'A cloak that makes you harder to see.',
    effects: ['Gain +3 to Stealth Checks.'],
  }

}

export default exObj;
