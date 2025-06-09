// Types for the rules system
export interface RuleDefinition {
  id: string;
  keyword: string;
  category: 'combat' | 'character' | 'equipment' | 'magic' | 'general' | 'creatures'
    | 'status-effects';
  summary: string;
  details?: string;
  examples?: string[] | React.ReactNode[]; // Can be strings or React nodes for rich content
  exampleNameOverride?: string; // Optional override for what the "Example" header will display.
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
