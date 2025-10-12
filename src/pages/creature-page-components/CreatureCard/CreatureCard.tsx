import AttackModeComponent from '../../../common-design/AttackModeComponent';
import { Creature } from '../../../ts-types/creature-types';
import { EncounterCreature } from '../../../ts-types/encounter-types';
import DamageModComponent from '../DamageModComponent';
import CreatureTooltip from './CreatureTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { isValidElement, useState } from 'react';
import { healthIcon, movementIcon } from '../../../common-design/CommonIcons';
import cce from './CreatureCardExplanations';
import './CreatureCard.css';
import './CreatureCardExample.css';
import './CreatureTooltip.css';

type Props = {
  data: Creature;
  onAddToEncounter?: null | ((creature: Creature) => void);
  // Encounter mode props
  isEncounterMode?: boolean;
  encounterCreature?: EncounterCreature;
  onRemoveFromEncounter?: (id: string) => void;
  onHealthChange?: (id: string, newHealth: number) => void;
  isExample?: boolean;
};

export default function CreatureCard({ 
  data, 
  onAddToEncounter, 
  isEncounterMode = false,
  encounterCreature,
  onRemoveFromEncounter,
  onHealthChange,
  isExample
}: Props) {
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [tempHealth, setTempHealth] = useState(
    isEncounterMode && encounterCreature ? encounterCreature.currentHealth.toString() : ''
  );

  const hexIcon = movementIcon;

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
      'Stoneveined Choir': 'faction-stoneveined-order', // Alternative name
      'Vastfathom League': 'faction-vastfathom-league',
      'Thornwraith Covenant': 'faction-thornwraith-covenant',
      'Thornwraith Conclave': 'faction-thornwraith-covenant', // Alternative name
      'Thornwraith Bloom': 'faction-thornwraith-covenant', // Alternative name
      'Wanderlost Crews': 'faction-wanderlost-crews',
      'Wanderlost Crew': 'faction-wanderlost-crews', // Alternative name
      'Zephpter Horde': 'faction-zephpter-horde',
      'Umbral Nexus': 'faction-umbral-nexus',
      'Sinner': 'faction-sinner',
      'Forgefiend Syndicate': 'faction-forgefiend-syndicate',
      'Hand of Death': 'faction-hand-of-death',
      "Heaven's Host": 'faction-heavens-host',
      'Voidfire Conclave': 'faction-voidfire-conclave',
      'Hagswell Covenant': 'faction-witch-coven'
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
      'Ashborn Legion',
      'Stoneveined Order', 'Stoneveined Choir',
      'Vastfathom League',
      'Thornwraith Covenant', 'Thornwraith Covenant',
      'Thornwraith Bloom',
      'Zephpter Horde', 'Umbral Nexus',
      'Wanderlost Crews', 'Wanderlost Crew',
      'Sinner', 'Forgefiend Syndicate',
      'Hand of Death', "Heaven's Host", 'Voidfire Conclave', 'Hagswell Covenant'
    ];
    return factionTags.includes(tagString);
  };

  const factionClass = getFactionClass(data.tags);
  
  // Separate faction tags from other tags
  const factionTags = data.tags.filter(tag => isFactionTag(tag));
  const nonFactionTags = data.tags.filter(tag => !isFactionTag(tag));

  const removeFromEncounterButton = ((encounterCreature && onRemoveFromEncounter)
    ? <button 
        className='remove-creature-btn'
        onClick={() => onRemoveFromEncounter(encounterCreature.id)}
        title="Remove from encounter"
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
    : null);
  const addToEncounterButton = ((onAddToEncounter)
  ? <button 
      className='add-creature-btn'
      onClick={() => onAddToEncounter(data)}
      title="Add to encounter"
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  : null);
  const healthDisplay = (<>
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
    {isEncounterMode && encounterCreature ? `/${encounterCreature.maxHealth}` : ''}{healthIcon}
  </>);

  // Helper component to conditionally wrap with tooltip in example mode
  const TooltipWrapper = ({ 
    children, 
    explanation,
    className,
    isDiv = false
  }: { 
    children: React.ReactNode; 
    explanation: string;
    className?: string;
    isDiv?: boolean;
  }) => {
    if (isExample) {
      return (
        <CreatureTooltip explanation={explanation} className={className} isDiv={isDiv}>
          {children}
        </CreatureTooltip>
      );
    }
    return <>{children}</>;
  };

  const renderAbilityDescription = (description: unknown): React.ReactNode => {
    // If it's a string, just return it
    if (typeof description === 'string') {
      return description;
    }
    // If it's a valid React element, return it directly
    if (isValidElement(description)) {
      return description;
    }
    // If it's an array, map and render each item
    if (Array.isArray(description)) {
      return description.map(item => renderAbilityDescription(item));
    }
    // If it's an object with props and children, try to render children
    if (
      description &&
      typeof description === 'object' &&
      'props' in description
    ) {
      const props = (description as { props?: { children?: unknown } }).props;
      if (props && props.children !== undefined) {
        return renderAbilityDescription(props.children);
      }
    }
    // Fallback: show error
    return '[Description could not be loaded]';
  };

  return (<div
    className={`creature-card ${factionClass} ${isEncounterMode ? 'encounter-card' : ''} ${isExample ? 'example-card' : ''}`}
  >
    <div className='title-row'>
      <TooltipWrapper explanation={cce.name}>
        <span className='name'>{data.name}</span>
      </TooltipWrapper>
      <div>
        <TooltipWrapper explanation={cce.tier}>
          <span className='tier'>{data.tier}</span>
        </TooltipWrapper>
        {isEncounterMode ? (removeFromEncounterButton) : (addToEncounterButton)}
      </div>
    </div>
    {/* <TooltipWrapper explanation="Tags describe special characteristics, creature types, and mechanical properties. Some abilities or spells may interact specifically with certain tags."> */}
      <div className='tags'>
        {nonFactionTags.map((tag, i) => <span 
          key={`creature-${data.name}-tag-${i}`}
        >
          {(typeof tag === 'string') ? tag : `${tag.tag}: ${tag.value}`}
        </span>)}
      </div>
    {/* </TooltipWrapper> */}
    <div className='stats'>
      <TooltipWrapper explanation={cce.health}>
        <span>Health: {healthDisplay}</span>
      </TooltipWrapper>
      <TooltipWrapper explanation={cce.speed}>
        <span>Speed: {data.speed}{hexIcon}
          {data.dash ? ` (${data.dash >= 0 ? '+' : ''}${data.dash}${hexIcon})` : null}
        </span>
      </TooltipWrapper>
      <TooltipWrapper explanation={cce.size}>
        <span>Size: {data.size}{hexIcon}</span>
      </TooltipWrapper>
      <TooltipWrapper explanation={cce.shove}>
        <span>Shove: +3</span>
      </TooltipWrapper>
      <TooltipWrapper explanation={cce.grab}>
        <span>Grapple: +5</span>
      </TooltipWrapper>
      <TooltipWrapper explanation={cce.escape}>
        <span>Escape: +2</span>
      </TooltipWrapper>
    </div>

    <div className='damage-modifiers'>
      <TooltipWrapper 
        className='damage-modifiers-tooltip' 
        explanation={cce.damageMods}
      >
        {data.damageTakenMods.map((mod, i) => 
          <DamageModComponent key={`creature-${data.name}-damage-taken-mod-${i}`} mod={mod} />)}
      </TooltipWrapper>
    </div>

    <TooltipWrapper explanation={cce.attacks} isDiv>
      <div>
        {data.attacks.map((attack, i) => <div key={`creature-${data.name}-attack-${i}`}>
          <AttackModeComponent attackMode={attack} />
        </div>)}
      </div>
    </TooltipWrapper>

    { // Abilities.
      (data.abilities.length > 0)
        ? <TooltipWrapper explanation={cce.abilities} isDiv>
          <div className='creature-abilities'>
            <div><b>Abilities</b>:</div>
            {data.abilities.map((ability, i) => {
              return <div key={`creature-${data.name}-ability-${i}`} className='ability details-indentation'>
                {ability.name ? <i>{ability.name}: </i> : null}
                {renderAbilityDescription(ability.description)}
              </div>
            })}
          </div>
        </TooltipWrapper>
      : null
    }

    <TooltipWrapper explanation={cce.description} isDiv>
      <div className='creature-description'><i>{data.description}</i></div>
    </TooltipWrapper>
    
    {/* Faction tag positioned at bottom right */}
    {factionTags.length > 0 && (
      <div className='faction-tag-container'>
        {factionTags.map((tag, i) => (
          <TooltipWrapper explanation={cce.faction} className="faction-tag-container-tooltip">
            <span 
              key={`creature-${data.name}-faction-tag-${i}`}
              className='faction-tag'
            >
                {(typeof tag === 'string')
                  ? tag
                  : `${tag.tag}: ${tag.value}`
                }
            </span>
          </TooltipWrapper>
        ))}
      </div>
    )} 
  </div>);
}