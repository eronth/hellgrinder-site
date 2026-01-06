import { RuleDefinition, RuleCategory } from '../ts-types/rule-types';
import StatusEffects from "../common-design/game-terms/status-effects.tsx"
import { StatusEffect } from '../ts-types/types';

const convertStatusEffectToRuleDefinition = (statusEffect: StatusEffect): RuleDefinition => {
  const se = statusEffect;
  const nameToId = se.name.toLowerCase().replace(/\s+/g, '-').replace(/\[\[X\]\]/g, '').replace(/\[\[Y\]\]/g, '').replace(/--+/g, '-');
  const nameToKeyword = se.name
    // make sure to replace [[X]] and [[Y]] with nothing, then trim whitespace
    .replace(/\[\[X\]\]/g, '') // Remove X placeholders
    .replace(/\[\[Y\]\]/g, '') // Remove Y placeholders
    .replace(/\s+for\s+$/i, '') // Remove trailing "for" (case insensitive)
    .replace(/\s+for\s+/i, ' ') // Replace "for" in middle with single space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing whitespace

  const ret: RuleDefinition = {
    id: nameToId,
    keyword: nameToKeyword,
    fullname: se.name,
    category: 'status-effects',
    summary: se.description,
    details: '',
    examples: se.effects,
    exampleNameOverride: 'Effects',
    relatedRules: ['status-effects']
  }
  return ret;
}

// Rule categories for organization
export const RULE_CATEGORIES: RuleCategory[] = [
  {
    id: 'combat',
    name: 'Combat',
    description: 'Rules related to combat mechanics, attacks, and battle flow'
  },
  {
    id: 'character',
    name: 'Character',
    description: 'Character creation, advancement, and core character mechanics'
  },
  {
    id: 'equipment',
    name: 'Equipment',
    description: 'Weapons, armor, items, and their mechanics'
  },
  {
    id: 'magic',
    name: 'Magic',
    description: 'Spellcasting, magic items, and arcane mechanics'
  },
  {
    id: 'creatures',
    name: 'Creatures',
    description: 'Enemy types, creature abilities, and encounters'
  },
  {
    id: 'status-effects',
    name: 'Status Effects',
    description: 'Temporary and permanent conditions affecting characters'
  },
  {
    id: 'general',
    name: 'General',
    description: 'Core game mechanics and general rules'
  }
];

