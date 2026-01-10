import { CharacterDesign } from "../../CharacterGenerator";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import { EditEffectDialogType } from "../CurrentStatusEffects/CurrentStatusEffects";


type Props = {
  character: CharacterDesign;
  onConfirm: () => void;
  editEffectDialogReactState: [
    EditEffectDialogType,
    React.Dispatch<React.SetStateAction<EditEffectDialogType>>
  ];
};
export default function EditStatusEffectDialog({
  character,
  onConfirm,
  editEffectDialogReactState
}: Props) {
  const [editEffectDialog, setEditEffectDialog] = editEffectDialogReactState;
  
  const cancel = () => {
    setEditEffectDialog({
      isOpen: false,
      activeEffect: null,
      index: -1,
      x: 1,
      y: 1
    });
  };

  return (<>
    <ConfirmDialog
        isOpen={editEffectDialog.isOpen}
        onClose={cancel}
        title="Edit Status Effect"
        message={`Edit "${editEffectDialog.activeEffect?.effect.name}" for ${character.name}?`}
        buttons={[
          {
            text: "Cancel",
            onClick: cancel,
            variant: 'secondary'
          },
          {
            text: "Update Effect",
            onClick: onConfirm,
            variant: 'primary',
            autoFocus: true
          }
        ]}
      >
        {editEffectDialog.isOpen && editEffectDialog.activeEffect && (
          <div className="effect-value-inputs">
            {editEffectDialog.activeEffect.effect.x !== undefined && (
              <div className="value-input-group">
                <label htmlFor="edit-x-value">X Value:</label>
                <input
                  id="edit-x-value"
                  type="number"
                  min="1"
                  max="10"
                  value={editEffectDialog.x}
                  onChange={(e) => setEditEffectDialog(prev => ({
                    ...prev,
                    x: parseInt(e.target.value) || 1
                  }))}
                />
              </div>
            )}
            {editEffectDialog.activeEffect.effect.y !== undefined && (
              <div className="value-input-group">
                <label htmlFor="edit-y-value">Y Value:</label>
                <input
                  id="edit-y-value"
                  type="number"
                  min="1"
                  max="10"
                  value={editEffectDialog.y}
                  onChange={(e) => setEditEffectDialog(prev => ({
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
}