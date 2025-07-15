import { useState } from 'react';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import './DiceRollerPanel.css';
import Panel from './Panel';

interface DiceRollResult {
  dice: number[];
  bonus: number;
  total: number;
  successRank: number;
  rankDescription: string;
  isSpecial: 'hellsWrath' | 'hellishTriumph' | null;
  timestamp: number;
}

type Props = {
  isVisible: boolean;
}

export default function DiceRollerPanel({ isVisible }: Props) {
  const [bonus, setBonus] = useState(0);
  const [difficultyBonus, setDifficultyBonus] = useState(0);
  const [lastRoll, setLastRoll] = useState<DiceRollResult | null>(null);
  const [rollHistory, setRollHistory] = useState<DiceRollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showProbabilities, setShowProbabilities] = useState(true);

  if (!isVisible) return null;

  // Calculate success rank based on total result
  const getSuccessRank = (total: number) => {
    if (total >= 16) return { rank: 3, description: "You succeed at your task with a flourish. You often gain extra benefits for your efforts, or a bonus to your next Skill Check." };
    if (total >= 12) return { rank: 2, description: "You succeed at your task. There are no extra complications from your efforts." };
    if (total >= 8) return { rank: 1, description: "You succeed at a minor level. You partially succeed at your efforts, or some complications that arise with the success." };
    return { rank: 0, description: "You fail at whatever you're attempting to accomplish." };
  };

  // Calculate probabilities for each success rank
  const calculateProbabilities = (totalBonus: number) => {
    // For 3d6, we need to calculate all possible outcomes (216 total combinations)
    const outcomes = new Array(19).fill(0); // Indices 0-18 for sums 3-21 (but we use 3-18)
    
    // Generate all possible 3d6 combinations
    for (let die1 = 1; die1 <= 6; die1++) {
      for (let die2 = 1; die2 <= 6; die2++) {
        for (let die3 = 1; die3 <= 6; die3++) {
          const sum = die1 + die2 + die3 + totalBonus;
          if (sum >= 3 && sum <= 21) {
            outcomes[Math.min(sum, 18)]++; // Cap at 18 for array bounds
          }
        }
      }
    }

    const totalCombinations = 216; // 6^3
    
    // Calculate probabilities for each rank
    let rank0 = 0, rank1 = 0, rank2 = 0, rank3 = 0;
    
    for (let sum = 3; sum <= 21; sum++) {
      const count = sum <= 18 ? outcomes[sum] : 0;
      if (sum >= 16) rank3 += count;
      else if (sum >= 12) rank2 += count;
      else if (sum >= 8) rank1 += count;
      else rank0 += count;
    }

    return {
      rank0: Math.round((rank0 / totalCombinations) * 100),
      rank1: Math.round((rank1 / totalCombinations) * 100),
      rank2: Math.round((rank2 / totalCombinations) * 100),
      rank3: Math.round((rank3 / totalCombinations) * 100)
    };
  };

  // Check for special results (all 1s or all 6s)
  const checkSpecialResult = (dice: number[]) => {
    if (dice.every(d => d === 1)) return 'hellsWrath';
    if (dice.every(d => d === 6)) return 'hellishTriumph';
    return null;
  };

  const rollDice = () => {
    setIsRolling(true);
    
    // Animate the rolling for a short time
    setTimeout(() => {
      const dice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      
      const total = dice.reduce((sum, die) => sum + die, 0) + bonus + difficultyBonus;
      const { rank, description } = getSuccessRank(total);
      const special = checkSpecialResult(dice);
      
      const result: DiceRollResult = {
        dice,
        bonus: bonus + difficultyBonus,
        total,
        successRank: rank,
        rankDescription: description,
        isSpecial: special,
        timestamp: Date.now()
      };
      
      setLastRoll(result);
      setRollHistory(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 rolls
      setIsRolling(false);
    }, 600); // Brief animation delay
  };

  const resetRoll = () => {
    setLastRoll(null);
    setBonus(0);
  };

  const clearHistory = () => {
    setRollHistory([]);
    setShowHistory(false);
  };

  // Calculate current probabilities
  const currentProbabilities = calculateProbabilities(bonus + difficultyBonus);

  return (
    <Panel
      icon={faDice}
      headerText="Skill Check"
      headerClassName="dice-roller-header"
    >
      <div className="dice-input-section">
        <div className="dice-display">
          <span className="dice-formula">3d6</span>
          <span className="plus-sign">+</span>
          <input
            type="number"
            value={bonus}
            onChange={(e) => setBonus(parseInt(e.target.value) || 0)}
            className="bonus-input"
            placeholder="0"
            min="-10"
            max="20"
          />
          <span className="bonus-label">bonus</span>
        </div>
            
        {/* Difficulty shortcuts */}
        <div className="difficulty-shortcuts">
          <span className="shortcuts-label">Quick Difficulty:</span>
          <div className="difficulty-buttons">
            <button 
              className={`difficulty-btn ${difficultyBonus === 2 ? 'active' : ''}`}
              onClick={() => setDifficultyBonus(2)}
              title="Easy task"
            >
              Easy (+2)
            </button>
            <button 
              className={`difficulty-btn ${difficultyBonus === 0 ? 'active' : ''}`}
              onClick={() => setDifficultyBonus(0)}
              title="Normal task"
            >
              Normal (0)
            </button>
            <button 
              className={`difficulty-btn ${difficultyBonus === -2 ? 'active' : ''}`}
              onClick={() => setDifficultyBonus(-2)}
              title="Hard task"
            >
              Hard (-2)
            </button>
            <button 
              className={`difficulty-btn ${difficultyBonus === -4 ? 'active' : ''}`}
              onClick={() => setDifficultyBonus(-4)}
              title="Extremely difficult task"
            >
              Extreme (-4)
            </button>
          </div>
        </div>

        {/* Probability Display */}
        <div className="probability-display">
          <div className="probability-header" onClick={() => setShowProbabilities(!showProbabilities)}>
            <div className="probability-title-section">
              <span className={`collapse-indicator ${showProbabilities ? 'expanded' : 'collapsed'}`}>
                ▼
              </span>
              <span className="probability-title">Success Probabilities</span>
            </div>
          </div>
          {showProbabilities && (
            <div className="probability-content">
              <div className="total-bonus-section">
                <span className="total-bonus">
                  Total Mod: {bonus + difficultyBonus >= 0 ? '+' : ''}{bonus + difficultyBonus}
                </span>
              </div>
              <div className="probability-grid">
                <div className="prob-item rank-0">
                  <span className="prob-rank">Rank 0</span>
                  <span className="prob-range">(3-7)</span>
                  <span className="prob-percentage">{currentProbabilities.rank0}%</span>
                </div>
                <div className="prob-item rank-1">
                  <span className="prob-rank">Rank 1</span>
                  <span className="prob-range">(8-11)</span>
                  <span className="prob-percentage">{currentProbabilities.rank1}%</span>
                </div>
                <div className="prob-item rank-2">
                  <span className="prob-rank">Rank 2</span>
                  <span className="prob-range">(12-15)</span>
                  <span className="prob-percentage">{currentProbabilities.rank2}%</span>
                </div>
                <div className="prob-item rank-3">
                  <span className="prob-rank">Rank 3</span>
                  <span className="prob-range">(16+)</span>
                  <span className="prob-percentage">{currentProbabilities.rank3}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
            
        <div className="roll-actions">
          <button 
            className={`roll-btn ${isRolling ? 'rolling' : ''}`}
            onClick={rollDice}
            disabled={isRolling}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
          {lastRoll && (
            <button 
              className="reset-btn"
              onClick={resetRoll}
            >
              Reset
            </button>
          )}
          {rollHistory.length > 0 && (
            <button
              className="history-btn"
              onClick={() => setShowHistory(!showHistory)}
              title="Show roll history"
            >
              History ({rollHistory.length})
            </button>
          )}
        </div>

        {/* Roll history section */}
        {showHistory && rollHistory.length > 0 && (
          <div className="roll-history">
            <div className="history-header">
              <span>Recent Rolls</span>
              <button className="clear-history-btn" onClick={clearHistory}>
                Clear
              </button>
            </div>
            <div className="history-list">
              {rollHistory.map((roll) => (
                <div key={roll.timestamp} className={`history-item rank-${roll.successRank}`}>
                  <div className="history-dice">
                    {roll.dice.map((die, i) => (
                      <span key={i} className="mini-die">{die}</span>
                    ))}
                    {roll.bonus !== 0 && (
                      <span className="history-bonus">{roll.bonus >= 0 ? '+' : ''}{roll.bonus}</span>
                    )}
                  </div>
                  <div className="history-result">
                    <span className="history-total">{roll.total}</span>
                    <span className="history-rank">R{roll.successRank}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {lastRoll && (
        <div className="dice-result-section">
          <div className="dice-results">
            <div className="individual-dice">
              {lastRoll.dice.map((die, index) => (
                <span key={index} className={`die die-${die}`}>
                  {die}
                </span>
              ))}
            </div>
            
            <div className="calculation">
              <span className="dice-sum">{lastRoll.dice.reduce((sum, die) => sum + die, 0)}</span>
              {lastRoll.bonus !== 0 && (
                <>
                  <span className="operator">{lastRoll.bonus >= 0 ? '+' : ''}</span>
                  <span className="bonus-value">{lastRoll.bonus}</span>
                </>
              )}
              <span className="equals">=</span>
              <span className="total-result">{lastRoll.total}</span>
            </div>
          </div>

          <div className={`success-rank rank-${lastRoll.successRank} ${lastRoll.isSpecial ? `special-${lastRoll.isSpecial}` : ''}`}>
            <div className="rank-header">
              <span className="rank-number">Rank {lastRoll.successRank}</span>
              {lastRoll.isSpecial && (
                <span className="special-indicator">
                  {lastRoll.isSpecial === 'hellsWrath' ? "Hell's Wrath!" : "Hellish Triumph!"}
                </span>
              )}
            </div>
            <div className="rank-description">
              {lastRoll.rankDescription}
            </div>
            {lastRoll.isSpecial && (
              <div className="special-description">
                {lastRoll.isSpecial === 'hellsWrath' 
                  ? "All 1s triggers a Hell's Wrath event - additional complications!" 
                  : "All 6s triggers a Hellish Triumph - you get +1 to rolls for a bit!"}
              </div>
            )}
          </div>
        </div>
      )}
    </Panel>
  );
}
