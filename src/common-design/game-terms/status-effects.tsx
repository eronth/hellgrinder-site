import { StatusEffect } from '../../ts-types/types';

type StatusEffectsReturn = {
  blinded: StatusEffect;
  brittle: StatusEffect;
  doomed: StatusEffect;
  enfeebled: StatusEffect;
  invigorated: StatusEffect;
  frenzied: StatusEffect;
  poisoned: StatusEffect;
  immolated: StatusEffect;
  lost: StatusEffect;
  silenced: StatusEffect;
  slowed: StatusEffect;
  shaken: StatusEffect;
  terrified: StatusEffect;
  pure: StatusEffect;
  beguiled: StatusEffect;
  hostile: StatusEffect;
  dread: StatusEffect;
  determined: StatusEffect;
  determinism: StatusEffect;
  egregore: StatusEffect;
  grimUncertainty: StatusEffect;
  unremarkable: StatusEffect;
  unmistakable: StatusEffect;
  expired: StatusEffect;
  cursed: StatusEffect;
  insideOut: StatusEffect;
  staggered: StatusEffect;
  decoherence: StatusEffect;
  unending: StatusEffect;
  enslumbered: StatusEffect;
  afferlized: StatusEffect;
  endarvolism: StatusEffect;
  antipathism: StatusEffect;
  zalgorithm: StatusEffect;
};

