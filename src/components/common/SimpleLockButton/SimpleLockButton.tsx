import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import './SimpleLockButton.css';

type Props = {
  locked: boolean;
  onToggle: () => void;
  disabled?: boolean;
  lockedTitle?: string;
  unlockedTitle?: string;
  className?: string;
};

export default function SimpleLockButton({
  locked,
  onToggle,
  disabled,
  lockedTitle = 'Unlock',
  unlockedTitle = 'Lock',
  className = '',
}: Props) {
  return (
    <button
      className={`simple-lock-btn ${locked ? 'locked' : ''} ${className}`.trim()}
      onClick={onToggle}
      disabled={disabled}
      title={locked ? lockedTitle : unlockedTitle}
    >
      <FontAwesomeIcon icon={locked ? faLock : faLockOpen} />
    </button>
  );
}
