import Panel from './Panel';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import StatusKeyword from '../StatusKeyword';
import Statuses from '../game-terms/status-effects.tsx';
import StatusEffects from '../game-terms/status-effects';
// Functions
import { formatReactNode } from '../utils/StatusEffectsUtils.tsx';
// Types
import { ActiveStatusEffect } from '../../ts-types/types.tsx';
// Css
import './StatusEffectsPanel.css';

interface Props {
  statusEffects: ActiveStatusEffect[];
  characterName: string;
};

export default function StatusEffectsPanel({
  statusEffects,
  characterName
}: Props) {

  // Helper to get effects array, looking up from database if it's missing (due to serialization)
  const getEffects = (activeEffect: ActiveStatusEffect) => {
    if (activeEffect.effects && activeEffect.effects.length > 0) {
      return activeEffect.effects;
    }
    // Effects missing - look up from database by normalized name
    const normalizedName = normalizeStatusEffectName(activeEffect.name);
    const dbEffect = Object.values(StatusEffects).find(
      effect => normalizeStatusEffectName(effect.name) === normalizedName
    );
    return dbEffect?.effects || [];
  };
  
  if (statusEffects.length === 0) return null;

  // Helper function to normalize status effect names for keyword matching
  const normalizeStatusEffectName = (name: string): 'error' | keyof typeof Statuses => {
    const statusName = name
      .replace(/\[\[.*?\]\]/gi, '') // Remove variables inside [[]]
      .replace(/\s*\(.*?\)\s*/g, '') // Remove trailing () and details inside ()
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
                effect={normalizeStatusEffectName(activeEffect.name)}
                x={activeEffect.x}
                y={activeEffect.y}
              />
              <div className="details">
                {(() => {
                    const effects = getEffects(activeEffect);
                    return effects.length > 0 ? (
                      <ul>
                        {effects.map((effect, idx) => {
                          const formattedEffect = formatReactNode(effect, { x: activeEffect.x, y: activeEffect.y });
                          return (
                            <li key={idx}>
                              {formattedEffect}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null;
                  })()}
              </div>
              {(activeEffect.x !== undefined || activeEffect.y !== undefined) && (
                <div className="status-effect-values" style={{ marginTop: '0.25rem' }}>
                  {activeEffect.x !== undefined && <span className="varval x-value">X: {activeEffect.x}</span>}
                  {activeEffect.y !== undefined && <span className="varval y-value">Y: {activeEffect.y}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
