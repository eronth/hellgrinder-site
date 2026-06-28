import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import PerkComponent from '../perks/PerkComponent';
import NotificationToast, { Notification } from './NotificationToast';
import Tools from '../../../../utils/tools';
import { Perk } from '../../../../ts-types/types';
import { CharacterDesign } from '../../../../ts-types/player-character-types';
import Perks from '../../../../data/equipment/perks';
import './InventoryManager.css';

interface PerkManagerProps {
  characters: CharacterDesign[];
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
  disabled?: boolean;
  buttonClassName?: string;
  buttonLabel?: string;
}

export default function PerkManager({
  characters,
  selectedCharacterId,
  onUpdateCharacter,
  disabled = false,
  buttonClassName = 'inventory-toggle-btn',
  buttonLabel = 'Manage Perks',
}: PerkManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const managerRef = useRef<HTMLDivElement>(null);

  const [transferDialog, setTransferDialog] = useState<{
    isOpen: boolean;
    perk: Perk | null;
    fromCharacterId: string;
    toCharacterId: string;
  }>({ isOpen: false, perk: null, fromCharacterId: '', toCharacterId: '' });

  const [bulkTransferDialog, setBulkTransferDialog] = useState<{
    isOpen: boolean;
    fromCharacterId: string;
    toCharacterId: string;
    itemCount: number;
  }>({ isOpen: false, fromCharacterId: '', toCharacterId: '', itemCount: 0 });

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);
  const otherCharacters = characters.filter(c => c.id !== selectedCharacterId);

  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    setNotifications(prev => [...prev, {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }]);
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const allPerks = useMemo(() => Tools.sortPerks(Perks), []);

  const filterBySearch = useCallback((items: Perk[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, []);

  const addPerkToInventory = useCallback((perk: Perk) => {
    if (!selectedCharacter) return;
    if (selectedCharacter.stats.perkPoints < perk.cost) {
      showNotification({
        type: 'error',
        message: `Not enough perk points! Need ${perk.cost} but only have ${selectedCharacter.stats.perkPoints}.`
      });
      return;
    }
    const newPerks = [...selectedCharacter.perks, structuredClone(perk)];
    const newStats = {
      ...selectedCharacter.stats,
      perkPoints: selectedCharacter.stats.perkPoints - perk.cost,
      corruption: selectedCharacter.stats.corruption + (perk.startingCorruption || 0),
      health: {
        ...selectedCharacter.stats.health,
        max: selectedCharacter.stats.health.max + (perk.healthModifier || 0),
        current: perk.healthModifier && perk.healthModifier > 0
          ? selectedCharacter.stats.health.current + perk.healthModifier
          : selectedCharacter.stats.health.current
      },
      speed: selectedCharacter.stats.speed + (perk.speedModifier || 0),
      injuries: selectedCharacter.stats.injuries + (perk.injuriesModifier || 0),
      safelightShards: selectedCharacter.stats.safelightShards + (perk.safelightShardsModifier || 0)
    };
    onUpdateCharacter(selectedCharacterId, { perks: newPerks, stats: newStats });
    showNotification({ type: 'success', message: `Added "${perk.name}" perk! Cost: ${perk.cost} perk points.` });
  }, [selectedCharacter, selectedCharacterId, onUpdateCharacter, showNotification]);

  const removePerkFromInventory = useCallback((index: number) => {
    if (!selectedCharacter || index < 0 || index >= selectedCharacter.perks.length) return;
    const perkToRemove = selectedCharacter.perks[index];
    const newPerks = selectedCharacter.perks.filter((_, i) => i !== index);
    const newStats = {
      ...selectedCharacter.stats,
      perkPoints: selectedCharacter.stats.perkPoints + perkToRemove.cost,
      corruption: Math.max(0, selectedCharacter.stats.corruption - (perkToRemove.startingCorruption || 0)),
      health: {
        ...selectedCharacter.stats.health,
        max: Math.max(1, selectedCharacter.stats.health.max - (perkToRemove.healthModifier || 0)),
        current: perkToRemove.healthModifier && perkToRemove.healthModifier > 0
          ? Math.min(
              selectedCharacter.stats.health.current - perkToRemove.healthModifier,
              selectedCharacter.stats.health.max - perkToRemove.healthModifier
            )
          : selectedCharacter.stats.health.current
      },
      speed: Math.max(1, selectedCharacter.stats.speed - (perkToRemove.speedModifier || 0)),
      injuries: Math.max(0, selectedCharacter.stats.injuries - (perkToRemove.injuriesModifier || 0)),
      safelightShards: Math.max(0, selectedCharacter.stats.safelightShards - (perkToRemove.safelightShardsModifier || 0))
    };
    onUpdateCharacter(selectedCharacterId, { perks: newPerks, stats: newStats });
    showNotification({ type: 'info', message: `Removed "${perkToRemove.name}" perk! Refunded: ${perkToRemove.cost} perk points.` });
  }, [selectedCharacter, selectedCharacterId, onUpdateCharacter, showNotification]);

  const openTransferDialog = useCallback((perk: Perk) => {
    setTransferDialog({
      isOpen: true,
      perk,
      fromCharacterId: selectedCharacterId,
      toCharacterId: otherCharacters.length > 0 ? otherCharacters[0].id : ''
    });
  }, [otherCharacters, selectedCharacterId]);

  const confirmTransfer = () => {
    const { perk, fromCharacterId, toCharacterId } = transferDialog;
    if (!perk || !toCharacterId) return;
    const fromCharacter = characters.find(c => c.id === fromCharacterId);
    const toCharacter = characters.find(c => c.id === toCharacterId);
    if (!fromCharacter || !toCharacter) return;

    const fromIndex = fromCharacter.perks.findIndex(p => p.name === perk.name);
    if (fromIndex === -1) return;

    onUpdateCharacter(fromCharacterId, { perks: fromCharacter.perks.filter((_, i) => i !== fromIndex) });
    onUpdateCharacter(toCharacterId, { perks: [...toCharacter.perks, structuredClone(perk)] });
    setTransferDialog({ isOpen: false, perk: null, fromCharacterId: '', toCharacterId: '' });
  };

  const cancelTransfer = () => {
    setTransferDialog({ isOpen: false, perk: null, fromCharacterId: '', toCharacterId: '' });
  };

  const openBulkTransferDialog = useCallback(() => {
    if (!selectedCharacter || selectedCharacter.perks.length === 0) return;
    setBulkTransferDialog({
      isOpen: true,
      fromCharacterId: selectedCharacterId,
      toCharacterId: otherCharacters.length > 0 ? otherCharacters[0].id : '',
      itemCount: selectedCharacter.perks.length
    });
  }, [selectedCharacter, selectedCharacterId, otherCharacters]);

  const confirmBulkTransfer = () => {
    const { fromCharacterId, toCharacterId } = bulkTransferDialog;
    if (!toCharacterId) return;
    const fromCharacter = characters.find(c => c.id === fromCharacterId);
    const toCharacter = characters.find(c => c.id === toCharacterId);
    if (!fromCharacter || !toCharacter) return;

    onUpdateCharacter(fromCharacterId, { perks: [] });
    onUpdateCharacter(toCharacterId, {
      perks: [...toCharacter.perks, ...fromCharacter.perks.map(p => structuredClone(p))]
    });
    setBulkTransferDialog({ isOpen: false, fromCharacterId: '', toCharacterId: '', itemCount: 0 });
  };

  const cancelBulkTransfer = () => {
    setBulkTransferDialog({ isOpen: false, fromCharacterId: '', toCharacterId: '', itemCount: 0 });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && managerRef.current && !managerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const perkAddActions = useCallback((perk: Perk) => {
    const chr = selectedCharacter!;
    const canAfford = chr.stats.perkPoints >= perk.cost;
    const isNegativeCost = perk.cost < 0;
    return (
      <button
        className={`add-btn ${!canAfford && !isNegativeCost ? 'disabled' : ''} ${isNegativeCost ? 'negative-cost' : ''}`}
        onClick={() => addPerkToInventory(perk)}
        disabled={!canAfford && !isNegativeCost}
        title={
          isNegativeCost
            ? `Add ${perk.name} (Gain ${Math.abs(perk.cost)} perk points)`
            : canAfford
              ? `Add ${perk.name} (Cost: ${perk.cost} perk points)`
              : `Cannot afford ${perk.name} (Need ${perk.cost}, have ${chr.stats.perkPoints})`
        }
      >
        {isNegativeCost ? `Add (+${Math.abs(perk.cost)} pts)` :
          canAfford ? `Add (${perk.cost} pts)` :
          `Need ${perk.cost - chr.stats.perkPoints} more pts`}
      </button>
    );
  }, [addPerkToInventory, selectedCharacter]);

  const perkInventoryActions = useCallback((perk: Perk, index: number) => (
    <>
      <button className="remove-btn" onClick={() => removePerkFromInventory(index)} title="Remove from inventory">
        Remove
      </button>
      {otherCharacters.length > 0 && (
        <button className="transfer-btn" onClick={() => openTransferDialog(perk)} title="Transfer to another character">
          Transfer
        </button>
      )}
    </>
  ), [removePerkFromInventory, openTransferDialog, otherCharacters.length]);

  const renderPerkGrid = useCallback((perks: Perk[], isInventory = false) => {
    const filtered = filterBySearch(perks, searchFilter);
    const displayPerks = isInventory ? [...filtered].reverse() : filtered;
    return (
      <div className="item-grid">
        {displayPerks.map((perk, index) => {
          const actualIndex = isInventory ? filtered.length - 1 - index : index;
          return (
            <div key={`perk-${perk.name}-${index}`} className="item-card">
              <div className="item-content">
                <PerkComponent perk={perk} />
              </div>
              <div className="item-actions">
                {isInventory ? perkInventoryActions(perk, actualIndex) : perkAddActions(perk)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [filterBySearch, searchFilter, perkInventoryActions, perkAddActions]);

  const panel = useCallback(() => {
    if (!selectedCharacter) return null;
    return (
      <>
        <div className="inventory-backdrop" onClick={() => setIsOpen(false)} />
        <div className="inventory-manager" ref={managerRef}>
          <div className="inventory-header">
            <h3>Perk Manager — {selectedCharacter.name} ({selectedCharacter.stats.perkPoints} pts remaining)</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="search-section">
            <input
              type="text"
              placeholder="Search perks..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="inventory-content">
            <div className="current-inventory">
              <div className="inventory-section-header">
                <h4>
                  Current Perks ({selectedCharacter.perks.length})
                  <span className="sort-indicator"> • Most recent first</span>
                </h4>
                {otherCharacters.length > 0 && (
                  <button
                    className="bulk-transfer-btn"
                    onClick={openBulkTransferDialog}
                    disabled={selectedCharacter.perks.length === 0}
                    title="Transfer all perks to another character"
                  >
                    Transfer All Perks
                  </button>
                )}
              </div>
              {selectedCharacter.perks.length === 0
                ? <p className="empty-message">No perks</p>
                : renderPerkGrid(selectedCharacter.perks, true)
              }
            </div>

            <div className="available-items">
              <h4>Available Perks</h4>
              {renderPerkGrid(allPerks)}
            </div>
          </div>
        </div>
      </>
    );
  }, [selectedCharacter, searchFilter, otherCharacters.length, openBulkTransferDialog, renderPerkGrid, allPerks]);

  return (
    <>
      <button
        className={buttonClassName}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {buttonLabel}
      </button>

      {isOpen && panel()}

      <ConfirmDialog
        isOpen={transferDialog.isOpen}
        onClose={cancelTransfer}
        title="Transfer Perk"
        message={transferDialog.perk ? `Transfer "${transferDialog.perk.name}" to another character?` : ''}
        buttons={[
          { text: 'Cancel', onClick: cancelTransfer, variant: 'secondary' },
          { text: 'Transfer', onClick: confirmTransfer, variant: 'primary', autoFocus: true }
        ]}
      >
        {transferDialog.isOpen && otherCharacters.length > 0 && (
          <div className="transfer-options">
            <label htmlFor="perk-transfer-target">Transfer to:</label>
            <select
              id="perk-transfer-target"
              value={transferDialog.toCharacterId}
              onChange={(e) => setTransferDialog(prev => ({ ...prev, toCharacterId: e.target.value }))}
            >
              {otherCharacters.map(char => (
                <option key={char.id} value={char.id}>{char.name}</option>
              ))}
            </select>
          </div>
        )}
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={bulkTransferDialog.isOpen}
        onClose={cancelBulkTransfer}
        title="Transfer All Perks"
        message={`Transfer all ${bulkTransferDialog.itemCount} perks to another character?`}
        buttons={[
          { text: 'Cancel', onClick: cancelBulkTransfer, variant: 'secondary' },
          { text: 'Transfer All', onClick: confirmBulkTransfer, variant: 'primary', autoFocus: true }
        ]}
      >
        {bulkTransferDialog.isOpen && otherCharacters.length > 0 && (
          <div className="transfer-options">
            <label htmlFor="bulk-perk-transfer-target">Transfer to:</label>
            <select
              id="bulk-perk-transfer-target"
              value={bulkTransferDialog.toCharacterId}
              onChange={(e) => setBulkTransferDialog(prev => ({ ...prev, toCharacterId: e.target.value }))}
            >
              {otherCharacters.map(char => (
                <option key={char.id} value={char.id}>{char.name}</option>
              ))}
            </select>
          </div>
        )}
      </ConfirmDialog>

      <NotificationToast notifications={notifications} onDismiss={dismissNotification} />
    </>
  );
}
