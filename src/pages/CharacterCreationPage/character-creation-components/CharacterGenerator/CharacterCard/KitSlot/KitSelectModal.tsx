import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Kit } from '../../../../../../ts-types/types';
import KitComponent from '../../../kits/Kit';
import './KitSelectModal.css';

type Props = {
  title: string;
  kits: Kit[];
  disabledKitNames: string[];
  currentKitName?: string;
  onConfirm: (kit: Kit) => void;
  onCancel: () => void;
};

export default function KitSelectModal({
  title,
  kits,
  disabledKitNames,
  currentKitName,
  onConfirm,
  onCancel,
}: Props) {
  const [selectedKitName, setSelectedKitName] = React.useState<string | null>(
    currentKitName ?? null
  );

  const selectedKit = kits.find(k => k.name === selectedKitName) ?? null;

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  function handleConfirm() {
    if (selectedKit) onConfirm(selectedKit);
  }

  return (
    <div className="kit-select-overlay" onClick={onCancel}>
      <div className="kit-select-modal" onClick={(e) => e.stopPropagation()}>

        <div className="kit-select-header">
          <h3 className="kit-select-title">{title}</h3>
          <button className="kit-select-close" onClick={onCancel} aria-label="Cancel">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="kit-select-body">
          <div className="kit-select-grid">
            {kits.map(kit => {
              const isDisabled = disabledKitNames.includes(kit.name);
              const isSelected = kit.name === selectedKitName;
              return (
                <div
                  key={kit.name}
                  className={`kit-select-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => !isDisabled && setSelectedKitName(kit.name)}
                  title={isDisabled ? 'Already in use' : undefined}
                >
                  {isSelected && <div className="kit-select-badge">Selected</div>}
                  <KitComponent kit={kit} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="kit-select-footer">
          <button className="kit-select-cancel" onClick={onCancel}>Cancel</button>
          <button
            className="kit-select-confirm"
            onClick={handleConfirm}
            disabled={!selectedKit}
          >
            {selectedKit ? `Use "${selectedKit.name}"` : 'Select a Kit'}
          </button>
        </div>

      </div>
    </div>
  );
}
