import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import SimpleLockButton from '../../../../../../components/common/SimpleLockButton/SimpleLockButton';
import { Perk } from '../../../../../../ts-types/types';
import { CharacterDesign } from '../../../../../../ts-types/player-character-types';
import CharacterGeneratorTools from '../../../../../../utils/characterGeneratorTools';
import CharacterPerksDisplay from '../CharacterPerksDisplay/CharacterPerksDisplay';
import PerkManager from '../../PerkManager';
import './PerksSection.css';

type Props = {
  character: CharacterDesign;
  characters: CharacterDesign[];
  onSetPerks: (newPerks: Perk[]) => void;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
  locked: boolean;
  onToggleLock: () => void;
};

export default function PerksSection({ character, characters, onSetPerks, onUpdateCharacter, locked, onToggleLock }: Props) {
  const hasPerks = character.perks.length > 0;
  const spentPoints = character.perks.reduce((sum, p) => sum + p.cost, 0);
  const totalBudget = character.stats.perkPoints + spentPoints;

  function handleRandomize() {
    const { perks } = CharacterGeneratorTools.randomizePerks(totalBudget);
    onSetPerks(perks);
  }

  return (
    <div className="perks-section">
      <div className="perks-header">
        <div className="perks-title">Perks</div>
        <div className="perks-controls">
          <span className="perks-budget" title="Perk points remaining / total">
            {character.stats.perkPoints}/{totalBudget} pts
          </span>
          <button
            className="perks-randomize-btn"
            onClick={handleRandomize}
            disabled={locked}
          >
            {hasPerks
            ? <><FontAwesomeIcon icon={faArrowRotateLeft} /> Re-randomize</>
            : 'Randomize'}
          </button>
          <PerkManager
            characters={characters}
            selectedCharacterId={character.id}
            onUpdateCharacter={onUpdateCharacter}
            disabled={locked}
            buttonClassName="perks-select-btn"
            buttonLabel="Manage Perks"
          />
          <SimpleLockButton
            locked={locked}
            onToggle={onToggleLock}
            lockedTitle="Unlock to edit"
            unlockedTitle="Lock perks"
          />
        </div>
      </div>

      {hasPerks && <CharacterPerksDisplay character={character} />}
    </div>
  );
}
