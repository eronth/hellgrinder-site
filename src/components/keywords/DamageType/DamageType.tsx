import React from 'react';
import { DamageElement } from '../../../ts-types/types';
import './DamageType.css';

type GlyphPart = { d: string; mode: 'fill' | 'stroke' };

/* One tiny elemental mark per damage type, drawn in a -10..10 box.
   Each glyph is just a list of paths, filled or stroked with the type's
   accent color — tweak or swap shapes freely. Types without an entry
   (e.g. the CORE/PROMOTE faction placeholders) render as plain text. */
const DAMAGE_GLYPHS: Record<string, GlyphPart[]> = {
  // faceted ingot
  metal: [
    { d: 'M 0 -6.5 L 5.5 0 L 0 6.5 L -5.5 0 Z', mode: 'stroke' },
    { d: 'M -5.5 0 L 5.5 0', mode: 'stroke' },
  ],
  // flame with a hollow heart
  infernal: [
    { d: 'M 0 -7.2 C 3.4 -3.4, 5.6 -0.6, 5.6 2.2 C 5.6 5.6, 3.1 7.8, 0 7.8 C -3.1 7.8, -5.6 5.6, -5.6 2.2 C -5.6 -0.6, -3.4 -3.4, 0 -7.2 Z M 0 -1.6 C 1.7 0.3, 2.8 1.7, 2.8 3.1 C 2.8 4.8, 1.6 5.9, 0 5.9 C -1.6 5.9, -2.8 4.8, -2.8 3.1 C -2.8 1.7, -1.7 0.3, 0 -1.6 Z', mode: 'fill' },
  ],
  // deep swells
  abyssal: [
    { d: 'M -7 -1.5 Q -3.5 -5.5 0 -1.5 T 7 -1.5', mode: 'stroke' },
    { d: 'M -7 4 Q -3.5 0 0 4 T 7 4', mode: 'stroke' },
  ],
  // leaf with midrib
  verdant: [
    { d: 'M 0 -7.4 C 4.8 -4.2, 4.8 3.4, 0 7.4 C -4.8 3.4, -4.8 -4.2, 0 -7.4 Z', mode: 'stroke' },
    { d: 'M 0 -3.6 L 0 7.4', mode: 'stroke' },
  ],
  // twin peaks
  chthonic: [
    { d: 'M -8.2 6.6 L -2.6 -4.6 L 3 6.6 Z M 1.4 6.6 L 5.2 -0.8 L 9 6.6 Z', mode: 'fill' },
  ],
  // lightning bolt
  nethercurrent: [
    { d: 'M 2 -8 L -5.4 1.2 L -0.8 1.2 L -2 8 L 5.4 -1.2 L 0.8 -1.2 Z', mode: 'fill' },
  ],
  // eclipsed disc
  voidyr: [
    { d: 'M 0 -6.6 A 6.6 6.6 0 1 1 0 6.6 A 6.6 6.6 0 1 1 0 -6.6 Z M 2.4 -7.6 A 5.2 5.2 0 1 1 2.4 2.8 A 5.2 5.2 0 1 1 2.4 -7.6 Z', mode: 'fill' },
  ],
  // the raw center of a thing
  core: [
    { d: 'M 0 -6 A 6 6 0 1 1 0 6 A 6 6 0 1 1 0 -6 Z', mode: 'stroke' },
    { d: 'M 0 -2.3 A 2.3 2.3 0 1 1 0 2.3 A 2.3 2.3 0 1 1 0 -2.3 Z', mode: 'fill' },
  ],
  // a sparkle, yet to settle on a shape
  'chosen-type': [
    { d: 'M 0 -7.4 L 1.9 -1.9 L 7.4 0 L 1.9 1.9 L 0 7.4 L -1.9 1.9 L -7.4 0 L -1.9 -1.9 Z', mode: 'fill' },
  ],
  // every direction at once
  all: [
    { d: 'M 0 -7 L 0 7', mode: 'stroke' },
    { d: 'M -6.1 -3.5 L 6.1 3.5', mode: 'stroke' },
    { d: 'M -6.1 3.5 L 6.1 -3.5', mode: 'stroke' },
  ],
};

type Props = {
  type: DamageElement | 'CORE' | 'PROMOTE' | 'REJECT' | 'DISRUPT';
  /** Appends the word "Damage", for "3 Infernal Damage" phrasing. */
  withWord?: boolean;
  /** Overrides the displayed name (glyph and color still follow `type`). */
  value?: number;
  valueAfter?: boolean;
  children?: React.ReactNode;
};

export default function DamageType({ type, withWord, value, valueAfter, children }: Props) {
  const slug = type.toLowerCase().replace(/\s+/g, '-');
  const glyph = DAMAGE_GLYPHS[slug];

  const numBefore = !value 
    ? null
    : valueAfter ? null : value+' ';
  const numAfter = !value 
    ? null
    : valueAfter ? ' '+value : null;

  return (
    <span className={`damage-type-keyword ${slug}`}>
      {numBefore}
      {glyph && (
        <svg className="damage-glyph" viewBox="-10 -10 20 20" aria-hidden="true">
          {glyph.map((part, pi) => (
            <path key={`part-${pi}`} className={`glyph-${part.mode}`} d={part.d} fillRule="evenodd" />
          ))}
        </svg>
      )}
      <span className="damage-label">
        {children ?? type}{withWord ? ' Damage' : ''}
      </span>
      {numAfter}
    </span>
  );
}
