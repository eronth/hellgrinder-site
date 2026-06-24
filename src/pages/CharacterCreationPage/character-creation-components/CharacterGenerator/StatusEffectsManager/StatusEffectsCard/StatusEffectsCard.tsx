import RuleKeyword from "../../../../../../components/keywords/RuleKeyword";
import { StatusEffect } from "../../../../../../ts-types/types";
import { normalizeStatusEffectName } from "../helper";
import { formatReactNode } from "../../../../../../utils/statusEffectUtils";

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
              {formatReactNode(effect.name, { x: 'X', y: 'Y' })}
            </RuleKeyword>
          </div>
          <div className="description">
            {formatReactNode(effect.description, { x: 'X', y: 'Y' })}
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