import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './ConfirmDialog.css';

interface ConfirmDialogButton {
  text: string;
  onClick: () => void;
  variant?: 'danger' | 'primary' | 'secondary';
  icon?: string;
  autoFocus?: boolean;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttons: ConfirmDialogButton[];
  children?: React.ReactNode;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  title,
  message,
  buttons,
  children
}: ConfirmDialogProps) {
  
  // Determine if dialog should be wider based on content
  const needsWideLayout = buttons.length > 2 || 
    buttons.some(button => button.text.length > 12) ||
    message.length > 100;
  
  // Handle escape key
  React.useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClose) { onClose(); }
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when dialog is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={onClose}>
      <div className={`confirm-dialog ${needsWideLayout ? 'wide' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h3 className="title">{title}</h3>
          <button 
            className="close" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="body">
          <p className="message">{message}</p>
          {children}
        </div>
        
        <div className="action-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`button ${button.variant || 'secondary'}`}
              onClick={button.onClick}
              autoFocus={button.autoFocus}
            >
              {button.icon && <span className="button-icon">{button.icon}</span>}
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
