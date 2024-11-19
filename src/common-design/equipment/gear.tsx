import type { Item } from '../../ts-types/types';

const exObj: { [key: string]: Item } = {
  slickShades: {
    name: 'Slick Shades',
    tags: [],
    isAdvancedItem: false,
    effects: ['You look just a bit cooler.'],
  },
  ritualKnife: {
    name: 'Ritual Knife',
    tags: ['One-Handed', 'Safelight', 'Arcane'],
    isAdvancedItem: true,
    description: 'A knife forged from Safelight stone into an ornate design. It is used in the performance of rituals and ceremonies.',
    effects: ['As an action, you can plunge the knife into your chest. Upon doing so, you will be warped to safety and comfort, escaping you from this hellish life.'],
  },
  hoverBoots: {
    name: 'Hover Boots',
    tags: ['Footware'],
    isAdvancedItem: true,
    effects: ['You can decrease your movement by 1 to ignore difficult and hazardous terrain.'],
  }
};

export default exObj;
