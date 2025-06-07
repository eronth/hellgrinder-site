
import { AttackMode } from "../ts-types/types";
import Tags from './Tags';
import WeaponSpecialNotes from '../pages/character-creation-components/kits/weapon/weapon-components/WeaponSpecialNotes';
import WeaponDamage from "../pages/character-creation-components/kits/weapon/weapon-components/WeaponDamage.tsx";


type Props = {
  attackMode: AttackMode;
  showTags?: boolean;
};

export default function AttackModeComponent({ attackMode, showTags=true }: Props) {
  function getPerAttackModeTags(attackMode: AttackMode) {
    return (attackMode.name
      ?
      (<span className="name-row">
        <span className="name">- {attackMode.name}</span>
        {showTags ? <Tags tags={attackMode.tags} /> : null}
      </span>)
      : (<></>)
      );
  }

  return (<span className="attack-option">
    <div className={'details-indent'}>
      {getPerAttackModeTags(attackMode)}
    </div>
    <div className="details-indentation">
      <WeaponDamage attackMode={attackMode} />
    </div>
    <WeaponSpecialNotes className={'details-indentation'} effects={attackMode.effects} />
  </span>);
}