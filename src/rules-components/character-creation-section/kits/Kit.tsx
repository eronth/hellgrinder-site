import type { Kit } from '../../../ts-types/types';

type Props = {
  kit: Kit;
};

export default function Kit({ kit }: Props) {

  return (<div className='kit'>
    <div className='name'>{kit.name}</div>
    <div>{kit.description}</div>

  </div>);
}