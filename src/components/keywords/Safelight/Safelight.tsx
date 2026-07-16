import './Safelight.css';

type GlyphPart = { d: string; mode: 'fill' | 'stroke' };

/* One gem per tier, drawn in a -10..10 box and rendered as clean line-art.
   They grow larger and more ornate up the scale: a bare sliver, a single
   crystal, a cut gem, a gem cracked out of its rocky geode, then a whole
   cluster of spires. Per-tier render sizes live in Safelight.css. */
const GEM_GLYPHS: Record<number, GlyphPart[]> = {
  // a bare little sliver
  0: [
    { d: 'M 0 -4 L 3 0.5 L 0 5 L -3 0.5 Z', mode: 'stroke' },
    { d: 'M -3 0.5 L 3 0.5', mode: 'stroke' },
  ],
  // a single six-sided crystal with a center ridge
  1: [
    { d: 'M 0 -7.5 L 3 -2 L 3 4 L 0 7 L -3 4 L -3 -2 Z', mode: 'stroke' },
    { d: 'M -3 -2 L 3 -2', mode: 'stroke' },
    { d: 'M 0 -7.5 L 0 7', mode: 'stroke' },
  ],
  // a cut gem: table, girdle and pavilion facets
  2: [
    { d: 'M -5 -6 L 5 -6 L 8 -1.5 L 0 8 L -8 -1.5 Z', mode: 'stroke' },
    { d: 'M -8 -1.5 L 8 -1.5', mode: 'stroke' },
    { d: 'M -5 -6 L -3 -1.5', mode: 'stroke' },
    { d: 'M 5 -6 L 3 -1.5', mode: 'stroke' },
    { d: 'M -3 -1.5 L 0 8', mode: 'stroke' },
    { d: 'M 3 -1.5 L 0 8', mode: 'stroke' },
  ],
  // a gem nested inside its cracked-open rocky shell
  3: [
    { d: 'M 0 -8.5 C 5.5 -8.5 9 -4 8.5 1 C 8 6.5 3.5 9 0 8.5 C -3.5 9 -8 6.5 -8.5 1 C -9 -4 -5.5 -8.5 0 -8.5 Z', mode: 'stroke' },
    { d: 'M -3.6 -2.5 L 3.6 -2.5 L 5 0.3 L 0 5.2 L -5 0.3 Z', mode: 'stroke' },
    { d: 'M -5 0.3 L 5 0.3', mode: 'stroke' },
    { d: 'M 0 -2.5 L 0 5.2', mode: 'stroke' },
  ],
  // three crystal spires rising together from a shared base
  4: [
    { d: 'M 0 -9 L 2.4 -3 L 1.5 6.5 L -1.5 6.5 L -2.4 -3 Z', mode: 'stroke' },
    { d: 'M 0 -9 L 0 6.5', mode: 'stroke' },
    { d: 'M -5 -2 L -3.3 1 L -3.8 6.5 L -6.6 6.5 L -7 1 Z', mode: 'stroke' },
    { d: 'M 5 -2 L 7 1 L 6.6 6.5 L 3.8 6.5 L 3.3 1 Z', mode: 'stroke' },
  ],
};

type Props = {
  tier?: number;
  /** Renders the plural ("Safelight Shards"). */
  plural?: boolean;
};

export default function Safelight({ tier, plural }: Props) {
  if (tier === undefined) {
    tier = 1;
  };
  const glyph = GEM_GLYPHS[tier];
  const safelightName = [
    'Chips',
    'Shard',
    'Gemstone',
    'Geode',
    'Cluster',
  ];
  return (
    <span className={`safelight-keyword safelight-${safelightName[tier].toLowerCase()}`}>
      <svg className="safelight-glyph" viewBox="-10 -10 20 20" aria-hidden="true">
        {glyph.map((part, i) => (
          <path key={`part-${i}`} className={`glyph-${part.mode}`} d={part.d} />
        ))}
      </svg>
      <span className="safelight-label">Safelight {safelightName[tier]}{plural ? 's' : ''}</span>
    </span>
  );
}
