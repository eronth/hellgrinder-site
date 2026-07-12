import React from 'react';
import RuleKeyword from '../RuleKeyword';
import './Range.css';

export type RangeType = 'adjacent' | 'short' | 'medium' | 'long' | 'extreme';

type Props = {
  type: RangeType;
  /** Overrides the default "<Type> Range" label. */
  children?: React.ReactNode;
};

const RANGE_KEYWORDS: Record<RangeType, string> = {
  adjacent: 'Adjacent Range',
  short: 'Short Range',
  medium: 'Medium Range',
  long: 'Long Range',
  extreme: 'Extreme Range',
};

/* The band each range occupies on the ruler, ordered near -> far. Everything
   nearer than the band is drawn as faint "already covered" ground, so the
   glyph reads as a distance out from the character rather than a strength. */
const BANDS: RangeType[] = ['adjacent', 'short', 'medium', 'long', 'extreme'];

/* Ruler geometry, in viewBox units. Bars sit on the baseline and climb as
   they get further out; the character is the dot at the origin. */
const BAR_X0 = 6.6;
const BAR_PITCH = 4;
const BAR_WIDTH = 2.8;
const BASE_Y = 17.4;
const BAR_HEIGHTS = [3.6, 5.8, 8, 10.2, 12.4];

export default function Range({ type, children }: Props) {
  const label = children ?? RANGE_KEYWORDS[type];
  const activeIndex = BANDS.indexOf(type);

  return (
    <RuleKeyword keyword={RANGE_KEYWORDS[type]} className="range-trigger">
      <span className={`range-keyword ${type}`}>
        <svg className="range-glyph" viewBox="0 0 26 20" aria-hidden="true">
          {/* the ruler the bands are measured along */}
          <line className="range-track" x1="0.9" y1="18.8" x2="25.1" y2="18.8" />
          {/* the character, standing at zero */}
          <circle className="range-origin" cx="2.4" cy="15.6" r="2.4" />
          {BANDS.map((band, i) => {
            const height = BAR_HEIGHTS[i];
            const state = i < activeIndex ? 'near' : i === activeIndex ? 'active' : 'far';
            return (
              <rect
                key={band}
                className={`range-bar ${state}`}
                x={BAR_X0 + i * BAR_PITCH}
                y={BASE_Y - height}
                width={BAR_WIDTH}
                height={height}
                rx="1.1"
              />
            );
          })}
        </svg>
        <span className="range-label">{label}</span>
      </span>
    </RuleKeyword>
  );
}
