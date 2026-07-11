import { CharacterDesign } from "../../../../../../ts-types/player-character-types";
import { DamageElement, GrantedBonus } from "../../../../../../ts-types/types";
import { SkillChecks, tagName, tagValue } from "../../../../../../ts-types/tag-types";
import DamageType from "../../../../../../components/keywords/DamageType/DamageType";
import './BonusTotals.css';

type Props = {
  character: CharacterDesign;
  onUpdateCharacter: (characterId: string, updates: Partial<CharacterDesign>) => void;
};

type DefenseBonus = Extract<GrantedBonus, { defense: string }>;

const CHOICE_ELEMENTS: DamageElement[] =
  ['Metal', 'Infernal', 'Abyssal', 'Verdant', 'Chthonic', 'Nethercurrent', 'Voidyr'];

type SourcedBonus = { bonus: GrantedBonus; source: string };

/** Locates a choice bonus inside the character so a pick can be written back. */
type BonusAddress =
  | { owner: 'perk'; index: number; bonusIndex: number }
  | { owner: 'kit'; kitIndex: number; part: 'weapons' | 'items' | 'trainings'; index: number; bonusIndex: number }
  | { owner: 'inventory'; part: 'weapons' | 'items'; index: number; bonusIndex: number };

type ChoiceEntry = { source: string; bonus: DefenseBonus; address: BonusAddress };

type BonusGroup = {
  /** Representative bonus for the group (name + condition are identical within it). */
  sample: GrantedBonus;
  total: number;
  sources: { source: string; value: number }[];
};

function bonusDisplayName(bonus: GrantedBonus): string {
  if ('defense' in bonus) { return `${bonus.defense} ${bonus.element}`; }
  if ('tag' in bonus) {
    return typeof bonus.tag === 'string'
      ? bonus.tag
      : `${tagName(bonus.tag)} ${tagValue(bonus.tag)}`;
  }
  return bonus.label;
}

// Choice items only contribute once actually picked; everything else a
// character owns (specialization, kit gear, trainings, perks, acquired
// inventory) counts. 'Chosen Type' defenses are split out as choice entries;
// they join the totals once an element is picked.
function collectBonuses(character: CharacterDesign): { totals: SourcedBonus[]; choices: ChoiceEntry[] } {
  const totals: SourcedBonus[] = [];
  const choices: ChoiceEntry[] = [];

  const add = (
    bonuses: GrantedBonus[] | undefined,
    source: string,
    addressFor: (bonusIndex: number) => BonusAddress,
  ) => bonuses?.forEach((bonus, bonusIndex) => {
    if ('defense' in bonus && bonus.element === 'Chosen Type') {
      choices.push({ source, bonus, address: addressFor(bonusIndex) });
      if (bonus.chosenElement) {
        totals.push({ bonus: { ...bonus, element: bonus.chosenElement }, source });
      }
    } else {
      totals.push({ bonus, source });
    }
  });

  if (character.specializationBonus) {
    totals.push({ bonus: { tag: character.specializationBonus as SkillChecks, value: 3 }, source: 'Specialization (bonus)' });
  }
  if (character.specializationPenalty) {
    totals.push({ bonus: { tag: character.specializationPenalty as SkillChecks, value: -5 }, source: 'Specialization (penalty)' });
  }

  character.perks.forEach((p, index) =>
    add(p.bonuses, p.name, bonusIndex => ({ owner: 'perk', index, bonusIndex })));

  character.kits.forEach((kit, kitIndex) => {
    const selections = character.locks?.kits?.[kitIndex]?.itemChoiceSelections ?? [];
    kit.weapons.forEach((w, index) =>
      add(w.bonuses, w.name, bonusIndex => ({ owner: 'kit', kitIndex, part: 'weapons', index, bonusIndex })));
    kit.items.forEach((item, index) => {
      if (item.isChoiceItem && !selections.includes(item.name)) { return; }
      add(item.bonuses, item.name, bonusIndex => ({ owner: 'kit', kitIndex, part: 'items', index, bonusIndex }));
    });
    kit.trainings.forEach((t, index) =>
      add(t.bonuses, t.name, bonusIndex => ({ owner: 'kit', kitIndex, part: 'trainings', index, bonusIndex })));
  });

  character.inventory.weapons.forEach((w, index) =>
    add(w.bonuses, w.name, bonusIndex => ({ owner: 'inventory', part: 'weapons', index, bonusIndex })));
  character.inventory.items.forEach((item, index) =>
    add(item.bonuses, item.name, bonusIndex => ({ owner: 'inventory', part: 'items', index, bonusIndex })));

  return { totals, choices };
}

