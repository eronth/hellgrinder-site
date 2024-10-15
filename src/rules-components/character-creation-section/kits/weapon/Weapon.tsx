import WeaponName from './weapon-components/WeaponName';
import WeaponSpecialNotes from './weapon-components/WeaponSpecialNotes';
import Tags from '../../../../common-design/Tags';
import type { WeaponType, AttackModeType } from '../../../../ts-types/types';

type Props = {
  weapon: WeaponType;
};

export default function Weapon({ weapon }: Props) {
  const w = weapon;

  function hasMultipleAttackModes(weapon: WeaponType) {
    return weapon.attackModes.length > 1;
  }

  function getPerAttackModeTags(weapon: WeaponType, key: string, attackMode: AttackModeType) {
    if (hasMultipleAttackModes(weapon)) {
      return <span><span className="name">{attackMode.name}</span><Tags key={key} tags={attackMode.tags} /></span>;
    } else {
      return null;
    }
  }

  function makeAttackDamageText(attackMode: AttackModeType) {
    const dmg = attackMode.damage;
    if (dmg.l.type === dmg.m.type && dmg.m.type === dmg.h.type) {
      return `${dmg.l.value}/${dmg.m.value}/${dmg.h.value} ${dmg.l.type} Damage`;
    }

    return `${dmg.l.value} ${dmg.l.type}/${dmg.m.value} ${dmg.m.type}/${dmg.h.value} ${dmg.h.type} Damage`;
  }

  return (<div className='weapon'>
    <WeaponName weapon={w} />
    {w.attackModes.map((a, ai) => <div key={`attack-mode-${ai}`}>

      {/* Tags Section */}
      <div className='details-indent'>
        {getPerAttackModeTags(w, `attack-mode-${ai}-tags`, a)}

        <div className={hasMultipleAttackModes(w) ? 'details-indent':''} key={`attack-mode-${ai}-damage`}>{makeAttackDamageText(a)}</div>
        <WeaponSpecialNotes className={hasMultipleAttackModes(w) ? 'details-indent':''}key={`attack-mode-${ai}-weapon-notes`} effects={a.effects} />
      </div>

    </div>)}

  </div>);
}