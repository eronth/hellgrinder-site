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
  return (<>
    {/* Development reset hint */}
    {import.meta.env.DEV && (
      <div style={{
        position: 'fixed',
        top: '50px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: '#888',
        padding: '5px 8px',
        borderRadius: '3px',
        fontSize: '10px',
        zIndex: 9999,
        opacity: 0.6
      }}>
        Dev: Double-click "Setting" tab to reset secret
      </div>
    )}

    {/* Development status indicator */}
    {import.meta.env.DEV && (
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: secretRevealed ? '#00ff00' : '#ff6600',
        padding: '5px 8px',
        borderRadius: '3px',
        fontSize: '10px',
        zIndex: 9999,
        opacity: 0.7
      }}>
        Secret: {secretRevealed ? 'REVEALED' : 'HIDDEN'}
        {secretRevealed && ` | Flip: ${isFlipped ? 'ON' : 'OFF'}`}
      </div>
    )}

    {/* Debug display for development - shows typing progress */}
    {import.meta.env.DEV && keySequence && (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: '#8B0000',
        padding: '5px 10px',
        borderRadius: '3px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999
      }}>
        {keySequence.split('').map((char, i) => {
          const isCorrect = char === targetSequence[i];
          return (
            <span key={i} style={{ 
              color: isCorrect ? '#00ff00' : '#ff0000',
              opacity: 0.7 
            }}>
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
      <div style={{
        position: 'fixed',
        bottom: '10px',
        background: 'rgba(255, 255, 255, 0.5)',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(139, 0, 0, 0.8)',
        fontSize: '10px',
        fontStyle: 'italic',
        opacity: 0.9,
        animation: 'fadeInOut 3s ease-in-out',
        pointerEvents: 'none',
        zIndex: 1000,
      }}>
        The shadows whisper of ancient rituals...
      </div>
    )}

    {/* Development: Add subtle indicator to the Setting nav tab */}
    {import.meta.env.DEV && (
      <style>{`
        .selected-tab:hover::after {
          content: '👆👆';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          opacity: 0.3;
          pointer-events: none;
        }
      `}</style>
    )}
  </>);
}
