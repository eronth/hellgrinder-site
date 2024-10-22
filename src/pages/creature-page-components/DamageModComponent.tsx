import { DamageTakenMod } from '../../ts-types/creature-types';


type Props = {
  mod: DamageTakenMod;
};

export default function DamageModComponent({ mod }: Props) {
  return (<span className='damage-modifier'>
    <span className='modifier-type'>{mod.modification}</span>
    <span className='damage-type'>{mod.type}</span>
    <span className='modifier-amount'>{mod.mod}</span>
  </span>);
}
