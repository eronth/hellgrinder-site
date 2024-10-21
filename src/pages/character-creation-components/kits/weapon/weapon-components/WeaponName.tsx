import { Weapon } from "../../../../../ts-types/types.tsx";
import Tags from '../../../../../common-design/Tags';

type Props = {
  weapon: Weapon;
};

export default function WeaponName({ weapon }: Props) {

  function getWeaponName() {
    if (weapon.attackModes?.length === 1) {
      return (<>
        <span className='weapon-name name'>{weapon.name}</span>
        <Tags key={`global-weapon-tags`} tags={weapon.tags.concat(weapon.attackModes[0].tags)} />
      </>);
    } else {
      return (<>
        <span className='weapon-name name'>{weapon.name}</span>
        <Tags key={`global-weapon-tags`} tags={weapon.tags} />
      </>);
    }
  }

  return (<>{getWeaponName()}</>);
}