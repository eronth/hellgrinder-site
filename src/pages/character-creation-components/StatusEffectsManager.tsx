import { useState, useEffect, useRef } from 'react';
import { StatusEffect } from '../../ts-types/types';
import { CharDesign, ActiveStatusEffect } from './CharacterGenerator';
import ConfirmDialog from './ConfirmDialog';
import RuleKeyword from '../../common-design/RuleKeyword';
import StatusEffects from '../../common-design/game-terms/status-effects';

import './StatusEffectsManager.css';

interface StatusEffectsManagerProps {
  characters: CharDesign[];
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharDesign>) => void;
}

export default function StatusEffectsManager({
  characters,
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

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);

  if (!selectedCharacter) return null;

  // Get all available status effects
  const allStatusEffects = Object.values(StatusEffects);

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

    const activeEffect: ActiveStatusEffect = {
      effect,
      ...(effect.x !== undefined ? { x } : {}),
      ...(effect.y !== undefined ? { y } : {})
    };

    const newStatusEffects = [...selectedCharacter.statusEffects, activeEffect];
    onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });

    setAddEffectDialog({
      isOpen: false,
      effect: null,
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
    const newStatusEffects = selectedCharacter.statusEffects.filter((_, i) => i !== index);
    onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });
  };

  // Handle clicking outside the modal and escape key to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && managerRef.current && !managerRef.current.contains(event.target as Node)) {
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

  const renderStatusEffectCard = (effect: StatusEffect, isActive = false, activeIndex?: number) => {
    return (
      <div key={effect.name} className="status-effect-card">
        <div className="status-effect-content">
          <div className="status-effect-name">
            <RuleKeyword keyword={effect.name.replace(/\s*\[\[X\]\]|\s*\[\[Y\]\]/g, '')}>
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
            <h3>Status Effects Manager - {selectedCharacter.name}</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
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
              <h4>Active Status Effects ({selectedCharacter.statusEffects.length})</h4>
              {selectedCharacter.statusEffects.length === 0 ? (
                <p className="empty-message">No active status effects</p>
              ) : (
                <div className="status-effects-grid">
                  {selectedCharacter.statusEffects.map((activeEffect, index) => (
                    <div key={`active-${index}`} className="active-status-effect-card">
                      <div className="active-status-effect-content">
                        <div className="status-effect-name">
                          <RuleKeyword 
                            keyword={activeEffect.effect.name.replace(/\s*\[\[X\]\]|\s*\[\[Y\]\]/g, '')}
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
        message={`Add "${addEffectDialog.effect?.name}" to ${selectedCharacter.name}?`}
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
    </>
  );
}
