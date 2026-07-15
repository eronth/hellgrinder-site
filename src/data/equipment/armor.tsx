import type { Item } from '../../ts-types/types';
import DefenseMod from '../../components/keywords/DefenseMod/DefenseMod';
import Range from '../../components/keywords/Range/Range';

const exObj: { [key: string]: Item } = {
  bulletProofVest: {
    name: 'Bulletproof Vest',
    tags: ['Armor'],
    isAdvancedItem: false,
    effects: [<>You gain <DefenseMod mod='Resist' type='Metal' value={1} />.</>],
    bonuses: [{ defense: 'Resist', element: 'Metal', value: 1 }],
  },
  backplate: {
    name: 'Backplate',
    tags: ['Armor'],
    isAdvancedItem: false,
    effects: [<>You gain <DefenseMod mod='Resist' type='Metal' value={3} /> against attacks in your Rear Arc.</>],
    bonuses: [{ defense: 'Resist', element: 'Metal', value: 3, condition: 'Rear Arc' }],
  },
  shield: {
    name: 'Shield',
    tags: ['Armor'],
    isAdvancedItem: false,
    effects: [<>You gain <DefenseMod mod='Resist' type='Metal' value={3} /> against attacks in your Front Arc.</>,
      'As a maneuver, you can give up above effect for the following:',
      <>You gain <DefenseMod mod='Resist' type='Metal' value={1} /> against attacks in your Left and Right Arcs.</>],
    bonuses: [{ defense: 'Resist', element: 'Metal', value: 3, condition: 'Front Arc' }],
  },
  deployableShield: {
    name: 'Deployable Shield',
    tags: ['Armor', 'Maneuver'],
    isAdvancedItem: false,
    description: 'A shield that can be deployed to protect you from incoming attacks. You can hold the shield to bring it with you, or deploy it to place it down.',
    effects: ['Maneuver to deploy or retract the shield.',
      <>While held, gain <DefenseMod mod='Resist' type='All' value={1} />.</>,
      'When you deploy the shield, pick two edges or your hex that share a corner. Those edges now have heavy cover.',],
    bonuses: [{ defense: 'Resist', element: 'All', value: 1, condition: 'deployable shield, while held' }],
  },
  underbarkArmor: {
    name: 'Underbark Armor',
    tags: ['Armor'],
    isAdvancedItem: false,
    description: 'Armor made from the bark of the nethertrees.',
    effects: [<>Gain <DefenseMod mod='Resist' type='Chthonic' value={2} /> and <DefenseMod mod='Absorb' type='Abyssal' value={2} />.</>],
    bonuses: [
      { defense: 'Resist', element: 'Chthonic', value: 2 },
      { defense: 'Absorb', element: 'Abyssal', value: 2 },
    ],
  },
  heavyArmor: {
    name: 'Heavy Armor',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'Extra plating to protect yourself on the battlefield.',
    effects: [<>Gain <DefenseMod mod='Resist' type='All' value={1} note='except Metal' /></>,
      <>Gain <DefenseMod mod='Resist' type='Metal' value={3} /></>],
    bonuses: [
      { defense: 'Resist', element: 'All', value: 1, condition: 'except Metal' },
      { defense: 'Resist', element: 'Metal', value: 3 },
    ],
  },
  forceField: {
    name: 'Force Field',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'A shield of energy that protects you from harm.',
    effects: [
      <>You and allies within 1 hex of you gain <DefenseMod mod='Resist' type='All' value={1} /> against Attacks that are not <Range type='adjacent' />.</>
    ],
    bonuses: [{ defense: 'Resist', element: 'All', value: 1, condition: 'non-adjacent attacks' }],
  },
  reactiveArmor: {
    name: 'Reactive Armor',
    tags: ['Armor', { Cursed: 1 }],
    isAdvancedItem: true,
    description: 'Armor that reacts to incoming attacks.',
    effects: [
      <>Each time you take damage from an attack, you gain may gain 1 stack of <DefenseMod mod='Resist' value={2} /> against
        that attack type. Stacks reset at the end of your turn.</>,
      'Cursed triggers each time you gain a stack.'
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
    bonuses: [{ label: 'Enemy Hit Checks', value: -1 }],
  },
  quickstrideSuit: {
    name: 'Quickstride Suit',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'A suit that makes you faster.',
    effects: ['Gain +1 to your Move Speed.'],
    bonuses: [{ label: 'Move Speed', value: 1 }],
  },
  shadowCloak: {
    name: 'Shadow Cloak',
    tags: ['Armor'],
    isAdvancedItem: true,
    description: 'A cloak that makes you harder to see.',
    effects: ['Gain +3 to Stealth Checks.'],
    bonuses: [{ tag: 'Stealth', value: 3 }],
  },
  antistaticGear: {
    name: 'Antistatic Gear',
    tags: ['Armor'],
    isAdvancedItem: false,
    effects: [<>You gain <DefenseMod mod='Resist' type='Nethercurrent' value={1} />.</>],
    bonuses: [{ defense: 'Resist', element: 'Nethercurrent', value: 1 }],
  },
}

export default exObj;
