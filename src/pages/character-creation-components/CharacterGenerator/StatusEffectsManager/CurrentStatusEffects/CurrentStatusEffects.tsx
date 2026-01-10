import RuleKeyword from "../../../../../common-design/RuleKeyword";
import { ActiveStatusEffect, CharacterDesign } from "../../CharacterGenerator";
import EditStatusEffectDialog from "../Modify Effects/EditStatusEffectDialog/EditStatusEffectDialog";
import { normalizeStatusEffectName } from "../helper";

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
      ...(activeEffect.effect.x !== undefined ? { x } : {}),
      ...(activeEffect.effect.y !== undefined ? { y } : {})
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
            <div key={`active-${index}`} className="active status-effect-card">
              <div 
                className="content"
                onClick={() => openEditEffectDialog(activeEffect, index)}
                style={{ cursor: 'pointer' }}
                title="Click to edit values"
              >
                <div className="name">
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
                </div>
                <div className="description">

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
