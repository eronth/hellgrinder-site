import { useCallback, useMemo } from "react";
import { AttackBonusStat, HealthStat } from "./CharacterGenerator";

export type CharacterStats = {
  health: HealthStat;
  injuries: number;
  speed: number;
  corruption: number;
  perkPoints: number;
  safelightShards: number;
  attackBonus: AttackBonusStat;
};

type Props = {
  currentHealth?: number;
  maxHealth?: number;
  injuries?: number;
  speed?: number;
  corruption?: number;
  perkPoints?: number;
  safelightShards?: number;
  attackBonus?: AttackBonusStat;
  isEditable?: boolean;
  onStatsChange?: (stats: CharacterStats) => void;
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

  const stats: CharacterStats = useMemo(() => ({
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
  }), [currentHealth, maxHealth, injuries, speed, corruption, perkPoints, safelightShards, attackBonus]);

  const updateStat = useCallback((field: keyof CharacterStats, value: number | AttackBonusStat, substat?: keyof typeof stats.health) => {
    if (!onStatsChange) return;
    
    const newStats: CharacterStats = { ...stats };
    
    if (field === 'attackBonus') {
      newStats.attackBonus = value as AttackBonusStat;
    } else if (field === 'health') {
      if (substat) {
        newStats.health[substat] = value as number;
      }
    } else {
      const numValue = typeof value === 'string' ? parseInt(value) || 0 : value;
      (newStats as Omit<CharacterStats, 'attackBonus' | 'health'>)[field] = Math.max(0, numValue);
    }
    
    onStatsChange(newStats);
  }, [onStatsChange, stats]);

  const renderStatCell = useCallback((label: string, field: keyof typeof stats, value: number | AttackBonusStat) => {
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
        </>)        : (<>
          <input
            id={`${field}-input`}
            type="number"
            min="0"
            value={value as number}
            onChange={(e) => updateStat(field, parseInt(e.target.value) || 0)}
            className="inline-stat-input"
          />
          <label htmlFor={`${field}-input`} className="stat-label">{label}</label>
        </>)}
      </td>
    );
  }, [isEditable, stats.health, updateStat]);

  const attackBonusOptions: AttackBonusStat[] = [
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
          onChange={(e) => updateStat('attackBonus', e.target.value as AttackBonusStat)}
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
  const injuriesComp = useMemo(() => {
    return renderStatCell("Injuries", "injuries", stats.injuries);
  }, [renderStatCell, stats.injuries]);

  return (
    <table className={`character-stats-table ${isEditable ? 'inline-editable' : ''}`}>
      <tbody>
        <tr>
          {renderStatCell("Max Health", "health", stats.health.max)}
          {injuriesComp}
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