import WeaponName from './weapon-components/WeaponName';
import {Weapon } from '../../../../ts-types/types';
import AttackModeComponent from "../../../../common-design/AttackModeComponent.tsx";
import Tags from '../../../../common-design/Tags.tsx';

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
    {w.choiceTags && (
      <div className='choice-tags'>
        <span>Choose {w.choiceTags.count}:</span>
        <Tags key={`choice-tags-${w.name}`} tags={w.choiceTags.tags} />
      </div>
    )}
    {
      w.attackModes.map((a, ai) => <div key={`attack-mode-${ai}`}>
        <AttackModeComponent attackMode={a} showTags={hasMultipleAttackModes(weapon)} />
      </div>)
    }
  </div>);
}