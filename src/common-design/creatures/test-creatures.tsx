import { Creature, CreatureAbility, DamageTakenMod } from "../../ts-types/creature-types";
import { DamageElement } from "../../ts-types/types";
import { movementIcon } from "../CommonIcons";
import SkillCheck from "../SkillCheck/SkillCheck";
import Tools from "../Tools";

 
const factionTag = 'Rot Host';
const resist = (type: DamageElement, amount?: number): DamageTakenMod => ({
  modification: 'Resist',
  type: type,
  mod: amount ?? 1
});
const absorb = (type: DamageElement, amount?: number): DamageTakenMod => ({
  modification: 'Absorb',
  type: type,
  mod: amount ?? 1
});
const weak = (type: DamageElement, amount?: number): DamageTakenMod => ({
  modification: 'Weak',
  type: type,
  mod: amount ?? 1
});
const damage = (l: number, m: number, h: number, type: DamageElement) => ({
  l: { value: l, type: type },
  m: { value: m, type: type },
  h: { value: h, type: type },
});

export const giftOfPlague: CreatureAbility = {
  name: 'Gift of Plague',
  description: <>
    If a character is hit by 3 or more attacks from <i>any</i> creatures with this
    ability in a single round, they must attempt a <SkillCheck tags={["Stoic"]} /> at
    the end of the round. A character must get Rank 2 on the check 
    or gain 1 Corruption. If they have an even number of Corruption, they immediately
    attempt a Corruption Test.
  </>
};

