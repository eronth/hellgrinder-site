import RuleKeyword from "../../../../../common-design/RuleKeyword";
import { StatusEffect } from "../../../../../ts-types/types";
import { normalizeStatusEffectName } from "../helper";

type Props = {
  effect: StatusEffect;
  actionButton?: React.ReactNode;
};
export default function StatusEffectsCard({
  effect,
  actionButton
}: Props) {
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
          {actionButton}
          {/* {isActive ? (
            <button 
              className="remove-btn"
              onClick={() => onOpenDialog(effect)}
              title="Remove status effect"
            >
              Remove
            </button>
          ) : (
          }
        )}
        */}
        </div>
      </div>
    );
}