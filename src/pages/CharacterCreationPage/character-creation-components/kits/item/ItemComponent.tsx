import { Item } from '../../../../../ts-types/types.tsx';
import Tags from '../../../../../components/keywords/Tags/Tags.tsx';
import './ItemComponent.css';

type Props = {
  item: Item;
};

export default function ItemComponent({ item }: Props) {
  return (<div className='item'>
    <div><span className='name'>{item.name}</span><Tags tags={item.tags} /></div>
    <div className='description details-indent'>{item.description}</div>
    {item.charges != null && <div className='details-indent'><b>Charges</b>: {item.charges}</div>}
    <div className='effect details-indent'>
      {item.effects.map((e, ei) => (
        <div key={`item-${item.name}-effect-${ei}`} className='effect-bit'>
          {e}
        </div>)
      )}
    </div>
  </div>);
}
