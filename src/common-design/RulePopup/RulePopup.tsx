import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { RuleDefinition } from '../../ts-types/rule-types';
import { RulesManager } from '../rules-database';
import { formatReactNode } from '../utils/StatusEffectsUtils';
import './RulePopup.css';

interface Props {
  ruleId?: string;
  keyword?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // Status effect specific props
  statusEffectX?: number | 'X';
  statusEffectY?: number | 'Y';
}

interface PopupPosition {
  top: number;
  left: number;
  preferredPosition: 'top' | 'bottom' | 'left' | 'right';
}

export default function RulePopup({ 
  ruleId, 
  keyword, 
  children, 
  className = '',
  disabled = false,
  statusEffectX,
  statusEffectY
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<PopupPosition>({ top: 0, left: 0, preferredPosition: 'top' });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [needRuleDisplay, setNeedRuleDisplay] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get the rule definition
  const rule: RuleDefinition | undefined = ruleId 
    ? RulesManager.getRuleById(ruleId)
    : keyword 
    ? RulesManager.getRuleByKeyword(keyword)
    : undefined;
  
  useEffect(() => {
    setNeedRuleDisplay(!(!rule || disabled));
  }, [ruleId, keyword, disabled, rule]);

  const calculatePosition = (): PopupPosition => {
    if (!triggerRef.current) {
      return { top: 0, left: 0, preferredPosition: 'top' };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Use estimated popup dimensions if popup isn't rendered yet
    const popupWidth = popupRef.current?.getBoundingClientRect().width || 300;
    const popupHeight = popupRef.current?.getBoundingClientRect().height || 200;

    let top = 0;
    let left = 0;
    let preferredPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

    // Try positioning above first
    if (triggerRect.top - popupHeight - 10 > 0) {
      top = triggerRect.top - popupHeight - 10;
      preferredPosition = 'top';
    } 
    // Otherwise position below
    else if (triggerRect.bottom + popupHeight + 10 < viewportHeight) {
      top = triggerRect.bottom + 10;
      preferredPosition = 'bottom';
    }
    // Fallback to bottom if it doesn't fit above
    else {
      top = triggerRect.bottom + 10;
      preferredPosition = 'bottom';
    }

    // Center horizontally relative to trigger
    left = triggerRect.left + (triggerRect.width / 2) - (popupWidth / 2);

    // Ensure popup doesn't go off screen horizontally
    if (left < 10) {
      left = 10;
    } else if (left + popupWidth > viewportWidth - 10) {
      left = viewportWidth - popupWidth - 10;
    }

    return { top, left, preferredPosition };
  };

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsVisible(true);
  };
  
  const handleMouseLeave = () => {
    // Delay closing by 300ms to allow user to mouse onto popup
    closeTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const newPosition = calculatePosition();
      setPosition(newPosition);
      
      // Recalculate after a short delay to get accurate popup dimensions
      const timeout = setTimeout(() => {
        if (popupRef.current) {
          const updatedPosition = calculatePosition();
          setPosition(updatedPosition);
        }
      }, 10);
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  // Add scroll listener to hide popup when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isVisible]);

  const relatedRules = needRuleDisplay ? RulesManager.getRelatedRules(rule!.id) : [];

  // Check if this is a status effect and we have X/Y values to display
  const isStatusEffect = needRuleDisplay ? rule!.category === 'status-effects' : false;
  const hasStatusEffectValues = statusEffectX !== undefined || statusEffectY !== undefined;

  const createDisplay = (rule: RuleDefinition) => {
    return (
      <div
        ref={popupRef}
        className={`rule-popup rule-popup-${position.preferredPosition} ${isStatusEffect ? ' status-effect' : ''}`}
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 1000
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="rule-popup-header">
          <h4 className="rule-title">{
            rule.fullname 
            ? formatReactNode(rule.fullname, { x: statusEffectX, y: statusEffectY }) 
            : rule.keyword
          }</h4>
          <span className="rule-category">{rule.category}</span>
        </div>
        
        <div className="rule-summary">
          {(isStatusEffect && hasStatusEffectValues) 
          ? formatReactNode(rule.summary, { x: statusEffectX, y: statusEffectY })
          : rule.summary}
        </div>
        
        {rule?.details && (
          <div className="rule-details">
            {(isStatusEffect && hasStatusEffectValues)
            ? formatReactNode(rule.details, { x: statusEffectX, y: statusEffectY })
            : rule.details}
          </div>
        )}

        {rule.examples && rule.examples.length > 0 && (
          <div className="rule-examples">
            <strong>
              {rule.exampleNameOverride || 'Examples:'}
            </strong>
            <ul>
              {rule.examples.map((example, index) => (
                <li key={index}>{formatReactNode(example, { x: statusEffectX, y: statusEffectY })}</li>
              ))}
            </ul>
          </div>
        )}
        
        {relatedRules.length > 0 && (
          <div className="rule-related">
            <strong>Related:</strong>
            <span className="related-rules">
              {relatedRules.map((relatedRule, index) => (
                <span key={relatedRule.id}>
                  {index > 0 && ', '}
                  <RulePopup ruleId={relatedRule.id}>
                    <span className="related-rule-link">{relatedRule.keyword}</span>
                  </RulePopup>
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
    );
  }

  const ruleElement = (
    needRuleDisplay
    ? createDisplay(rule!)
    : null
  );

  return (<>
    {
      needRuleDisplay
      ? <span
        ref={triggerRef}
        className={`rule-keyword ${className} ${isStatusEffect ? 'status-effect' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={rule!.summary} // Fallback for accessibility
      >
        {children}
      </span>
      : <span className={className}>{children}</span>
    }

    {needRuleDisplay && isVisible && createPortal(ruleElement, document.body)}
  </>);
}
