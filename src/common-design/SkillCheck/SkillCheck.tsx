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

  const displayCheck = (<> 
    {text
      ? <>{text}</>
      : <>Skill Check</>
    }{plural ? 's' : ''}
  </>);

  return (<>
    {formatTagsToDisplay(tags)} {displayCheck}
  </>);
};
