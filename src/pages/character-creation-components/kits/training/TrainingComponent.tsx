import { Training } from '../../../../ts-types/types.tsx';
import Tags from '../../../../common-design/Tags.tsx';

type Props = {
  training: Training;
};

export default function TrainingComponent({ training }: Props) {
  return (<div className='training'>
    <div><span className='name'>{training.name}</span><Tags tags={training.tags} /></div>
    <div className='effect details-indent'>
      {training.effects.map((e, i) => <div key={`item-${training.name}-effect-${i}`}>{e}</div>)}
    </div>
  </div>);
}