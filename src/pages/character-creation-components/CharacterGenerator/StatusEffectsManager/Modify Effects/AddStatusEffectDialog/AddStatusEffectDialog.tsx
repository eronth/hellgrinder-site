import { CharacterDesign } from "../../../CharacterGenerator";
import ConfirmDialog from "../../../ConfirmDialog/ConfirmDialog";
import { AddEffectDialogType } from "../../AvailableStatusEffects/AvailableStatusEffects";
import { normalizeStatusEffectName } from "../../helper";
import '../ModifyStatusEffectsDialog.css';

type Props = {
  character: CharacterDesign;
  onConfirm: () => void;
  addEffectDialogReactState: [
    AddEffectDialogType,
    React.Dispatch<React.SetStateAction<AddEffectDialogType>>
  ];
};
export default function AddStatusEffectDialog({
  character,
  onConfirm,
  addEffectDialogReactState
}: Props) {
  const [addEffectDialog, setAddEffectDialog] = addEffectDialogReactState;

  const cancel = () => {
    setAddEffectDialog({
      isOpen: false,
      effect: null,
      x: 1,
      y: 1
    });
  };

  return (<>
  <ConfirmDialog
      isOpen={addEffectDialog.isOpen}
      onClose={cancel}
      title="Add Status Effect"
      buttons={[
        {
          text: "Cancel",
          onClick: cancel,
          variant: 'secondary'
        },
        {
          text: "Add Effect",
          onClick: onConfirm,
          variant: 'primary',
          autoFocus: true
        }
      ]}
      message={
        addEffectDialog.effect && character.statusEffects.some(
          activeEffect => normalizeStatusEffectName(
            activeEffect.effect.name) === normalizeStatusEffectName(addEffectDialog.effect?.name || ''
          )
        ) 
        ? `"${normalizeStatusEffectName(addEffectDialog.effect?.name)}" already exists! Any X or Y values will be added together for the final result.`
        : `Add "${addEffectDialog.effect?.name}" to ${character.name}?`
      }
    >
      {addEffectDialog.isOpen && addEffectDialog.effect && (
        <div className="modify-effects effect-value-inputs">
          {addEffectDialog.effect.x !== undefined && (
            <div className="value-input-group">
              <label htmlFor="x-value">X Value:</label>
              <input
                id="x-value"
                type="number"
                min="1"
                max="10"
                value={addEffectDialog.x}
                onChange={(e) => setAddEffectDialog(prev => ({
                  ...prev,
                  x: parseInt(e.target.value) || 1
                }))}
              />
            </div>
          )}
          {addEffectDialog.effect.y !== undefined && (
            <div className="value-input-group">
              <label htmlFor="y-value">Y Value:</label>
              <input
                id="y-value"
                type="number"
                min="1"
                max="10"
                value={addEffectDialog.y}
                onChange={(e) => setAddEffectDialog(prev => ({
                  ...prev,
                  y: parseInt(e.target.value) || 1
                }))}
              />
            </div>
          )}
        </div>
      )}
    </ConfirmDialog>
  </>)
};
