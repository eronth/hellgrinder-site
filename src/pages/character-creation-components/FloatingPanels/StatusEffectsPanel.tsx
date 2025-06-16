import Panel from './Panel';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { ActiveStatusEffect } from '../CharacterGenerator/CharacterGenerator';
import './StatusEffectsPanel.css';
import StatusKeyword from '../../../common-design/StatusKeyword';

interface Props {
  statusEffects: ActiveStatusEffect[];
  characterName: string;
};

export default function StatusEffectsPanel({
  statusEffects,
  characterName
}: Props) {
  
  if (statusEffects.length === 0) return null;

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
                effect={activeEffect.effect.name}
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
