import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './CollapsibleSection.css';

type Props = {
  title: string;
  isOpenByDefault?: boolean;
  children: React.ReactNode;
  description?: string;
  className?: string;
};

export default function CollapsibleSection({ title, isOpenByDefault = false, children, description, className }: Props) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapsible-section ${className || ''}`}>
      <div className="collapsible-header" onClick={toggleOpen}>
        <div className="header-content">
          <h3 className="section-title">{title}</h3>
          {description && (
            <p className="section-description">{description}</p>
          )}
        </div>
        <div className="toggle-icon">
          <FontAwesomeIcon 
            icon={isOpen ? faChevronUp : faChevronDown} 
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
