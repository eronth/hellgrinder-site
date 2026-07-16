import { RuleDefinition, RuleCategory } from '../ts-types/rule-types.tsx';
import StatusEffects from "./status-effects.tsx"
import { StatusEffect } from '../ts-types/types.tsx';

const convertStatusEffectToRuleDefinition = (statusEffect: StatusEffect): RuleDefinition => {
  const se = statusEffect;
  const nameToId = se.name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\[\[X\]\]/g, '')
    .replace(/\[\[Y\]\]/g, '')
    .replace(/--+/g, '-');
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
    id: 'safelight-shards',
    keyword: 'Safelight Shards',
    category: 'general',
    summary: 'Crystalline growths that grant strange resilience and healing.',
    details: 'Safelight Shards are often carried by individual soldiers to help them quickly heal from injuries.',
    relatedRules: ['safelight', 'skill-checks', 'recovery']
  }
];

export const moreCombatRules: RuleDefinition[] = [
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
];

// Equipment Rules
export const equipmentRules: RuleDefinition[] = [
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
  ...moreCombatRules,
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
