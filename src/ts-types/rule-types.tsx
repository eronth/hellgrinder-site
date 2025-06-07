// Types for the rules system
export interface RuleDefinition {
  id: string;
  keyword: string;
  category: 'combat' | 'character' | 'equipment' | 'magic' | 'general' | 'creatures';
  summary: string;
  details?: string;
  examples?: string[];
  relatedRules?: string[]; // IDs of related rules
}

export interface RuleCategory {
  id: string;
  name: string;
  description: string;
}

// Type for components that can display rules
export interface RuleDisplayProps {
  ruleId: string;
  showDetails?: boolean;
  inline?: boolean;
}
