import Range from '../../../components/keywords/Range/Range';
import Tags from '../../../components/keywords/Tags/Tags';
import { DamageElement, Weapon } from '../../../ts-types/types';
import DiceTools from '../../../utils/dice-handling';

// Attack Types
// Line, Cone, Burst on Self, Circle on Target
// Bounce, Long Range, Short Range. 
// Defensive, 
// Multi-target, Single Target
// Ignore cover, ignore facing
// life drain

// Damage Types
const metal: DamageElement = 'Metal';
const infernal: DamageElement = 'Infernal';
const abyssal: DamageElement = 'Abyssal';
const verdant: DamageElement = 'Verdant';
const chthonic: DamageElement = 'Chthonic';
const nethercurrent: DamageElement = 'Nethercurrent';
const voidyr: DamageElement = 'Voidyr';

const sevenDeadlySinSpells: { [key: string]: Weapon } = {
  greed: {
    name: 'Greed',
    tags: ['One-Handed', { Cursed: 2 }],
    isAdvancedItem: false,
    choiceTags: {
      tags: [infernal, verdant, chthonic],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Adjacent Range', 'Short Range'],
      damage: {
        l: { value: DiceTools.get2d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get2d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get2d8(), type: 'Chosen Type' },
      },
      effects: [<>
        You take 1d4 damage of the Chosen Type.
      </>, <>
        When you hit with this attack, you may take 1d4 damage of
        the Chosen Type to increase the damage of this attack by one Dice.
      </>],
    }],
  },
  wrath: {
    name: 'Wrath',
    tags: ['One-Handed', { Cursed: 2 }],
    isAdvancedItem: false,
    choiceTags: {
      tags: [infernal, verdant, chthonic],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Adjacent Range', 'Short Range'],
      damage: {
        l: { value: DiceTools.get1d4(-1), type: 'Chosen Type' },
        m: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d6(), type: 'Chosen Type' },
      },
      effects: [<>
        When you hit with this attack, mark the target with Your Wrath at level 1.
        Only one creature can be marked with Your Wrath at a time.
      </>, <>
        Attacks with Wrath against a target marked with Your Wrath deal an additional
        1d6 damage plus the level of Your Wrath. Then, increase the level of
        Your Wrath on that target 1.
      </>],
    }],
  }
  // todo gluttony
  // todo lust
  // todo envy/jealousy
  // todo apathy/sloth
  // pride/boasting
};

