import React from 'react';
import './NotificationToast.css';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface Props {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export default function NotificationToast({ notifications, onDismiss }: Props) {
  React.useEffect(() => {
    const timers: number[] = [];

    notifications.forEach((notification) => {
      const duration = notification.duration || 5000;
      const timer = setTimeout(() => {
        onDismiss(notification.id);
      }, duration);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, onDismiss]);

  if (notifications.length === 0) return null;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            <span className="notification-icon">
              {getIcon(notification.type)}
            </span>
            <span className="notification-message">
              {notification.message}
            </span>
          </div>
          <button
            className="notification-close"
            onClick={() => onDismiss(notification.id)}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
