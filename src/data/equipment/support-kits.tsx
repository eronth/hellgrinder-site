import type { Kit } from '../../ts-types/types.tsx';
// Data
import MeleeWeapons from './weapons/melee-weapons.tsx';
import ShootingWeapons from './weapons/shooting-weapons.tsx';
import ThrownWeapons from './weapons/thrown-weapons.tsx';
import armor from './armor.tsx';
// Components
import SkillCheck from '../../components/keywords/SkillCheck/SkillCheck.tsx';
import Range from '../../components/keywords/Range/Range.tsx';
import CheckResultsGrid from '../../pages/HowToPlayPage/how-to-play-components/CheckResultsGrid/CheckResultsGrid.tsx';
// Functions
import Tools from '../../utils/tools.tsx';
import DamageType from '../../components/keywords/DamageType/DamageType.tsx';
import { movementIcon } from '../../utils/commonIcons.tsx';
import DefenseMod from '../../components/keywords/DefenseMod/DefenseMod.tsx';
import StatusKeyword from '../../components/keywords/StatusKeyword.tsx';
import DiceTools from '../../utils/dice-handling';
import HitCheck from '../../components/keywords/HitCheck/HitCheck.tsx';


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
    items: [{
      name: 'Sighting Scope',
      tags: [],
      description: 'This scope can be used to help hone in on targets.',
      charges: 3,
      effects: [<>
        Using this scope, you can treat a target as if it's
        one Range Increment closer.
      </>],
    }],
    trainings: [{
      name: 'Instrument Analyst',
      tags: [],
      effects: [<>
        You get +2 to all <SkillCheck tags={['Observation']} plural />.
      </>],
      bonuses: [{ tag: 'Observation', value: 2 }],
    }, {
      name: 'Communicator',
      tags: ['Maneuver'],
      effects: [<>
      Whenever you use the [Call Out] Maneuver, allies
      get a +4 bonus instead of +1. Additionally, allies get +2 to 
      damage dealt by the attack.
      </>], 
    }],
  },

  comms: {
    name: 'Comms',
    description: "Carry a comms unit to keep in contact with the greater hellbound forces.",
    weapons: [],
    items: [{
      name: 'Comms Radio Unit (CRU)',
      tags: [],
      description: 'A comms unit useful for calling central command for special intel and support.',
      effects: [<>
      </>],
    }],
    trainings: [{
      name: 'Intel Check', tags: ['Intel'],
      effects: [<>
        As an action using your CRU, you can call in to central command to get an intel check
        on a target. Make a <SkillCheck tags={['Observation', 'Intel']} />. On success,
        learn the information at the rank you rolled and lower.
        <CheckResultsGrid className="swap-equipment-grid" results={{
          r1: <>Learn all weak, resist, and absorb types, but not values for the target.</>,
          r2: <>Learn the values for week, resist, and absorb, and learn all damage types dealt by attacks.</>,
          r3: <>Choose a damage type you learned from intel,
                you and your squad gain <DefenseMod mod={'Resist'} type='Chosen Type' value={3} />.</>,
        }} />
      </>],
    }, {
      name: 'Supply Run', tags: [],
      charges: 1,
      effects: [<>
        You can call in an emergency run to have supplies delivered to your squad.
        Your squad reacharges all Safelight shards and performs a resupply.
      </>]
    }, {
      name: 'Grind-Bomb', tags: ['Attack'],
      charges: 2,
      effects: [<>
          Call a run of Grind-Bombs. They totall blow up and explode and regular bomb stuff.
      </>]
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
      effects: [<>
        You get +2 to all <SkillCheck tags={['Stealth']} plural />.
      </>],
      bonuses: [{ tag: 'Stealth', value: 2 }],
    }, {
      name: 'Assassin',
      tags: ['Attack'],
      effects: ['Rear Arc attacks made with your Knife get +5 to damage.'],
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
    }, {
      name: 'Diviner',
      tags: ['Arcane'],
      effects: [<>
        Once per combat, for free, you can learn the
        absorb, weak, and resist stats of a creature.
      </>]
    }, {
      name: 'Ereht',
      tags: ['Arcane'],
      effects: [<>
        Draw and toss a card to a hex within <Range type='short' />. You teleport
        to that hex. Probably should have an effect for the card you drew, ask
        your GM or something.
      </>]
    }],
  },

  propagandizer: {
    name: 'Propagandizer',
    description: "The propagandizer is a master of propaganda and propaganda.",
    weapons: [],
    items: [{
      name: 'Press Kit',
      tags: ['Arcane', 'Intel'],
      description: '',
      effects: [<>
        You have a kit full of propaganda equipment including 
        cameras, mics, arial drone views, ready made lines and posters,
        and other materials.
      </>],
    }],
    trainings: [{
      name: 'Hero Spotlight',
      tags: ['Arcane', 'Intel', 'Maneuver'],
      effects: [<>
        As a <b>2{movementIcon} Maneuver</b>, you choose an ally to
        be the hero for this Spotlight Hour for the rest of combat.
        While that ally is in your <Range type='medium' /> and
        in your line-of-sight, that ally gains +2 to all
        {' '}<HitCheck tags={[]} plural />.
      </>, <>
        If the ally makes an Injury Roll, they add -2
        to the result. If the result is less than the
        minimum on the Injury Table, they had a miraculous
        escape and suffer no Injury.
      </>]
    }, {
      name: 'Spotting',
      tags: ['Intel', 'Maneuver'],
      effects: [<>
        As a <b>2{movementIcon} Maneuver</b>, you can send a drone
        into the air in a <Range type='adjacent' />. For each
        <b>1{movementIcon}</b> you spend, you can move the drone 2 hexes.
        If the drone is more further than <Range type='long' /> from
        you, you lose contact and the drone automatically tries to return
        to you.
      </>],
    }, {
      name: 'Rousing Combat Cry',
      tags: ['Action'],
      effects: [<>
        All allies immediately gain 2{movementIcon} to use for movement.
      </>]
    }],
  },

  gadgeteer: {
    name: 'Gadgeteer',
    description: "The gadgeteer is a master of mechanical devices and"
      + " inventions, using their gadgets to gain an edge in combat and problem-solving.",
    weapons: [],
    items: [
      { ...Tools.deepCopyItem(armor.antistaticGear) },
      {
        name: 'Tesla Coil',
        tags: ['Maneuver'],
        description: 'A set of three of small, portable Tesla Coils that can be used to shock enemies.',
        effects: [<>
          As a 2{movementIcon} maneuver, you may deploy a Tesla Coil within
          {' '}<Range type='short' /> of yourself. A Tesla Coil
          has 8 health and <DefenseMod mod='Resist' type='All' value={1} />.
          You can use a 2{movementIcon} maneuver to pack up an adjacent
          Tesla Coil.
        </>, <>
          Any Tesla Coils within <Range type='short' /> of each other
          that have line-of-sight to each other create an arc fence in a 
          straight line between them. Creatures that pass through the arc fence
          take <DamageType type='Nethercurrent' value={1} />.
          you deal <DamageType type='Nethercurrent' /> damage to all adjacent enemies.
        </>, <>
          As an Action, you can perform a <SkillCheck tags={['Electronics']} />
          {' '}to deal 1/2/3 <DamageType type='Nethercurrent' /> to all creatures
          within <Range type='adjacent' /> of your Tesla Coils.
        </>, <>
          When you resupply, you regain all Tesla Coils.
          Any deployed ones are destroyed or otherwise rendered
          non-functional.
        </>],
      },
    ],
    trainings: [{
      name: 'Mechanical Savant',
      tags: [],
      effects: [<>
        You gain a +2 bonus to all <SkillCheck tags={['Electronics']} plural /> and
        all <SkillCheck tags={['wiring']} plural />.
      </>],
    }, {
      name: 'Tinkerer',
      tags: ['Arcane'],
      effects: [<>
        Each weapon you own can be outfitted with an self-made enhancement.
        At will, you can activate this enhancement to have your weapon deal
        <DamageType type='Nethercurrent' /> instead of its normal damage type.
      </>]
    }],
  },

  coulron: {
    name: 'Coulron',
    description: 'You are trained in the art of diversion and misdirection.',
    weapons: [{
      name: 'Payload-Interchange Emitter Disc',
      tags: ['One-Handed'],
      isAdvancedItem: true,
      attackModes: [{
        tags: ['Attack', 'Thrown', 'Adjacent Range', 'Short Range'],
        damage: {
          l: { value: 1, type: 'Chosen Type' },
          m: { value: 2, type: 'Chosen Type' },
          h: { value: DiceTools.get2d4(), type: 'Chosen Type' },
        },
        effects: [<>
          You may choose any damage type when making an attack with this weapon.
        </>, <>
          On a Rank 2 Success or higher, this weapon ignores up to 3 resistance of
          all types. Also, the attack causes <StatusKeyword effect="blinded" x={3} />
          {' '} until the end of your next turn.
        </>]
      }]

    }],
    items: [{
      name: 'Auto-grapple Rope',
      tags: [],
      description: 'A device that can be deployed to extend a rope to hard-to-reach locations.',
      effects: [<>
        When you place this item on the ground, it starts extending a rope towards any target within
        {' '}<Range type='extreme' />, including upward against gravity. If deployed in combat, it
        extends one range segment per turn. When climbing the rope, you get +3 to any 
        {' '}<SkillCheck tags={[]} plural />.
      </>]
    }],
    trainings: [{
      name: 'Sleight of Hand',
      tags: [],
      effects: [<>
        You gain a +2 bonus to all <SkillCheck tags={['Stealth']} plural />.
      </>],
    }, {
      name: 'Defensive Fall',
      tags: [],
      charges: 2,
      effects: [<>
        When hit with an attack, after hearing the damage but before suffering it,
        you can choose to fall prone to avoid the damage.
      </>]
    }],
  },

  trapper: {
    name: 'Trapper',
    description: "The trapper is skilled in setting and disarming traps.",
    weapons: [],
    items: [{
      name: 'Trap Placer',
      tags: [],
      effects: [<>
        You have a small collection of traps to deploy. You can use a 
        2{movementIcon} Maneuver to set a trap within <Range type='short' />,
        or a 3{movementIcon} Maneuver to set a trap within <Range type='medium' />.
        You must be able to see where you are placing your traps, though you need
        not be able to physically reach it. Make a <SkillCheck tags={['Trap', 'Stealth']} />,
        on a Rank 2 success or higher, enemies did not see the trap placed and will
        move and act as if it wasn't there. Otherwise enemies know where you placed a trap.
      </>]
    }, {
      name: 'Traps',
      tags: [],
      effects: [<>
        When an enemy steps on a hex with a trap on it, it triggers. A trap details what happens
        when it is triggered in it's description. Some traps list a range, which increases
        the triggering range.
      </>, <>
        Traps are restored on a resupply. When you resupply, any
        deployed traps are destoryed or otherwise rendered non-functional.
      </>]
    }, {
      name: 'Azoid Trap', tags: ['Trap', 'Adjacent Range'],
      charges: 4,
      effects: [<>
        When this trap triggers, trap spews darts in all directions. The
        triggering creature loses 2{movementIcon}. All creatures in
        {' '}<Range type='short' /> take <DamageType type='Verdant' value={1} />
        {' '}and are <StatusKeyword effect='poisoned' x={1} y={3} />.
      </>]
    }, {
      name: 'Fire-spire Trap', tags: ['Trap'],
      charges: 3,
      effects: [<>
        When this trap triggers, it spews fire directly upward, dealing
        {' '}<DamageType type='Infernal' value={4} /> and granting
        {' '}<StatusKeyword effect='immolated' x={2} y={2} />. Creatures in
        {' '}<Range type='adjacent' /> are singed for
        {' '}<DamageType type='Infernal' value={1} />. The fire spews upward
        until the start of your next turn. Creatures that enter the spewing flames
        take <DamageType type='Infernal' value={8} />.
      </>]
    }, {
      name: 'Tangle-wire Trap', tags: ['Trap', 'Adjacent Range'],
      charges: 2,
      effects: [<>
        When this trap triggers, it covers itself and all hexes in
        {' '}<Range type='adjacent' /> with razor-wire. The triggering
        takes <DamageType type='Metal' value={4} />. Creatures who enter
        a razor-wire hex lose 1{movementIcon} and take{' '}
        <DamageType type='Metal' value={1} />.
      </>, <>
        You can use a Set Trap Maneuver to enhance a triggered 
        Tangle-wire Trap without spending a trap charge. When
        a creature moves within the triggering range of{' '}
        <i>any</i> of the enhanced trap's razor-wire, the trap
        can trigger from that part's hex location, spreading further.
        Afterward, make a <SkillCheck tags={['Trap']} /> check with
        a -2 penalty for each time the trap has been enhanced. On a Failure,
        the trap breaks down and all razor-wire is removed.
      </>]
    }, {
      name: 'Pushback Trap', tags: ['Trap'],
      charges: 3,
      effects: [<>
        When this trap triggers, it creates an impassable wall with
        8 health and <DefenseMod mod='Resist' type='All' value={4} />. The
        triggering creature is pushed 2{movementIcon} in the direction you
        choose, and takes <DamageType type='Chthonic' value={2} />.
      </>, <>
        If you are within <Range type='medium' />, you can spend
        1{movementIcon} to trigger this trap early. If you have
        Pre-prepared, you can trigger this trap at-will by taking
        a stack of Pre-action.
      </>]
    }, {
      name: 'Tripper Trap', tags: ['Trap'],
      charges: 6,
      effects: [<>
        When this trap triggers, the triggering creature loses 
        3{movementIcon} and falls prone.
      </>]
    }, 
    
  ],
    trainings: [{
      name: 'Trap Specialist',
      tags: [],
      effects: [<>You gain a +2 bonus to all <SkillCheck tags={['Trap']} plural />
      {' '}(including setting and detecting traps).</>],
    }, {
      name: 'Pre-prepared',
      tags: [],
      effects: [<> 
        You are an expert at preparation. So good that you've prepared some
        traps when nobody is looking.
        When a creature is moving within line-of-sight of you, you may interrupt them to
        declare a pre-placed trap directly under them (causing it to immediately trigger).
        Doing so
        gives you 1 stacks of "Pre-action" per range increment, starting with
        {' '}<Range type='adjacent' />. On our turn, you can spend 2{movementIcon} to
        remove a stack of Pre-action. You cannot take any actions if you have any stacks
        of Pre-action, but you can still perform Maneuvers.
        <br />
        When combat ends,
        immediately remove 2 stack of Pre-action for free,
        then take 1 damage per remaining stack and remove the rest.
      </>],
    }],
  }
};

const sortedExObj: { [key: string]: Kit } = Object.entries(exObj)
  .sort((a, b) => a[1].name.localeCompare(b[1].name))
  .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

export default sortedExObj;