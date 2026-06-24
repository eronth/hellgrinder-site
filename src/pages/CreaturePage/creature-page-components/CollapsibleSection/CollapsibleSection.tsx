import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './CollapsibleSection.css';

type Props = {
  title: string;
  isOpenByDefault?: boolean;
  children: React.ReactNode;
  description?: string;
  className?: string;
  variant?: 'default' | 'faction-examples' | 'rot-host' | 'zephpter-swarm';
  storageKey?: string;
};

export default function CollapsibleSection({ title, isOpenByDefault = false, children, description, className, variant = 'default', storageKey }: Props) {
  const [isOpen, setIsOpen] = useState(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) return stored === 'true';
    }
    return isOpenByDefault;
  });

  const toggleOpen = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (storageKey) localStorage.setItem(storageKey, String(next));
  };

  return (
    <div className={`collapsible-section ${className || ''}`} data-variant={variant}>
      <div className="collapsible-header" onClick={toggleOpen}>
        <div className="header-content">
          <h3 className="section-title">{title}</h3>
          {description && (
            <p className="section-description">{description}</p>
          )}
        </div>
        <div className="toggle-icon">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`chevron ${isOpen ? 'open' : 'closed'}`}
          />
        </div>
      </div>
      
      <div className={`collapsible-content ${isOpen ? 'open' : 'closed'}`}>
        <div className="content-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