function applyChoice(
  character: CharacterDesign,
  address: BonusAddress,
  element: DamageElement | '',
): Partial<CharacterDesign> {
  const setBonus = <T extends { bonuses?: GrantedBonus[] }>(obj: T): T => ({
    ...obj,
    bonuses: obj.bonuses?.map((b, bi) => bi === address.bonusIndex
      ? { ...b, chosenElement: element || undefined }
      : b),
  });

  if (address.owner === 'perk') {
    return { perks: character.perks.map((p, i) => i === address.index ? setBonus(p) : p) };
  }

  if (address.owner === 'kit') {
    return {
      kits: character.kits.map((kit, ki) => {
        if (ki !== address.kitIndex) { return kit; }
        const updated = { ...kit };
        if (address.part === 'weapons') {
          updated.weapons = kit.weapons.map((w, i) => i === address.index ? setBonus(w) : w);
        } else if (address.part === 'items') {
          updated.items = kit.items.map((item, i) => i === address.index ? setBonus(item) : item);
        } else {
          updated.trainings = kit.trainings.map((t, i) => i === address.index ? setBonus(t) : t);
        }
        return updated;
      }),
    };
  }

  return {
    inventory: {
      ...character.inventory,
      [address.part]: character.inventory[address.part].map((entry, i) =>
        i === address.index ? setBonus(entry) : entry),
    },
  };
}

function groupBonuses(entries: SourcedBonus[]): BonusGroup[] {
  const groups = new Map<string, BonusGroup>();

  entries.forEach(({ bonus, source }) => {
    const key = `${bonusDisplayName(bonus)}|${bonus.condition ?? ''}`;
    const group = groups.get(key);
    if (group) {
      group.total += bonus.value;
      group.sources.push({ source, value: bonus.value });
    } else {
      groups.set(key, { sample: bonus, total: bonus.value, sources: [{ source, value: bonus.value }] });
    }
  });

  const kindRank = (b: GrantedBonus) =>
    'defense' in b ? { Resist: 0, Absorb: 1, Weak: 2 }[b.defense] : 3;

  return [...groups.values()]
    .filter(g => g.total !== 0)
    .sort((a, b) =>
      kindRank(a.sample) - kindRank(b.sample)
      || bonusDisplayName(a.sample).localeCompare(bonusDisplayName(b.sample))
      || (a.sample.condition ?? '').localeCompare(b.sample.condition ?? ''));
}

const signed = (value: number) => value > 0 ? `+${value}` : `${value}`;

function BonusChip({ group }: { group: BonusGroup }) {
  const bonus = group.sample;
  const sourceList = group.sources.map(s => `${s.source}: ${signed(s.value)}`).join('\n');
  const condition = bonus.condition &&
    <span className="bonus-condition">({bonus.condition})</span>;

  if ('defense' in bonus) {
    return (
      <span className={`bonus-chip defense-${bonus.defense.toLowerCase()}`} title={sourceList}>
        {bonus.defense}&nbsp;
        <DamageType type={bonus.element} value={group.total} valueAfter />
        {condition}
      </span>
    );
  }

  return (
    <span className="bonus-chip" title={sourceList}>
      {signed(group.total)}&nbsp;{bonusDisplayName(bonus)}
      {condition}
    </span>
  );
}

/**
 * Totals every tracked bonus (resists, check/tag bonuses, specialization,
 * misc) across the character's kits, perks, and inventory. 'Chosen Type'
 * bonuses get a picker row here; picks merge into the totals above it.
 * Renders nothing when the character has no tracked bonuses.
 */
export default function BonusTotals({ character, onUpdateCharacter }: Props) {
  const { totals, choices } = collectBonuses(character);
  const groups = groupBonuses(totals);

  if (groups.length === 0 && choices.length === 0) { return null; }

  const defenses = groups.filter(g => 'defense' in g.sample);
  const others = groups.filter(g => !('defense' in g.sample));

  return (
    <div className="bonus-totals-block">
      <div className="title">Bonus Totals</div>
      {defenses.length > 0 && (
        <div className="bonus-chips">
          {defenses.map((g, i) => <BonusChip key={`defense-${i}`} group={g} />)}
        </div>
      )}
      {others.length > 0 && (
        <div className="bonus-chips">
          {others.map((g, i) => <BonusChip key={`bonus-${i}`} group={g} />)}
        </div>
      )}
      {choices.length > 0 && (
        <div className="bonus-choices">
          {choices.map((choice, i) => (
            <div className="bonus-choice-row" key={`choice-${i}`}>
              <span className="bonus-choice-source">{choice.source}:</span>
              <span>{choice.bonus.defense}</span>
              <select
                value={choice.bonus.chosenElement ?? ''}
                onChange={(e) => onUpdateCharacter(
                  character.id,
                  applyChoice(character, choice.address, e.target.value as DamageElement | ''),
                )}
              >
                <option value="">-- Choose Type --</option>
                {(choice.bonus.options ?? CHOICE_ELEMENTS).map(el =>
                  <option key={el} value={el}>{el}</option>)}
              </select>
              <span>{choice.bonus.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
