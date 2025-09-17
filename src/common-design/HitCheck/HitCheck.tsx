import SkillCheck from "../SkillCheck/SkillCheck";

type Props = {
  tags: string[];
  plural?: boolean;
};

export default function HitCheck({ tags, plural }: Props) {
  return (<>
    <SkillCheck
      tags={tags}
      text="Hit Check"
      plural={plural}
    />
  </>);
};
