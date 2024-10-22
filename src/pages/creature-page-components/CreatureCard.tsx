import AttackModeComponent from '../../common-design/AttackModeComponent';
import { Creature } from '../../ts-types/creature-types';

type Props = {
  data: Creature;
};

export default function GenericToNongenericTable({ data }: Props) {
  const pluralizeHex = (num: number) => num > 1 ? '⬡' : '⬡';


  return (<div className='creature-card'>
    <div className='title-row'>
      <span>{data.name}</span>
      <span>{data.type}</span>
    </div>
    <div className='tags'>
      {data.tags.map((tag, i) => <span key={`creature-${data.name}-tag-${i}`}>{tag}</span>)}
    </div>
    <div className='stats'>
      <span>{data.health} Health</span>
      <span>Speed: {data.speed} {pluralizeHex(data.speed)}</span>
      <span>Size: {data.size} {pluralizeHex(data.size)}</span>
      <span>Grab: +5</span>
      <span>Shove: 3</span>
    </div>

    <div>
      {data.damageTakenMods.map((mod, i) => <span>
        <span key={`creature-${data.name}-damage-taken-mod-${i}`}>{mod.modification}</span>
        <span key={`creature-${data.name}-damage-taken-type-${i}`}>{mod.type}</span>
        <span key={`creature-${data.name}-damage-taken-mod-${i}`}>{mod.mod}</span>
      </span>)}
    </div>

    <div>
      {data.attacks.map((attack, i) => <div key={`creature-${data.name}-attack-${i}`} style={{border: "1px solid white"}}>
        <AttackModeComponent attackMode = {attack} />
      </div>)}
    </div>
    {/* <div>
      {data.attacks.map((attack, i) => <span key={`creature-${data.name}-attack-${i}`}>{attack.name}</span>)}
    </div> */}

    <div>
      {data.abilities.map((ability, i) => <span key={`creature-${data.name}-ability-${i}`}>{ability}</span>)}
    </div>

    <div>{data.description}</div>
  </div>);
}