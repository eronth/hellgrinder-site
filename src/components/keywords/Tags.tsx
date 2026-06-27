import { AllValidTags } from "../../ts-types/tag-types";

type Props = {
  tags: AllValidTags[];
  onTagClick?: (tag: AllValidTags) => void;
  selectedTags?: AllValidTags[];
  selectedOnly?: boolean;
};

function tagsEqual(a: AllValidTags, b: AllValidTags): boolean {
  if (typeof a === 'string' && typeof b === 'string') return a === b;
  if (typeof a === 'object' && typeof b === 'object') return a.tag === b.tag && a.value === b.value;
  return false;
}

export default function Tags({ tags, onTagClick, selectedTags, selectedOnly }: Props) {
  return (<span className='tags'>
    {tags.map((t, ti) => {
      const isSelected = selectedTags?.some(s => tagsEqual(s, t)) ?? false;
      const className = `tag${isSelected ? ' selected-choice' : ''}${onTagClick ? ' clickable' : ''}`;
      
      if (selectedOnly && !isSelected) return null;

      return (
        <span key={`tag-${ti}`} className={className} onClick={() => { if(onTagClick) { onTagClick(t) } }}>
          [{(typeof t === 'string') ? t : `${t.tag}: ${t.value}`}]
        </span>
      );
    })}
  </span>);
}
