import { DamageElement } from '../../../ts-types/types';
import DamageType from '../DamageType/DamageType';
import './DefenseMod.css';

type Props = {
  mod: 'Resist' | 'Absorb' | 'Weak';
  /** The element defended against. Omit for a mod that names no element. */
  type?: DamageElement;
  /** A damage descriptor with no DamageElement of its own, e.g. Soulrend. */
  label?: string;
  /** Reads ahead of the element, as in "Weak Blessed Metal 5". */
  qualifier?: string;
  /** Reads after the element, dimmed, as in "Resist All 1 (except Metal)". */
  note?: string;
  value?: number;
};

/** Inline "Resist Metal 3" / "Weak Chthonic 1" chip, sized to sit in prose. */
export default function DefenseMod({ mod, type, label, qualifier, note, value }: Props) {
  return (
    <span className={`defense-mod defense-${mod.toLowerCase()}`}>
      <span className="defense-mod-kind">{mod}</span>
      {qualifier && <span className="defense-mod-qualifier">{qualifier}</span>}
      {type
        ? <DamageType type={type} value={value} valueAfter />
        : <span className="defense-mod-label">
          {[label, value].filter(v => v !== undefined && v !== '').join(' ')}
        </span>}
      {note && <span className="defense-mod-note">{note}</span>}
    </span>
  );
}
