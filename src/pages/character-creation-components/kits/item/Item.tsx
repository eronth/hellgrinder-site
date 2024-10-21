import { Item } from '../../../../ts-types/types.tsx';
import Tags from '../../../../common-design/Tags';

type Props = {
  item: Item;
};

export default function Training({ item }: Props) {
  return (<div className='item'>
    <div><span className='name'>{item.name}</span><Tags tags={item.tags} /></div>
    <div className='description details-indent'>{item.description}</div>
    <div className='effect details-indent'>
      {item.effects.map((e, ei) => <div key={`item-${item.name}-effect-${ei}`}>{e}</div>)}
    </div>
  </div>);
}