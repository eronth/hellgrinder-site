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
    <div className='kit-eyebrow'>Weapon</div>
    <div className='kit-title-row'>
      <WeaponName weapon={w} />
    </div>
    {w.choiceTags && (
      <SelectableTags
        choiceTags={w.choiceTags}
        choiceInteraction={choiceInteraction}
      />
    )}
    <WeaponSpecialNotes className='details-indent' effects={w.effects} />
    {w.charges && <div className='details-indent'><b>Charges</b>: {w.charges}</div>}
    {
      w.attackModes.map((a, ai) => (
      <div key={`attack-mode-${ai}`} className='kit-mode'>
        <AttackModeComponent attackMode={a} showTags={hasMultipleAttackModes(weapon)} />
      </div>
    ))}
  </div>);
}
