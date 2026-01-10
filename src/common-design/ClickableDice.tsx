import { useState, useRef } from 'react';
import { Dice } from "../ts-types/types.tsx";
import { DiceRoller } from './DiceRoller.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';

type Props = {
  damage: number | Dice | Dice[];
  displayText: string;
  averageValue: number;
  shouldShowAverage: boolean;
};

export default function ClickableDice({ damage, displayText, averageValue, shouldShowAverage }: Props) {
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isRolled, setIsRolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLSpanElement>(null);
  
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
    }, 800000);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.right,
        y: e.clientY - rect.top
      });
    }
  };
  
  const handleMouseEnter = () => {
    if (isClickable) {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  const isClickable = typeof damage !== 'number';
  
  return (
    <span ref={containerRef} style={{ position: 'relative', display: 'inline' }}>
      <span 
        className={isClickable ? 'clickable-dice' : 'dice-display'}
        onClick={isClickable ? handleClick : undefined}
        onMouseMove={isClickable ? handleMouseMove : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      {isHovering && isClickable && (
        <span 
          className="dice-hover-icon"
          style={{
            position: 'absolute',
            left: `${mousePos.x + 15}px`,
            top: `${mousePos.y - 10}px`,
            pointerEvents: 'none',
            fontSize: '20px',
            zIndex: 1000
          }}
        >
          <FontAwesomeIcon icon={faDice} />
        </span>
      )}
    </span>
  );
}
