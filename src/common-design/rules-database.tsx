import { RuleDefinition, RuleCategory } from '../ts-types/rule-types';

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
    id: 'general',
    name: 'General',
    description: 'Core game mechanics and general rules'
  }
];

// Centralized rules database
export const RULES_DATABASE: RuleDefinition[] = [
  // General Rules
  {
    id: 'heroic-medals',
    keyword: 'Heroic Medals',
    category: 'general',
    summary: 'Currency earned throughout the game that can be spent to create Heroic Moments and boost actions.',
    details: 'Heroic Medals are earned throughout the game and can be spent to create Heroic Moments whereupon an action is boosted. Sometimes you may earn specialized Medals, which can be used as Heroic Medals or for a perk described by that medal type.',
    examples: [
      'Spend 1 Heroic Medal: Change the result of one dice up or down by 1',
      'Spend 3 Heroic Medal: Set the value of any dice',
      'Spend 1 Heroic Medal: Call reinforcement (cost increases each use)',
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

  // Combat Rules
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

  // Creature Rules
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

  // Equipment Rules
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

  // Status Effects Rules
  {
    id: 'afferlized',
    keyword: 'Afferlized',
    category: 'general',
    summary: 'Your skin hardens and shines with a brilliant light — you have become afferlized. You are immune to all damage, but you cannot take any actions.',
  },
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
