import {Item} from "../../../ts-types/types.tsx";

const exObj: { [key: string]: Item } = {
  gnarlwoodWand: {
    name: 'Gnarlwood Wand',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    effects: [
      'Spells with a cone of effect cast using this wand get +1 (+3) to their Arc size.',
      'Spells with a line of effect cast using this wand are treated as though they have the [Cone 3] tag.'
    ],
  },
  bonecraftWand: {
    name: 'Bonecraft Wand',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    effects: ['Spells that don\'t have the [Area] or [Cone] tags cast using this wand gain a range increment of 1 (2) ' +
    'size further than their current furthest increment.'],
  },
  orbWand:  {
    name: 'Orb Wand',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    effects: ['Spells cast using this wand that have the [Area] tag get +1 (+3) to their area size.'],
  },
  crystalTippedWand: {
    name: 'Crystal-Tipped Wand',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    effects: [
      'Max Charge: 2 (3)',
      'You may use an action to cast a Charge spell, giving this wand +1 to its charges.',
      'The next spell you cast that deals damage consumes all charges, dealing +1d6 (+1d10) for each charge consumed.'
    ],
  },
  metalWroughtWand: {
    name: 'Metal-Wrought Wand',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    effects: [
      'Spells cast using this wand that target yourself and have a duration on the effects get +1 (+3) to that duration.'
    ],
  },
  
};

export default exObj;