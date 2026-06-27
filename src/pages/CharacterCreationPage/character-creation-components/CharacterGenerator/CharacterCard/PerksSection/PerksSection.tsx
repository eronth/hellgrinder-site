import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Perk } from '../../../../../../ts-types/types';
import { CharacterDesign } from '../../../../../../ts-types/player-character-types';
import CharacterGeneratorTools from '../../../../../../utils/characterGeneratorTools';
import CharacterPerksDisplay from '../CharacterPerksDisplay/CharacterPerksDisplay';
import './PerksSection.css';

type Props = {
  character: CharacterDesign;
  onSetPerks: (newPerks: Perk[]) => void;
};

export default function PerksSection({ character, onSetPerks }: Props) {
  const [showSelector, setShowSelector] = React.useState(false);
  const [locked, setLocked] = React.useState(false);
  const allPerks = CharacterGeneratorTools.getAllPerks();

  const hasPerks = character.perks.length > 0;
  const spentPoints = character.perks.reduce((sum, p) => sum + p.cost, 0);
  const totalBudget = character.stats.perkPoints + spentPoints;

  function handleRandomize() {
    const { perks } = CharacterGeneratorTools.randomizePerks(totalBudget);
    onSetPerks(perks);
    setShowSelector(false);
    setLocked(false);
  }

  function handleTogglePerk(perk: Perk) {
    const alreadySelected = character.perks.some(p => p.name === perk.name);
    if (alreadySelected) {
      onSetPerks(character.perks.filter(p => p.name !== perk.name));
    } else {
      if (perk.cost > character.stats.perkPoints) return;
      const clone = CharacterGeneratorTools.selectPerk(perk);
      onSetPerks([...character.perks, clone]);
    }
  }

  function handleToggleLock() {
    if (!locked) setShowSelector(false);
    setLocked(v => !v);
  }

  return (
    <div className="perks-section">
      <div className="perks-header">
        <div className="perks-title">Perks</div>
        <div className="perks-controls">
          <span className="perks-budget" title="Perk points remaining / total">
            {character.stats.perkPoints}/{totalBudget} pts
          </span>
          <button
            className="perks-randomize-btn"
            onClick={handleRandomize}
            disabled={locked}
          >
            {hasPerks ? '↺ Re-randomize' : 'Randomize'}
          </button>
          <button
            className="perks-select-btn"
            onClick={() => setShowSelector(v => !v)}
            disabled={locked}
          >
            {showSelector ? 'Done' : 'Select Perks'}
          </button>
          <button
            className={`perks-lock-btn ${locked ? 'locked' : 'unlocked'}`}
            onClick={handleToggleLock}
            title={locked ? 'Unlock to edit' : 'Lock perks'}
          >
            <FontAwesomeIcon icon={locked ? faLock : faLockOpen} />
          </button>
        </div>
      </div>

      {showSelector && !locked && (
        <div className="perk-selector">
          <div className="perk-selector-hint">
            Select perks ({character.stats.perkPoints} point{character.stats.perkPoints !== 1 ? 's' : ''} remaining)
          </div>
          <div className="perk-selector-list">
            {allPerks.map(perk => {
              const isSelected = character.perks.some(p => p.name === perk.name);
              const canAfford = perk.cost <= character.stats.perkPoints;
              const disabled = !isSelected && !canAfford;
              return (
                <button
                  key={perk.name}
                  className={`perk-option ${isSelected ? 'selected' : ''} ${disabled ? 'unaffordable' : ''}`}
                  onClick={() => handleTogglePerk(perk)}
                  disabled={disabled}
                  title={perk.description ?? ''}
                >
                  <span className="perk-option-cost">{perk.cost}pt</span>
                  <span className="perk-option-name">{perk.name}</span>
                  {isSelected && <span className="perk-option-check">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasPerks && <CharacterPerksDisplay character={character} />}
    </div>
  );
}
