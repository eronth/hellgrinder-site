import RuleKeyword from './RuleKeyword';
import Statuses from './game-terms/status-effects.tsx';

interface Props {
  // Use the keys from the statuses object
  effect: keyof typeof Statuses | 'error';
  x?: number;
  y?: number;
  className?: string;
  disabled?: boolean;
};

export default function StatusKeyword({ 
  effect,
  x,
  y,
  className,
  disabled,
}: Props) {
  return (
    <RuleKeyword
      keyword={effect.toString()}
      className={className}
      disabled={disabled}
      statusEffectX={x}
      statusEffectY={y}
    >
      { effect === 'error' ? (
        <span className="error-text">
          {'Error: Status effect not found'}
        </span>
      ) : (
        Statuses[effect].name
          .replace('[[X]]', x?.toString() || 'X')
          .replace('[[Y]]', y?.toString() || 'Y')
      )}
    </RuleKeyword>
  );
}
