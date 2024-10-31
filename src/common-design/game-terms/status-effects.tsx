import { StatusEffect } from '../../ts-types/types';

const exObj: { [key: string]: StatusEffect } = {
  blinded: {
    name: 'Blinded [[X]]',
    description: [
      'You have reduced visibility. You have -[[X]] to [Observation] Skill Checks and '
      + '-[[X]] to [Attack Shooting] Attack Hit Checks.',
      'For every 3 levels of Blinded you have, your ranges get reduced by 1 step.',
    ],
    x: 'X',
  },
  brittle: {
    name: 'Brittle [[X]]',
    description: [
      'You are weakened to your very core. Any time you take damage, you take an additional [[X]] damage.',
      'If you take an injury, you take the larger of the two dice rolled.',
    ],
    x: 'X',
  },
  doomed: {
    name: 'Doomed [[X]]',
    description: [
      'Your life is forfeit. Any time you get an Injury, gain [[X]] additional Injuries of the same tier.',
      'When you regain health for any reason (including the health reset when gaining Injuries), you gain [[X]] less health.',
    ],
    x: 'X',
  },
  enfeebled: {
    name: 'Enfeebled [[X]]',
    description: [
      'You feel weak, as if your strength is sapped. You gain -[[X]] to [Endurance] Skill Checks and '
      + '-[[X]] to [Melee Attack] Hit Checks and [Melee Attack] Damage.',
      '[Recovery] Skill Checks that target you have -[[X]] to their results.',
    ],
    x: 'X',
  },
  invigorated: {
    name: 'Invigorated [[X]]',
    description: [
      'You feel empowered, full of life! You get an extra Maneuver each turn. Healing gives you an additional +[[X]] Health.',
    ],
    x: 'X',
  },
  frenzied: {
    name: 'Frenzied [[X]] for [[Y]]',
    description: [
      'You enter a combat frenzy for [[Y]] turns. You must make an Attack on each of your turns. If you don\'t make an Attack during one of your turns, you gain [[X]] Corruption.',
    ],
    x: 'X',
    y: 'Y',
  },
  poisoned: {
    name: 'Poisoned (Toxicity [[X]], Linger [[Y]])',
    description: [
      'You are poisoned. You take [[X]] Verdant Damage at the end of your turn.',
      'Then roll an [Endurance] Skill Check with -[[Y]]. On a major success, the poison ends early.'
    ],
    x: 'X',
    y: 'Y',
  },
  immolated: {
    name: 'Immolated [[X]] for [[Y]]',
    description: [
      'You have been set on fire. You burn for [[Y]] turns, taking damage each turn. You take [[X]] Infernal Damage at the end of your turn, then roll an [Endurance] Skill Check. On a major success, the burning ends early.',
    ],
    x: 'X',
    y: 'Y',
  },
  lost: {
    name: 'Lost [[X]]',
    description: [
      'You feel lost, both physically and mentally. You aren\'t sure what any of this is for. Any time you gain ' +
      'Corruption, gain [[X]] additional corruption.',
    ],
    x: 'X',
  },
  silenced: {
    name: 'Silenced [[X]]',
    description: [
      'Everything around you seems calm, quiet. You can\'t seem to bring yourself above a whisper. You have -[[X]] to [Arcane Attack] Hit Checks and [Arcane Attack] Damage.',
    ],
    x: 'X',
  },
  slowed: {
    name: 'Slowed [[X]]',
    description: [
      'You\'re struggling to move. Reduce move speed by [[X]]. Can\'t reduce below 1.',
    ],
    x: 'X',
  },
  shaken: {
    name: 'Shaken [[X]]',
    description: [
      'You can either take an Action or a Maneuver, but not both. Lose one stack at the end of your turn.',
    ],
    x: 'X',
  },
  terrified: {
    name: 'Terrified',
    description: [
      'Trying to do any Maneuver requires an extra [Stoic] Skill Check. On a failure, your Maneuver is used without any benefit.',
      'All Hit Checks get a -3 penalty.',
    ],
  },
  pure: {
    name: 'Pure',
    description: [
      'You are pure of heart. You cannot gain Corruption. Failed corruption tests cause you to lose 3 Health instead of other effects.',
    ],
  },
  beguiled: {
    name: 'Beguiled',
    description: [
      'Your [Shooting] Checks now have the [Melee] tag instead. ' +
      'Your [Melee] Checks now have the [Thrown] tag instead. ' +
      'Your [Thrown] Checks now have the [Arcane] tag instead. ' +
      'Your [Arcane] Checks now have the [Shooting] tag instead.',
    ],
  },
  hostile: {
    name: 'Hostility [[X]]',
    description: [
      'You attack with little regard for your allies\' safety. Any attack you make deals [[X]] damage to a random ally' +
      ' within [Short Range] of your target or yourself (GM\'s choice).',
    ],
    x: 'X',
  },
  dread: {
    name: 'Dread',
    description: [
      'You feel an impending sense of dread. Each time you take damage, gain gain stacks of Dread equal to the damage taken ' +
      '(after modifiers). You can choose to take stacks of any negative status effect in place of up to 2 stacks of Dread gained' +
      ' this way. ',
      'Each time you kill an enemy, remove 2 stacks of Dread You gain a stack of Sense of Dread at the end of your turn.',
      'If you have 6 stacks at the end of your turn, you lose all stacks of Dread and instead gain Doomed 1 and Terrified.',
    ],
  },
  determined: {
    name: 'Determined',
    description: [
      'Your determination only grows with desperation. You get +D to all Skill Checks and Hit Checks, where D is the ' +
      'difference between your max health and current health, with an additional +6 for each Injury you have.',
      'When you would suffer a Critical Injury while you don\'t have a Final Injury' +
      ', you may choose to take a Serious Injury instead. Treat it as a Final Injury.',
    ],
  },
  hivemind: {
    name: 'Hivemind',
    description: [
      'You are part of a greater whole. You can communicate telepathically with any other creature with Hivemind.',
      'You can use an Action to give all creatures with Hivemind within [Short Range] of you a +X bonus to all Skill ' +
      'Checks and Hit Checks until the start of your next turn, where X is the number of creatures with Hivemind within Long Range.',
      'Whenever you take damage, up to X of that damage is also dealt to other members of the Hivemind, where X is the number of ' +
      'other members of the Hivemind within [Long Range] of you.',
    ],
  },
  expired: {
    name: 'Expired',
    description: [
      'You should have died by now. [Arcane] Healing damages you instead of heals you.',
    ],
  },
  cursed: {
    name: 'Cursed',
    description: [
      'You are cursed. You have -3 to all Skill Checks and Hit Checks. You cannot gain any positive status effects.',
    ],
  },
  insideOut: {
    name: 'Inside Out',
    description: [
      'Your insides are on your outside. Allies within [Short Range] that witness this transformation gain Dread. ' +
      ' You take +1 damage from all attacks, and you take 1 at the start of your turn.',
    ],
  },
  staggered: {
    name: 'Staggered',
    description: [
      'Your sense of balance has been thrown off. The GM publicly assigns each hex adjacent to you a number, 1 through 6. ' +
      'Each time you try to move to a hex, roll three d6 dice and choose one of the results. You move to the hex matching ' +
      'the number chosen.',
    ],
  }
}

export default exObj;