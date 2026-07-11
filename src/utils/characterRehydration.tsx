import type { ReactNode } from 'react';
import { CharacterDesign } from '../ts-types/player-character-types';
import { Item, Kit, Perk, Weapon } from '../ts-types/types';
import Perks from '../data/equipment/perks';
import CombatKits from '../data/equipment/combat-kits';
import SupportKits from '../data/equipment/support-kits';
import SupplyKits from '../data/equipment/supply-kit';
import MeleeWeapons from '../data/equipment/weapons/melee-weapons';
import ShootingWeapons from '../data/equipment/weapons/shooting-weapons';
import ThrownWeapons from '../data/equipment/weapons/thrown-weapons';
import ArcaneWeapons from '../data/equipment/weapons/arcane-weapons';
import WandsAndStaves from '../data/equipment/weapons/wands-and-staves';
import Armor from '../data/equipment/armor';
import Gear from '../data/equipment/gear';

// JSON round-trips (localStorage, import files) reduce JSX descriptions and
// effects to plain objects React refuses to render. On load, any such husk is
// replaced with the node from the matching canonical definition (matched by
// name), or dropped when no match exists. Plain-string values — including ones
// customized at generation time, like Hellspawn's rolled description — survive
// JSON intact and are kept as-is.
//
// Rehydration also backfills `bonuses` from the canonical definitions for
// saves created before that field existed.

const canonicalKits = new Map<string, Kit>(
  [...Object.values(CombatKits), ...Object.values(SupportKits), ...Object.values(SupplyKits)]
    .map(k => [k.name, k]),
);

const canonicalPerks = new Map<string, Perk>(Object.values(Perks).map(p => [p.name, p]));

// Kit weapons/items can be customized variants (e.g. Hellforged Blade) that
// only exist inside kit definitions, so kits also feed the global maps.
const canonicalWeapons = new Map<string, Weapon>();
[MeleeWeapons, ShootingWeapons, ThrownWeapons, ArcaneWeapons, WandsAndStaves]
  .forEach(collection => Object.values(collection).forEach(w => canonicalWeapons.set(w.name, w)));
canonicalKits.forEach(kit => kit.weapons.forEach(w => {
  if (!canonicalWeapons.has(w.name)) { canonicalWeapons.set(w.name, w); }
}));

const canonicalItems = new Map<string, Item>();
[Armor, Gear].forEach(collection => Object.values(collection).forEach(i => canonicalItems.set(i.name, i)));
canonicalKits.forEach(kit => kit.items.forEach(i => {
  if (!canonicalItems.has(i.name)) { canonicalItems.set(i.name, i); }
}));

const survivesJson = (node: ReactNode): boolean =>
  node == null || ['string', 'number', 'boolean'].includes(typeof node);

const repairNode = (stored: ReactNode, canonical: ReactNode): ReactNode =>
  survivesJson(stored) ? stored : canonical;

const repairNodeArray = (
  stored: ReactNode[] | undefined,
  canonical: ReactNode[] | undefined,
): ReactNode[] | undefined => {
  if (!stored || stored.every(survivesJson)) { return stored; }
  return canonical ?? stored.filter(survivesJson);
};

const rehydrateWeapon = (weapon: Weapon, canonical = canonicalWeapons.get(weapon.name)): Weapon => ({
  ...weapon,
  description: repairNode(weapon.description, canonical?.description),
  bonuses: weapon.bonuses ?? canonical?.bonuses,
  attackModes: weapon.attackModes.map((mode, i) => ({
    ...mode,
    effects: repairNodeArray(mode.effects, canonical?.attackModes[i]?.effects),
  })),
});

const rehydrateItem = (item: Item, canonical = canonicalItems.get(item.name)): Item => ({
  ...item,
  description: repairNode(item.description, canonical?.description),
  bonuses: item.bonuses ?? canonical?.bonuses,
  effects: repairNodeArray(item.effects, canonical?.effects) ?? [],
});

const rehydrateKit = (kit: Kit): Kit => {
  const canonical = canonicalKits.get(kit.name);
  return {
    ...kit,
    weapons: kit.weapons.map(w =>
      rehydrateWeapon(w, canonical?.weapons.find(cw => cw.name === w.name) ?? canonicalWeapons.get(w.name))),
    items: kit.items.map(i =>
      rehydrateItem(i, canonical?.items.find(ci => ci.name === i.name) ?? canonicalItems.get(i.name))),
    trainings: kit.trainings.map(t => ({
      ...t,
      bonuses: t.bonuses ?? canonical?.trainings.find(ct => ct.name === t.name)?.bonuses,
    })),
  };
};

const rehydratePerk = (perk: Perk): Perk => ({
  ...perk,
  description: repairNode(perk.description, canonicalPerks.get(perk.name)?.description),
  bonuses: perk.bonuses ?? canonicalPerks.get(perk.name)?.bonuses,
});

export const rehydrateCharacter = (character: CharacterDesign): CharacterDesign => ({
  ...character,
  perks: character.perks.map(rehydratePerk),
  kits: character.kits.map(rehydrateKit),
  inventory: {
    ...character.inventory,
    weapons: character.inventory.weapons.map(w => rehydrateWeapon(w)),
    items: character.inventory.items.map(i => rehydrateItem(i)),
  },
});
