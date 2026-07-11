import type { Item } from '../../ts-types/types';
import { movementIcon } from '../../utils/commonIcons';

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
    tags: ['Footwear'],
    isAdvancedItem: true,
    effects: [<>
      You can spend one <b>Maneuver Point</b>{movementIcon} to ignore difficult and hazardous terrain for that turn.
    </>],
  },
  sinnersCompass: {
    name: 'Sinner\'s Compass',
    tags: [],
    isAdvancedItem: false,
    effects: ['Points toward the nearest source of suffering. Not always helpful.'],
  },
  luckyCoin: {
    name: 'Lucky Coin',
    tags: [],
    isAdvancedItem: false,
    effects: ['Once per day, you can flip this coin. Call it in the air. If you\'re right, increase or decrease the Success Rank of the next roll by 1. If you\'re wrong, nothing happens.'],
  },
  smokeVial: {
    name: 'Smoke Vial',
    tags: ['Consumable'],
    isAdvancedItem: false,
    effects: ['As an action, smash this vial to create a 10-foot radius of obscuring smoke for 1 minute.'],
  },
  // fleshWeaveCloak: {
  //   name: 'Flesh Weave Cloak',
  //   tags: ['Torso', 'Heavy'],
  //   isAdvancedItem: true,
  //   effects: ['Once per day, you can pull the cloak tight around yourself to heal 1d6 HP. The cloak feeds on your fear to mend your wounds.'],
  // },
  // boneWhistle: {
  //   name: 'Bone Whistle',
  //   tags: ['Arcane'],
  //   isAdvancedItem: true,
  //   effects: ['When blown, all creatures within 30 feet must succeed on a Will save or become unnerved, giving them disadvantage on their next attack.'],
  // },
};

export default exObj;
