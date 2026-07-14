import React from "react";
import './BloodflipButtonIndicators.css';

type Props = {
  secretRevealed: boolean;
  isFlipped: boolean;
  keySequence: string;
  targetSequence: string;
};
export default function BloodflipButtonIndicators({
  secretRevealed,
  isFlipped,
  keySequence,
  targetSequence
}: Props) {
  // Enables the dev-only hover hint on the Setting nav tab
  React.useEffect(() => {
    if (!import.meta.env.DEV) { return; }
    document.body.classList.add('bloodflip-dev');
    return () => { document.body.classList.remove('bloodflip-dev'); };
  }, []);

  return (<>
    {/* Development reset hint */}
    {import.meta.env.DEV && (
      <div className="bloodflip-dev-indicator bloodflip-dev-reset-hint">
        Dev: Double-click the "Setting" sub-nav to reset secret
      </div>
    )}

    {/* Development status indicator */}
    {import.meta.env.DEV && (
      <div className={`bloodflip-dev-indicator bloodflip-dev-status ${secretRevealed ? 'revealed' : ''}`}>
        Secret: {secretRevealed ? 'REVEALED' : 'HIDDEN'}
        {secretRevealed && ` | Flip: ${isFlipped ? 'ON' : 'OFF'}`}
      </div>
    )}

    {/* Debug display for development - shows typing progress */}
    {import.meta.env.DEV && keySequence && (
      <div className="bloodflip-dev-indicator bloodflip-dev-sequence">
        {keySequence.split('').map((char, i) => {
          const isCorrect = char === targetSequence[i];
          return (
            <span
              key={i}
              className={`bloodflip-dev-sequence-char ${isCorrect ? 'correct' : ''}`}
            >
              {char}
            </span>
          );
        })}
      </div>
    )}

    {/* Subtle hint for users - only shows after some interaction */}
    {!secretRevealed && keySequence.length > 3
      && keySequence.length < targetSequence.length
      && (
      <div className="bloodflip-hint">
        The shadows whisper of ancient rituals...
      </div>
    )}
  </>);
}
