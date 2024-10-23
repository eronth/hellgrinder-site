import { AllValidTags } from "../ts-types/tag-types";

type Props = {
  tags: AllValidTags[];
};
export default function Tags({ tags }: Props) {
  return (<span className='tags'>
    {tags.map((t, ti) => 
      <span key={`tag-${ti}`} className='tag'>
        [{(typeof t === 'string') ? t : `${t.tag}: ${t.value}`}] 
      </span>
    )}
  </span>);
}