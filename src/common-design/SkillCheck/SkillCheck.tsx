import { useCallback } from "react";

type Props = {
  tags: string[];
  text?: string;
  plural?: boolean;
};

export default function SkillCheck({ text, tags, plural }: Props) {

  const formatTagsToDisplay = useCallback((tags: string[]) => {
    if (tags.length === 0) return null;
    
    console.log('Formatting tags:', tags);
    return <>
      [{tags.join(' ')}]
    </>;
  }, []);

  const displayCheck = (<span style={{backgroundColor: 'red'}}> 
    {text
      ? <>{text}</>
      : <>Skill Check</>
    }{plural ? 's' : ''}
  </span>);

  return (<>
    {formatTagsToDisplay(tags)} {displayCheck}
  </>);
};
