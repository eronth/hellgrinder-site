import { useCallback } from "react";
import './SkillCheck.css';

type Props = {
  tags: string[];
  text?: string;
  plural?: boolean;
};

export default function SkillCheck({ text, tags, plural }: Props) {

  const formatTagsToDisplay = useCallback((tags: string[]) => {
    if ((tags?.length ?? 0) == 0) return null;
    
    console.log('Formatting tags:', tags);
    return <span className={'tags-list'}>
      [{tags.join(' ')}]
    </span>;
  }, []);

  const displayCheck = (<span>
    {text
      ? <>{text}</>
      : <>Skill Check</>
    }{plural ? 's' : ''}
  </span>);

  return (<span className="skill-check-listing">
    {formatTagsToDisplay(tags)} {displayCheck}
  </span>);
};