// General Rules
export const generalRules: RuleDefinition[] = [
  {
    id: 'heroic-medals',
    keyword: 'Heroic Medals',
    category: 'general',
    summary: 'Currency earned throughout the game that can be spent to create Heroic Moments and boost actions.',
    details: 'Heroic Medals are earned throughout the game and can be spent to create Heroic Moments whereupon an action is boosted. Sometimes you may earn specialized Medals, which can be used as Heroic Medals or for a perk described by that medal type.',
    examples: [
      'Spend 1 Heroic Medal: Change the result of one dice by +1 or -1',
      'Spend 3 Heroic Medals: Set the value of any dice',
      'Spend 1 Heroic Medal: Call reinforcement (cost increases +1 each use)',
      'Spend 1 Heroic Medal after a turn ends: Take an extra action right now',
      'Spend 2 Heroic Medals after a turn ends: Take your turn early'
    ],
    relatedRules: ['dice-mechanics', 'reinforcements']
  },
  {
    id: 'dice-mechanics',
    keyword: 'Dice',
    category: 'general',
    summary: 'Core dice rolling mechanics using d6 systems for most actions.',
    details: 'The game uses primarily d6 dice for resolution. Players roll dice and compare results against target numbers or opponent rolls.',
    relatedRules: ['heroic-medals', 'success-ranks']
  },
  {
    id: 'reinforcements',
    keyword: 'Reinforcements',
    category: 'general',
    summary: 'Ability to bring in new characters when allies are defeated.',
    details: 'If one of your player allies is dead or otherwise non-playable, you may spend Heroic Medals to call for a reinforcement. The player creates a new character and arrives at the end of the current round.',
    relatedRules: ['heroic-medals']
  },
  {
    id: 'difficulty',
    keyword: 'Difficulty',
    category: 'general',
    summary: 'Mechanics for determining the difficulty of tasks and actions.',
    details: 'Depending on the difficulty of the action, a Skill Check result can be modified from -4 to +2.',
    examples: [
      'Easy: +2',
      'Normal: 0',
      'Hard: -2',
      'Very Hard: -4'
    ],
    relatedRules: ['dice-mechanics', 'skill-checks']
  },
  {
    id: 'skill-checks',
    keyword: 'Skill Checks',
    category: 'general',
    summary: 'Mechanics for performing actions and resolving tasks using skills.',
    details: 'A Skill Check is performed by rolling 3d6. Most skill checks will have Tags associated with them. When you make a Skill Check, you roll 3d6 and add the relevant skill modifier.',
    relatedRules: ['difficulty', 'tags']
  },
  {
    id: 'success-ranks',
    keyword: 'Success Ranks',
    category: 'general',
    summary: 'Levels of success or failure based on Skill Check results.',
    details: 'Success Ranks determine the outcome of Skill Checks based on the total rolled. They range from Critical Success to Critical Failure.',
    examples: [
      'Result 4-7 — Rank 0: Failure',
      'Result 8-11 — Rank 1: Partial or minor Success',
      'Result 12-15 — Rank 2: Full Success',
      'Result 16+ — Rank 3: Success; with flourish.'
    ],
    relatedRules: ['dice-mechanics', 'skill-checks']
  },
  {
    id: 'corruption-test',
    keyword: 'Corruption Test',
    category: 'general',
    summary: 'Mechanics for testing a character\'s corruption level and its effects.',
    details: 'Occasionally, the GM will force you to make a Corruption Test by rolling a [Corruption Skill Check]. When you have to make a Corruption Skill Check, you roll 3d6. If the result is less than your current Corruption, you fail the check. When you fail, roll 2d6 and take the lowest value to determine what happens.',
    examples: [
      '1 — Dread: Gain 1 Corruption.',
      '2 — Nausiating: Gain 1 Corruption and lose 1 Health.',
      '3 — Invitation: The GM chooses a Damage Type. You gain Weak Type 1.',
      '4 — Bout of Madness: Your bout of madness causes you to attack an ally.',
      '5 — Madness Manifest: You lose control of your character.',
      '6 — Corrupting Warp: You lose control of your character.'
    ],
    relatedRules: ['corruption', 'skill-checks']
  },
  {
    id: 'safelight-shards',
    keyword: 'Safelight Shards',
    category: 'general',
    summary: 'Crystalline growths that grant strange resilience and healing.',
    details: 'Safelight Shards are often carried by individual soldiers to help them quickly heal from injuries.',
    relatedRules: ['safelight', 'skill-checks', 'recovery']
  }
];

