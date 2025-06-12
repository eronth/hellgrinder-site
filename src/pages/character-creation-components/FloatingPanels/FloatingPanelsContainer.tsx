import FloatingDiceRoller from './DiceRollerPanel';
import FloatingStatusEffects from './StatusEffectsPanel';
import './FloatingPanelsContainer.css';
import './Panel.css';

interface FloatingPanelsContainerProps {
  isDiceRollerVisible: boolean;
  activeStatusEffects: any[];
  characterName: string;
}

export default function FloatingPanelsContainer({ 
  isDiceRollerVisible, 
  activeStatusEffects,
  characterName
}: FloatingPanelsContainerProps) {
  return (
    <div className="floating-panels-container">
      {/* Status Effects Panel - appears at top */}
      {activeStatusEffects.length > 0 && (
        <div className="panel-slot status-effects-slot">
          <FloatingStatusEffects 
            statusEffects={activeStatusEffects} 
            characterName={characterName}
          />
        </div>
      )}
      
      {/* Dice Roller Panel - appears below status effects */}
      {isDiceRollerVisible && (
        <div className="panel-slot dice-roller-slot">
          <FloatingDiceRoller isVisible={isDiceRollerVisible} />
        </div>
      )}
    </div>
  );
}
