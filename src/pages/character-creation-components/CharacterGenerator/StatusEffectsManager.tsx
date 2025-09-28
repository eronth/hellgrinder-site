import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StatusEffect } from '../../../ts-types/types';
import { CharacterDesign, ActiveStatusEffect } from './CharacterGenerator';
import ConfirmDialog from './ConfirmDialog';
import RuleKeyword from '../../../common-design/RuleKeyword';
import StatusEffects from '../../../common-design/game-terms/status-effects';

import './StatusEffectsManager.css';

interface StatusEffectsManagerProps {
  character: CharacterDesign;
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
};

export default function StatusEffectsManager({
  character,
  selectedCharacterId,
  onUpdateCharacter
}: StatusEffectsManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const managerRef = useRef<HTMLDivElement>(null);
  
  const [addEffectDialog, setAddEffectDialog] = useState<{
    isOpen: boolean;
    effect: StatusEffect | null;
    x: number;
    y: number;
  }>({
    isOpen: false,
    effect: null,
    x: 1,
    y: 1
  });

  const [editEffectDialog, setEditEffectDialog] = useState<{
    isOpen: boolean;
    activeEffect: ActiveStatusEffect | null;
    index: number;
    x: number;
    y: number;
  }>({
    isOpen: false,
    activeEffect: null,
    index: -1,
    x: 1,
    y: 1
  });

  // Handle clicking outside the modal and escape key to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      
      const target = event.target as Node;
      
      // Don't close if clicking inside the main manager
      if (managerRef.current && managerRef.current.contains(target)) {
        return;
      }
      
      // Don't close if clicking inside any open dialogs
      if (addEffectDialog.isOpen || editEffectDialog.isOpen) {
        // Check if click is inside a dialog
        const clickedElement = event.target as Element;
        if (clickedElement && (
          clickedElement.closest('.confirm-dialog') ||
          clickedElement.closest('.confirm-dialog-overlay')
        )) {
          return;
        }
      }
      
      setIsOpen(false);
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        // Only close the main manager if no dialogs are open
        if (!addEffectDialog.isOpen && !editEffectDialog.isOpen) {
          setIsOpen(false);
        }
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
  }, [isOpen, addEffectDialog.isOpen, editEffectDialog.isOpen]);

  if (!character) return null;

  // Get all available status effects alphabetically sorted
  const allStatusEffects = (Object.values(StatusEffects)
    .sort((a, b) => a.name.localeCompare(b.name)));

  // Helper function to normalize status effect names for comparison
  const normalizeStatusEffectName = (name: string): string => {
    return name
      .replace(/\[\[X\]\]/g, '') // Remove X placeholders
      .replace(/\[\[Y\]\]/g, '') // Remove Y placeholders
      .replace(/\s+for\s+$/i, '') // Remove trailing "for" (case insensitive)
      .replace(/\s+for\s+/i, ' ') // Replace "for" in middle with single space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing whitespace
  };

  // Filter status effects by search
  const filterBySearch = (effects: StatusEffect[], searchTerm: string) => {
    if (!searchTerm) return effects;
    return effects.filter(effect => 
      effect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      effect.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const openAddEffectDialog = (effect: StatusEffect) => {
    setAddEffectDialog({
      isOpen: true,
      effect,
      x: 1,
      y: 1
    });
  };

  const confirmAddEffect = () => {
    const { effect, x, y } = addEffectDialog;
    if (!effect) return;

    // Check if this status effect already exists
    const existingIndex = character.statusEffects.findIndex(
      activeEffect => normalizeStatusEffectName(activeEffect.effect.name) === normalizeStatusEffectName(effect.name)
    );

    if (existingIndex !== -1) {
      // Merge with existing effect by adding x and y values
      const existingEffect = character.statusEffects[existingIndex];
      const newStatusEffects = [...character.statusEffects];

      newStatusEffects[existingIndex] = {
        ...existingEffect,
        ...(effect.x !== undefined ? { 
          x: (existingEffect.x || 0) + x 
        } : {}),
        ...(effect.y !== undefined ? { 
          y: (existingEffect.y || 0) + y 
        } : {})
      };
      
      onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });
    } else {
      // Add new effect
      const activeEffect: ActiveStatusEffect = {
        effect,
        ...(effect.x !== undefined ? { x } : {}),
        ...(effect.y !== undefined ? { y } : {})
      };

      const newStatusEffects = [...character.statusEffects, activeEffect];
      onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });
    }

    setAddEffectDialog({
      isOpen: false,
      effect: null,
      x: 1,
      y: 1
    });
  };

  const openEditEffectDialog = (activeEffect: ActiveStatusEffect, index: number) => {
    setEditEffectDialog({
      isOpen: true,
      activeEffect,
      index,
      x: activeEffect.x || 1,
      y: activeEffect.y || 1
    });
  };

  const confirmEditEffect = () => {
    const { activeEffect, index, x, y } = editEffectDialog;
    if (!activeEffect) return;

    const newStatusEffects = [...character.statusEffects];
    newStatusEffects[index] = {
      ...activeEffect,
      ...(activeEffect.effect.x !== undefined ? { x } : {}),
      ...(activeEffect.effect.y !== undefined ? { y } : {})
    };

    onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });

    setEditEffectDialog({
      isOpen: false,
      activeEffect: null,
      index: -1,
      x: 1,
      y: 1
    });
  };

  const cancelEditEffect = () => {
    setEditEffectDialog({
      isOpen: false,
      activeEffect: null,
      index: -1,
      x: 1,
      y: 1
    });
  };

  const cancelAddEffect = () => {
    setAddEffectDialog({
      isOpen: false,
      effect: null,
      x: 1,
      y: 1
    });
  };

  const removeStatusEffect = (index: number) => {
    const newStatusEffects = character.statusEffects.filter((_, i) => i !== index);
    onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });
  };

  const renderStatusEffectCard = (effect: StatusEffect, isActive = false, activeIndex?: number) => {
    return (
      <div key={effect.name} className="status-effect-card">
        <div className="status-effect-content">
          <div className="status-effect-name">
            <RuleKeyword keyword={normalizeStatusEffectName(effect.name)}>
              {effect.name}
            </RuleKeyword>
          </div>
          <div className="status-effect-description">
            {effect.description}
          </div>
          {(effect.x !== undefined || effect.y !== undefined) && (
            <div className="status-effect-variables">
              {effect.x !== undefined && <span className="variable-info">Has X value</span>}
              {effect.y !== undefined && <span className="variable-info">Has Y value</span>}
            </div>
          )}
        </div>
        <div className="status-effect-actions">
          {isActive ? (
            <button 
              className="remove-btn"
              onClick={() => removeStatusEffect(activeIndex!)}
              title="Remove status effect"
            >
              Remove
            </button>
          ) : (
            <button 
              className="add-btn"
              onClick={() => openAddEffectDialog(effect)}
              title="Add status effect"
            >
              Add
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <button 
        className="status-effects-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Manage'} Status Effects
      </button>

      {isOpen && (<>
        <div className="status-effects-backdrop" onClick={() => setIsOpen(false)} />

        <div className="status-effects-manager" ref={managerRef}>
          <div className="status-effects-header">
            <h3>Status Effects Manager - {character.name}</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="search-section">
            <input
              type="text"
              placeholder="Search status effects..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="status-effects-content">
            <div className="current-status-effects">
              <h4>Active Status Effects ({character.statusEffects.length})</h4>
              {character.statusEffects.length === 0 ? (
                <p className="empty-message">No active status effects</p>
              ) : (
                <div className="status-effects-grid">
                  {character.statusEffects.map((activeEffect, index) => (
                    <div key={`active-${index}`} className="active-status-effect-card">
                      <div 
                        className="active-status-effect-content"
                        onClick={() => openEditEffectDialog(activeEffect, index)}
                        style={{ cursor: 'pointer' }}
                        title="Click to edit values"
                      >
                        <div className="status-effect-name">
                          <RuleKeyword 
                            keyword={normalizeStatusEffectName(activeEffect.effect.name)}
                            statusEffectX={activeEffect.x}
                            statusEffectY={activeEffect.y}
                          >
                            {activeEffect.effect.name
                              .replace('[[X]]', activeEffect.x?.toString() || 'X')
                              .replace('[[Y]]', activeEffect.y?.toString() || 'Y')
                            }
                          </RuleKeyword>
                        </div>
                        {(activeEffect.x !== undefined || activeEffect.y !== undefined) && (
                          <div className="status-effect-values">
                            {activeEffect.x !== undefined && <span className="x-value">X: {activeEffect.x}</span>}
                            {activeEffect.y !== undefined && <span className="y-value">Y: {activeEffect.y}</span>}
                          </div>
                        )}
                      </div>
                      <div className="status-effect-actions">
                        <button 
                          className="remove-btn"
                          onClick={() => removeStatusEffect(index)}
                          title="Remove status effect"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="available-status-effects">
              <h4>Available Status Effects</h4>
              <div className="status-effects-grid">
                {filterBySearch(allStatusEffects, searchFilter).map((effect) => 
                  renderStatusEffectCard(effect)
                )}
              </div>
            </div>
          </div>
        </div>
      </>)}

      <ConfirmDialog
        isOpen={addEffectDialog.isOpen}
        title="Add Status Effect"
        message={
          addEffectDialog.effect && character.statusEffects.some(
            activeEffect => normalizeStatusEffectName(activeEffect.effect.name) === normalizeStatusEffectName(addEffectDialog.effect?.name || '')
          ) 
            ? `"${addEffectDialog.effect?.name}" already exists. Values will be added together.`
            : `Add "${addEffectDialog.effect?.name}" to ${character.name}?`
        }
        buttons={[
          {
            text: "Cancel",
            onClick: cancelAddEffect,
            variant: 'secondary'
          },
          {
            text: "Add Effect",
            onClick: confirmAddEffect,
            variant: 'primary',
            autoFocus: true
          }
        ]}
      >
        {addEffectDialog.isOpen && addEffectDialog.effect && (
          <div className="effect-value-inputs">
            {addEffectDialog.effect.x !== undefined && (
              <div className="value-input-group">
                <label htmlFor="x-value">X Value:</label>
                <input
                  id="x-value"
                  type="number"
                  min="1"
                  max="10"
                  value={addEffectDialog.x}
                  onChange={(e) => setAddEffectDialog(prev => ({
                    ...prev,
                    x: parseInt(e.target.value) || 1
                  }))}
                />
              </div>
            )}
            {addEffectDialog.effect.y !== undefined && (
              <div className="value-input-group">
                <label htmlFor="y-value">Y Value:</label>
                <input
                  id="y-value"
                  type="number"
                  min="1"
                  max="10"
                  value={addEffectDialog.y}
                  onChange={(e) => setAddEffectDialog(prev => ({
                    ...prev,
                    y: parseInt(e.target.value) || 1
                  }))}
                />
              </div>
            )}
          </div>
        )}
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={editEffectDialog.isOpen}
        title="Edit Status Effect"
        message={`Edit "${editEffectDialog.activeEffect?.effect.name}" for ${character.name}?`}
        buttons={[
          {
            text: "Cancel",
            onClick: cancelEditEffect,
            variant: 'secondary'
          },
          {
            text: "Update Effect",
            onClick: confirmEditEffect,
            variant: 'primary',
            autoFocus: true
          }
        ]}
      >
        {editEffectDialog.isOpen && editEffectDialog.activeEffect && (
          <div className="effect-value-inputs">
            {editEffectDialog.activeEffect.effect.x !== undefined && (
              <div className="value-input-group">
                <label htmlFor="edit-x-value">X Value:</label>
                <input
                  id="edit-x-value"
                  type="number"
                  min="1"
                  max="10"
                  value={editEffectDialog.x}
                  onChange={(e) => setEditEffectDialog(prev => ({
                    ...prev,
                    x: parseInt(e.target.value) || 1
                  }))}
                />
              </div>
            )}
            {editEffectDialog.activeEffect.effect.y !== undefined && (
              <div className="value-input-group">
                <label htmlFor="edit-y-value">Y Value:</label>
                <input
                  id="edit-y-value"
                  type="number"
                  min="1"
                  max="10"
                  value={editEffectDialog.y}
                  onChange={(e) => setEditEffectDialog(prev => ({
                    ...prev,
                    y: parseInt(e.target.value) || 1
                  }))}
                />
              </div>
            )}
          </div>
        )}
      </ConfirmDialog>
    </>
  );
}