// Combat Rules
export const combatRules: RuleDefinition[] = [
  {
    id: 'health',
    keyword: 'Health',
    category: 'combat',
    summary: 'Hit points representing a character\'s physical condition and ability to continue fighting.',
    details: 'When a character reaches 0 health, they are defeated. Players follow an injury system while enemies are simply defeated.',
    relatedRules: ['injuries', 'damage']
  },
  {
    id: 'damage',
    keyword: 'Damage',
    category: 'combat',
    summary: 'Harm dealt to characters, reducing their health or causing other effects.',
    details: 'Damage reduces health and can have various types with different effects. Some creatures have resistances or vulnerabilities to specific damage types.',
    relatedRules: ['health', 'damage-types']
  },
  {
    id: 'damage-types',
    keyword: 'Damage Types',
    category: 'combat',
    summary: 'Different categories of damage that may have special effects or interactions.',
    details: 'Various types of damage exist in the game, and creatures may have different resistances, vulnerabilities, or immunities to specific types.',
    relatedRules: ['damage', 'resistances']
  },
  {
    id: 'speed',
    keyword: 'Speed',
    category: 'combat',
    summary: 'Movement capability measured in hexes per turn.',
    details: 'Speed determines how far a character can move in a single turn. Some abilities may modify speed or provide dash bonuses.',
    relatedRules: ['dash', 'movement']
  },
  {
    id: 'dash',
    keyword: 'Dash',
    category: 'combat',
    summary: 'Additional movement bonus that can be added to base speed.',
    details: 'Dash provides extra movement beyond base speed, often shown as a positive or negative modifier to speed.',
    relatedRules: ['speed', 'movement']
  },
  {
    id: 'size',
    keyword: 'Size',
    category: 'combat',
    summary: 'Physical dimensions of creatures affecting space occupation and interactions.',
    details: 'Size determines how much space a creature occupies and affects various combat interactions like grappling and positioning.',
    relatedRules: ['grab', 'shove']
  },
  {
    id: 'grab',
    keyword: 'Grab',
    category: 'combat',
    summary: 'Grappling mechanic to restrain or control opponents.',
    details: 'Grab allows characters to attempt to grapple opponents. Success depends on the grab modifier and opposed rolls.',
    relatedRules: ['size', 'shove']
  },
  {
    id: 'shove',
    keyword: 'Shove',
    category: 'combat',
    summary: 'Forced movement mechanic to push opponents.',
    details: 'Shove allows characters to attempt to push opponents a certain distance. The shove value indicates the strength of the push.',
    relatedRules: ['size', 'grab', 'movement']
  },
];

