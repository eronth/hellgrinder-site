import './RangeGlyph.css';

export const RANGE_BANDS = ['adjacent', 'short', 'medium', 'long', 'extreme'] as const;
export type RangeType = typeof RANGE_BANDS[number];

export type RangeGlyphVariant = 'bars' | 'ripples' | 'hexrings' | 'reach' | 'pips';
export const RANGE_GLYPH_VARIANT: RangeGlyphVariant = 'reach';

type Props = {
  type: RangeType;
  /** Overrides the site-wide RANGE_GLYPH_VARIANT, for side-by-side comparison. */
  variant?: RangeGlyphVariant;
};

/* Every variant marks the five bands the same way: the named band is the
   accent, bands nearer than it are dim accent (ground you already cover), and
   bands beyond it are inert track. Only the drawing changes. */
type BandState = 'near' | 'active' | 'far';
const bandState = (i: number, active: number): BandState =>
  i < active ? 'near' : i === active ? 'active' : 'far';

/* --- bars: a ruler. You are the dot at zero; the bands climb away from you. */
const BAR_HEIGHTS = [3.6, 5.8, 8, 10.2, 12.4];
function Bars({ active }: { active: number }) {
  return (
    <svg className="range-glyph bars" viewBox="0 0 26 20" aria-hidden="true">
      <line className="range-track" x1="0.9" y1="18.8" x2="25.1" y2="18.8" />
      <circle className="range-origin" cx="2.4" cy="15.6" r="2.4" />
      {RANGE_BANDS.map((band, i) => (
        <rect
          key={band}
          className={`range-mark ${bandState(i, active)}`}
          x={6.6 + i * 4}
          y={17.4 - BAR_HEIGHTS[i]}
          width="2.8"
          height={BAR_HEIGHTS[i]}
          rx="1.1"
        />
      ))}
    </svg>
  );
}

/* --- ripples: concentric range rings spreading out from you, like sonar.
   Closest in spirit to the Arc rose, since both are drawn as arcs around a
   character at the centre. */
const RIPPLE_RADII = [3.4, 6.2, 9, 11.8, 14.6];
const RIPPLE_SPREAD = 38; // degrees either side of straight-out
function rippleArc(radius: number): string {
  const rad = (RIPPLE_SPREAD * Math.PI) / 180;
  const dx = radius * Math.cos(rad);
  const dy = radius * Math.sin(rad);
  return `M ${(1.8 + dx).toFixed(2)} ${(10 - dy).toFixed(2)}`
    + ` A ${radius} ${radius} 0 0 1 ${(1.8 + dx).toFixed(2)} ${(10 + dy).toFixed(2)}`;
}
function Ripples({ active }: { active: number }) {
  return (
    <svg className="range-glyph ripples" viewBox="0 0 20 20" aria-hidden="true">
      <circle className="range-origin" cx="1.8" cy="10" r="2.2" />
      {RANGE_BANDS.map((band, i) => (
        <path key={band} className={`range-arc ${bandState(i, active)}`} d={rippleArc(RIPPLE_RADII[i])} />
      ))}
    </svg>
  );
}

/* --- hexrings: the bands as hex distance rings drawn around you, which is
   literally how they are measured on the table. Leans hardest into the game's
   own geometry. (A *row* of hexes was tried and abandoned — at 1em a hexagon
   is four pixels wide and reads as a dot.) */
const HEX_RING_RADII = [2.6, 4.4, 6.2, 8, 9.8];
function hexPath(cx: number, cy: number, r: number): string {
  const points = [90, 150, 210, 270, 330, 30].map(deg => {
    const rad = (deg * Math.PI) / 180;
    return `${(cx + r * Math.cos(rad)).toFixed(2)} ${(cy - r * Math.sin(rad)).toFixed(2)}`;
  });
  return `M ${points.join(' L ')} Z`;
}
function HexRings({ active }: { active: number }) {
  return (
    <svg className="range-glyph hexrings" viewBox="0 0 20 20" aria-hidden="true">
      {RANGE_BANDS.map((band, i) => (
        <path key={band} className={`range-arc ${bandState(i, active)}`} d={hexPath(10, 10, HEX_RING_RADII[i])} />
      ))}
      <circle className="range-origin" cx="10" cy="10" r="1.4" />
    </svg>
  );
}

/* --- reach: a measuring tape. An arrow runs from you out to the named band's
   tick. The band is read from how far the arrow travels, so Adjacent and
   Extreme are told apart by length alone — the loudest variant at small sizes.

   Only the four normal bands get a tick. Extreme is off the ruler by
   definition, so its arrow overshoots the last tick and runs past the edge of
   the viewBox (which is why the glyph doesn't clip); it bleeds a little into
   the label, and that's the point. */
const REACH_TICKS = [8, 12.2, 16.4, 20.6];
const REACH_OFF_SCALE = 30;
function Reach({ active }: { active: number }) {
  const tip = active >= REACH_TICKS.length ? REACH_OFF_SCALE : REACH_TICKS[active];
  return (
    <svg className="range-glyph reach" viewBox="0 0 26 20" aria-hidden="true">
      <line className="range-track" x1="2" y1="10" x2="22.4" y2="10" />
      {REACH_TICKS.map((x, i) => (
        <line key={RANGE_BANDS[i]} className="range-tick" x1={x} y1="6.8" x2={x} y2="13.2" />
      ))}
      <line className="range-reach" x1="2" y1="10" x2={tip - 2} y2="10" />
      <path className="range-arrow" d={`M ${tip} 10 L ${tip - 3} 7.2 L ${tip - 3} 12.8 Z`} />
      <circle className="range-origin" cx="2" cy="10" r="2.2" />
    </svg>
  );
}

/* --- pips: the quietest option. Five dots, the named one swollen and solid.
   Adds the least texture to a dense paragraph. */
function Pips({ active }: { active: number }) {
  return (
    <svg className="range-glyph pips" viewBox="0 0 26 20" aria-hidden="true">
      {RANGE_BANDS.map((band, i) => {
        const state = bandState(i, active);
        return (
          <circle
            key={band}
            className={`range-mark ${state}`}
            cx={3.4 + i * 4.8}
            cy="10"
            r={state === 'active' ? 2.6 : 1.5}
          />
        );
      })}
    </svg>
  );
}

export default function RangeGlyph({ type, variant = RANGE_GLYPH_VARIANT }: Props) {
  const active = RANGE_BANDS.indexOf(type);

  switch (variant) {
    case 'ripples': return <Ripples active={active} />;
    case 'hexrings': return <HexRings active={active} />;
    case 'reach': return <Reach active={active} />;
    case 'pips': return <Pips active={active} />;
    case 'bars':
    default: return <Bars active={active} />;
  }
}
