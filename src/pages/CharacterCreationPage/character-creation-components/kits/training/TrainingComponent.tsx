import { Training } from '../../../../../ts-types/types.tsx';
import Tags from '../../../../../components/keywords/Tags/Tags.tsx';

type Props = {
  training: Training;
};

export default function TrainingComponent({ training }: Props) {
  return (<div className='training'>
    <div className='kit-eyebrow'>Training</div>
    <div className='kit-title-row'><span className='name'>{training.name}</span><Tags tags={training.tags} /></div>
    {training.charges != null && <div className='details-indent'><b>Charges</b>: {training.charges}</div>}
    <div className='effect details-indent'>
      {training.effects.map((e, i) => <div key={`item-${training.name}-effect-${i}`}>{e}</div>)}
    </div>
  </div>);
}