import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Kit, ChoiceTagOption, DamageElement } from '../../../../../../ts-types/types';
import { CharacterDesign } from '../../../../../../ts-types/player-character-types';
import KitComponent, { WeaponChoiceInteractions } from '../../../kits/Kit';
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
  // Per-weapon choice lock state, keyed by weapon name
  const [weaponLocks, setWeaponLocks] = React.useState<Record<string, boolean>>({});

  const allKits = kitType === 'combat'
    ? CharacterGeneratorTools.getAllCombatKits()
    : CharacterGeneratorTools.getAllSupportKits();

  const usedKitNames = character.kits
    .filter(k => k.name !== kit?.name)
    .map(k => k.name);

  const label = kitType === 'combat' ? 'Combat Kit' : 'Support Kit';

  // Derive the currently-selected choice tag for a weapon from its stored damage type.
  // If all attack modes still have 'Chosen Type', no choice has been made.
  function getWeaponSelectedTag(weapon: Kit['weapons'][number]): ChoiceTagOption | null {
    const type = weapon.attackModes[0]?.damage?.l?.type;
    return (type && type !== 'Chosen Type') ? type as ChoiceTagOption : null;
  }

  // Apply a damage-element choice to all 'Chosen Type' damage fields in a weapon.
  function applyWeaponChoice(weaponName: string, chosenTag: ChoiceTagOption) {
    if (!kit) return;
    const updatedKit = structuredClone(kit);
    const weapon = updatedKit.weapons.find(w => w.name === weaponName);
    if (!weapon) return;
    weapon.attackModes.forEach(mode => {
      (['l', 'm', 'h'] as const).forEach(tier => {
        if (mode.damage[tier].type === 'Chosen Type') {
          mode.damage[tier].type = chosenTag as DamageElement;
        }
      });
    });
    onSetKit(updatedKit);
  }

  function randomizeWeaponChoice(weaponName: string, options: ChoiceTagOption[]) {
    const chosen = options[Math.floor(Math.random() * options.length)];
    applyWeaponChoice(weaponName, chosen);
  }

  function resetWeaponChoice(weaponName: string) {
    if (!kit) return;
    const updatedKit = structuredClone(kit);
    const weapon = updatedKit.weapons.find(w => w.name === weaponName);
    if (!weapon) return;
    weapon.attackModes.forEach(mode => {
      (['l', 'm', 'h'] as const).forEach(tier => {
        mode.damage[tier].type = 'Chosen Type';
      });
    });
    onSetKit(updatedKit);
    setWeaponLocks(prev => ({ ...prev, [weaponName]: false }));
  }

  // Build interaction objects for every weapon in the kit that has choiceTags.
  const weaponChoiceInteractions: WeaponChoiceInteractions = {};
  if (kit) {
    kit.weapons.forEach(weapon => {
      if (!weapon.choiceTags) return;
      const wName = weapon.name;
      weaponChoiceInteractions[wName] = {
        selectedTag: getWeaponSelectedTag(weapon),
        locked: weaponLocks[wName] ?? false,
        onSelect: (tag) => applyWeaponChoice(wName, tag),
        onRandomize: () => randomizeWeaponChoice(wName, weapon.choiceTags!.tags),
        onToggleLock: () => setWeaponLocks(prev => ({ ...prev, [wName]: !prev[wName] })),
        onReset: () => resetWeaponChoice(wName),
      };
    });
  }

  function handleRandomize() {
    const newKit = kitType === 'combat'
      ? CharacterGeneratorTools.randomizeCombatKit(usedKitNames).kit
      : CharacterGeneratorTools.randomizeSupportKit(usedKitNames);
    onSetKit(newKit);
    setLocked(false);
    setWeaponLocks({});
  }

  function handleModalConfirm(selectedKit: Kit) {
    const newKit = CharacterGeneratorTools.selectKit(selectedKit.name, allKits);
    if (newKit) onSetKit(newKit);
    setModalOpen(false);
    setLocked(false);
    setWeaponLocks({});
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
              <FontAwesomeIcon icon={faArrowRotateLeft} /> Re-randomize
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
          <KitComponent
            kit={kit}
            weaponChoiceInteractions={weaponChoiceInteractions}
          />
        </div>
      )}
    </>
  );
}
