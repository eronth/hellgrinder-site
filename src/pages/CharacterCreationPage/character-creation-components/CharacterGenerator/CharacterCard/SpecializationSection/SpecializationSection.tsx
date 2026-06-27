import React from 'react';
import { CharacterDesign } from '../../../../../../ts-types/player-character-types';
import CharacterGeneratorTools, { specializationOptions } from '../../../../../../utils/characterGeneratorTools';
import SkillCheck from '../../../../../../components/keywords/SkillCheck/SkillCheck';
import './SpecializationSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

type Props = {
  character: CharacterDesign;
  onSetSpecialization: (bonus: string, penalty: string) => void;
  locked: boolean;
  onToggleLock: () => void;
};

export default function SpecializationSection({ character, onSetSpecialization, locked, onToggleLock }: Props) {

  const bonus = character.specializationBonus;
  const penalty = character.specializationPenalty;
  const isSet = bonus !== '' && penalty !== '';

  function handleRandomize() {
    const result = CharacterGeneratorTools.randomizeSpecialization();
    onSetSpecialization(result.bonus, result.penalty);
  }

  function handleBonusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newBonus = e.target.value;
    const newPenalty = newBonus === penalty
      ? (specializationOptions.find(o => o !== newBonus) ?? '')
      : penalty;
    onSetSpecialization(newBonus, newPenalty);
  }

  function handlePenaltyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newPenalty = e.target.value;
    const newBonus = newPenalty === bonus
      ? (specializationOptions.find(o => o !== newPenalty) ?? '')
      : bonus;
    onSetSpecialization(newBonus, newPenalty);
  }

  return (
    <div className="specialization-block">
      <div className="spec-header">
        <div className="title">Specializations</div>
        <div className="spec-controls">
          <button className="spec-randomize-btn" onClick={handleRandomize}
            disabled={locked}>
            Randomize
          </button>
          <button
            className={`spec-lock-btn ${locked ? 'locked' : 'unlocked'}`}
            onClick={onToggleLock}
            title={locked ? 'Unlock to edit' : 'Lock specialization'}
            disabled={!isSet}
          >
            {locked ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faLockOpen} />}
          </button>
        </div>
      </div>

      {locked && isSet ? (
        <div className="spec-display">
          <div>+3 to <SkillCheck tags={[bonus]} plural /> (bonus)</div>
          <div>-5 to <SkillCheck tags={[penalty]} plural /> (penalty)</div>
        </div>
      ) : (
        <div className="spec-selectors">
          <div className="spec-row">
            <span className="spec-label">+3 Bonus:</span>
            <select value={bonus} onChange={handleBonusChange}>
              <option value="">-- Select Bonus --</option>
              {specializationOptions
                .filter(o => o !== penalty)
                .map(o => <option key={o} value={o}>{o}</option>)
              }
            </select>
          </div>
          <div className="spec-row">
            <span className="spec-label">-5 Penalty:</span>
            <select value={penalty} onChange={handlePenaltyChange}>
              <option value="">-- Select Penalty --</option>
              {specializationOptions
                .filter(o => o !== bonus)
                .map(o => <option key={o} value={o}>{o}</option>)
              }
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
