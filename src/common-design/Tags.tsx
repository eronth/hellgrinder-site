type Props = {
  tags: string[];
};
export default function Tags({ tags }: Props) {
  return (<span className='tags'>
    {tags.map((t, ti) => 
      <span key={`tag-${ti}`} className='tag'>
        [{t}] 
      </span>
    )}
  </span>);
}