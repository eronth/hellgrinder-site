import { DamageTakenMod } from '../../../../ts-types/creature-types';
import DamageType from '../../../../components/keywords/DamageType/DamageType';


type Props = {
  mod: DamageTakenMod;
};

export default function DamageModComponent({ mod }: Props) {
  return (<span className='damage-modifier'>
    <span className='modifier-type'>{mod.modification}</span>
    <span className='damage-type'><DamageType type={mod.type} value={mod.mod} valueAfter /></span>
  </span>);
}