export const moreCombatRules: RuleDefinition[] = [
  // Combat Action Rules
  {
    id: 'action',
    keyword: 'Action',
    category: 'combat',
    summary: 'A major activity a character can perform during their turn.',
    details: 'You can perform one Action per turn. Actions include attacks, special abilities, and other significant activities.',
    relatedRules: ['maneuver', 'turn-order']
  },
  {
    id: 'maneuver',
    keyword: 'Maneuver',
    category: 'combat',
    summary: 'A movement or positioning activity a character can perform during their turn.',
    details: 'You can perform one Maneuver per turn. Maneuvers include movement, stance changes, and positioning activities.',
    relatedRules: ['action', 'movement-points', 'turn-order']
  },
  {
    id: 'attack',
    keyword: 'Attack',
    category: 'combat',
    summary: 'An offensive action that targets enemies with weapons or abilities.',
    details: 'Make an attack check by rolling 3d6. You deal damage based on your Success Rank and weapon damage values.',
    relatedRules: ['hit-check', 'damage', 'success-ranks']
  },
  {
    id: 'hit-check',
    keyword: 'Hit Check',
    category: 'combat',
    summary: 'The roll made to determine if an attack successfully hits its target.',
    details: 'Roll 3d6 and add relevant modifiers. Compare against target\'s defenses or difficulty to determine Success Rank.',
    relatedRules: ['attack', 'success-ranks', 'dice-mechanics']
  },
  {
    id: 'maneuver-points',
    keyword: 'Maneuver Points',
    category: 'combat',
    summary: 'Points spent to move around the battlefield during your turn.',
    details: 'You gain Maneuver Points equal to your Move Speed. Spend these points to move hexes or perform movement-related activities.',
    relatedRules: ['speed', 'maneuver', 'move-speed']
  },
  {
    id: 'speed',
    keyword: 'Speed',
    category: 'combat',
    summary: 'The number of Maneuver Points you gain each turn.',
    details: 'Your Speed determines how many Maneuver Points you receive, which you can spend to move around the battlefield.',
    relatedRules: ['maneuver-points', 'speed']
  },
  {
    id: 'turn-order',
    keyword: 'Turn Order',
    category: 'combat',
    summary: 'The sequence in which characters act during combat.',
    details: 'Players go first unless surprised. Players choose which character acts, then GM chooses enemies to act, alternating until all have acted.',
    relatedRules: ['action', 'maneuver', 'initiative']
  },
  {
    id: 'initiative',
    keyword: 'Initiative',
    category: 'combat',
    summary: 'Determines who acts first in combat.',
    details: 'Players go first unless surprised or fighting against a foe that circumvents this rule.',
    relatedRules: ['turn-order']
  },
  {
    id: 'facing',
    keyword: 'Facing',
    category: 'combat',
    summary: 'The direction a character is looking, determining their arc coverage.',
    details: 'Characters have Front Arc (3 hexes), Peripheral Arcs (2 hexes each side), and Rear Arc (1 hex behind).',
    relatedRules: ['front-arc', 'peripheral-arc', 'rear-arc']
  },
  {
    id: 'front-arc',
    keyword: 'Front Arc',
    category: 'combat',
    summary: 'The three hexes directly in front of a character.',
    details: 'Your Front Arc provides the best position for attacks and defense.',
    relatedRules: ['facing', 'peripheral-arc', 'rear-arc']
  },
  {
    id: 'peripheral-arc',
    keyword: 'Peripheral Arc',
    category: 'combat',
    summary: 'The two hexes to either side of your Front Arc (Left and Right Peripheral Arcs).',
    details: 'Attacks from Peripheral Arcs get +1 to Hit Checks and Damage against you.',
    relatedRules: ['facing', 'front-arc', 'rear-arc']
  },
  {
    id: 'rear-arc',
    keyword: 'Rear Arc',
    category: 'combat',
    summary: 'The hex directly behind a character.',
    details: 'Attacks from your Rear Arc get +3 to Hit Checks and +1 to Damage against you.',
    relatedRules: ['facing', 'front-arc', 'peripheral-arc']
  },
  {
    id: 'opportunity-strike',
    keyword: 'Opportunity Strike',
    category: 'combat',
    summary: 'A free attack when enemies move within your threat range.',
    details: 'When you move within Adjacent Range of a creature\'s Front Arc or Peripheral Arc, they can make a free attack against you.',
    relatedRules: ['adjacent-range', 'facing']
  },
  {
    id: 'adjacent-range',
    keyword: 'Adjacent Range',
    category: 'combat',
    summary: 'Directly next to a character, within 1 hex.',
    details: 'Adjacent Range is the closest distance for melee attacks and many special abilities.',
    relatedRules: ['range', 'short-range', 'medium-range', 'long-range']
  },
  {
    id: 'short-range',
    keyword: 'Short Range',
    category: 'combat',
    summary: 'Combat range of 1-3 hexes.',
    details: 'Short Range covers nearby targets and is common for thrown weapons and some abilities.',
    relatedRules: ['range', 'adjacent-range', 'medium-range', 'long-range']
  },
  {
    id: 'medium-range',
    keyword: 'Medium Range',
    category: 'combat',
    summary: 'Combat range of 4-8 hexes.',
    details: 'Medium Range is typical for firearms and ranged weapons.',
    relatedRules: ['range', 'short-range', 'long-range']
  },
  {
    id: 'long-range',
    keyword: 'Long Range',
    category: 'combat',
    summary: 'Combat range of 9-12 hexes.',
    details: 'Long Range represents the maximum effective range for most ranged weapons.',
    relatedRules: ['range', 'medium-range', 'extreme-range']
  },
  {
    id: 'extreme-range',
    keyword: 'Extreme Range',
    category: 'combat',
    summary: 'Combat range beyond 12 hexes, in 3-hex increments.',
    details: 'Shooting at Extreme Range gets -3 per range increment beyond Long Range maximum.',
    relatedRules: ['range', 'long-range']
  },
  {
    id: 'charge',
    keyword: 'Charge',
    category: 'combat',
    summary: 'Move and attack in one action for extra damage.',
    details: 'Move up to your Move Speed. If you move at least 3 hexes, you may make a Melee Attack with +2 Damage.',
    relatedRules: ['action', 'move-speed', 'melee-attack']
  },
  {
    id: 'covering-fire',
    keyword: 'Covering Fire',
    category: 'combat',
    summary: 'Suppress enemies to hinder their attacks.',
    details: 'Choose a 2 hex cone in your front arc. On Rank 2+ Success, enemies in that cone get -2 to Hit Checks until your next turn.',
    relatedRules: ['action', 'front-arc', 'hit-check']
  },
  {
    id: 'overwatch',
    keyword: 'Overwatch',
    category: 'combat',
    summary: 'Watch an area and attack enemies who enter it.',
    details: 'Select a 2-hex arc cone in your Front Arc to "Watch". When a creature enters, you can attack with +2 to Hit Check.',
    relatedRules: ['action', 'front-arc', 'hit-check']
  },
  {
    id: 'study-target',
    keyword: 'Study Target',
    category: 'combat',
    summary: 'Learn information about an enemy.',
    details: 'Make an Observation Skill Check to learn resistances, health, attacks, or special abilities of a target.',
    relatedRules: ['action', 'skill-checks', 'tiers']
  },
  {
    id: 'melee-attack',
    keyword: 'Melee Attack',
    category: 'combat',
    summary: 'Close-range attack with melee weapons.',
    details: 'Attacks made with melee weapons at Adjacent Range or Short Range.',
    relatedRules: ['attack', 'adjacent-range', 'weapons']
  },
  {
    id: 'shooting-attack',
    keyword: 'Shooting Attack',
    category: 'combat',
    summary: 'Ranged attack with firearms or projectile weapons.',
    details: 'Attacks made with shooting weapons at various ranges.',
    relatedRules: ['attack', 'range', 'weapons']
  },
  {
    id: 'arcane-attack',
    keyword: 'Arcane Attack',
    category: 'combat',
    summary: 'Magical attack using arcane weapons or spells.',
    details: 'Attacks made with arcane weapons or magical abilities.',
    relatedRules: ['attack', 'magic', 'weapons']
  },
  {
    id: 'weakness',
    keyword: 'Weakness',
    category: 'combat',
    summary: 'Increased vulnerability to specific damage types.',
    details: 'Weakness increases damage taken of the listed type by the specified amount.',
    examples: ['Weak Fire 2 means +2 damage from Fire attacks'],
    relatedRules: ['damage-types', 'resistance', 'absorb']
  },
  {
    id: 'resistance',
    keyword: 'Resistance',
    category: 'combat',
    summary: 'Reduced damage from specific damage types.',
    details: 'Resistance reduces damage taken of the listed type by the specified amount (minimum 0).',
    examples: ['Resist Metal 3 means -3 damage from Metal attacks'],
    relatedRules: ['damage-types', 'weakness', 'absorb']
  },
  {
    id: 'absorb',
    keyword: 'Absorb',
    category: 'combat',
    summary: 'Converts damage into healing.',
    details: 'Absorb converts damage of the listed type into healing instead.',
    examples: ['Absorb Fire 2 means Fire damage heals you for the amount instead'],
    relatedRules: ['damage-types', 'weakness', 'resistance']
  },
  {
    id: 'injuries',
    keyword: 'Injuries',
    category: 'combat',
    summary: 'Persistent negative effects from reaching 0 health.',
    details: 'When players reach 0 health, they gain Injuries instead of dying. Injuries provide ongoing penalties.',
    relatedRules: ['health', 'damage']
  },

  // Movement and Positioning Rules
  {
    id: 'movement',
    keyword: 'Movement',
    category: 'combat',
    summary: 'Changing position on the battlefield.',
    details: 'Spend Maneuver Points to move hexes or perform movement-related activities like climbing or diving.',
    relatedRules: ['maneuver-points', 'maneuver']
  },
  {
    id: 'prone',
    keyword: 'Prone',
    category: 'combat',
    summary: 'Lying down position affecting movement and targeting.',
    details: 'Prone characters have limited movement options and different combat modifiers.',
    relatedRules: ['movement', 'stand-up']
  },
  {
    id: 'stand-up',
    keyword: 'Stand Up',
    category: 'combat',
    summary: 'Change from Prone to Standing position.',
    details: 'Costs 3 Maneuver Points to swap from Prone to Standing.',
    relatedRules: ['prone', 'maneuver-points']
  },
];

