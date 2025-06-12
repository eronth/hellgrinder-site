import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: FontAwesomeIconProps['icon'];
  headerText: string;
  headerClassName?: string;
  children?: React.ReactNode;
};
export default function Panel({
  icon,
  headerText,
  headerClassName,
  children
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const expandedCss = isExpanded ? 'expanded' : 'collapsed';
  return (
    <div className={`floating-panel ${expandedCss}`}>

      {/* Header with icon and text, clickable to toggle expansion */}
      <div 
        className={`panel-header ${headerClassName}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FontAwesomeIcon icon={icon} className="header-icon" />
        <span className="header-text">
          {headerText}
        </span>
        <FontAwesomeIcon 
          icon={isExpanded ? faChevronDown : faChevronRight
          } 
          className="header-expand-arrow" 
        />
      </div>

      {/* Content that expands/collapses */}
      {isExpanded && (
        <div className="panel-content">
          {children}
        </div>
      )}
    </div>
  );
}