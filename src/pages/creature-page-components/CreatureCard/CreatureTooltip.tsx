import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  explanation: string;
  className?: string;
  isDiv?: boolean;
};

interface TooltipPosition {
  top: number;
  left: number;
  preferredPosition: 'top' | 'bottom';
};

export default function CreatureTooltip({ 
  children, 
  explanation, 
  className = '',
  isDiv = false
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0, preferredPosition: 'top' });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = (): TooltipPosition => {
    if (!triggerRef.current) {
      return { top: 0, left: 0, preferredPosition: 'top' };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Use estimated tooltip dimensions if tooltip isn't rendered yet
    const tooltipWidth = tooltipRef.current?.getBoundingClientRect().width || 250;
    const tooltipHeight = tooltipRef.current?.getBoundingClientRect().height || 60;

    let top = 0;
    let left = 0;
    let preferredPosition: 'top' | 'bottom' = 'top';

    // Try positioning above first
    if (triggerRect.top - tooltipHeight - 10 > 0) {
      top = triggerRect.top - tooltipHeight - 10;
      preferredPosition = 'top';
    } 
    // Otherwise position below
    else {
      top = triggerRect.bottom + 10;
      preferredPosition = 'bottom';
    }

    // Center horizontally relative to trigger
    left = triggerRect.left + (triggerRect.width / 2) - (tooltipWidth / 2);

    // Ensure tooltip doesn't go off screen horizontally
    if (left < 10) {
      left = 10;
    } else if (left + tooltipWidth > viewportWidth - 10) {
      left = viewportWidth - tooltipWidth - 10;
    }

    return { top, left, preferredPosition };
  };

  const handleMouseEnter = () => { setIsVisible(true); };
  const handleMouseLeave = () => { setIsVisible(false); };

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const newPosition = calculatePosition();
      setPosition(newPosition);
      
      // Recalculate after a short delay to get accurate tooltip dimensions
      const timeout = setTimeout(() => {
        if (tooltipRef.current) {
          const updatedPosition = calculatePosition();
          setPosition(updatedPosition);
        }
      }, 10);
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  // Add scroll listener to hide tooltip when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isVisible]);

  const tooltipElement = (
    <div
      ref={tooltipRef}
      className={`creature-tooltip creature-tooltip-${position.preferredPosition}`}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={handleMouseLeave}
    >
      {explanation}
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className={`creature-tooltip-trigger ${className} ${isDiv ? 'as-div' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {isVisible && createPortal(tooltipElement, document.body)}
    </>
  );
}