const exObj: { [key: string]: Weapon } = {
  ...sevenDeadlySinSpells,
  brandedGrasp: {
    name: 'Branded Grasp',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [infernal, abyssal, verdant, chthonic, nethercurrent, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Adjacent Range'],
      damage: {
        l: { value: DiceTools.get2d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get2d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get2d8(), type: 'Chosen Type' },
      },
      effects: ['On a Rank 2 or higher hit, the target gains Weak 1 to the Chosen Type.'],
    }],
  },
  runeBlast: {
    name: 'Rune Blast',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [verdant, chthonic, nethercurrent, voidyr],
      count: 1,
    },
    attackModes: [{
      name: 'Rune Blast',
      tags: ['Attack', 'Arcane', 'Short Range', 'Medium Range'],
      damage: {
        l: { value: DiceTools.get2d4(-2), type: 'Chosen Type' },
        m: { value: DiceTools.get2d6(-1), type: 'Chosen Type' },
        h: { value: DiceTools.get2d8(-1), type: 'Chosen Type' },
      },
      effects: ['When you hit an enemy that has Resist against your chosen element, you can forgo damage to instead reduce their Resist value against that element by 1 for the rest of the encounter.'],
    },
    {
      name: 'Ruin Blast',
      tags: ['Attack', 'Arcane', 'Short Range', { Cursed: 2 }],
      damage: {
        l: { value: DiceTools.get2d4(1), type: 'Chosen Type' },
        m: { value: DiceTools.get2d6(1), type: 'Chosen Type' },
        h: { value: DiceTools.get2d8(1), type: 'Chosen Type' },  
      },
      effects: [
        'When you hit an enemy that has Resist against your chosen element, you can forgo damage to instead completely reduce their Resist value against that element.',
      ]
    }],
  },
  reboundingBolt: {
    name: 'Rebounding Bolt',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [chthonic, nethercurrent],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Medium Range'],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d10(), type: 'Chosen Type' },
      },
      effects: ['After you hit an enemy with this attack, you can make a free attack against another enemy within Short Range' +
      ' of your initial target. Once per attack.'],
    }],
  },
  spellPop: {
    name: 'Spell Pop',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [infernal, abyssal, nethercurrent, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Long Range'],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [
        <>This attack ignores cover and facing.</>
      ]
    }],
  },
  soulBurst: {
    name: 'Soul Burst',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    choiceTags: {
      tags: [infernal, nethercurrent, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Short Range', { Cursed: 2 }, { Cone: 4 }],
      damage: {
        l: { value: DiceTools.get2d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get2d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get2d8(), type: 'Chosen Type' },
      },
      effects: [
        <>You can increase the cursed value by X to 
        add <Tags tags={[{ Knockback: 'X' }]} /> to
        the attack.</>
      ]
    }],
  },
  hellishBeam: {
    name: 'Hellish Beam',
    tags: ['Two-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [infernal, abyssal, nethercurrent, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Short Range', 'Medium Range', { Cursed: 1 }],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [
        <>This attack targets all creatures in a line up to Long Range. Targetting
        beyond Medium range still suffers the range penalty.</>
      ]
    }],
  },
  spellSnipe: {
    name: 'Spell Snipe',
    tags: ['Two-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [chthonic, nethercurrent, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Long Range'],
      damage: {
        l: { value: DiceTools.get2d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get2d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get3d6(), type: 'Chosen Type' },
      }
    }],
  },
  displacerBurst: {
    name: 'Displacer Burst',
    tags: ['Two-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [abyssal, verdant, chthonic],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Short Range', 'Medium Range'],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [<>
        When you hit a creature with this attack, you can move them to an unoccupied hex within <Range type='short' /> of their current location.
        This movement does not need to be in a straight line, and does not provoke opportunity attacks.
      </>],
    }],
  },
  wildlash: {
    name: 'Wildlash',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [metal, infernal, abyssal, verdant, nethercurrent],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Adjacent Range', 'Short Range'],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [<>
        This attack has the <Tags tags={[{ Area: 1 }]} /> tag but with the following special rules:
      </>,<>
        This attack also targets all creatures within <Range type='adjacent' /> of your target with a -2 penalty to the Hit Check.     
      </>, <>
        You can target yourself with this attack. If you do, you take half damage and ignore the -2 penalty for all creatures in <Range type='adjacent' /> of you.
      </>],
    }],
  },
  downward: {
    name: 'Downward',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [abyssal, verdant, chthonic, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Adjacent Range'],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [<>
        On a Rank 2 or higher hit, the target is knocked prone.
      </>],
    }],
  },
  lingerCurse: {
    name: 'Linger Curse',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [infernal, verdant, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Short Range', 'Medium Range'],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [<>
        On a Rank 2 or higher hit, the target gains a Lingering Curse. At the start of your next turn, you may make this attack against the 
        cursed target without using your attack action. This Lingering Curse attack ignores facing, cover, and distance from you.
      </>],
    }],
  },
  blendedStrike: {
    name: 'Blended Strike',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    choiceTags: {
      tags: [metal, infernal, abyssal, verdant, chthonic, nethercurrent, voidyr],
      count: 2,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Short Range'],
      damage: {
        l: { value: DiceTools.get1d4(-2), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(-2), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [<>
        Deal damage of each of your chosen types. (This means you deal double the listed damage).
      </>],
    }],
  },
  arcaneWave: {
    name: 'Arcane Wave',
    tags: ['One-Handed'],
    isAdvancedItem: false,
    choiceTags: {
      tags: [infernal, abyssal, verdant, nethercurrent, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Short Range', { Cone: 3 }],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [<> </>],
    }],
  },
  arcaneLance: {
    name: 'Arcane Lance',
    tags: ['Two-Handed'],
    isAdvancedItem: true,
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Adjacent Range', 'Short Range'],
      damage: {
        l: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d12(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d12(3), type: 'Chosen Type' },
      },
      effects: ['This attack ignores the first 2 points of Resist and Absorb on the target.'],
    }],
  },
  trailblazer: {
    name: 'Trailblazer',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    attackModes: [{
      tags: ['Attack', 'Arcane'],
      damage: {
        l: { value: DiceTools.get2d2(), type: 'Infernal' },
        m: { value: DiceTools.get2d2(), type: 'Infernal' },
        h: { value: DiceTools.get3d2(), type: 'Infernal' },
      },
      effects: [
        'For the rest of your turn, each hex you leave is given Trailblazer Hazard that lasts until the start of' +
        ' your next turn. Once per round, when a creature enters a hex with Trailblazer Hazard OR if a creature ends their' +
        ' turn in a hex with a Trailblazer Hazard, they take Damage based on your Hit Check result.'
      ],
    }],
  },
  flowingCurrent: {
    name: 'Flowing Current',
    tags: ['Two-Handed'],
    isAdvancedItem: true,
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Medium Range'],
      damage: {
        l: { value: DiceTools.get1d2(1), type: 'Nethercurrent' },
        m: { value: DiceTools.get1d2(2), type: 'Nethercurrent' },
        h: { value: DiceTools.get1d2(3), type: 'Nethercurrent' },
      },
      effects: ['After you hit an enemy with this attack, you can make a free attack against another enemy within Short ' +
      'Range of your target. This can repeat any number of against new targets each time.'],
    }],
  },
  lifetaker: {
    name: 'Lifetaker',
    tags: ['One-Handed'],
    isAdvancedItem: true,
    choiceTags: {
      tags: [abyssal, verdant, voidyr],
      count: 1,
    },
    attackModes: [{
      tags: ['Attack', 'Arcane', 'Short Range'],
      damage: {
        l: { value: DiceTools.get1d4(), type: 'Chosen Type' },
        m: { value: DiceTools.get1d6(), type: 'Chosen Type' },
        h: { value: DiceTools.get1d8(), type: 'Chosen Type' },
      },
      effects: [<>
        On a Rank 2 or higher hit, you heal HP equal to the damage dealt by this attack.
        On a Rank 1 hit, you heal HP equal to half the damage dealt by this attack (round up).
      </>],
    }],
  },
};

export default exObj;