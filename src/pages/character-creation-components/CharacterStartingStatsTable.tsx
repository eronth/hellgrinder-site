import { CharStats } from "./CharacterGenerator";

type AttackBonus = 'Short Range Shooting' | 'Medium Range Shooting' | 'Long Range Shooting' | 'Melee';

type Props = {
  currentHealth?: number;
  maxHealth?: number;
  injuries?: number;
  speed?: number;
  corruption?: number;
  perkPoints?: number;
  safelightShards?: number;
  attackBonus?: AttackBonus;
  isEditable?: boolean;
  onStatsChange?: (stats: CharStats) => void;
};

export default function CharacterStartingStatsTable({
  currentHealth = 6,
  maxHealth = 6,
  injuries = 0,
  speed = 5,
  corruption = 0,
  perkPoints = 2, 
  safelightShards = 2,
  attackBonus = 'Melee',
  isEditable = false,
  onStatsChange
}: Props) {

  const stats: CharStats = {
    health: {
      current: currentHealth,
      max: maxHealth
    },
    injuries,
    speed,
    corruption,
    perkPoints,
    safelightShards,
    attackBonus
  };

  const updateStat = (field: keyof typeof stats, value: number | AttackBonus, substat?: keyof typeof stats.health) => {
    if (!onStatsChange) return;
    
    const newStats: CharStats = { ...stats };
    
    if (field === 'attackBonus') {
      newStats.attackBonus = value as AttackBonus;

    } else if (field === 'health' && substat) {
      newStats.health[substat] = value as number;
    } else {
      const numValue = typeof value === 'string' ? parseInt(value) || 0 : value;
      (newStats as any)[field] = Math.max(0, numValue);
    }
    
    onStatsChange(newStats);
  };

  const renderStatCell = (label: string, field: keyof typeof stats, value: number | AttackBonus) => {
    if (!isEditable || field === 'attackBonus') {
      return <td colSpan={3}>{value} {label}</td>;
    }

    return (
      <td colSpan={3} className="inline-editable-stat-cell">
        {(field === 'health')
        ? (<>
          <input
            id={`current-health-input`}
            type="number"
            min="0"
            value={stats.health.current as number}
            onChange={(e) => updateStat('health', parseInt(e.target.value) || 0, 'current')}
            className="inline-stat-input"
          /> / <input
            id={`${field}-input`}
            type="number"
            min="0"
            value={value as number}
            onChange={(e) => updateStat('health', parseInt(e.target.value) || 0, 'max')}
            className="inline-stat-input"
          />
          <label htmlFor={`current-health-input`} className="stat-label">Health</label>
        </>)
        : (<>
          <input
            id={`${field}-input`}
            type="number"
            min="0"
            defaultValue={value as number}
            onBlur={(e) => updateStat(field, parseInt(e.target.value) || 0)}
            className="inline-stat-input"
          />
          <label htmlFor={`${field}-input`} className="stat-label">{label}</label>
        </>)}
      </td>
    );
  };

  const attackBonusOptions: AttackBonus[] = [
    'Short Range Shooting',
    'Medium Range Shooting', 
    'Long Range Shooting',
    'Melee'
  ];

  const renderAttackBonusCell = () => {
    if (!isEditable) {
      return (
        <td colSpan={9} className="attack-bonus-cell">
          +1 to your choice of [Short Range][Shooting], [Medium Range][Shooting], [Long Range][Shooting], or [Melee] attacks (can be chosen at the end of character creation).
        </td>
      );
    }

    return (
      <td colSpan={9} className="attack-bonus-cell">
        <span className="attack-bonus-prefix">+1 to </span>
        <select
          value={attackBonus}
          onChange={(e) => updateStat('attackBonus', e.target.value as AttackBonus)}
          className="inline-attack-bonus-select"
        >
          {attackBonusOptions.map(option => (
            <option key={option} value={option}>
              {option} Attacks
            </option>
          ))}
        </select>
      </td>
    );
  };

  return (
    <table className={`character-stats-table ${isEditable ? 'inline-editable' : ''}`}>
      <tbody>
        <tr>
          {renderStatCell("Max Health", "health", stats.health.max)}
          {renderStatCell("Injuries", "injuries", stats.injuries)}
          {renderStatCell("Move Speed", "speed", stats.speed)}
        </tr>
        <tr>
          {renderStatCell("Corruption", "corruption", stats.corruption)}
          {renderStatCell("Perk Points", "perkPoints", stats.perkPoints)}
          {renderStatCell("Safelight Shards", "safelightShards", stats.safelightShards)}
        </tr>
        <tr>
          {renderAttackBonusCell()}
        </tr>
      </tbody>
    </table>
  );
}