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
  // Convert effects to usable tags just for display
  // e.g. insideOut -> inside out
  const effectAsDisplayItemGetterThing = effect
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .toLowerCase();
    // .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    // .replace(/^\w/, c => c.toLowerCase());

  return (
    <RuleKeyword
      keyword={effectAsDisplayItemGetterThing.toString()} // Needs to be "Inside Out"
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
        Statuses[effect]?.name 
          .replace('[[X]]', x?.toString() || 'X')
          .replace('[[Y]]', y?.toString() || 'Y')
      )}
    </RuleKeyword>
  );
}
