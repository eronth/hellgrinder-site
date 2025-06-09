import { useState } from 'react';
import { Weapon, Item, Perk } from '../../ts-types/types';
import { CharDesign } from './CharacterGenerator';
import ConfirmDialog from './ConfirmDialog';
import WeaponComponent from './kits/weapon/WeaponComponent';
import ItemComponent from './kits/item/ItemComponent';
import PerkComponent from './perks/PerkComponent';
import Tools from '../../common-design/Tools';

// Import equipment databases
import MeleeWeapons from '../../common-design/equipment/weapons/melee-weapons';
import ShootingWeapons from '../../common-design/equipment/weapons/shooting-weapons';
import ThrownWeapons from '../../common-design/equipment/weapons/thrown-weapons';
import ArcaneWeapons from '../../common-design/equipment/weapons/arcane-weapons';
import WandsAndStaves from '../../common-design/equipment/weapons/wands-and-staves';
import Armor from '../../common-design/equipment/armor';
import Gear from '../../common-design/equipment/gear';
import Perks from '../../common-design/equipment/perks';

import './InventoryManager.css';

interface InventoryManagerProps {
  characters: CharDesign[];
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharDesign>) => void;
}

type ItemType = 'weapons' | 'items' | 'perks';

export default function InventoryManager({
  characters,
  selectedCharacterId,
  onUpdateCharacter
}: InventoryManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ItemType>('weapons');
  const [searchFilter, setSearchFilter] = useState('');
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

  if (!selectedCharacter) return null;

  // Combine all equipment databases
  const allWeapons = [
    ...Tools.sortWeapons(MeleeWeapons),
    ...Tools.sortWeapons(ShootingWeapons),
    ...Tools.sortWeapons(ThrownWeapons),
    ...Tools.sortWeapons(ArcaneWeapons)
  ];
  
  const allItems = [
    ...Tools.sortItems(WandsAndStaves),
    ...Tools.sortItems(Armor),
    ...Tools.sortItems(Gear)
  ];
  
  const allPerks = Tools.sortPerks(Perks);

  // Filter functions
  const filterBySearch = (items: any[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const addToInventory = (item: Weapon | Item | Perk, type: ItemType) => {
    if (type === 'perks') {
      // Add perks to main perks array instead of inventory
      const newPerks = [...selectedCharacter.perks, structuredClone(item as Perk)];
      onUpdateCharacter(selectedCharacterId, { perks: newPerks });
    } else {
      // Add weapons/items to inventory
      const newInventory = {
        ...selectedCharacter.inventory,
        [type]: [...selectedCharacter.inventory[type], structuredClone(item)]
      };
      onUpdateCharacter(selectedCharacterId, { inventory: newInventory });
    }
  };

  const removeFromInventory = (index: number, type: ItemType) => {
    if (type === 'perks') {
      // Remove from main perks array
      const newPerks = selectedCharacter.perks.filter((_, i) => i !== index);
      onUpdateCharacter(selectedCharacterId, { perks: newPerks });
    } else {
      // Remove from inventory
      const newInventory = {
        ...selectedCharacter.inventory,
        [type]: selectedCharacter.inventory[type].filter((_, i) => i !== index)
      };
      onUpdateCharacter(selectedCharacterId, { inventory: newInventory });
    }
  };

  const openTransferDialog = (item: Weapon | Item | Perk, itemType: ItemType) => {
    setTransferDialog({
      isOpen: true,
      item,
      itemType,
      fromCharacterId: selectedCharacterId,
      toCharacterId: otherCharacters.length > 0 ? otherCharacters[0].id : ''
    });
  };

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
      const fromItemIndex = fromCharacter.inventory[itemType].findIndex((invItem: any) => 
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

  const openBulkTransferDialog = (itemType: ItemType) => {
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
  };

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

  const openBulkTransferAllEquipment = () => {
    const totalItems = selectedCharacter.inventory.weapons.length + selectedCharacter.inventory.items.length;
    if (totalItems === 0) return;

    setBulkTransferDialog({
      isOpen: true,
      itemType: 'weapons', // We'll use 'weapons' as a flag for "all equipment"
      fromCharacterId: selectedCharacterId,
      toCharacterId: otherCharacters.length > 0 ? otherCharacters[0].id : '',
      itemCount: totalItems
    });
  };

  const renderItemGrid = (items: any[], type: ItemType, isInventory = false) => {
    const filteredItems = filterBySearch(items, searchFilter);
    
    return (
      <div className="item-grid">
        {filteredItems.map((item, index) => (
          <div key={`${type}-${item.name}-${index}`} className="item-card">
            <div className="item-content">
              {type === 'weapons' && <WeaponComponent weapon={item} />}
              {type === 'items' && <ItemComponent item={item} />}
              {type === 'perks' && <PerkComponent perk={item} />}
            </div>
            <div className="item-actions">
              {isInventory ? (
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
        ))}
      </div>
    );
  };

  return (
    <>
      <button 
        className="inventory-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Manage'} Inventory
      </button>

      {isOpen && (
        <div className="inventory-manager">
          <div className="inventory-header">
            <h3>Inventory Manager - {selectedCharacter.name}</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
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
                })</h4>
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
      )}

      <ConfirmDialog
        isOpen={transferDialog.isOpen}
        title="Transfer Item"
        message={transferDialog.item ? 
          `Transfer "${transferDialog.item.name}" to another character?` : ''
        }
        confirmText="Transfer"
        cancelText="Cancel"
        confirmButtonVariant="primary"
        onConfirm={confirmTransfer}
        onCancel={cancelTransfer}
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
        confirmText="Transfer All"
        cancelText="Cancel"
        confirmButtonVariant="primary"
        onConfirm={confirmBulkTransfer}
        onCancel={cancelBulkTransfer}
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
    </>
  );
}
