import { StatusEffect } from "../../../../../ts-types/types";
import { ActiveStatusEffect, CharacterDesign } from "../../CharacterGenerator";
import AddStatusEffectDialog from "../AddStatusEffectDialog/AddStatusEffectDialog";
import { normalizeStatusEffectName } from "../helper";
import StatusEffectsCard from "../StatusEffectsCard/StatusEffectsCard";
import StatusEffects from '../../../../../common-design/game-terms/status-effects';

export type AddEffectDialogType = {
  isOpen: boolean;
  effect: StatusEffect | null;
  x: number;
  y: number;
};

type Props = {
  character: CharacterDesign;
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
  searchFilter: string;
  addEffectDialogReactState: [
    AddEffectDialogType,
    React.Dispatch<React.SetStateAction<AddEffectDialogType>>
  ];
};
export default function AvailableStatusEffects({
  character,
  selectedCharacterId,
  onUpdateCharacter,
  searchFilter,
  addEffectDialogReactState: [addEffectDialog, setAddEffectDialog]
}: Props) {

  const openAddEffectDialog = (effect: StatusEffect) => {
    setAddEffectDialog({
      isOpen: true,
      effect,
      x: 1,
      y: 1
    });
  };

  // Get all available status effects alphabetically sorted
  const allStatusEffects = (Object.values(StatusEffects)
    .sort((a, b) => a.name.localeCompare(b.name)));

  // Filter status effects by search
  const filterBySearch = (effects: StatusEffect[], searchTerm: string) => {
    if (!searchTerm) return effects;
    return effects.filter(effect => 
      effect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      effect.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const confirmAddEffect = () => {
    const { effect, x, y } = addEffectDialog;
    if (!effect) return;

    // Check if this status effect already exists
    const existingIndex = character.statusEffects.findIndex(
      activeEffect => normalizeStatusEffectName(activeEffect.effect.name) === normalizeStatusEffectName(effect.name)
    );

    if (existingIndex !== -1) {
      // Merge with existing effect by adding x and y values
      const existingEffect = character.statusEffects[existingIndex];
      const newStatusEffects = [...character.statusEffects];

      newStatusEffects[existingIndex] = {
        ...existingEffect,
        ...(effect.x !== undefined ? { 
          x: (existingEffect.x || 0) + x 
        } : {}),
        ...(effect.y !== undefined ? { 
          y: (existingEffect.y || 0) + y 
        } : {})
      };
      
      onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });
    } else {
      // Add new effect
      const activeEffect: ActiveStatusEffect = {
        effect,
        ...(effect.x !== undefined ? { x } : {}),
        ...(effect.y !== undefined ? { y } : {})
      };

      const newStatusEffects = [...character.statusEffects, activeEffect];
      onUpdateCharacter(selectedCharacterId, { statusEffects: newStatusEffects });
    }

    setAddEffectDialog({
      isOpen: false,
      effect: null,
      x: 1,
      y: 1
    });
  };

  const createActionButton = (effect: StatusEffect) => {
    return (
    <button 
      className="add-btn"
      onClick={() => openAddEffectDialog(effect)}
      title="Add status effect"
    >
      Add
    </button>
  )};
  
  return (<>
    <div className="available-status-effects">
      <h4>Available Status Effects</h4>
      <div className="status-effects-grid">
        {filterBySearch(allStatusEffects, searchFilter).map((effect) => 
          <StatusEffectsCard
            effect={effect}
            actionButton={createActionButton(effect)}
          />
        )}
      </div>
    </div>

    <AddStatusEffectDialog
      character={character}
      onConfirm={confirmAddEffect}
      addEffectDialogReactState={[addEffectDialog, setAddEffectDialog]}
    />
  </>)
};
