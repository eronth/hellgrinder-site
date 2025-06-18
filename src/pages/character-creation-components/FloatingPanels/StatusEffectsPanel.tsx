import Panel from './Panel';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { ActiveStatusEffect } from '../CharacterGenerator/CharacterGenerator';
import './StatusEffectsPanel.css';
import StatusKeyword from '../../../common-design/StatusKeyword';
import Statuses from '../../../common-design/game-terms/status-effects.tsx';

interface Props {
  statusEffects: ActiveStatusEffect[];
  characterName: string;
};

export default function StatusEffectsPanel({
  statusEffects,
  characterName
}: Props) {
  
  if (statusEffects.length === 0) return null;

  // Helper function to normalize status effect names for keyword matching
  const normalizeStatusEffectName = (name: string): 'error' | keyof typeof Statuses => {
    const statusName = name
      .replace(/\[\[X\]\]/g, '') // Remove X placeholders
      .replace(/\[\[Y\]\]/g, '') // Remove Y placeholders
      .replace(/\s+for\s+$/i, '') // Remove trailing "for" (case insensitive)
      .replace(/\s+for\s+/i, ' ') // Replace "for" in middle with single space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim().toLocaleLowerCase() as keyof typeof Statuses; // Remove leading/trailing whitespace

    return (Statuses[statusName] ? statusName : 'error');
  };

  return (
    <Panel
      icon={faShield}
      headerText={`${characterName} - Effects (${statusEffects.length})`}
      headerClassName="status-effects-header"
    >
      <div className="panel-content status-effects-panel">
        <div className="status-list">
          {statusEffects.map((activeEffect, index) => (
            <div key={index} className="status-item">
              <StatusKeyword 
                effect={normalizeStatusEffectName(activeEffect.effect.name)}
                x={activeEffect.x}
                y={activeEffect.y}
              />
              {(activeEffect.x !== undefined || activeEffect.y !== undefined) && (
                <div className="status-effect-values" style={{ marginTop: '0.25rem' }}>
                  {activeEffect.x !== undefined && <span className="x-value">X: {activeEffect.x}</span>}
                  {activeEffect.y !== undefined && <span className="y-value">Y: {activeEffect.y}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
