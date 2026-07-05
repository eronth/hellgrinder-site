
import { AttackMode } from "../../../ts-types/types.tsx";
import Tags from '../../keywords/Tags/Tags.tsx';
import WeaponSpecialNotes from '../../../pages/CharacterCreationPage/character-creation-components/kits/weapon/weapon-components/WeaponSpecialNotes.tsx';
import WeaponDamage from "../../../pages/CharacterCreationPage/character-creation-components/kits/weapon/weapon-components/WeaponDamage.tsx";
import './AttackModeComponent.css';

type Props = {
  attackMode: AttackMode;
  showTags?: boolean;
};

export default function AttackModeComponent({ attackMode, showTags=true }: Props) {
  function getPerAttackModeTags(attackMode: AttackMode) {
    return (attackMode.name
      ? (<span className="name-row">
          <span className="name">- {attackMode.name}</span>
          {showTags ? <Tags tags={attackMode.tags} /> : null}
        </span>)
      : (<></>)
      );
  }

  return (<span className="attack-option">
    <div className={'name-container'}>
      {getPerAttackModeTags(attackMode)}
    </div>
    <div className="details-indentation">
      <WeaponDamage attackMode={attackMode} />
      { attackMode.charges != null 
        && <span className=""> | <b>Charges</b>: {attackMode.charges}</span>}
    </div>
    <WeaponSpecialNotes className={'details-indentation'} effects={attackMode.effects} />
  </span>);
}
