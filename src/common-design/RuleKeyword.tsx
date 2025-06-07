import React from 'react';
import RulePopup from './RulePopup';

interface RuleKeywordProps {
  keyword: string;
  ruleId?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
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
  disabled = false 
}: RuleKeywordProps) {
  return (
    <RulePopup 
      ruleId={ruleId} 
      keyword={!ruleId ? keyword : undefined}
      className={className}
      disabled={disabled}
    >
      {children || keyword}
    </RulePopup>
  );
}