// Creature Rules
export const creatureRules: RuleDefinition[] = [
  {
    id: 'tiers',
    keyword: 'Tiers',
    category: 'creatures',
    summary: 'Power levels for enemies: Minion, Hellspawn, Tormentor, Archfiend, Lord, Overlord.',
    details: 'Enemy tiers indicate relative power and threat level. Archfiends should be challenging battles, while Lords and Overlords are virtually unbeatable.',
    examples: [
      'Minion: Basic enemies',
      'Hellspawn: Standard threats', 
      'Tormentor: Dangerous foes',
      'Archfiend: Major boss battles',
      'Lord: Extremely powerful entities',
      'Overlord: Near-godlike beings'
    ]
  },
  {
    id: 'sinners',
    keyword: 'Sinners',
    category: 'creatures',
    summary: 'Damned souls compelled to eternal punishment, usually passive but can become aggressive if interrupted.',
    details: 'Sinners are often thought to be the damned, compelled to eternal punishment for their sins. They are default passive and often willing to help, though their compelled punishment often leads them to be incapable of providing much help beyond information. Should a sinner be prevented from completing its task, it will become extremely aggressive towards the ones who interrupt.',
    relatedRules: ['creatures']
  },
];

// Equipment Rules
export const equipmentRules: RuleDefinition[] = [
  {
    id: 'weapons',
    keyword: 'Weapons',
    category: 'equipment',
    summary: 'Combat implements with various damage types, ranges, and special properties.',
    details: 'Weapons deal damage and may have special tags that modify their behavior or provide additional effects.',
    relatedRules: ['damage', 'tags', 'weapon-tags']
  },
  {
    id: 'tags',
    keyword: 'Tags',
    category: 'equipment',
    summary: 'Special properties that modify how equipment or abilities function.',
    details: 'Tags provide special rules, restrictions, or bonuses to items, abilities, or creatures. They define unique behaviors and interactions.',
    relatedRules: ['weapon-tags', 'creature-tags']
  },
];

