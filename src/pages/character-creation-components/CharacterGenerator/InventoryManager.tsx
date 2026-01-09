import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Weapon, Item, Perk } from '../../../ts-types/types';
import { CharacterDesign } from './CharacterGenerator';
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import WeaponComponent from '../kits/weapon/WeaponComponent';
import ItemComponent from '../kits/item/ItemComponent';
import PerkComponent from '../perks/PerkComponent';
import NotificationToast, { Notification } from './NotificationToast';
import Tools from '../../../common-design/Tools';

// Import equipment databases
import MeleeWeapons from '../../../common-design/equipment/weapons/melee-weapons';
import ShootingWeapons from '../../../common-design/equipment/weapons/shooting-weapons';
import ThrownWeapons from '../../../common-design/equipment/weapons/thrown-weapons';
import ArcaneWeapons from '../../../common-design/equipment/weapons/arcane-weapons';
import WandsAndStaves from '../../../common-design/equipment/weapons/wands-and-staves';
import Armor from '../../../common-design/equipment/armor';
import Gear from '../../../common-design/equipment/gear';
import Perks from '../../../common-design/equipment/perks';

// Css
import './InventoryManager.css';

interface InventoryManagerProps {
  characters: CharacterDesign[];
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
};

type ItemType = 'weapons' | 'items' | 'perks';

