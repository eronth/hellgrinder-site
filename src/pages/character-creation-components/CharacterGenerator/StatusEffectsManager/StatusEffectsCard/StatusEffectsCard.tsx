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
        <div className="content">
          <div className="name">
            <RuleKeyword keyword={normalizeStatusEffectName(effect.name)}>
              {effect.name}
            </RuleKeyword>
          </div>
          <div className="description">
            {effect.description}
          </div>
          {(effect.x !== undefined || effect.y !== undefined) && (
            <div className="variables">
              {effect.x !== undefined && <span className="varval x-value">Has X value</span>}
              {effect.y !== undefined && <span className="varval y-value">Has Y value</span>}
          </div>
          )}
        </div>
        <div className="action-buttons">
          {actionButton}
        </div>
      </div>
    );
}