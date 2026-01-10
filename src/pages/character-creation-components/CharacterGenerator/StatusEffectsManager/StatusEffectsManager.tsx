import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CharacterDesign } from '../CharacterGenerator';
import StatusEffectSearchBar from './StatusEffectSearchBar/StatusEffectSearchBar';
import CurrentStatusEffects, { EditEffectDialogType } from './CurrentStatusEffects/CurrentStatusEffects';
import AvailableStatusEffects, { AddEffectDialogType } from './AvailableStatusEffects/AvailableStatusEffects';
import './StatusEffectsManager.css';

interface StatusEffectsManagerProps {
  character: CharacterDesign;
  selectedCharacterId: string;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
};


export default function StatusEffectsManager({
  character,
  selectedCharacterId,
  onUpdateCharacter
}: StatusEffectsManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const managerRef = useRef<HTMLDivElement>(null);
  
  const [addEffectDialog, setAddEffectDialog] = useState<AddEffectDialogType>({
    isOpen: false,
    effect: null,
    x: 1,
    y: 1
  });

  const [editEffectDialog, setEditEffectDialog] = useState<EditEffectDialogType>({
    isOpen: false,
    activeEffect: null,
    index: -1,
    x: 1,
    y: 1
  });

  // Handle clicking outside the modal and escape key to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      
      const target = event.target as Node;
      
      // Don't close if clicking inside the main manager
      if (managerRef.current && managerRef.current.contains(target)) {
        return;
      }
      
      // Don't close if clicking inside any open dialogs
      if (addEffectDialog.isOpen || editEffectDialog.isOpen) {
        // Check if click is inside a dialog
        const clickedElement = event.target as Element;
        if (clickedElement && (
          clickedElement.closest('.confirm-dialog') ||
          clickedElement.closest('.confirm-dialog-overlay')
        )) {
          return;
        }
      }
      
      setIsOpen(false);
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        // Only close the main manager if no dialogs are open
        if (!addEffectDialog.isOpen && !editEffectDialog.isOpen) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, addEffectDialog.isOpen, editEffectDialog.isOpen]);

  if (!character) return null;
  
  return (
    <>
      <button 
        className="status-effects-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='non-mobile'>Manage </span>Status Effects
      </button>

      {isOpen && (<>
        <div className="status-effects-backdrop" 
          onClick={() => setIsOpen(false)}
        />

        <div className="status-effects-manager" ref={managerRef}>
          <div className="header">
            <h3>Status Effects Manager - {character.name}</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <StatusEffectSearchBar searchFilterReactState={[searchFilter, setSearchFilter]}/>

          <div className="content">
            
            <CurrentStatusEffects
              character={character}
              selectedCharacterId={selectedCharacterId}
              onUpdateCharacter={onUpdateCharacter}
              editEffectDialogReactState={[editEffectDialog, setEditEffectDialog]}
            />

            <AvailableStatusEffects
              character={character}
              selectedCharacterId={selectedCharacterId}
              onUpdateCharacter={onUpdateCharacter}
              searchFilter={searchFilter}
              addEffectDialogReactState={[addEffectDialog, setAddEffectDialog]}
            />
            
          </div>
        </div>
      </>)}
    </>
  );
}
