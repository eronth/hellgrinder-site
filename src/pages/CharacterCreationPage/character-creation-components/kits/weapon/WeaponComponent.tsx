import WeaponName from './weapon-components/WeaponName';
import { Weapon } from '../../../../../ts-types/types';
import AttackModeComponent from "../../../../../components/common/AttackModeComponent/AttackModeComponent.tsx";
import SelectableTags, { ChoiceInteraction } from './weapon-components/SelectableTags.tsx';
import WeaponSpecialNotes from './weapon-components/WeaponSpecialNotes.tsx';

type Props = {
  weapon: Weapon;
  choiceInteraction?: ChoiceInteraction;
};

export default function WeaponComponent({ weapon, choiceInteraction }: Props) {
  const w = weapon;

  function hasMultipleAttackModes(weapon: Weapon) {
    return weapon.attackModes.length > 1;
  }

  return (<div className='weapon'>
    <WeaponName weapon={w} />
    {w.choiceTags && (
      <SelectableTags
        choiceTags={w.choiceTags}
        choiceInteraction={choiceInteraction}
      />
    )}
    {w.charges && <div className='details-indent'><b>Charges</b>: {w.charges}</div>}
    <WeaponSpecialNotes className='details-indent' effects={w.effects} />
    {
      w.attackModes.map((a, ai) => (
      <div key={`attack-mode-${ai}`}>
        <AttackModeComponent attackMode={a} showTags={hasMultipleAttackModes(weapon)} />
      </div>
    ))}
  </div>);
}
