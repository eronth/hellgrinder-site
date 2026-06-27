import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Kit } from '../../../../../../ts-types/types';
import { CharacterDesign } from '../../../../../../ts-types/player-character-types';
import KitComponent from '../../../kits/Kit';
import CharacterGeneratorTools from '../../../../../../utils/characterGeneratorTools';
import KitSelectModal from './KitSelectModal';
import './KitSlot.css';

type KitType = 'combat' | 'support';

type Props = {
  kitType: KitType;
  kit: Kit | null;
  character: CharacterDesign;
  onSetKit: (kit: Kit) => void;
};

export default function KitSlot({ kitType, kit, character, onSetKit }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [locked, setLocked] = React.useState(false);

  const allKits = kitType === 'combat'
    ? CharacterGeneratorTools.getAllCombatKits()
    : CharacterGeneratorTools.getAllSupportKits();

  const usedKitNames = character.kits
    .filter(k => k.name !== kit?.name)
    .map(k => k.name);

  const label = kitType === 'combat' ? 'Combat Kit' : 'Support Kit';

  function handleRandomize() {
    const newKit = kitType === 'combat'
      ? CharacterGeneratorTools.randomizeCombatKit(usedKitNames).kit
      : CharacterGeneratorTools.randomizeSupportKit(usedKitNames);
    onSetKit(newKit);
    setLocked(false);
  }

  function handleModalConfirm(selectedKit: Kit) {
    const newKit = CharacterGeneratorTools.selectKit(selectedKit.name, allKits);
    if (newKit) onSetKit(newKit);
    setModalOpen(false);
    setLocked(false);
  }

  return (
    <>
      {modalOpen && (
        <KitSelectModal
          title={`Select ${label}`}
          kits={allKits}
          disabledKitNames={usedKitNames}
          currentKitName={kit?.name}
          onConfirm={handleModalConfirm}
          onCancel={() => setModalOpen(false)}
        />
      )}

      {!kit ? (
        <div className="kit-slot-placeholder">
          <div className="kit-slot-placeholder-title">{label}</div>
          <p className="kit-slot-placeholder-hint">Choose how to fill this kit slot.</p>
          <div className="kit-slot-placeholder-buttons">
            <button className="kit-randomize-btn" onClick={handleRandomize}>
              Randomize {label}
            </button>
            <button className="kit-select-btn" onClick={() => setModalOpen(true)}>
              Select {label}
            </button>
          </div>
        </div>
      ) : (
        <div className="kit-slot-assigned">
          <div className="kit-change-controls">
            <button
              className="kit-reroll-btn"
              onClick={handleRandomize}
              disabled={locked}
            >
              ↺ Re-randomize
            </button>
            <button
              className="kit-change-btn"
              onClick={() => setModalOpen(true)}
              disabled={locked}
            >
              Change {label}
            </button>
            <button
              className={`kit-lock-btn ${locked ? 'locked' : 'unlocked'}`}
              onClick={() => setLocked(v => !v)}
              title={locked ? 'Unlock to change' : 'Lock kit'}
            >
              <FontAwesomeIcon icon={locked ? faLock : faLockOpen} />
            </button>
          </div>
          <KitComponent kit={kit} />
        </div>
      )}
    </>
  );
}
