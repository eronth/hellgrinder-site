import React from 'react';
import RulePopup from './RulePopup';

interface RuleKeywordProps {
  keyword: string;
  ruleId?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // Status effect specific props
  statusEffectX?: number;
  statusEffectY?: number;
}

/**
 * Convenience component for wrapping keywords with rule popups.
 * Uses the keyword to automatically find the rule if ruleId is not provided.
 */
export default function RuleKeyword({ 
  keyword, 
  ruleId, 
  children, 
  className = '',
  disabled = false,
  statusEffectX,
  statusEffectY
}: RuleKeywordProps) {
  return (
    <RulePopup 
      ruleId={ruleId} 
      keyword={!ruleId ? keyword : undefined}
      className={className}
      disabled={disabled}
      statusEffectX={statusEffectX}
      statusEffectY={statusEffectY}
    >
      {children || keyword}
    </RulePopup>
  );
}
