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

  return (
    <div className="floating-status-effects">
      <h4>{characterName} - Active Effects</h4>
      <div className="floating-status-list">
        {statusEffects.map((activeEffect, index) => (
          <div key={index} className="floating-status-item">
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
