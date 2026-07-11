import './SkillCheck.css';

type Props = {
  tags: string[];
  text?: string;
  plural?: boolean;
};

export default function SkillCheck({ text, tags, plural }: Props) {
  const label = `${text || 'Skill Check'}${plural ? 's' : ''}`;
  const hasTags = (tags?.length ?? 0) > 0;

  return (<span className="skill-check-listing">
    {hasTags && (
      <span className="check-tags">
        {tags.map((tag, ti) => (
          <span key={`check-tag-${ti}`}>
            {ti > 0 && <span className="check-tag-separator">·</span>}
            {tag}
          </span>
        ))}
      </span>
    )}
    <span className="check-label">{label}</span>
  </span>);
};
