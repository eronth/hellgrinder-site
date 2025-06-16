import AttackModeComponent from '../../common-design/AttackModeComponent';
import { Creature } from '../../ts-types/creature-types';
import { EncounterCreature } from '../../ts-types/encounter-types';
import DamageModComponent from './DamageModComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

type Props = {
  data: Creature;
  onAddToEncounter?: (creature: Creature) => void;
  // Encounter mode props
  isEncounterMode?: boolean;
  encounterCreature?: EncounterCreature;
  onRemoveFromEncounter?: (id: string) => void;
  onHealthChange?: (id: string, newHealth: number) => void;
};

export default function CreatureCard({ 
  data, 
  onAddToEncounter, 
  isEncounterMode = false,
  encounterCreature,
  onRemoveFromEncounter,
  onHealthChange 
}: Props) {
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [tempHealth, setTempHealth] = useState(
    isEncounterMode && encounterCreature ? encounterCreature.currentHealth.toString() : ''
  );

  const hexIcon = '⬣';

  // Health editing functions for encounter mode
  const handleHealthClick = () => {
    if (isEncounterMode && encounterCreature) {
      setIsEditingHealth(true);
    }
  };

  const handleHealthSubmit = () => {
    if (isEncounterMode && encounterCreature && onHealthChange) {
      const newHealth = parseInt(tempHealth);
      if (!isNaN(newHealth) && newHealth >= 0) {
        onHealthChange(encounterCreature.id, newHealth);
      }
    }
    setIsEditingHealth(false);
  };

  const handleHealthKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleHealthSubmit();
    } else if (e.key === 'Escape') {
      if (isEncounterMode && encounterCreature) {
        setTempHealth(encounterCreature.currentHealth.toString());
      }
      setIsEditingHealth(false);
    }
  };

  // Determine faction class based on creature tags
  const getFactionClass = (tags: (string | { tag: string; value: number })[]) => {
    const tagStrings = tags.map(tag => typeof tag === 'string' ? tag : tag.tag);
    
    // Define faction mappings
    const factionMap: { [key: string]: string } = {
      'Ashborn Legion': 'faction-ashborn-legion',
      'Stoneveined Order': 'faction-stoneveined-order',
      'Vastfathom League': 'faction-vastfathom-league',
      'Thornwraith Covenant': 'faction-thornwraith-covenant',
      'Thornwraith Conclave': 'faction-thornwraith-covenant', // Alternative name
      'Wanderlost Clans': 'faction-wanderlost-clans',
      'Wanderlost Clan': 'faction-wanderlost-clans', // Alternative name
      'Zephpter Horde': 'faction-zephpter-horde',
      'Umbral Nexus': 'faction-umbral-nexus',
      'Sinner': 'faction-sinner',
      'Forgefiend Syndicate': 'faction-forgefiend-syndicate',
      'Hand of Death': 'faction-hand-of-death',
      "Heaven's Host": 'faction-heavens-host',
      'Voidfire Conclave': 'faction-voidfire-conclave',
      'Witch Coven': 'faction-witch-coven'
    };

    // Find the first matching faction
    for (const tagString of tagStrings) {
      if (factionMap[tagString]) {
        return factionMap[tagString];
      }
    }
    
    return 'faction-generic'; // Default class for non-faction creatures
  };

  // Check if a tag is a faction tag
  const isFactionTag = (tag: string | { tag: string; value: number }) => {
    const tagString = typeof tag === 'string' ? tag : tag.tag;
    const factionTags = [
      'Ashborn Legion', 'Stoneveined Order', 'Vastfathom League',
      'Thornwraith Covenant', 'Thornwraith Conclave', 'Wanderlost Clans', 'Wanderlost Clan',
      'Zephpter Horde', 'Umbral Nexus', 'Sinner', 'Forgefiend Syndicate',
      'Hand of Death', "Heaven's Host", 'Voidfire Conclave', 'Witch Coven'
    ];
    return factionTags.includes(tagString);
  };

  const factionClass = getFactionClass(data.tags);
  
  // Separate faction tags from other tags
  const factionTags = data.tags.filter(tag => isFactionTag(tag));
  const nonFactionTags = data.tags.filter(tag => !isFactionTag(tag));

  return (<div className={`creature-card ${factionClass} ${isEncounterMode ? 'encounter-card' : ''}`}>
    <div className='title-row'>
      <span className='name'>{data.name}</span>
      <div>
        <span className='tier'>{data.tier}</span>
        {isEncounterMode && encounterCreature && onRemoveFromEncounter ? (
          <button 
            className='remove-creature-btn'
            onClick={() => onRemoveFromEncounter(encounterCreature.id)}
            title="Remove from encounter"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        ) : onAddToEncounter && (
          <button 
            className='add-creature-btn'
            onClick={() => onAddToEncounter(data)}
            title="Add to encounter"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div>
    </div>
    <div className='tags'>
      {nonFactionTags.map((tag, i) => <span 
        key={`creature-${data.name}-tag-${i}`}
      >
        {(typeof tag === 'string')
          ? tag
          : `${tag.tag}: ${tag.value}`
        }
      </span>)}
    </div>
    <div className='stats'>
      <span>
        Health: 
        {isEncounterMode && encounterCreature && onHealthChange ? (
          isEditingHealth ? (
            <input
              type="number"
              value={tempHealth}
              onChange={(e) => setTempHealth(e.target.value)}
              onBlur={handleHealthSubmit}
              onKeyDown={handleHealthKeyPress}
              className="health-input"
              autoFocus
              min="0"
            />
          ) : (
            <span 
              className="editable-health" 
              onClick={handleHealthClick}
              title="Click to edit health"
            >
              {encounterCreature.currentHealth}
            </span>
          )
        ) : (
          data.health
        )}
        {isEncounterMode && encounterCreature ? `/${encounterCreature.maxHealth}` : ''}⛨
      </span>
      <span>Speed: {data.speed}{hexIcon}
        {data.dash ? ` (${data.dash >= 0 ? '+' : ''}${data.dash}${hexIcon})` : null}
      </span>
      <span>Size: {data.size}{hexIcon}</span>
      <span>Grab: +5</span>
      <span>Shove: 3</span>
    </div>

    <div className='damage-modifiers'>
      {data.damageTakenMods.map((mod, i) => 
        <DamageModComponent key={`creature-${data.name}-damage-taken-mod-${i}`} mod={mod} />)}
    </div>

    <div>
      {data.attacks.map((attack, i) => <div key={`creature-${data.name}-attack-${i}`}>
        <AttackModeComponent attackMode = {attack} />
      </div>)}
    </div>
    {/* <div>
      {data.attacks.map((attack, i) => <span key={`creature-${data.name}-attack-${i}`}>{attack.name}</span>)}
    </div> */}

      {
        (data.abilities.length > 0)
        ? <div className='creature-abilities'>
          <div><b>Abilities</b>:</div>
          {data.abilities.map((ability, i) => 
            <div key={`creature-${data.name}-ability-${i}`} className='details-indentation'>
              {ability.name ? <i>{ability.name}: </i> : null}{ability.description}
            </div>
          )}
        </div>
        : null
      }

    <div className='creature-description'><i>{data.description}</i></div>
    
    {/* Faction tag positioned at bottom right */}
    {factionTags.length > 0 && (
      <div className='faction-tag-container'>
        {factionTags.map((tag, i) => (
          <span 
            key={`creature-${data.name}-faction-tag-${i}`}
            className='faction-tag'
          >
            {(typeof tag === 'string')
              ? tag
              : `${tag.tag}: ${tag.value}`
            }
          </span>
        ))}
      </div>
    )}
  </div>);
}