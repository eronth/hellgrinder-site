import { Weapon } from '../../../ts-types/types';

const exObj: { [key: string]: Weapon } = {
  throwingDarts: {
    name: 'Throwing Darts',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    attackModes: [{
      tags: ['Short Range', 'Medium Range', 'Thrown'],
      damage: {
        l: { value: 1, type: 'Metal' },
        m: { value: 6, type: 'Metal' },
        h: { value: 6, type: 'Metal' },
      },
    }],
  },
  fragmentationGrenade: {
    name: 'Fragmentation Grenade',
    tags: ['Grenade', 'One-Handed'],
    isAdvancedItem: false,
    attackModes: [{
      tags: ['Short Range', 'Medium Range', 'Thrown', { tag: 'Area', value: 1 }],
      damage: {
        l: { value: 9, type: 'Metal' },
        m: { value: 9, type: 'Metal' },
        h: { value: 9, type: 'Metal' },
      },
    }],
  },
  flashbangGrenade: {
    name: 'Flashbang Grenade',
    tags: ['Grenade', 'One-Handed'],
    isAdvancedItem: false,
    attackModes: [{
      tags: ['Short Range', 'Medium Range', 'Thrown', { tag: 'Area', value: 1 }],
      damage: {
        l: { value: 0, type: 'Metal' },
        m: { value: 0, type: 'Metal' },
        h: { value: 0, type: 'Metal' },
      },
      effects: ['All creatures in the area hit by a flashbang grenade are Blinded for a number of turns' +
      ' equal to the Success Rank.'],
    }],
  },
  incendiaryGrenade: {
    name: 'Incendiary Grenade',
    tags: ['Grenade', 'One-Handed'],
    isAdvancedItem: true,
    attackModes: [{
      tags: ['Short Range', 'Medium Range', 'Thrown', { tag: 'Area', value: 1 }],
      damage: {
        l: { value: 5, type: 'Infernal' },
        m: { value: 5, type: 'Infernal' },
        h: { value: 5, type: 'Infernal' },
      },
      effects: [
        'The area hit by an incendiary grenade is Burning for 1/2/3 turns. Creatures that enter a Burning area ' +
        'or end their turn in a Burning area if they started there (and did not leave) take the grenade’s Infernal Damage ' +
        'again.'
      ],
    }],
  },
};

export default exObj;