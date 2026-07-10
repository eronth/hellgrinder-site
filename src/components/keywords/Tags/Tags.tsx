import { AllValidTags } from "../../../ts-types/tag-types";
import './Tags.css';

type Props = {
  tags: AllValidTags[];
  onTagClick?: (tag: AllValidTags) => void;
  selectedTags?: AllValidTags[];
  selectedOnly?: boolean;
};

function tagsEqual(a: AllValidTags, b: AllValidTags): boolean {
  if (typeof a === 'string' && typeof b === 'string') { return a === b; }
  if (typeof a === 'object' && typeof b === 'object') { return a.tag === b.tag && a.value === b.value; }
  return false;
}

function isRangeTag(t: AllValidTags): boolean {
  if (typeof t === 'string') return t.endsWith(' Range');
  return t.tag === 'Range';
}

function rangeLabel(t: AllValidTags): string {
  if (typeof t === 'string') return t.replace(/ Range$/, '');
  return `${t.value}`;
}

export default function Tags({ tags, onTagClick, selectedTags, selectedOnly }: Props) {
  const rangeTags = tags.filter(isRangeTag);
  const otherTags = tags.filter(t => !isRangeTag(t));

  const isTagSelected = (t: AllValidTags) => selectedTags?.some(s => tagsEqual(s, t)) ?? false;

  const visibleRangeTags = selectedOnly ? rangeTags.filter(isTagSelected) : rangeTags;

  return (<span className='tags'>
    {visibleRangeTags.length > 0 && (
      <span className='tag range-tag'>
        <span className='range-key'>Range</span>
        <span className='range-values'>
          {visibleRangeTags.map((t, ri) => {
            const isSelected = isTagSelected(t);
            const className = `range-value${isSelected ? ' selected-choice' : ''}${onTagClick ? ' clickable' : ''}`;
            return (
              <span key={`range-${ri}`}>
                {ri > 0 && ', '}
                <span className={className} onClick={() => { if (onTagClick) { onTagClick(t) } }}>
                  {rangeLabel(t)}
                </span>
              </span>
            );
          })}
        </span>
      </span>
    )}
    {otherTags.map((t, ti) => {
      const isSelected = isTagSelected(t);
      const className = `tag ${isSelected ? ' selected-choice' : ''}${onTagClick ? ' clickable' : ''}`;

      if (selectedOnly && !isSelected) { return null; }

      return (
        <span key={`tag-${ti}`} className={className} onClick={() => { if(onTagClick) { onTagClick(t) } }}>
          {(typeof t === 'string') ? t : `${t.tag}: ${t.value}`}
        </span>
      );
    })}
  </span>);
}
