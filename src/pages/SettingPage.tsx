import React from "react";
import GameTitle from "../GameTitle";
import DemonClans from "./settings-components/demon-clans/DemonClans";
import OtherFactions from "./settings-components/other-factions/OtherFactions";
import Locations from "./settings-components/locations/Locations";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import "../css-styles/blood-flip.css";

export default function SettingPage() {
  const page: TabType = 'setting';
  const [isFlipped, setIsFlipped] = React.useState(() => {
    // Persist flip state as well
    try {
      return localStorage.getItem('hellgrinder_blood_flip_state') === 'true';
    } catch {
      return false;
    }
  });
  const [secretRevealed, setSecretRevealed] = React.useState(() => {
    // Check if secret was already revealed in this session
    try {
      return localStorage.getItem('hellgrinder_blood_secret_revealed') === 'true';
    } catch {
      return false;
    }
  });
  const [keySequence, setKeySequence] = React.useState('');
  const [showSecretAnimation, setShowSecretAnimation] = React.useState(false);
  
  const SECRET_CODE = 'sacrifice';
  const toggleBloodFlip = () => {
    const newFlipState = !isFlipped;
    setIsFlipped(newFlipState);
    
    // Persist flip state
    localStorage.setItem('hellgrinder_blood_flip_state', newFlipState.toString());
    
    // Apply the flip to the entire document body
    if (newFlipState) {
      document.body.classList.add('blood-flipped');
    } else {
      document.body.classList.remove('blood-flipped');
    }
  };

  // Handle keypress detection for secret code
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only capture actual character keys, ignore special keys
      if (event.key.length === 1) {
        const newSequence = (keySequence + event.key.toLowerCase()).slice(-SECRET_CODE.length);
        setKeySequence(newSequence);
        if (newSequence === SECRET_CODE && !secretRevealed) {
          setSecretRevealed(true);
          setShowSecretAnimation(true);
          // Persist the secret reveal state
          localStorage.setItem('hellgrinder_blood_secret_revealed', 'true');
          // Add screen flash effect
          document.body.classList.add('secret-activated');
          // Remove animation classes after animation completes
          setTimeout(() => {
            setShowSecretAnimation(false);
            document.body.classList.remove('secret-activated');
          }, 2000);
        }
      }
    };

    // Only add listener when on settings page
    document.addEventListener('keypress', handleKeyPress);
    
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [keySequence, secretRevealed]);

  // Reset key sequence after inactivity
  React.useEffect(() => {
    if (keySequence.length > 0) {
      const timeout = setTimeout(() => {
        setKeySequence('');
      }, 5000); // Reset after 5 seconds of inactivity
      
      return () => clearTimeout(timeout);
    }
  }, [keySequence]);
  // Clean up on component unmount
  React.useEffect(() => {
    return () => {
      document.body.classList.remove('blood-flipped');
    };
  }, []);

  // Restore flip state on mount
  React.useEffect(() => {
    if (isFlipped) {
      document.body.classList.add('blood-flipped');
    }
  }, []);
  // Reset function for development/testing
  const resetSecret = () => {
    localStorage.removeItem('hellgrinder_blood_secret_revealed');
    localStorage.removeItem('hellgrinder_blood_flip_state');
    setSecretRevealed(false);
    setIsFlipped(false);
    setKeySequence('');
    document.body.classList.remove('blood-flipped');
  };

  // Add double-click handler to the Settings nav tab for reset
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      const handleNavTabDoubleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        // Check if we double-clicked on the Settings nav tab
        if (target.closest('.selected-tab') && target.textContent?.includes('Setting')) {
          event.preventDefault();
          resetSecret();
        }
      };

      document.addEventListener('dblclick', handleNavTabDoubleClick);
      
      return () => {
        document.removeEventListener('dblclick', handleNavTabDoubleClick);
      };
    }
  }, []);  return (<div className={'page ' + page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    
    {secretRevealed && (
      <div className={`blood-flip-container ${showSecretAnimation || secretRevealed ? 'secret-reveal' : ''}`}>
        <button 
          className="blood-flip-button" 
          onClick={toggleBloodFlip}
          title={isFlipped ? "Return to normal view" : "Flip the world upside down"}
        >
          {isFlipped ? "🩸 RESTORE REALITY 🩸" : "🩸 BLOOD FLIP 🩸"}
        </button>
      </div>
    )}
    
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

    {/* Subtle hint for users - only shows after some interaction */}
    {!secretRevealed && keySequence.length > 3 && keySequence.length < SECRET_CODE.length && (
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
    
    <hr />
    <DemonClans />
    <hr />
    <OtherFactions />
    <hr />
    <Locations />
    <hr />    
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
          const isCorrect = char === SECRET_CODE[i];
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
  </div>);
}