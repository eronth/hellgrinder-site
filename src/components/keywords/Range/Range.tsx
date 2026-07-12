import React from 'react';
import RuleKeyword from '../RuleKeyword';
import RangeGlyph, { RangeGlyphVariant, RangeType } from './RangeGlyph';
import './Range.css';

export type { RangeType };

type Props = {
  type: RangeType;
  /** Overrides the site-wide RANGE_GLYPH_VARIANT (see RangeGlyph.tsx). */
  variant?: RangeGlyphVariant;
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

export default function Range({ type, variant, children }: Props) {
  const label = children ?? RANGE_KEYWORDS[type];

  return (
    <RuleKeyword keyword={RANGE_KEYWORDS[type]} className="range-trigger">
      <span className={`range-keyword ${type}`}>
        <RangeGlyph type={type} variant={variant} />
        <span className="range-label">{label}</span>
      </span>
    </RuleKeyword>
  );
}
