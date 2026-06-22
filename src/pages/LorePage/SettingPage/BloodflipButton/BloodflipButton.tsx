import React from "react";
import './BloodflipButton.css';
import BloodflipButtonIndicators from "./BloodflipButtonIndicators";

export default function BloodflipButton() {
  const SECRET_CODE = 'sacrifice';
  const secretInputTimeout = 5000; // 5 seconds
  const bloodflipBodyCss = 'blood-flipped';

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
  const [showSecretAnimation, setShowSecretAnimation] = React.useState(false);

  const [keySequence, setKeySequence] = React.useState('');
  React.useEffect(() => { // Reset key sequence after inactivity
    if (keySequence.length > 0) {
      const timeout = setTimeout(() => {
        setKeySequence('');
      }, secretInputTimeout);
      return () => clearTimeout(timeout);
    }
  }, [keySequence]);

  const toggleBloodFlip = () => {
    const newFlipState = !isFlipped;
    setIsFlipped(newFlipState);
    
    // Persist flip state
    localStorage.setItem('hellgrinder_blood_flip_state', newFlipState.toString());
    
    // Apply the flip to the entire document body
    if (newFlipState) {
      document.body.classList.add(bloodflipBodyCss);
    } else {
      document.body.classList.remove(bloodflipBodyCss);
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
  }, []);
  
  // Reset function for development/testing
  const resetSecret = () => {
    localStorage.removeItem('hellgrinder_blood_secret_revealed');
    localStorage.removeItem('hellgrinder_blood_flip_state');
    setSecretRevealed(false);
    setIsFlipped(false);
    setKeySequence('');
    document.body.classList.remove(bloodflipBodyCss);
  };

  // Clean up on component unmount
  React.useEffect(() => {
    return () => { document.body.classList.remove(bloodflipBodyCss); };
  }, []);
  // Restore flip state on mount
  if (isFlipped) { document.body.classList.add(bloodflipBodyCss); }

  const buttonTitle = isFlipped
    ? "Return to normal view"
    : "Flip the world upside down";
  const buttonText = isFlipped
    ? "🩸 RESTORE REALITY 🩸"
    : "🩸 SACRIFICE BLOOD 🩸";

  return (<>
    <BloodflipButtonIndicators
      secretRevealed={secretRevealed}
      isFlipped={isFlipped}
      keySequence={keySequence}
      targetSequence={SECRET_CODE}
    />
    <div className={`blood-flip-container ${showSecretAnimation || secretRevealed ? 'secret-reveal' : ''}`}>
      <button 
        className="blood-flip-button" 
        onClick={toggleBloodFlip}
        title={buttonTitle}
      >
        {buttonText}
      </button>
    </div>
    {secretRevealed && (
      <hr />
    )}
  </>)
}
