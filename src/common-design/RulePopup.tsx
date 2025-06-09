import React, { useState, useRef, useEffect } from 'react';
import { RuleDefinition } from '../ts-types/rule-types';
import { RulesManager } from './rules-database';

interface RulePopupProps {
  ruleId?: string;
  keyword?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
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
  disabled = false 
}: RulePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<PopupPosition>({ top: 0, left: 0, preferredPosition: 'top' });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Get the rule definition
  const rule: RuleDefinition | undefined = ruleId 
    ? RulesManager.getRuleById(ruleId)
    : keyword 
    ? RulesManager.getRuleByKeyword(keyword)
    : undefined;

  // Don't render if no rule found or disabled
  if (!rule || disabled) {
    return <span className={className}>{children}</span>;
  }

  const calculatePosition = (): PopupPosition => {
    if (!triggerRef.current || !popupRef.current) {
      return { top: 0, left: 0, preferredPosition: 'top' };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let top = 0;
    let left = 0;
    let preferredPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

    // Try positioning above first
    if (triggerRect.top - popupRect.height - 10 > 0) {
      top = triggerRect.top + scrollY - popupRect.height - 10;
      preferredPosition = 'top';
    } 
    // Otherwise position below
    else if (triggerRect.bottom + popupRect.height + 10 < viewportHeight) {
      top = triggerRect.bottom + scrollY + 10;
      preferredPosition = 'bottom';
    }
    // Fallback to bottom if it doesn't fit above
    else {
      top = triggerRect.bottom + scrollY + 10;
      preferredPosition = 'bottom';
    }

    // Center horizontally relative to trigger
    left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popupRect.width / 2);

    // Ensure popup doesn't go off screen horizontally
    if (left < 10) {
      left = 10;
    } else if (left + popupRect.width > viewportWidth - 10) {
      left = viewportWidth - popupRect.width - 10;
    }

    return { top, left, preferredPosition };
  };

  const handleMouseEnter = () => { setIsVisible(true); };
  const handleMouseLeave = () => { setIsVisible(false); };

  useEffect(() => {
    if (isVisible && triggerRef.current && popupRef.current) {
      const newPosition = calculatePosition();
      setPosition(newPosition);
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

  const relatedRules = RulesManager.getRelatedRules(rule.id);

  const ruleElement = (
    <div
      ref={popupRef}
      className={`rule-popup rule-popup-${position.preferredPosition}`}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="rule-popup-header">
        <h4 className="rule-title">{rule.keyword}</h4>
        <span className="rule-category">{rule.category}</span>
      </div>
      
      <div className="rule-summary">
        {rule.summary}
      </div>
      
      {rule.details && (
        <div className="rule-details">
          {rule.details}
        </div>
      )}
      
      {rule.examples && rule.examples.length > 0 && (
        <div className="rule-examples">
          <strong>
            {rule.exampleNameOverride || 'Examples:'}
          </strong>
          <ul>
            {rule.examples.map((example, index) => (
              <li key={index}>{example}</li>
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

  return (<>
    <span
      ref={triggerRef}
      className={`rule-keyword ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={rule.summary} // Fallback for accessibility
    >
      {children}
    </span>
    {isVisible && (<>{ruleElement}</>)}
  </>);
}
