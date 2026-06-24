import FloatingDiceRoller from './DiceRollerPanel';
import StatusEffectsPanel from './StatusEffectsPanel';
import { ActiveStatusEffect } from '../../ts-types/types';
import './FloatingPanelsContainer.css';
import './Panel.css';

interface FloatingPanelsContainerProps {
  isDiceRollerVisible: boolean;
  activeStatusEffects: ActiveStatusEffect[];
  characterName: string;
}

export default function FloatingPanelsContainer({ 
  isDiceRollerVisible, 
  activeStatusEffects,
  characterName
}: FloatingPanelsContainerProps) {
  return (
    <div className="floating-panels-container">
      {/* Dice Roller Panel - appears below status effects */}
      {isDiceRollerVisible && (
        <div className="panel-slot dice-roller-slot">
          <FloatingDiceRoller isVisible={isDiceRollerVisible} />
        </div>
      )}
      
      {/* Status Effects Panel - appears at top */}
      {activeStatusEffects.length > 0 && (
        <div className="panel-slot status-effects-slot">
          <StatusEffectsPanel 
            statusEffects={activeStatusEffects} 
            characterName={characterName}
          />
        </div>
      )}
    </div>
  );
}
