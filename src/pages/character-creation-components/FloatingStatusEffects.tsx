import { ActiveStatusEffect } from './CharacterGenerator';
import RuleKeyword from '../../common-design/RuleKeyword';
import './StatusEffectsManager.css';

interface FloatingStatusEffectsProps {
  statusEffects: ActiveStatusEffect[];
  characterName: string;
}

export default function FloatingStatusEffects({
  statusEffects,
  characterName
}: FloatingStatusEffectsProps) {
  if (statusEffects.length === 0) return null;

  // Helper function to normalize status effect names for keyword matching
  const normalizeStatusEffectName = (name: string): string => {
    return name
      .replace(/\[\[X\]\]/g, '') // Remove X placeholders
      .replace(/\[\[Y\]\]/g, '') // Remove Y placeholders
      .replace(/\s+for\s+$/i, '') // Remove trailing "for" (case insensitive)
      .replace(/\s+for\s+/i, ' ') // Replace "for" in middle with single space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing whitespace
  };

  return (
    <div className="floating-status-effects">
      <h4>{characterName} - Active Effects</h4>
      <div className="floating-status-list">
        {statusEffects.map((activeEffect, index) => (
          <div key={index} className="floating-status-item">
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
  );
}
