import type { Kit } from '../../../../ts-types/types';
import WeaponComponent from './weapon/WeaponComponent';
import Item from './item/ItemComponent.tsx';
import Training from './training/TrainingComponent';
import { ChoiceInteraction } from './weapon/weapon-components/SelectableTags.tsx';

export type WeaponChoiceInteractions = Record<string, ChoiceInteraction>;

type Props = {
  needsCols?: boolean;
  kit: Kit;
  weaponChoiceInteractions?: WeaponChoiceInteractions;
};

export default function Kit({ needsCols, kit, weaponChoiceInteractions }: Props) {

  function getKitBenefitsLayedOut() {
    if (needsCols) {
      return (<div className='col-handler'>{getKitBenefitPieces()}</div>);
    } else {
      return (<>{getKitBenefitPieces()}</>);
    }
  }

  function getKitBenefitPieces() {
    return (<>
      {kit.weapons.map((w, wi) =>
        <WeaponComponent
          weapon={w}
          key={`kit-${kit.name}-weapon-${wi}`}
          choiceInteraction={weaponChoiceInteractions?.[w.name]}
        />
      )}
      {kit.items.map((i, ii) =>
        <Item item={i} key={`kit-${kit.name}-item-${ii}`} />
      )}
      {kit.trainings.map((t, ti) =>
        <Training training={t} key={`kit-${kit.name}-training-${ti}`} />
      )}
    </>);
  }

  return (<div className='kit'>
    <div className='name'>{kit.name}</div>
    <div className='description'>{kit.description}</div>
    <div className='benefits-label'>Kit Benefits:</div>
    <div className="benefits">
      {getKitBenefitsLayedOut()}
    </div>
  </div>);
}
