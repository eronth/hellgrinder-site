import { useCallback, useMemo } from "react";
import { AttackBonusStat, HealthStat } from "../CharacterGenerator";
import SkillCheck from "../../../../common-design/SkillCheck/SkillCheck";
import './CharacterStatsGrid.css';

export type CharacterStats = {
  health: HealthStat;
  injuries: number;
  speed: number;
  corruption: number;
  perkPoints: number;
  safelightShards: number;
  attackBonus: AttackBonusStat;
  customSkill: string;
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
  customSkill?: string;
  onStatsChange?: (stats: CharacterStats) => void;
};

export default function CharacterStatsGrid({
  currentHealth = 6,
  maxHealth = 6,
  injuries = 0,
  speed = 5,
  corruption = 0,
  perkPoints = 2, 
  safelightShards = 2,
  attackBonus = 'Melee',
  isEditable = false,
  customSkill = '',
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
    attackBonus,
    customSkill
  }), [currentHealth, maxHealth, injuries, speed, corruption, perkPoints, safelightShards, attackBonus, customSkill]);

  const updateStat = useCallback((field: keyof CharacterStats, value: number | AttackBonusStat, substat?: keyof typeof stats.health) => {
    if (!onStatsChange) return;
    
    const newStats: CharacterStats = { ...stats };
    
    if (field === 'attackBonus') {
      newStats.attackBonus = value as AttackBonusStat;
    } else if (field === 'health') {
      if (substat) {
        newStats.health[substat] = value as number;
      }
    } else if (field === 'customSkill') {
      newStats.customSkill = value as string;
    } else {
      const numValue = typeof value === 'string' ? parseInt(value) || 0 : value;
      (newStats as Omit<CharacterStats, 'attackBonus' | 'health' | 'customSkill'>)[field] = Math.max(0, numValue);
    }
    
    onStatsChange(newStats);
  }, [onStatsChange, stats]);
  const updateCustomSkill = useCallback((value: string) => {
    if (!onStatsChange) return;
    
    const newStats: CharacterStats = {
      ...stats,
      customSkill: value
    };
    onStatsChange(newStats);
  }, [onStatsChange, stats]);

  const renderStatCell = useCallback((label: string, field: keyof typeof stats, value: number | AttackBonusStat) => {
    if (!isEditable || field === 'attackBonus') {
      return <div className='stat-cell'>{value} {label}</div>;
    }

    return (
      <div className="stat-cell editable">
        {(field === 'health')
        ? (<>
          <input
            id={`current-health-input`}
            type="number"
            min="0"
            value={stats.health.current as number}
            onChange={(e) => updateStat('health', parseInt(e.target.value) || 0, 'current')}
            className="stat-input"
          /> / <input
            id={`${field}-input`}
            type="number"
            min="0"
            value={value as number}
            onChange={(e) => updateStat('health', parseInt(e.target.value) || 0, 'max')}
            className="stat-input"
          />
          <label htmlFor={`current-health-input`} className="stat-label">Health</label>
        </>)
        : (<>
          <input
            id={`${field}-input`}
            type="number"
            min="0"
            value={value as number}
            onChange={(e) => updateStat(field, parseInt(e.target.value) || 0)}
            className="stat-input"
          />
          <label htmlFor={`${field}-input`} className="stat-label">{label}</label>
        </>)}
      </div>
    );
  }, [isEditable, stats.health, updateStat]);

  const renderCustomSkillCell = useCallback(() => {
    if (!isEditable) {
      return (
        <div className="stat-cell custom-skill">+2 Custom Skill</div>
      );
    }

    return (
      <div className="stat-cell editable custom-skill">
        <div className="wrapper">
          <label htmlFor={`custom-skill-input`} className="stat-label">+2 </label>
          <input
            id={`custom-skill-input`}
            type="text"
            value={stats.customSkill}
            onChange={(e) => updateCustomSkill(e.target.value)}
            className="stat-input freeform"
          />
        </div>
      </div>
    );
  }, [isEditable, stats.customSkill, updateCustomSkill]);

  const attackBonusValue = 2;
  const attackBonusOptions: AttackBonusStat[] = [
    'Short Range Shooting',
    'Medium Range Shooting',
    'Long Range Shooting',
    'Melee',
    'Arcane',
    'Thrown'
  ];

  const renderAttackBonusCell = () => {
    if (!isEditable) {
      const shortRangeChecks = <SkillCheck tags={['Short Range', 'Shooting']} plural/>;
      const mediumRangeChecks = <SkillCheck tags={['Medium Range', 'Shooting']} plural/>;
      const longRangeChecks = <SkillCheck tags={['Long Range', 'Shooting']} plural/>;
      const meleeChecks = <SkillCheck tags={['Melee']} plural />;
      const arcaneChecks = <SkillCheck tags={['Arcane']} plural/>;
      return (
        <div className="stat-cell attack-bonus-cell">
          +2 one of the following (chosen at the end of character creation).
          <ul>
            <li>{shortRangeChecks}</li>
            <li>{mediumRangeChecks}</li>
            <li>{longRangeChecks}</li>
            <li>{meleeChecks}</li>
            <li>{arcaneChecks}</li>
          </ul>
        </div>
      );
    }

    return (
      <div className="stat-cell attack-bonus-cell editable">
        <div className="wrapper">
          <span className="attack-bonus-prefix">+{attackBonusValue} to </span>
          <select
            value={attackBonus}
            onChange={(e) => updateStat('attackBonus', e.target.value as AttackBonusStat)}
            className="attack-bonus-select"
          >
            {attackBonusOptions.map(option => (
              <option key={option} value={option}>
                [{option}] {option === 'Thrown' ? <>Skill Checks</> : <>Hit Checks</>}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  const injuriesComp = useMemo(() => {
    return renderStatCell("Injuries", "injuries", stats.injuries);
  }, [renderStatCell, stats.injuries]);

  return (
    <div className={`character-stats-grid`}>
      {renderStatCell("Max Health", "health", stats.health.max)}
      {injuriesComp}
      {renderStatCell("Safelight Shards", "safelightShards", stats.safelightShards)}

      
      {renderStatCell("Corruption", "corruption", stats.corruption)}
      {renderStatCell("Perk Points", "perkPoints", stats.perkPoints)}
      {renderStatCell("Move Speed", "speed", stats.speed)}

      {renderAttackBonusCell()}
      {renderCustomSkillCell()}
    </div>
  );
}