export default function InventoryManager({
  characters,
  selectedCharacterId,
  onUpdateCharacter
}: InventoryManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ItemType>('weapons');
  const [searchFilter, setSearchFilter] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const inventoryRef = useRef<HTMLDivElement>(null);
  
  const [transferDialog, setTransferDialog] = useState<{
    isOpen: boolean;
    item: Weapon | Item | Perk | null;
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

  // Helper function to show notifications
  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  // Helper function to dismiss notifications
  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Combine all equipment databases
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

  const allPerks = useMemo(() => Tools.sortPerks(Perks), []);

  // Filter functions
  const filterBySearch = useCallback((items: (Item | Weapon | Perk)[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, []);

  // Add to inventory.
  const addPerkToInventory = useCallback((perk: Perk) => {
    if (!selectedCharacter) return;
    
    // Check if character has enough perk points
    if (selectedCharacter.stats.perkPoints < perk.cost) {
      showNotification({
        type: 'error',
        message: `Not enough perk points! Need ${perk.cost} but only have ${selectedCharacter.stats.perkPoints}.`
      });
      return;
    }
    
    // Add perk to main perks array
    const newPerks = [...selectedCharacter.perks, structuredClone(perk)];
    
    // Calculate new stats based on perk modifiers
    const newStats = {
      ...selectedCharacter.stats,
      perkPoints: selectedCharacter.stats.perkPoints - perk.cost,
      corruption: selectedCharacter.stats.corruption + (perk.startingCorruption || 0),
      health: {
        ...selectedCharacter.stats.health,
        max: selectedCharacter.stats.health.max + (perk.healthModifier || 0),
        // Also increase current health if health was increased
        current: perk.healthModifier && perk.healthModifier > 0 
          ? selectedCharacter.stats.health.current + perk.healthModifier
          : selectedCharacter.stats.health.current
      },
      speed: selectedCharacter.stats.speed + (perk.speedModifier || 0),
      injuries: selectedCharacter.stats.injuries + (perk.injuriesModifier || 0),
      safelightShards: selectedCharacter.stats.safelightShards + (perk.safelightShardsModifier || 0)
    };
    
    onUpdateCharacter(selectedCharacterId, { 
      perks: newPerks,
      stats: newStats
    });
    
    // Show success notification
    showNotification({
      type: 'success',
      message: `Added "${perk.name}" perk! Cost: ${perk.cost} perk points.`
    });
  }, [selectedCharacter, selectedCharacterId, onUpdateCharacter, showNotification]);

  const addNonPerkToInventory = useCallback((item: Item | Weapon, type: "weapons" | "items") => {
    if (!selectedCharacter) return;
    // Add weapons/items to inventory
    const newInventory = {
      ...selectedCharacter.inventory,
      [type]: [...selectedCharacter.inventory[type], structuredClone(item)]
    };
    onUpdateCharacter(selectedCharacterId, { inventory: newInventory });
  }, [selectedCharacter, selectedCharacterId, onUpdateCharacter]);

  const addToInventory = useCallback((item: Item | Weapon | Perk, type: ItemType) => {
    if (type === 'perks') {
      addPerkToInventory(item as Perk);
    } else {
      addNonPerkToInventory(item as Item | Weapon, type);
    }
  }, [addPerkToInventory, addNonPerkToInventory]);

  // Remove from inventory.
  const removePerkFromInventory = useCallback((index: number) => {
    if (!selectedCharacter || !selectedCharacter.perks || index < 0 || index >= selectedCharacter.perks.length) return;
    
      // Get the perk to remove
    const perkToRemove = selectedCharacter.perks[index];
      
      // Remove from main perks array
      const newPerks = selectedCharacter.perks.filter((_, i) => i !== index);
      
      // Calculate new stats by reversing perk modifiers
      const newStats = {
        ...selectedCharacter.stats,
        perkPoints: selectedCharacter.stats.perkPoints + perkToRemove.cost,
        corruption: Math.max(0, selectedCharacter.stats.corruption - (perkToRemove.startingCorruption || 0)),
        health: {
          ...selectedCharacter.stats.health,
          max: Math.max(1, selectedCharacter.stats.health.max - (perkToRemove.healthModifier || 0)),
          // Decrease current health if max health was decreased and current > new max
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
      
      onUpdateCharacter(selectedCharacterId, { 
        perks: newPerks,
        stats: newStats
      });
      
      // Show success notification
      showNotification({
        type: 'info',
        message: `Removed "${perkToRemove.name}" perk! Refunded: ${perkToRemove.cost} perk points.`
      });
  }, [selectedCharacter, selectedCharacterId, onUpdateCharacter, showNotification]);

  const removeNonPerkFromInventory = useCallback((index: number, type: 'weapons' | 'items') => {
    if (!selectedCharacter || !selectedCharacter.inventory || index < 0 || index >= selectedCharacter.inventory[type].length) return;

    // Remove from inventory
    const newInventory = {
      ...selectedCharacter.inventory,
      [type]: selectedCharacter.inventory[type].filter((_, i: number) => i !== index)
    };
    onUpdateCharacter(selectedCharacterId, { inventory: newInventory });
  }, [selectedCharacter, selectedCharacterId, onUpdateCharacter]);

  const removeFromInventory = useCallback((index: number, type: ItemType) => {
    if (type === 'perks') {
      removePerkFromInventory(index);
    } else {
      removeNonPerkFromInventory(index, type);
    }
  }, [removePerkFromInventory, removeNonPerkFromInventory]);

  const openTransferDialog = useCallback((item: Weapon | Item | Perk, itemType: ItemType) => {
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

    if (itemType === 'perks') {
      // Handle perk transfers (main perks array)
      const fromItemIndex = fromCharacter.perks.findIndex((perk) => 
        perk.name === item.name
      );
      
      if (fromItemIndex === -1) return;

      // Remove from source
      const newFromPerks = fromCharacter.perks.filter((_, i) => i !== fromItemIndex);
      
      // Add to target
      const newToPerks = [...toCharacter.perks, structuredClone(item as Perk)];

      // Update both characters
      onUpdateCharacter(fromCharacterId, { perks: newFromPerks });
      onUpdateCharacter(toCharacterId, { perks: newToPerks });
    } else {
      // Handle weapon/item transfers (inventory)
      const fromItemIndex = fromCharacter.inventory[itemType].findIndex((invItem: Weapon | Item) => 
        invItem.name === item.name
      );
      
      if (fromItemIndex === -1) return;

      // Remove from source
      const newFromInventory = {
        ...fromCharacter.inventory,
        [itemType]: fromCharacter.inventory[itemType].filter((_, i) => i !== fromItemIndex)
      };

      // Add to target
      const newToInventory = {
        ...toCharacter.inventory,
        [itemType]: [...toCharacter.inventory[itemType], structuredClone(item)]
      };

      // Update both characters
      onUpdateCharacter(fromCharacterId, { inventory: newFromInventory });
      onUpdateCharacter(toCharacterId, { inventory: newToInventory });
    }

    setTransferDialog({
      isOpen: false,
      item: null,
      itemType: 'items',
      fromCharacterId: '',
      toCharacterId: ''
    });
  };

  const cancelTransfer = () => {
    setTransferDialog({
      isOpen: false,
      item: null,
      itemType: 'items',
      fromCharacterId: '',
      toCharacterId: ''
    });
  };

  const openBulkTransferDialog = useCallback((itemType: ItemType) => {
    if (!selectedCharacter) return;

    const itemCount = itemType === 'perks' 
      ? selectedCharacter.perks.length 
      : selectedCharacter.inventory[itemType].length;

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

    // Check if this is a "transfer all equipment" operation
    const isAllEquipment = itemCount === (fromCharacter.inventory.weapons.length + fromCharacter.inventory.items.length) && 
                          fromCharacter.inventory.weapons.length > 0 && fromCharacter.inventory.items.length > 0;

    if (isAllEquipment) {
      // Transfer all weapons and items
      const allWeapons = [...fromCharacter.inventory.weapons];
      const allItems = [...fromCharacter.inventory.items];
      
      const newFromInventory = {
        weapons: [] as Weapon[],
        items: [] as Item[]
      };
      
      const newToInventory = {
        weapons: [...toCharacter.inventory.weapons, ...allWeapons.map(w => structuredClone(w))],
        items: [...toCharacter.inventory.items, ...allItems.map(i => structuredClone(i))]
      };

      onUpdateCharacter(fromCharacterId, { inventory: newFromInventory });
      onUpdateCharacter(toCharacterId, { inventory: newToInventory });
    } else if (itemType === 'perks') {
      // Transfer all perks
      const allPerks = [...fromCharacter.perks];
      const newFromPerks: Perk[] = [];
      const newToPerks = [...toCharacter.perks, ...allPerks.map(p => structuredClone(p))];

      onUpdateCharacter(fromCharacterId, { perks: newFromPerks });
      onUpdateCharacter(toCharacterId, { perks: newToPerks });
    } else {
      // Transfer all weapons or items
      const allItems = [...fromCharacter.inventory[itemType]];
      const newFromInventory = {
        ...fromCharacter.inventory,
        [itemType]: []
      };
      const newToInventory = {
        ...toCharacter.inventory,
        [itemType]: [...toCharacter.inventory[itemType], ...allItems.map(item => structuredClone(item))]
      };

      onUpdateCharacter(fromCharacterId, { inventory: newFromInventory });
      onUpdateCharacter(toCharacterId, { inventory: newToInventory });
    }

    setBulkTransferDialog({
      isOpen: false,
      itemType: 'items',
      fromCharacterId: '',
      toCharacterId: '',
      itemCount: 0
    });
  };

  const cancelBulkTransfer = () => {
    setBulkTransferDialog({
      isOpen: false,
      itemType: 'items',
      fromCharacterId: '',
      toCharacterId: '',
      itemCount: 0
    });
  };

  const openBulkTransferAllEquipment = useCallback(() => {
    const totalItems = selectedCharacter!.inventory.weapons.length + selectedCharacter!.inventory.items.length;
    if (totalItems === 0) return;

    setBulkTransferDialog({
      isOpen: true,
      itemType: 'weapons', // We'll use 'weapons' as a flag for "all equipment"
      fromCharacterId: selectedCharacterId,
      toCharacterId: otherCharacters.length > 0 ? otherCharacters[0].id : '',
      itemCount: totalItems
    });
  }, [selectedCharacter, selectedCharacterId, otherCharacters]);

  // Handle clicking outside the modal and escape key to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && inventoryRef.current && !inventoryRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
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

  const perkItemActions = useCallback((perk: Perk) => {
    const chr = selectedCharacter!;
    const canAfford = chr.stats.perkPoints >= perk.cost;
    const isNegativeCost = perk.cost < 0;
    const type = 'perks';

    return (
      <button 
        className={`add-btn ${!canAfford && !isNegativeCost ? 'disabled' : ''} ${isNegativeCost ? 'negative-cost' : ''}`}
        onClick={() => addToInventory(perk, type)}
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
  }, [addToInventory, selectedCharacter]);

  const inventoryItemActions = useCallback((item: Perk | Item | Weapon, index: number, type: ItemType) => {
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
  }, [removeFromInventory, openTransferDialog, otherCharacters.length]);

  const renderItemGrid = useCallback((items: (Item | Weapon | Perk)[], type: ItemType, isInventory = false) => {
    const filteredItems = filterBySearch(items, searchFilter);
    
    // For inventory display, reverse the order to show most recent items first
    const displayItems = isInventory ? [...filteredItems].reverse() : filteredItems;
    
    return (
      <div className="item-grid">
        {displayItems.map((item, index) => {
          // For inventory items, we need to calculate the correct index for removal
          // since we reversed the display order
          const actualIndex = isInventory ? filteredItems.length - 1 - index : index;
          
          return (
            <div key={`${type}-${item.name}-${index}`} className="item-card">
              <div className="item-content">
                {type === 'weapons' && <WeaponComponent weapon={item as Weapon} />}
                {type === 'items' && <ItemComponent item={item as Item} />}
                {type === 'perks' && <PerkComponent perk={item as Perk} />}
              </div>
              <div className="item-actions">
                {isInventory ? (
                  <>{inventoryItemActions(item, actualIndex, type)}</>
                ) : (
                  (() => {
                    // For perks, check if character can afford it
                    if (type === 'perks') {
                      return perkItemActions(item as Perk);
                    } else {
                      return (
                        <button 
                          className="add-btn"
                          onClick={() => addToInventory(item, type)}
                          title="Add to inventory"
                        >
                          Add
                        </button>
                      );
                    }
                  })()
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [filterBySearch, searchFilter, addToInventory, inventoryItemActions, perkItemActions]);

  const panel = useCallback(() => {
    if (!selectedCharacter) return null;
    return (<>
      <div className="inventory-backdrop" onClick={() => setIsOpen(false)} />
      <div className="inventory-manager" ref={inventoryRef}>
        <div className="inventory-header">
          <h3>Inventory Manager - {selectedCharacter.name}</h3>
          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="inventory-tabs">
          {(['weapons', 'items', 'perks'] as ItemType[]).map(tab => (
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
                onClick={() => openBulkTransferAllEquipment()}
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
              <h4>Current Inventory ({
                activeTab === 'perks' 
                  ? selectedCharacter.perks.length 
                  : selectedCharacter.inventory[activeTab].length
              }) <span className="sort-indicator">• Most recent first</span></h4>
              {otherCharacters.length > 0 && (
                <button 
                  className="bulk-transfer-btn"
                  onClick={() => openBulkTransferDialog(activeTab)}
                  disabled={
                    activeTab === 'perks' 
                      ? selectedCharacter.perks.length === 0 
                      : selectedCharacter.inventory[activeTab].length === 0
                  }
                  title={`Transfer all ${activeTab} to another character`}
                >
                  Transfer All {activeTab === 'perks' ? 'Perks' : activeTab === 'weapons' ? 'Weapons' : 'Items'}
                </button>
              )}
            </div>
            {(activeTab === 'perks' 
              ? selectedCharacter.perks.length === 0 
              : selectedCharacter.inventory[activeTab].length === 0
            ) ? (
              <p className="empty-message">No {activeTab} in inventory</p>
            ) : (
              renderItemGrid(
                activeTab === 'perks' 
                  ? selectedCharacter.perks 
                  : selectedCharacter.inventory[activeTab], 
                activeTab, 
                true
              )
            )}
          </div>

          <div className="available-items">
            <h4>Available {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h4>
            {activeTab === 'weapons' && renderItemGrid(allWeapons, 'weapons')}
            {activeTab === 'items' && renderItemGrid(allItems, 'items')}
            {activeTab === 'perks' && renderItemGrid(allPerks, 'perks')}
          </div>
        </div>
      </div>
    </>)
  }, [selectedCharacter, activeTab, searchFilter, otherCharacters.length, renderItemGrid, allWeapons, allItems, allPerks, openBulkTransferAllEquipment, openBulkTransferDialog]);

  return (
    <>
      <button 
        className="inventory-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Manage'} Inventory
      </button>

      {isOpen && (<>{panel()}</>)}

      <ConfirmDialog
        isOpen={transferDialog.isOpen}
        onClose={cancelTransfer}
        title="Transfer Item"
        message={transferDialog.item ? 
          `Transfer "${transferDialog.item.name}" to another character?` : ''
        }
        buttons={[
          {
            text: "Cancel",
            onClick: cancelTransfer,
            variant: 'secondary'
          },
          {
            text: "Transfer",
            onClick: confirmTransfer,
            variant: 'primary',
            autoFocus: true
          }
        ]}
      >
        {transferDialog.isOpen && otherCharacters.length > 0 && (
          <div className="transfer-options">
            <label htmlFor="transfer-target">Transfer to:</label>
            <select
              id="transfer-target"
              value={transferDialog.toCharacterId}
              onChange={(e) => setTransferDialog(prev => ({
                ...prev,
                toCharacterId: e.target.value
              }))}
            >
              {otherCharacters.map(char => (
                <option key={char.id} value={char.id}>
                  {char.name}
                </option>
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
          } else {
            return `Transfer all ${itemCount} ${itemType} to another character?`;
          }
        })()}
        buttons={[
          {
            text: "Cancel",
            onClick: cancelBulkTransfer,
            variant: 'secondary'
          },
          {
            text: "Transfer All",
            onClick: confirmBulkTransfer,
            variant: 'primary',
            autoFocus: true
          }
        ]}
      >
        {bulkTransferDialog.isOpen && otherCharacters.length > 0 && (
          <div className="transfer-options">
            <label htmlFor="bulk-transfer-target">Transfer to:</label>
            <select
              id="bulk-transfer-target"
              value={bulkTransferDialog.toCharacterId}
              onChange={(e) => setBulkTransferDialog(prev => ({
                ...prev,
                toCharacterId: e.target.value
              }))}
            >
              {otherCharacters.map(char => (
                <option key={char.id} value={char.id}>
                  {char.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </ConfirmDialog>

      {/* Notification system */}
      <NotificationToast 
        notifications={notifications} 
        onDismiss={dismissNotification} 
      />
    </>
  );
}
