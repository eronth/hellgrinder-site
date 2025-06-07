import React from 'react';
import { RulesManager } from './rules-database';
import { RuleDisplayProps } from '../ts-types/rule-types';
import RuleKeyword from './RuleKeyword';

/**
 * Component for displaying rule content in How To Play sections.
 * This allows rules to be managed centrally but displayed in multiple places.
 */
export default function RuleDisplay({ 
  ruleId, 
  showDetails = true, 
  inline = false 
}: RuleDisplayProps) {
  const rule = RulesManager.getRuleById(ruleId);

  if (!rule) {
    console.warn(`Rule with ID "${ruleId}" not found`);
    return <span className="rule-not-found">Rule not found: {ruleId}</span>;
  }

  if (inline) {
    return (
      <span className="rule-inline">
        <RuleKeyword keyword={rule.keyword} ruleId={rule.id} />
      </span>
    );
  }

  const relatedRules = RulesManager.getRelatedRules(rule.id);

  return (
    <div className="rule-display">
      <h4 className="rule-display-title">
        <RuleKeyword keyword={rule.keyword} ruleId={rule.id} />
      </h4>
      
      <p className="rule-display-summary">
        {rule.summary}
      </p>
      
      {showDetails && rule.details && (
        <div className="rule-display-details">
          {rule.details}
        </div>
      )}
      
      {showDetails && rule.examples && rule.examples.length > 0 && (
        <div className="rule-display-examples">
          <strong>Examples:</strong>
          <ul>
            {rule.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}
      
      {showDetails && relatedRules.length > 0 && (
        <div className="rule-display-related">
          <strong>Related rules:</strong>
          {relatedRules.map((relatedRule, index) => (
            <span key={relatedRule.id}>
              {index > 0 && ', '}
              <RuleKeyword keyword={relatedRule.keyword} ruleId={relatedRule.id} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
