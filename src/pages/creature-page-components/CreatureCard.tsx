import AttackModeComponent from '../../common-design/AttackModeComponent';
import { Creature } from '../../ts-types/creature-types';
import DamageModComponent from './DamageModComponent';

type Props = {
  data: Creature;
};

export default function CreatureCard({ data }: Props) {
  const hexIcon = '⬣';

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

  return (<div className={`creature-card ${factionClass}`}>
    <div className='title-row'>
      <span className='name'>{data.name}</span>
      <span className='tier'>{data.tier}</span>
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
      <span>Health: {data.health}⛨</span>
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
          {data.abilities.map((ability, i) => <span key={`creature-${data.name}-ability-${i}`} className='details-indentation'>{ability}</span>)}
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