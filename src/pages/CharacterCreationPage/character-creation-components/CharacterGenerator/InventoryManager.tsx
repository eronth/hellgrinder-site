import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// Components
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import WeaponComponent from '../kits/weapon/WeaponComponent';
import ItemComponent from '../kits/item/ItemComponent';
// Utils
import Tools from '../../../../utils/tools';
// Types
import { Weapon, Item } from '../../../../ts-types/types';
import { CharacterDesign } from '../../../../ts-types/player-character-types';
// Import equipment databases
import MeleeWeapons from '../../../../data/equipment/weapons/melee-weapons';
import ShootingWeapons from '../../../../data/equipment/weapons/shooting-weapons';
import ThrownWeapons from '../../../../data/equipment/weapons/thrown-weapons';
import ArcaneWeapons from '../../../../data/equipment/weapons/arcane-weapons';
import WandsAndStaves from '../../../../data/equipment/weapons/wands-and-staves';
import Armor from '../../../../data/equipment/armor';
import Gear from '../../../../data/equipment/gear';
// Css
import './InventoryManager.css';

interface InventoryManagerProps {
  characters: CharacterDesign[];
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
};

type ItemType = 'weapons' | 'items';

export default function InventoryManager({
  characters,
  selectedCharacterId,
  onUpdateCharacter
}: InventoryManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ItemType>('weapons');
  const [searchFilter, setSearchFilter] = useState('');
  const inventoryRef = useRef<HTMLDivElement>(null);

  const [transferDialog, setTransferDialog] = useState<{
    isOpen: boolean;
    item: Weapon | Item | null;
    itemType: ItemType;
    fromCharacterId: string;
    toCharacterId: string;
  }>({
    isOpen: false,
    item: null,
    itemType: 'items',
    fromCharacterId: '',
    toCharacterId: ''
  });

  const [bulkTransferDialog, setBulkTransferDialog] = useState<{
    isOpen: boolean;
    itemType: ItemType;
    fromCharacterId: string;
    toCharacterId: string;
    itemCount: number;
  }>({
    isOpen: false,
    itemType: 'items',
    fromCharacterId: '',
    toCharacterId: '',
    itemCount: 0
  });

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);
  const otherCharacters = characters.filter(c => c.id !== selectedCharacterId);

  const allWeapons = useMemo(() => [
    ...Tools.sortWeapons(MeleeWeapons),
    ...Tools.sortWeapons(ShootingWeapons),
    ...Tools.sortWeapons(ThrownWeapons),
    ...Tools.sortWeapons(ArcaneWeapons)
  ], []);

  const allItems = useMemo(() => [
    ...Tools.sortItems(WandsAndStaves),
    ...Tools.sortItems(Armor),
    ...Tools.sortItems(Gear)
  ], []);

  const filterBySearch = useCallback((items: (Item | Weapon)[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, []);

  const addToInventory = useCallback((item: Item | Weapon, type: ItemType) => {
    if (!selectedCharacter) return;
    const newInventory = {
      ...selectedCharacter.inventory,
      [type]: [...selectedCharacter.inventory[type], structuredClone(item)]
    };
    onUpdateCharacter(selectedCharacterId, { inventory: newInventory });
  }, [selectedCharacter, selectedCharacterId, onUpdateCharacter]);

  const removeFromInventory = useCallback((index: number, type: ItemType) => {
    if (!selectedCharacter || index < 0 || index >= selectedCharacter.inventory[type].length) return;
    const newInventory = {
      ...selectedCharacter.inventory,
      [type]: selectedCharacter.inventory[type].filter((_: Weapon | Item, i: number) => i !== index)
    };
    onUpdateCharacter(selectedCharacterId, { inventory: newInventory });
  }, [selectedCharacter, selectedCharacterId, onUpdateCharacter]);

  const openTransferDialog = useCallback((item: Weapon | Item, itemType: ItemType) => {
    setTransferDialog({
      isOpen: true,
      item,
      itemType,
      fromCharacterId: selectedCharacterId,
      toCharacterId: otherCharacters.length > 0 ? otherCharacters[0].id : ''
    });
  }, [otherCharacters, selectedCharacterId]);

  const confirmTransfer = () => {
    const { item, itemType, fromCharacterId, toCharacterId } = transferDialog;
    if (!item || !toCharacterId) return;

    const fromCharacter = characters.find(c => c.id === fromCharacterId);
    const toCharacter = characters.find(c => c.id === toCharacterId);
    if (!fromCharacter || !toCharacter) return;

    const fromItemIndex = fromCharacter.inventory[itemType].findIndex((invItem: Weapon | Item) =>
      invItem.name === item.name
    );
    if (fromItemIndex === -1) return;

    const newFromInventory = {
      ...fromCharacter.inventory,
      [itemType]: fromCharacter.inventory[itemType].filter((_: Weapon | Item, i: number) => i !== fromItemIndex)
    };
    const newToInventory = {
      ...toCharacter.inventory,
      [itemType]: [...toCharacter.inventory[itemType], structuredClone(item)]
    };

    onUpdateCharacter(fromCharacterId, { inventory: newFromInventory });
    onUpdateCharacter(toCharacterId, { inventory: newToInventory });
    setTransferDialog({ isOpen: false, item: null, itemType: 'items', fromCharacterId: '', toCharacterId: '' });
  };

  const cancelTransfer = () => {
    setTransferDialog({ isOpen: false, item: null, itemType: 'items', fromCharacterId: '', toCharacterId: '' });
  };

  const openBulkTransferDialog = useCallback((itemType: ItemType) => {
    if (!selectedCharacter) return;
    const itemCount = selectedCharacter.inventory[itemType].length;
    if (itemCount === 0) return;
    setBulkTransferDialog({
      isOpen: true,
      itemType,
      fromCharacterId: selectedCharacterId,
      toCharacterId: otherCharacters.length > 0 ? otherCharacters[0].id : '',
      itemCount
    });
  }, [selectedCharacter, selectedCharacterId, otherCharacters]);

  const confirmBulkTransfer = () => {
    const { itemType, fromCharacterId, toCharacterId, itemCount } = bulkTransferDialog;
    if (!toCharacterId) return;

    const fromCharacter = characters.find(c => c.id === fromCharacterId);
    const toCharacter = characters.find(c => c.id === toCharacterId);
    if (!fromCharacter || !toCharacter) return;

    const isAllEquipment = itemCount === (fromCharacter.inventory.weapons.length + fromCharacter.inventory.items.length) &&
                          fromCharacter.inventory.weapons.length > 0 && fromCharacter.inventory.items.length > 0;

    if (isAllEquipment) {
      onUpdateCharacter(fromCharacterId, { inventory: { weapons: [] as Weapon[], items: [] as Item[] } });
      onUpdateCharacter(toCharacterId, {
        inventory: {
          weapons: [...toCharacter.inventory.weapons, ...fromCharacter.inventory.weapons.map((w: Weapon) => structuredClone(w))],
          items: [...toCharacter.inventory.items, ...fromCharacter.inventory.items.map((i: Item) => structuredClone(i))]
        }
      });
    } else {
      const allItems = [...fromCharacter.inventory[itemType]];
      onUpdateCharacter(fromCharacterId, { inventory: { ...fromCharacter.inventory, [itemType]: [] } });
      onUpdateCharacter(toCharacterId, {
        inventory: {
          ...toCharacter.inventory,
          [itemType]: [...toCharacter.inventory[itemType], ...allItems.map((item: Weapon | Item) => structuredClone(item))]
        }
      });
    }

    setBulkTransferDialog({ isOpen: false, itemType: 'items', fromCharacterId: '', toCharacterId: '', itemCount: 0 });
  };

  const cancelBulkTransfer = () => {
    setBulkTransferDialog({ isOpen: false, itemType: 'items', fromCharacterId: '', toCharacterId: '', itemCount: 0 });
  };

  const openBulkTransferAllEquipment = useCallback(() => {
    const totalItems = selectedCharacter!.inventory.weapons.length + selectedCharacter!.inventory.items.length;
    if (totalItems === 0) return;
    setBulkTransferDialog({
      isOpen: true,
      itemType: 'weapons',
      fromCharacterId: selectedCharacterId,
      toCharacterId: otherCharacters.length > 0 ? otherCharacters[0].id : '',
      itemCount: totalItems
    });
  }, [selectedCharacter, selectedCharacterId, otherCharacters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && inventoryRef.current && !inventoryRef.current.contains(event.target as Node)) {
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

  const inventoryItemActions = useCallback((item: Item | Weapon, index: number, type: ItemType) => (
    <>
      <button
        className="remove-btn"
        onClick={() => removeFromInventory(index, type)}
        title="Remove from inventory"
      >
        Remove
      </button>
      {otherCharacters.length > 0 && (
        <button
          className="transfer-btn"
          onClick={() => openTransferDialog(item, type)}
          title="Transfer to another character"
        >
          Transfer
        </button>
      )}
    </>
  ), [removeFromInventory, openTransferDialog, otherCharacters.length]);

  const renderItemGrid = useCallback((items: (Item | Weapon)[], type: ItemType, isInventory = false) => {
    const filteredItems = filterBySearch(items, searchFilter);
    const displayItems = isInventory ? [...filteredItems].reverse() : filteredItems;

    return (
      <div className={`item-grid ${type}-grid`}>
        {displayItems.map((item, index) => {
          const actualIndex = isInventory ? filteredItems.length - 1 - index : index;
          return (
            <div key={`${type}-${item.name}-${index}`} className="item-card">
              <div className="item-content">
                {type === 'weapons' && <WeaponComponent weapon={item as Weapon} />}
                {type === 'items' && <ItemComponent item={item as Item} />}
              </div>
              <div className="item-actions">
                {isInventory ? (
                  inventoryItemActions(item, actualIndex, type)
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => addToInventory(item, type)}
                    title="Add to inventory"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [filterBySearch, searchFilter, addToInventory, inventoryItemActions]);

  const panel = useCallback(() => {
    if (!selectedCharacter) return null;
    return (
      <>
        <div className="inventory-backdrop" onClick={() => setIsOpen(false)} />
        <div className="inventory-manager" ref={inventoryRef}>
          <div className="inventory-header">
            <h3>Inventory Manager - {selectedCharacter.name}</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="inventory-tabs">
            {(['weapons', 'items'] as ItemType[]).map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="search-section">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="search-input"
            />
            {otherCharacters.length > 0 && (
              <div className="bulk-actions">
                <button
                  className="bulk-transfer-all-btn"
                  onClick={openBulkTransferAllEquipment}
                  disabled={selectedCharacter.inventory.weapons.length === 0 && selectedCharacter.inventory.items.length === 0}
                  title="Transfer all weapons and items to another character"
                >
                  Transfer All Equipment
                </button>
              </div>
            )}
          </div>

          <div className="inventory-content">
            <div className="current-inventory">
              <div className="inventory-section-header">
                <h4>
                  Current Inventory ({selectedCharacter.inventory[activeTab].length})
                  <span className="sort-indicator"> • Most recent first</span>
                </h4>
                {otherCharacters.length > 0 && (
                  <button
                    className="bulk-transfer-btn"
                    onClick={() => openBulkTransferDialog(activeTab)}
                    disabled={selectedCharacter.inventory[activeTab].length === 0}
                    title={`Transfer all ${activeTab} to another character`}
                  >
                    Transfer All {activeTab === 'weapons' ? 'Weapons' : 'Items'}
                  </button>
                )}
              </div>
              {selectedCharacter.inventory[activeTab].length === 0 ? (
                <p className="empty-message">No {activeTab} in inventory</p>
              ) : (
                renderItemGrid(selectedCharacter.inventory[activeTab], activeTab, true)
              )}
            </div>

            <div className="available-items">
              <h4>Available {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h4>
              {activeTab === 'weapons' && renderItemGrid(allWeapons, 'weapons')}
              {activeTab === 'items' && renderItemGrid(allItems, 'items')}
            </div>
          </div>
        </div>
      </>
    );
  }, [selectedCharacter, activeTab, searchFilter, otherCharacters.length, renderItemGrid, allWeapons, allItems, openBulkTransferAllEquipment, openBulkTransferDialog]);

  return (
    <>
      <button
        className="inventory-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        Manage Inventory
      </button>

      {isOpen && panel()}

      <ConfirmDialog
        isOpen={transferDialog.isOpen}
        onClose={cancelTransfer}
        title="Transfer Item"
        message={transferDialog.item ? `Transfer "${transferDialog.item.name}" to another character?` : ''}
        buttons={[
          { text: 'Cancel', onClick: cancelTransfer, variant: 'secondary' },
          { text: 'Transfer', onClick: confirmTransfer, variant: 'primary', autoFocus: true }
        ]}
      >
        {transferDialog.isOpen && otherCharacters.length > 0 && (
          <div className="transfer-options">
            <label htmlFor="transfer-target">Transfer to:</label>
            <select
              id="transfer-target"
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
        title="Transfer All Items"
        message={(() => {
          const { itemType, itemCount, fromCharacterId } = bulkTransferDialog;
          const fromCharacter = characters.find(c => c.id === fromCharacterId);
          if (!fromCharacter) return '';
          const isAllEquipment = itemCount === (fromCharacter.inventory.weapons.length + fromCharacter.inventory.items.length) &&
                                fromCharacter.inventory.weapons.length > 0 && fromCharacter.inventory.items.length > 0;
          if (isAllEquipment) {
            return `Transfer all ${fromCharacter.inventory.weapons.length} weapons and ${fromCharacter.inventory.items.length} items (${itemCount} total) to another character?`;
          }
          return `Transfer all ${itemCount} ${itemType} to another character?`;
        })()}
        buttons={[
          { text: 'Cancel', onClick: cancelBulkTransfer, variant: 'secondary' },
          { text: 'Transfer All', onClick: confirmBulkTransfer, variant: 'primary', autoFocus: true }
        ]}
      >
        {bulkTransferDialog.isOpen && otherCharacters.length > 0 && (
          <div className="transfer-options">
            <label htmlFor="bulk-transfer-target">Transfer to:</label>
            <select
              id="bulk-transfer-target"
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

    </>
  );
}
