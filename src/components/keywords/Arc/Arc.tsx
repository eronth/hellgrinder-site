import React from 'react';
import RuleKeyword from '../RuleKeyword';
import './Arc.css';

export type ArcType = 'front' | 'peripheral' | 'rear' | 'flank';

type Props = {
  type: ArcType;
  plural?: boolean;
  /** Overrides the default "<Type> Arc" label. */
  children?: React.ReactNode;
};

/* Angular coverage of each arc, in degrees clockwise from straight ahead.
   Matches the hex facing rules: 3 front hexes (180°), 1 to each side (60°
   each), 1 behind (60°). Flank is everything that isn't front. */
const fadeg = 90;
const offset = 0;
const ARC_SEGMENTS: Record<ArcType, [number, number][]> = {
  front: [[-(fadeg-offset), (fadeg-offset)]],
  peripheral: [[(90+offset), (150-offset)], [(210+offset), (270-offset)]],
  rear: [[(150+offset), -(150+offset)]],
  flank: [[90, 270]],
};

const ARC_KEYWORDS: Record<ArcType, string> = {
  front: 'Front Arc',
  peripheral: 'Peripheral Arc',
  rear: 'Rear Arc',
  flank: 'Flank Arc',
};

const RING_RADIUS = 6.8;

function point(degrees: number): string {
  const rad = (degrees * Math.PI) / 180;
  const x = RING_RADIUS * Math.sin(rad);
  const y = -RING_RADIUS * Math.cos(rad);
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

function arcPath([from, to]: [number, number]): string {
  const largeArc = to - from > 180 ? 1 : 0;
  return `M ${point(from)} A ${RING_RADIUS} ${RING_RADIUS} 0 ${largeArc} 1 ${point(to)}`;
}

export default function Arc({ type, plural, children }: Props) {
  const label = children ?? `${ARC_KEYWORDS[type]}${plural ? 's' : ''}`;

  return (
    <RuleKeyword keyword={ARC_KEYWORDS[type]} className="arc-trigger">
      <span className={`arc-keyword ${type}`}>
        <svg className="arc-glyph" viewBox="-10 -10 20 20" aria-hidden="true">
          <circle className="arc-ring" r={RING_RADIUS} />
          {ARC_SEGMENTS[type].map((segment, si) => (
            <path key={`seg-${si}`} className="arc-highlight" d={arcPath(segment)} />
          ))}
          {/* the facing character, pointing "ahead" */}
          <path className="arc-pointer" d="M 0 -3.4 L 2.8 2.6 L -2.8 2.6 Z" />
        </svg>
        <span className="arc-label">{label}</span>
      </span>
    </RuleKeyword>
  );
}
