import WeaponName from './weapon-components/WeaponName';
import WeaponSpecialNotes from './weapon-components/WeaponSpecialNotes';
import Tags from '../../../../common-design/Tags';
import type { WeaponType, AttackModeType, KitType } from '../../../../ts-types/types';

type Props = {
  kit: KitType;
  weaponIndex: number;
  weapon: WeaponType;
};

export default function Weapon({ kit, weaponIndex, weapon }: Props) {
  const w = weapon;
  const wi = weaponIndex;

  function hasMultipleAttackModes(weapon: WeaponType) {
    return weapon.attackModes.length > 1;
  }

  function getPerAttackModeTags(weapon: WeaponType, key: string, attackMode: AttackModeType) {
    if (hasMultipleAttackModes(weapon)) {
      return <span><span>{attackMode.name}</span><Tags key={key} tags={attackMode.tags} /></span>;
    } else {
      return null;
    }
  }

  function makeAttackDamageText(attackMode: AttackModeType) {
    const dmg = attackMode.damage;
    if (dmg.l.type === dmg.m.type && dmg.m.type === dmg.h.type) {
      return `${dmg.l.value}/${dmg.m.value}/${dmg.h.value} ${dmg.l.type} Damage`;
    }

    return `${dmg.l.value} ${dmg.l.type}/${dmg.m.value} ${dmg.l.type}/${dmg.h.value} ${dmg.l.type} Damage`;
  }

  return (<>
    <WeaponName key={`kit-${kit.name}-weapon-${wi}-name`} weapon={w} />
    {w.attackModes.map((a, ai) => <div key={`kit-${kit.name}-weapon-${wi}-attack-mode-${ai}`}>

      {/* Tags Section */}
      {getPerAttackModeTags(w, `kit-${kit.name}-weapon-${wi}-attack-mode-${ai}-tags`, a)}

      <div key={`kit-${kit.name}-weapon-${wi}-attack-mode-${ai}-damage`}>&nbsp;{makeAttackDamageText(a)}</div>
      <WeaponSpecialNotes key={`kit-${kit.name}-weapon-${wi}-attack-mode-${ai}-weapon-notes`} effects={a.effects} />

    </div>)}

  </>);
}