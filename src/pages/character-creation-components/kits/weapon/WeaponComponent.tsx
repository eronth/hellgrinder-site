import WeaponName from './weapon-components/WeaponName';
import {Weapon } from '../../../../ts-types/types';
import AttackModeComponent from "../../../../common-design/AttackModeComponent.tsx";

type Props = {
  weapon: Weapon;
};

export default function WeaponComponent({ weapon }: Props) {
  const w = weapon;

  function hasMultipleAttackModes(weapon: Weapon) {
    return weapon.attackModes.length > 1;
  }

  return (<div className='weapon'>
    <WeaponName weapon={w} />
    {
      w.attackModes.map((a, ai) => <div key={`attack-mode-${ai}`}>
        <AttackModeComponent attackMode={a} showTags={hasMultipleAttackModes(weapon)} />
      </div>)
    }
  </div>);
}