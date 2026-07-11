import Tags from "../../../components/keywords/Tags/Tags.tsx";
import {Item} from "../../../ts-types/types.tsx";

const exObj: { [key: string]: Item } = {
  gnarlwoodWand: {
    name: 'Gnarlwood Wand',
    tags: ['Arcane', 'One-Handed'],
    isAdvancedItem: true,
    effects: [<>
        Spells with a <Tags tags={[{ Cone: 3 }]} /> tag
        cast using this wand get +1 (+3) to their Arc size.
      </>
    ],
  },
  bonecraftWand: {
    name: 'Bonecraft Wand',
    tags: ['Arcane', 'One-Handed'],
    isAdvancedItem: true,
    effects: [<>
      Spells that don\'t have the
      {' '}<Tags tags={[{ Area: 'X' }]} />
      {' '}or <Tags tags={[{ Cone: 'X' }]} /> tags cast using
      this wand gain a range increment of 1 (2)
      size further than their current furthest increment.'
    </>],
  },
  orbWand:  {
    name: 'Orb Wand',
    tags: ['Arcane', 'One-Handed'],
    isAdvancedItem: true,
    effects: [<>
      Spells cast using this wand that have the <Tags tags={[{ Area: 3 }]} /> tag get +1 (+3) to their area size.
    </>],
  },
  crystalTippedWand: {
    name: 'Crystal-Tipped Wand',
    tags: ['Arcane', 'One-Handed'],
    isAdvancedItem: true,
    effects: [
      'Max Charge: 2 (3)',
      'You may use an action to cast a Charge spell, giving this wand +1 to its charges (combat only).',
      'The next spell you cast that deals damage consumes all charges, dealing +1d6 (+1d10) for each charge consumed.'
    ],
  },
  metalWroughtWand: {
    name: 'Metal-Wrought Wand',
    tags: ['Arcane', 'One-Handed'],
    isAdvancedItem: true,
    effects: [
      'Spells cast using this wand that target yourself and have a duration on the effects get +1 (+3) to that duration.'
    ],
  },
  
};

export default exObj;