export const statusEffectRules: RuleDefinition[] = 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(StatusEffects).map(([_, effect]) => (
    convertStatusEffectToRuleDefinition(effect)
  ));

// Centralized rules database
export const RULES_DATABASE: RuleDefinition[] = [
  ...generalRules,
  ...combatRules,
  ...moreCombatRules,
  ...creatureRules,
  ...equipmentRules,
  ...statusEffectRules,  
];

// Helper functions for rule management
export class RulesManager {
  static getRuleById(id: string): RuleDefinition | undefined {
    return RULES_DATABASE.find(rule => rule.id === id);
  }

  static getRuleByKeyword(keyword: string): RuleDefinition | undefined {
    return RULES_DATABASE.find(rule => 
      rule.keyword.toLowerCase() === keyword.toLowerCase()
    );
  }

  static getRulesByCategory(category: string): RuleDefinition[] {
    return RULES_DATABASE.filter(rule => rule.category === category);
  }

  static searchRules(searchTerm: string): RuleDefinition[] {
    const term = searchTerm.toLowerCase();
    return RULES_DATABASE.filter(rule =>
      rule.keyword.toLowerCase().includes(term) ||
      rule.summary.toLowerCase().includes(term) ||
      (rule.details && rule.details.toLowerCase().includes(term))
    );
  }

  static getRelatedRules(ruleId: string): RuleDefinition[] {
    const rule = this.getRuleById(ruleId);
    if (!rule || !rule.relatedRules) return [];
    
    return rule.relatedRules
      .map(id => this.getRuleById(id))
      .filter((rule): rule is RuleDefinition => rule !== undefined);
  }
}
