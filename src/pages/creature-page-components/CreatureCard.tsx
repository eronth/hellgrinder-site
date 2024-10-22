import AttackModeComponent from '../../common-design/AttackModeComponent';
import { Creature } from '../../ts-types/creature-types';
import DamageModComponent from './DamageModComponent';

type Props = {
  data: Creature;
};

export default function GenericToNongenericTable({ data }: Props) {
  const hexIcon = '⬣';

  return (<div className='creature-card'>
    <div className='title-row'>
      <span className='name'>{data.name}</span>
      <span>{data.type}</span>
    </div>
    <div className='tags'>
      {data.tags.map((tag, i) => <span key={`creature-${data.name}-tag-${i}`}>{tag}</span>)}
    </div>
    <div className='stats'>
      <span>Health: {data.health}⛨</span>
      <span>Speed: {data.speed}{hexIcon}
        {data.dash ? ` (+${data.dash}${hexIcon})` : null}
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
  </div>);
}