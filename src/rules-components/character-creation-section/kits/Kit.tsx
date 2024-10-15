import type { KitType } from '../../../ts-types/types';
import Weapon from './weapon/Weapon';
import Item from './item/Item';
import Training from './training/Training';

type Props = {
  kit: KitType;
};

export default function Kit({ kit }: Props) {

  
  return (<div className='kit'>
    <div className='name'>{kit.name}</div>
    <div className='description'>{kit.description}</div>
    <div className='benefits-label'>Kit Benefits:</div>
    <div className="benefits">

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

    </div>

  </div>);
}