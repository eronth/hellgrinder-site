import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FACTION_DATA } from '../FactionTransformUtils';
import './FactionSelector.css';

type Props = {
  selectedFaction: string;
  onFactionChange: (faction: string) => void;
};

export default function FactionSelector({ selectedFaction, onFactionChange }: Props) {
  const factionKeys = Object.keys(FACTION_DATA);

  return (
    <div className="faction-selector">
      <div className="selector-header">
        <FontAwesomeIcon icon={faShieldAlt} className="selector-icon" />
        <label htmlFor="faction-select" className="selector-label">
          Apply Faction Template:
        </label>
      </div>
      
      <select
        id="faction-select"
        value={selectedFaction}
        onChange={(e) => onFactionChange(e.target.value)}
        className="faction-dropdown"
      >
        {factionKeys.map(factionKey => {
          const faction = FACTION_DATA[factionKey];
          return (
            <option key={factionKey} value={factionKey}>
              {faction.name}
              {factionKey !== 'Generic' && ` (${faction.primary})`}
            </option>
          );
        })}
      </select>
      
      {selectedFaction !== 'Generic' && (
        <div className="faction-info">
          <div className="info-row">
            <span className="info-label">Primary Type:</span>
            <span className="info-value primary">{FACTION_DATA[selectedFaction].primary}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Absorbs:</span>
            <span className="info-value absorb">{FACTION_DATA[selectedFaction].absorb}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Weak to:</span>
            <span className="info-value weakness">
              {FACTION_DATA[selectedFaction].weaknesses.join(', ')}
            </span>
          </div>
          {(FACTION_DATA[selectedFaction]?.abilities ?? []).length > 0 && (
            <div className="info-row">
              <span className="info-label">Abilities:</span>
              <span className="info-value abilities">
                {
                  FACTION_DATA[selectedFaction]!.abilities!.map((ability, index) => ability.name + (index < FACTION_DATA[selectedFaction]!.abilities!.length - 1 ? ', ' : ''))
                }
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
