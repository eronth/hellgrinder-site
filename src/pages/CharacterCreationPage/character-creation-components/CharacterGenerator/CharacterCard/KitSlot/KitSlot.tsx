import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Kit, ChoiceTagOption, DamageElement } from '../../../../../../ts-types/types';
import { CharacterDesign, CharacterKitLocks } from '../../../../../../ts-types/player-character-types';
import KitComponent, { WeaponChoiceInteractions, ItemChoiceInteraction } from '../../../kits/Kit';
import CharacterGeneratorTools from '../../../../../../utils/characterGeneratorTools';
import Tools from '../../../../../../utils/tools';
import KitSelectModal from './KitSelectModal';
import SimpleLockButton from '../../../../../../components/common/SimpleLockButton/SimpleLockButton';
import './KitSlot.css';

type KitType = 'combat' | 'support';

type Props = {
  kitType: KitType;
  kit: Kit | null;
  character: CharacterDesign;
  onSetKit: (kit: Kit) => void;
  kitLocks: CharacterKitLocks;
  onKitLocksChange: (updates: Partial<CharacterKitLocks>) => void;
};

const EMPTY_LOCKS: Partial<CharacterKitLocks> = {
  kitLocked: false,
  weaponChoiceLocks: {},
  itemChoiceSelections: [],
  itemChoiceLocked: false,
};

export default function KitSlot({ kitType, kit, character, onSetKit, kitLocks, onKitLocksChange }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const locked = kitLocks?.kitLocked;
  const weaponLocks = kitLocks.weaponChoiceLocks;
  const itemChoiceSelections = kitLocks.itemChoiceSelections ?? [];
  const itemChoiceLocked = kitLocks.itemChoiceLocked ?? false;

  const allKits = kitType === 'combat'
    ? CharacterGeneratorTools.getAllCombatKits()
    : CharacterGeneratorTools.getAllSupportKits();

  const usedKitNames = character.kits
    .filter(k => k.name !== kit?.name)
    .map(k => k.name);

  const label = kitType === 'combat' ? 'Combat Kit' : 'Support Kit';

  // Derive the currently-selected choice tag for a weapon from its stored damage type.
  function getWeaponSelectedTag(weapon: Kit['weapons'][number]): ChoiceTagOption | null {
    const type = weapon.attackModes[0]?.damage?.l?.type;
    return (type && type !== 'Chosen Type') ? type as ChoiceTagOption : null;
  }

  // Apply a damage-element choice to all 'Chosen Type' damage fields in a weapon.
  function applyWeaponChoice(weaponName: string, chosenTag: ChoiceTagOption) {
    if (!kit) return;
    const updatedKit = Tools.deepCopyKit(kit);
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
    const updatedKit = Tools.deepCopyKit(kit);
    const weapon = updatedKit.weapons.find(w => w.name === weaponName);
    if (!weapon) return;
    weapon.attackModes.forEach(mode => {
      (['l', 'm', 'h'] as const).forEach(tier => {
        mode.damage[tier].type = 'Chosen Type';
      });
    });
    onSetKit(updatedKit);
    onKitLocksChange({ weaponChoiceLocks: { ...weaponLocks, [weaponName]: false } });
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
        onToggleLock: () => onKitLocksChange({ weaponChoiceLocks: { ...weaponLocks, [wName]: !weaponLocks[wName] } }),
        onReset: () => resetWeaponChoice(wName),
      };
    });
  }

  // Build item choice interaction if the kit has a choice-item set.
  let itemChoiceInteraction: ItemChoiceInteraction | undefined;
  if (kit?.itemChoiceCount) {
    const choiceItems = kit.items.filter(i => i.isChoiceItem);
    const choiceCount = kit.itemChoiceCount;

    itemChoiceInteraction = {
      selectedNames: itemChoiceSelections,
      choiceCount,
      locked: itemChoiceLocked,
      onToggle: (itemName) => {
        const next = [...itemChoiceSelections];
        const idx = next.indexOf(itemName);
        if (idx >= 0) {
          next.splice(idx, 1);
        } else if (next.length < choiceCount) {
          next.push(itemName);
        }
        onKitLocksChange({ itemChoiceSelections: next });
      },
      onRandomize: () => {
        const shuffled = [...choiceItems].sort(() => Math.random() - 0.5);
        const selections = shuffled.slice(0, choiceCount).map(i => i.name);
        onKitLocksChange({ itemChoiceSelections: selections, itemChoiceLocked: false });
      },
      onToggleLock: () => {
        onKitLocksChange({ itemChoiceLocked: !itemChoiceLocked });
      },
    };
  }

  function handleRandomize() {
    const newKit = kitType === 'combat'
      ? CharacterGeneratorTools.randomizeCombatKit(usedKitNames).kit
      : CharacterGeneratorTools.randomizeSupportKit(usedKitNames);
    onSetKit(newKit);
    onKitLocksChange(EMPTY_LOCKS);
  }

  function handleModalConfirm(selectedKit: Kit) {
    const newKit = CharacterGeneratorTools.selectKit(selectedKit.name, allKits);
    if (newKit) onSetKit(newKit);
    setModalOpen(false);
    onKitLocksChange(EMPTY_LOCKS);
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
            <SimpleLockButton
              locked={locked}
              onToggle={() => onKitLocksChange({ kitLocked: !locked })}
              lockedTitle="Unlock to change"
              unlockedTitle="Lock kit"
              className="kit-lock-btn"
            />
          </div>
          <KitComponent
            kit={kit}
            weaponChoiceInteractions={weaponChoiceInteractions}
            itemChoiceInteraction={itemChoiceInteraction}
          />
        </div>
      )}
    </>
  );
}
