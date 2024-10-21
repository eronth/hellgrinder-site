import type { Kit } from '../../../ts-types/types';
import Weapon from './weapon/Weapon';
import Item from './item/Item';
import Training from './training/TrainingComponent';

type Props = {
  needsCols?: boolean;
  kit: Kit;
};

export default function Kit({ needsCols, kit }: Props) {
  
  function getKitBenefitsLayedOut() {
    if (needsCols) {
      return (<div className='col-handler'>{getKitBenefitPieces()}</div>);
    } else {
      return (<>{getKitBenefitPieces()}</>);
    }
  }

  function getKitBenefitPieces() {
    return (<>
      {/* List the weapons */}
      {kit.weapons.map((w, wi) => 
        <Weapon weapon={w} key={`kit-${kit.name}-weapon-${wi}`} />
      )}

      {/* List the additional items */}
      {kit.items.map((i, ii) => 
        <Item item={i} key={`kit-${kit.name}-item-${ii}`} />
      )}
      
      {/* List the trainings */}
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