const exObj: StatusEffectsReturn = {
  blinded: {
    name: 'Blinded [[X]]',
    description: 'You have reduced visibility.',
    effects: [
      <>
        You have -[[X]] to [Observation] Skill Checks and 
        -[[X]] to [Attack Shooting] Attack Hit Checks.
      </>,
      <>
        For every 3 levels of Blinded you have, 
        your ranges get reduced by 1 step.
      </>
    ],
    x: 'X',
  },
  brittle: {
    name: 'Brittle [[X]]',
    description: 'You are weakened to your very core.',
    effects: [
      <>
        Any time you take damage, you take an additional [[X]] damage.
      </>,
      <>
        If you take an injury, you take the larger of the two dice rolled.
      </>
    ],
    x: 'X',
  },
  doomed: {
    name: 'Doomed [[X]]',
    description: 'Your life is forfeit.',
    effects: [
      <>
        Any time you get an Injury, gain [[X]] additional Injuries of the same tier.
      </>,
      <>
        When you regain health for any reason (including the health reset when 
        gaining Injuries), you gain [[X]] less health.
      </>
    ],
    x: 'X',
  },
  enfeebled: {
    name: 'Enfeebled [[X]]',
    description: 'You feel weak, as if your strength is sapped.',
    effects: [
      <>
        You gain -[[X]] to [Endurance] Skill Checks and
        -[[X]] to [Melee Attack] Hit Checks and [Melee Attack] Damage.
      </>,
      <>
        [Recovery] Skill Checks that target you have -[[X]] to their results.
      </>
    ],
    x: 'X',
  },
  invigorated: {
    name: 'Invigorated [[X]]',
    description: 'You feel empowered, full of life!',
    effects: [
      <>
        You get an extra Maneuver each turn.
      </>,
      <>
        Healing gives you an additional +[[X]] Health.
      </>
    ],
    x: 'X',
  },
  frenzied: {
    name: 'Frenzied [[X]] for [[Y]]',
    description: 'You enter a combat frenzy for [[Y]] turns.',
    effects: [
      <>
        You must make an Attack on each of your turns. 
      </>,
      <>
        If you don't make an Attack during one of your turns, 
        you gain [[X]] Corruption.
      </>
    ],
    x: 'X',
    y: 'Y',
  },
  poisoned: {
    name: 'Poisoned (Toxicity [[X]], Linger [[Y]])',
    description: 'You are poisoned.',
    effects: [
      <>
        You take [[X]] Verdant Damage at the end of your turn.
        Then roll an [Endurance] Skill Check with -[[Y]]. On a Rank 2+ 
        Success, the poison ends early.
      </>
    ],
    x: 'X',
    y: 'Y',
  },
  immolated: {
    name: 'Immolated [[X]] for [[Y]]',
    description: 'You have been set on fire. You burn for [[Y]] turns, taking damage each turn.',
    effects: [
      <>
        You take [[X]] Infernal Damage at the end of your turn.
        Then roll an [Endurance] Skill Check. On a Rank 2+ 
        Success, the burning ends early.
      </>
    ],
    x: 'X',
    y: 'Y',
  },
  lost: {
    name: 'Lost [[X]]',
    description: 'You feel lost, both physically and mentally. You aren\'t sure what any of this is for.',
    effects: [
      <>
        Any time you gain Corruption, gain [[X]] additional corruption.
      </>
    ],
    x: 'X',
  },
  silenced: {
    name: 'Silenced [[X]]',
    description: 'Everything around you seems calm, quiet. You can\'t seem to bring yourself above a whisper.',
    effects: [
      <>
        You have -[[X]] to [Arcane Attack] Hit Checks and [Arcane Attack] Damage.
      </>
    ],
    x: 'X',
  },
  slowed: {
    name: 'Slowed [[X]]',
    description: 'You\'re struggling to move, as if the air around you is sludge.',
    effects: [
      <>
        Reduce move speed by [[X]]. Can't reduce below 1.
      </>
    ],
    x: 'X',
  },
  shaken: {
    name: 'Shaken [[X]]',
    description: 'You are shaken to your core, unable to focus on anything but the fear that grips you.',
    effects: [
      <>
        You can either take an Action or a Maneuver, but not both.
      </>,
      <>
        Lose one stack at the end of your turn.
      </>
    ],
    x: 'X',
  },
  terrified: {
    name: 'Terrified',
    description: 'You are gripped by an overwhelming sense of terror.',
    effects: [
      <>
        Trying to do any Maneuver requires an extra [Stoic] Skill Check.
        On a failure, your Maneuver is used without any benefit.
      </>,
      <>
        All Hit Checks get a -3 penalty.
      </>,
    ],
  },
  pure: {
    name: 'Pure',
    description: 'You are pure of heart.',
    effects: [
      <>
        You cannot gain Corruption.
      </>,
      <>
        Failed corruption tests cause you to lose 3 
        Health instead of other effects.
      </>
    ],
  },
  beguiled: {
    name: 'Beguiled',
    description: 'You become beguiled, losing track of your own abilities.',
    effects: [
      <>
        Your [Shooting] Checks now have the [Melee] tag instead.
      </>,
      <>
        Your [Melee] Checks now have the [Thrown] tag instead.
      </>,
      <>
        Your [Thrown] Checks now have the [Arcane] tag instead.
      </>,
      <>
        Your [Arcane] Checks now have the [Shooting] tag instead.
      </>
    ],
  },
  hostile: {
    name: 'Hostility [[X]]',
    description: 'You attack with little regard for your allies\' safety.',
    effects: [
      <>
        Any attack you make deals [[X]] damage to a random ally
        within [Short Range] of your target or yourself (GM's choice).
      </>
    ],
    x: 'X',
  },
  dread: {
    name: 'Dread',
    description: 'You feel an impending sense of dread.',
    effects: [
      <>
        Each time you take damage, gain gain stacks of Dread equal to the damage taken
        (after modifiers). You can choose to take stacks of any negative status
        effect (approved by GM) in place of up to 2 stacks of Dread gained
        this way.
      </>,
      <>
        Each time you kill an enemy, remove 2 stacks of Dread.
      </>,
      <>
        You gain a stack of Sense of Dread at the end of your turn.
      </>,
      <>
        If you have 6 stacks at the end of your turn, you lose all stacks of
        Dread and instead gain Doomed 1 and Terrified.
      </>
    ],
  },
  determined: {
    name: 'Determined',
    description: 'Your determination only grows with desperation.',
    effects: [
      <>
        You get +D to all Skill Checks and Hit Checks, where D is the
        difference between your max health and current health, 
        with an additional +6 for each Injury you have.
      </>,
      <>
        When you would suffer a Critical Injury while you don't have a Final Injury,
        you may choose to take a Serious Injury instead. Treat it as a Final Injury.
      </>
    ],
  },
  determinism: {
    name: 'Determinism',
    description: 'Everything is preordained. You are a creature of fate.',
    effects: [
      <>
        At the beginning of your turn, you must decide on all 
        actions and maneuvers you will take that turn (including
        targets of actions and paths for movement).
      </>,
      <>
        You cannot change these decisions once your turn begins. If anything
        interrupts your pre-planned actions or maneuvers,
        you lose the remainder of that action or maneuver and take 2 Damage.
      </>
    ],
  },
  egregore: {
    name: '[[Type]] Egregore',
    description: 'You are part of a greater whole. You are part of the [[Type]] Egregore.',
    effects: [
      <>
        You can communicate telepathically with any other creature in the [[Type]] Egregore.
      </>,
      <>
        You gain an Egregore Strength equal to the number of other members of 
        the [[Type]] Egregore within [Long Range] of you.
      </>,
      <>
        You can use an Action to give all creatures with [[Type]] Egregor
        within [Short Range] of you a bonus to all Skill
        Checks and Hit Checks until the start of your next turn equal to your
        Egregore Strength. 
      </>,
      <>
        Whenever you take damage, other [[Type]] Egregor creatures in [Short Range] of you
        take the same amount of damage, up to your Egregore Strength.
      </>
    ],
  },
  grimUncertainty: {
    name: 'Grim Uncertainty',
    description: 
      'You are unsure of yourself and your future.',
    effects: [
      <>
        The GM secretly rolls a d4 and notes the result. You lose this much life,
        but are not told exactly how much you lost.
        Any time you would gain an Injury, the GM informs you.
      </>,
      <>
        The next time you heal, you regain the health lost from 
        Grim Uncertainty and end the effect.
      </>
    ],
  },
  unremarkable: {
    name: 'Unremarkable',
    description: 'You are unremarkable.',
    effects: [
      <>
        Gain +4 to [Stealth] Skill Checks, but all Rank 2 and Rank 3 Successes
        have their Rank reduced by 1.
      </>
    ],
  },
  unmistakable: {
    name: 'Unmistakable',
    description: 'You are unmistakable.',
    effects: [
      <>
        You gain -4 to [Stealth] Skill Checks.
      </>,
      <>
        Enemies who have seen you 
        before will remember you, no
        check needed.
      </>
    ]
  },
  expired: {
    name: 'Expired',
    description: 'You should have died by now, yet somehow you persist.',
    effects: [
      <>
        [Arcane] Healing damages you instead of healing you.
      </>,
    ],
  },
  cursed: {
    name: 'Cursed',
    description: 'You are afflicted by an unfortunate curse.',
    effects: [
      <>
        You have -3 to all Skill Checks and Hit Checks.
      </>,
      <>
        You cannot gain any positive status effects (as determined by GM).
      </>,
    ],
  },
  insideOut: {
    name: 'Inside Out',
    description: 'Your disgusting insides are now on your outside.',
    effects: [
      <>
        Allies within [Short Range] that witness this transformation gain Dread.
      </>,
      <>
        You take +1 damage from all attacks, and you take 1 at the start of your turn.
      </>
    ],
  },
  staggered: {
    name: 'Staggered',
    description: 
      'Your sense of balance has been thrown off. Any time you choose a movement, do the following:',
    effects: [
      <>
        The GM publicly assigns each hex adjacent to you a number, 1 through 6.
      </>,
      <>
        Each time you try to move to a hex, roll three d6 dice and choose one of the results.
        You must choose a result that corresponds to a hex you can move to.
      </>,
      <>
        Move to the hex matching the number chosen.
      </>,
      <>
        If you cannot move to any hexes you do not move at all.
         {/* and the next time you try to move,
        you roll an additional d6 to choose from. */}
      </>
    ],
  },
  decoherence: {
    name: 'Decoherence',
    description: 'Your reality is breaking down, and it begins to feel hard to exist.',
    effects: [
      <>
        All checks targeting you must make two checks and take the lower result.
      </>,
      <>
        All checks you make must make two checks and take the lower result.
      </>
    ],
  },
  unending: {
    name: 'Unending',
    description: 'You are unending. You cannot die.', 
    effects: [
      <>
        You can still take Injuries and be incapacitated, but you will not die.
      </>
    ],
  },
  enslumbered: {
    name: 'Enslumbered for [[X]]',
    description: 'You are unconscious for [[X]] rounds.',
    effects: [
      <>
        At the end of your turn, remove one stack of Enslumbered.
      </>,
      <>
        If you take damage or are shaken awake with an Action, immediately remove all remaining stacks 
        of Enslumbered and take 1 damage for each stack removed this way.
      </>
    ],
    x: 'X',
  },
  afferlized: {
    name: 'Afferlized',
    description: 'Your skin hardens and shines with a brilliant light — you have become afferlized.',
    effects: [
      <>
        You are immune to all damage, but you cannot take any actions.
      </>,
      <>
        You can still take Movements.
      </>
    ]
  },
  endarvolism: {
    name: 'Endarvolism',
    description: 'Your skin turns ashen grey, your limbs elongate and contort — you are afflicted with endarvolism.',
    effects: [
      <>
        Your [Melee] attacks can reach +1 hex further.
      </>,
      <>
        Your move speed is reduced by 2.
      </>,
      <>
        [Arcane] Hit Checks and [Arcane] Damage are reduced by 2.
      </>
    ]
  },
  antipathism: {
    name: 'Antipathism',
    description: 'You feel a revulsion against the realm around you, as if everything is wrong.',
    effects: [
      <>
        Every hex you move requires a [Stoic] Skill Check.
      </>,
      <>
        Every hex you move through deals 1 damage to you.
      </>,
      <>
        You deal +4 damage to all creatures you attack.
      </>
    ]
  },
  zalgorithm: {
    name: 'Zalgorithm',
    description: 'It seems as though the world around you reveals more and more of the building blocks of reality — you have seen The Ẓ̷̎à̷̠l̵̳͑g̵͕͊ŏ̷̩r̶͙̓i̶̜͝t̴̮̾ḧ̶̡m̸͈͂',
    effects: [
      <>
        At the start of your turn, choose Front, Peripheral Flank, or Rear Flank Arc. All of your Arcs are treated as
        that Arc until the start of your next turn.
      </>,
      <>
        You can see through all forms of cover, and you can see creatures in the [Hidden] state.
      </>,
      <>
        Also, Choose a single Skill Check tag. You gain +2 to all non-[Attack] Skill Checks with that tag.
      </>,
    ]
  }
}

export default exObj;