const exObj: { [key: string]: Creature } = {
  /* T1 Test Creatures */
  rotMind: {
    name: 'Rot Mind',
    tier: Tools.creatureTiers.t1,
    tags: [factionTag],
    health: 6, size: 1,
    speed: 4, dash: 1,
    damageTakenMods: [
      resist('Metal', 1),
      resist('Voidyr', 1),
      weak('Chthonic', 1),
    ],
    attacks: [
      {
        name: 'Clobber',
        damage: damage(2, 3, 4, 'Voidyr'),
        tags: ['Attack', 'Melee', 'Adjacent Range'],
        effects:[
          <>
            Each time a creature is hit by this attack, they rot.
            Get Rank 2 on a <SkillCheck tags={["Stoic"]} /> check, or take 1 Voidyr damage.
            A character gets a -1 penalty to this check for each time they've rotted (including
            the triggering attack).
          </>,
        ],
      },
    ],
    abilities: [giftOfPlague],
    description: '',
  },
  decayedOne: {
    name: 'Decayed One',
    tier: Tools.creatureTiers.t1,
    tags: [factionTag],
    health: 4, size: 1,
    speed: 5, dash: 3,
    damageTakenMods: [
      weak('Infernal'),
      weak('Verdant'),
      resist("Abyssal")
    ],
    attacks: [
      {
        name: 'Rotspittle',
        damage: damage(1, 2, 3, 'Verdant'),
        effects:[
          <>
            If the Decayed One has been hit by Verdant damage this combat,
            the attack deals double damage.
          </>
        ],
        tags: ['Attack', 'Arcane', 'Short Range'],
      },
    ],
    abilities: [giftOfPlague],
    description: '',
  },
  festerling: {
    name: 'Festerling',
    tier: Tools.creatureTiers.t1,
    tags: [factionTag],
    health: 5, size: 1,
    speed: 4, dash: 4,
    damageTakenMods: [
      resist('Verdant', 1),
      resist('Chthonic', 1),
      weak('Infernal', 2),
    ],
    attacks: [
      {
        name: 'Scraping Bite',
        damage: damage(0, 0, 2, 'Chthonic'),
        effects:[
          <>
            This attack deals bonus Cthonic damage equal to the number of 
            creatures adjacent to the target which have the Gift of Plague ability.
          </>
        ],
        tags: ['Attack', 'Melee', 'Adjacent Range'],
      },
    ],
    abilities: [
      giftOfPlague,
      {
        name: 'Blighted Trail',
        description: <>
          When the Festerling moves or dashes, it leaves behind a patch of
          blighted ground in spaces it moves through. Characters
          crossing through this ground must make
          a <SkillCheck tags={['Endurance']} />.
          On a Failure, they take 1 Abyssal damage and immediately make a 
          Corruption Test. Creatures damaged by this ability treat it as
          though they were hit by an attack for the purposes of determining
          the Gift of Plague ability.
        </>
      }
    ],
    description: '',

  },

  /* T2 Zephpter Creatures */
  putridAmalgam: {
    name: 'Putrid Amalgam',
    tier: Tools.creatureTiers.t2,
    tags: [factionTag],
    health: 9, size: 1,
    speed: 7, dash: 5,
    damageTakenMods: [
      absorb('Nethercurrent', 3),
      resist('Voidyr', 2),
      resist('Chthonic', 2),
      weak('Infernal', 3),
      weak('Abyssal', 1),
    ],
    attacks: [
      {
        name: 'Crushing Claws',
        damage: damage(3, 6, 9, 'Metal'),
        tags: ['Attack', 'Melee', 'Adjacent Range'],
        effects:[
          <>
            On a Success Rank 2+, if the target is not Brittle, they become Brittle 1.
          </>
        ],
      },
      {
        name: 'Whiplash Tendril',
        damage: damage(3, 6, 9, 'Chthonic'),
        tags: ['Attack', 'Melee', 'Short Range'],
      },
      {
        name: 'Jolt of Life',
        damage: damage(2, 4, 6, 'Nethercurrent'),
        tags: ['Attack', 'Arcane', 'Medium Range'],
      }
    ],
    abilities: [giftOfPlague],
    description: '',
  },
  stenchBloater: {
    name: 'Stench Bloater',
    tier: Tools.creatureTiers.t2,
    tags: [factionTag],
    health: 12, size: 1,
    speed: 4, dash: 1,
    damageTakenMods: [
      resist('All', 3)
    ],
    attacks: [
      {
        name: 'Dire Puke',
        damage: damage(2, 4, 7, 'Abyssal'),
        tags: ['Attack', 'Shooting', 'Adjacent Range', { tag: 'Area', value: 1 }],
        effects:[
          <>
            This attack targets all creatures Adjacent to the Stench Bloater.
          </>,
          <>
            Each creature hit by this attack must make a
            <SkillCheck tags={['Endurance', 'Agility', 'Stoic']} />. On a
            Failure, they become
            Poisoned with (Toxicity 1, Linger 2).
          </>
        ],
      },
      {
        name: 'Projectile Vomit',
        damage: damage(1, 3, 6, 'Infernal'),
        tags: ['Attack', 'Shooting', 'Medium Range'],
        effects:[
          <>
            This attack can target an additional character between
            the Stench Bloater and the primary target.
          </>,
        ],
      },
    ],
    abilities: [
      giftOfPlague,
      {
        name: 'Explosive Demise',
        description: <>
          When the Stench Bloater is reduced to 0 Health, it explodes.
          Each creature within Short Range must make a
          <SkillCheck tags={['Agility']} />. On a Failure, they take 3
          Nethercurrent damage.
        </>
      }
    ],
    description: '',
  },
  blightbringerShaman: {
    name: 'Blightbringer Shaman',
    tier: Tools.creatureTiers.t2,
    tags: [factionTag],
    health: 7, size: 1,
    speed: 5, dash: 1,
    damageTakenMods: [
      resist('Nethercurrent', 2),
      resist('Voidyr', 2),
      weak('Chthonic', 2),
      weak('Metal', 2),
    ],
    attacks: [
      {
        name: 'Plague Bolt',
        damage: damage(3, 8, 12, 'Abyssal'),
        tags: ['Attack', 'Arcane', 'Long Range'],
        effects:[
          <>
            On a Rank 2+ Success against a target with Rot, 
            the target gains Enfeebled 1.
          </>,
        ],
      },
      {
        name: 'Autopical Examination',
        damage: damage(0, 0, 3, 'Abyssal'),
        tags: ['Attack', 'Arcane', 'Medium Range'],
        effects:[
          <>
            The target gains the Inside Out condition. This attack counts for
            the purposes of determining the Gift of Plague ability.
          </>,
        ],
      }
    ],
    abilities: [giftOfPlague],
    description: '',
  },

  /* T3 Zephpter Creatures */
  decayedPile: {
    name: 'Decayed Pile',
    tier: Tools.creatureTiers.t3,
    tags: [factionTag],
    health: 15, size: 2,
    speed: 4, dash: 2,
    damageTakenMods: [
      absorb('Verdant', 3),
      resist('Voidyr', 5),
      resist('Metal', 3),
      weak('Infernal', 4),
    ],
    attacks: [
      {
        name: 'Enlurchant Scour',
        damage: damage(3, 6, 9, 'Verdant'),
        tags: ['Attack', 'Arcane', 'Adjacent Range'],
        effects:[
          <>
            The target becomes Immolated 3 for a number of rounds equal
            to the Success Rank.
          </>
        ],
      },
      {
        name: 'Devour',
        damage: damage(3, 6, 9, 'Chthonic'),
        tags: ['Attack', 'Melee', 'Adjacent Range'],
        effects:[
          <>
            The Decayed Pile can only use this attack against corpses.
          </>,
          <>
            If the target dies from this attack or is a corpse, the Decayed Pile
            heals 6 Health and gains size +1.
          </>
        ],
      }
    ],
    abilities: [
      giftOfPlague,
      {
        name: 'Rotstench',
        description: <>
          At the start of each of the Decayed Pile's turns, each
          creature Adjacent to it must make 
          a <SkillCheck tags={['Stoic', 'Endurance' ]} />.
          On a Rank 0, they gain Slowed 1 and Staggered. On a Rank 1
          Success, they gain Slowed 1.
        </>
      }
    ],
    description: '',
  },
  enplagued: {
    name: 'Enplagued',
    tier: Tools.creatureTiers.t3,
    tags: [factionTag],
    health: 15, size: 1,
    speed: 4, dash: 2,
    damageTakenMods: [
      absorb('Voidyr', 3),
      absorb('Verdant', 3),
      resist('Metal', 1),
      resist('Chthonic', 1),
      weak('Infernal', 3),
      weak('Abyssal', 3),
    ],
    attacks: [
      {
        name: 'Fellswarm',
        damage: damage(6, 12, 22, 'Verdant'),
        tags: ['Attack', 'Melee', 'Adjacent Range'],
        effects:[
          <>
            On a Rank 3+ Success, the target is Doomed 1.
          </>
        ],
      },
      {
        name: 'Pull to Demise',
        damage: damage(4, 8, 16, 'Chthonic'),
        tags: ['Attack', 'Arcane', 'Medium Range'],
        effects:[
          <>
            On a Rank 2+ Success, targets within Short Range are pulled
            1{movementIcon} towards the Enplagued. Targets within Medium Range
            are pulled 2{movementIcon} instead.
          </>
        ],
      }
    ],
    abilities: [
      giftOfPlague,
      {
        name: 'Plagueswarm',
        description: <>
          When the Enplagued uses a dash, it can pass through
          other characters. Each creature it passes through is targeted
          with a Fellswarm attack.
        </>
      },
      {
        name: 'Out of Touch with Reality',
        description: <>
          Each time the Enplagued takes damage from an attack,
          they gain resist 1 to the damage type of that attack
          until the start of their next turn.
        </>
      }
    ],
    description: '',
  },

  /* T4 Zephpter Creatures */
  finalHorror: {
    name: 'Final Horror',
    tier: Tools.creatureTiers.t4,
    tags: [factionTag],
    health: 26, size: 2,
    speed: 5, dash: 5,
    damageTakenMods: [
      resist('Metal', 7),
      absorb('Voidyr', 5),
      weak('Verdant', 3),
      weak('Infernal', 2),
    ],
    attacks: [
      {
        name: 'Threat of Unmaking',
        damage: damage(4, 8, 12, 'Voidyr'),
        tags: ['Attack', 'Arcane', 'Long Range'],
        effects: [
          <>
            On a Rank 2+ Success, the target gains Expired.
            If the target already has Expired, they gain
            Grim Uncertainty instead.
          </>
        ],
      },
      {
        name: 'Poisonthorn Spine Blast',
        damage: damage(3, 6, 10, 'Verdant'),
        tags: ['Attack', 'Arcane', 'Short Range', { tag: 'Area', value: 3 }],
        effects: [<>
          Target all creatures within Short Range of the Final Horror.
        </>
        ],
      },
      {
        name: 'Anointing of Decay',
        damage: damage(6, 12, 18, 'Chthonic'),
        tags: ['Attack', 'Melee', 'Adjacent Range', { tag: 'Area', value: 1 }],
        effects: [
          <>
            The target is afflicted with Apathathy.
            If the target already has Apathathy, they instead
            gain Decoherence.
          </>
        ],
      }
    ],
    abilities: [
      giftOfPlague,
      {
        name: 'Dreadful Visage',
        description: <>
          At the start of each of the Final Horror's turns,
          each character within Short Range must make a
          <SkillCheck tags={['Stoic', 'Fear']} />.
          On a Failure, they gain Dread.
        </>
      },
      {
        name: 'Resolution of Annotation',
        description: <>
          If all of the Final Horror's enemies are afflicted with
          Decoherence, the fight ends immediately and the Final Horror
          transforms the Decohered characters into minions under its control.
        </>
      }
    ],
    description: '',
  }
};

export default exObj;
