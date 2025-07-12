import { useState } from 'react';
import { Dice } from "../ts-types/types.tsx";
import { DiceRoller } from './DiceRoller.tsx';

type Props = {
  damage: number | Dice | Dice[];
  displayText: string;
  averageValue: number;
  shouldShowAverage: boolean;
};

export default function ClickableDice({ damage, displayText, averageValue, shouldShowAverage }: Props) {
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isRolled, setIsRolled] = useState(false);
  
  const handleClick = () => {
    if (typeof damage === 'number') {
      // If it's just a number, don't roll
      return;
    }
    
    const result = DiceRoller.rollDamage(damage);
    setRollResult(result);
    setIsRolled(true);
    
    // Auto-reset after 3 seconds
    setTimeout(() => {
      setIsRolled(false);
      setRollResult(null);
    }, 3000);
  };
  
  const isClickable = typeof damage !== 'number';
  
  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span 
        className={isClickable ? 'clickable-dice' : 'dice-display'}
        onClick={isClickable ? handleClick : undefined}
        title={isClickable ? 'Click to roll dice' : undefined}
        style={{ display: 'inline' }} /* Ensure inline display */
      >
        {displayText}
      </span>
      {shouldShowAverage && (
        <span className={`average-damage ${isRolled ? 'rolled-result' : ''}`}>
          {isRolled ? ` [${rollResult}]` : ` (${averageValue})`}
        </span>
      )}
      {isRolled && (
        <span className="dice-roll-tooltip">
          Rolled!
        </span>
      )}
    </span>
  );
}
