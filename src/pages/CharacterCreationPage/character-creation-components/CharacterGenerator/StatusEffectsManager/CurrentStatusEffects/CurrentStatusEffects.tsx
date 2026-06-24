import RuleKeyword from "../../../../../../components/keywords/RuleKeyword";
import { CharacterDesign } from "../../../../../../ts-types/player-character-types";
import EditStatusEffectDialog from "../Modify Effects/EditStatusEffectDialog/EditStatusEffectDialog";
import { normalizeStatusEffectName } from "../helper";
import { formatReactNode } from "../../../../../../utils/statusEffectUtils";
import StatusEffects from "../../../../../../data/status-effects";
import { ActiveStatusEffect } from "../../../../../../ts-types/types";

export type EditEffectDialogType = {
  isOpen: boolean;
  activeEffect: ActiveStatusEffect | null;
  index: number;
  x: number;
  y: number;
};

type Props = {
  character: CharacterDesign;
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
  editEffectDialogReactState: [
    EditEffectDialogType,
    React.Dispatch<React.SetStateAction<EditEffectDialogType>>
  ];
};
export default function CurrentStatusEffects({
  character,
  selectedCharacterId,
  onUpdateCharacter,
  editEffectDialogReactState: [editEffectDialog, setEditEffectDialog]
}: Props) {
  
  const getEffects = (activeEffect: ActiveStatusEffect) => {
    const normalizedName = normalizeStatusEffectName(activeEffect.name);
    const dbEffect = Object.values(StatusEffects).find(
      effect => normalizeStatusEffectName(effect.name) === normalizedName
    );
    return dbEffect?.effects || [];
  };
  
  const removeStatusEffect = (index: number) => {
    const newStatusEffects = character.statusEffects.filter((_, i) => i !== index);
    onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });
  };

  const confirmEditEffect = () => {
    const { activeEffect, index, x, y } = editEffectDialog;
    if (!activeEffect) return;

    const newStatusEffects = [...character.statusEffects];
    newStatusEffects[index] = {
      ...activeEffect,
      ...(activeEffect.x !== undefined ? { x } : {}),
      ...(activeEffect.y !== undefined ? { y } : {})
    };

    onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });

    setEditEffectDialog({
      isOpen: false,
      activeEffect: null,
      index: -1,
      x: 1,
      y: 1
    });
  };

  const openEditEffectDialog = (activeEffect: ActiveStatusEffect, index: number) => {
    setEditEffectDialog({
      isOpen: true,
      activeEffect,
      index,
      x: activeEffect.x || 1,
      y: activeEffect.y || 1
    });
  };

  return (<>
    <div className="current-status-effects">
      <h4>Active Status Effects ({character.statusEffects.length})</h4>
      {character.statusEffects.length === 0 ? (
        <p className="empty-message">No active status effects</p>
      ) : (
        <div className="status-effects-grid">
          {character.statusEffects.map((activeEffect, index) => (
            <div key={`active-${index}`} className="active status-effect status-effect-card">
              <div 
                className="content"
                onClick={() => openEditEffectDialog(activeEffect, index)}
                style={{ cursor: 'pointer' }}
                title="Click to edit values"
              >
                <div className="name">
                  <RuleKeyword
                    keyword={normalizeStatusEffectName(activeEffect.name)}
                    statusEffectX={activeEffect.x}
                    statusEffectY={activeEffect.y}
                  >
                    {formatReactNode(activeEffect.name, {
                      x: activeEffect.x ?? 'X',
                      y: activeEffect.y ?? 'Y',
                    })}
                  </RuleKeyword>
                </div>
                <div className="description">
                  {formatReactNode(activeEffect.description, { x: activeEffect.x ?? 'X', y: activeEffect.y ?? 'Y' })}
                  {(() => {
                    const effects = getEffects(activeEffect);
                    return effects.length > 0 ? (
                      <ul>
                        {effects.map((effect, idx) => {
                          const formattedEffect = formatReactNode(effect, {
                            x: activeEffect.x ?? 'X',
                            y: activeEffect.y ?? 'Y',
                          });
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
                  <div className="variables">
                    {activeEffect.x !== undefined && <span className="varval x-value">X: {activeEffect.x}</span>}
                    {activeEffect.y !== undefined && <span className="varval y-value">Y: {activeEffect.y}</span>}
                  </div>
                )}
              </div>
              <div className="action-buttons">
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

    <EditStatusEffectDialog
      character={character}
      editEffectDialogReactState={[editEffectDialog, setEditEffectDialog]}
      onConfirm={confirmEditEffect}
    />
  </>);
};
