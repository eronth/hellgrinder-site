import type { KitType } from '../../../ts-types/types';
import Weapon from './weapon/Weapon';
type Props = {
  kit: KitType;
};

export default function Kit({ kit }: Props) {

  
  return (<div className='kit'>
    <div className='name'>{kit.name}</div>
    <div className='description'>{kit.description}</div>
    <div className='benefits-label'>Kit Benefits:</div>
    <div className="benefits">

      {kit.weapons.map((w, wi) => <div className="weapon" key={`kit-${kit.name}-weapon-${wi}`}>

        <Weapon weapon={w} key={`kit-${kit.name}-weapon-${wi}`} />

      </div>)}

    </div>

  </div>);
}