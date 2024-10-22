
import { AttackMode } from "../ts-types/types";
import Tags from './Tags';
import WeaponSpecialNotes from '../pages/character-creation-components/kits/weapon/weapon-components/WeaponSpecialNotes';

type Props = {
  attackMode: AttackMode;
};

export default function AttackModeComponent({ attackMode }: Props) {
  function getPerAttackModeTags(attackMode: AttackMode) {
      return <span className="name-row">
        <span className="name">{attackMode.name}</span>
        <Tags tags={attackMode.tags} />
      </span>;
  }

  function makeAttackDamageText(attackMode: AttackMode) {
    const dmg = attackMode.damage;
    if (dmg.l.type === dmg.m.type && dmg.m.type === dmg.h.type) {
      return `${dmg.l.value}/${dmg.m.value}/${dmg.h.value} ${dmg.l.type} Damage`;
    }

    return `${dmg.l.value} ${dmg.l.type}/${dmg.m.value} ${dmg.m.type}/${dmg.h.value} ${dmg.h.type} Damage`;
  }

  return (<span className="attack-option">
    {getPerAttackModeTags(attackMode)}
    <div className="details-indentation">{makeAttackDamageText(attackMode)}</div>
    <WeaponSpecialNotes className={'details-indentation'} effects={attackMode.effects} />
  </span>);
}