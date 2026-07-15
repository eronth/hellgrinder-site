import { DamageElement } from "./types";

export type TagValue = number | 'X';

/** A tag whose name is the key and whose value is the entry, e.g. `{ Knockback: 2 }`. */
type TagWithValue = { [tag: string]: TagValue };

export function tagName(t: TagWithValue): string {
  return Object.keys(t)[0];
}

export function tagValue(t: TagWithValue): TagValue {
  return Object.values(t)[0];
}

type AttackTypes = 'Attack' | 'Melee' | 'Shooting'
| 'Arcane' | 'Thrown' | 'Special';

type Range = 'Adjacent Range' | 'Short Range' | 'Medium Range' | 'Long Range' | 'Extreme Range'
  | { Range: number };

type EquipmentTags = 'One-Handed' | 'Grenade' | 'Two-Handed' | 'Armor' | 'Gadget'
| 'Lightweight' | 'Heavy' | 'Illuminate' | 'Concealable' | 'Consumable'
| 'Breach' | 'Shield' | 'Relic' | 'Trap';
type LocationTags = 'Head' | 'Torso' | 'Armor' | 'Legs' | 'Footwear';

type ActionTags = 'Attack' | 'Defend' | 'Movement' 
  | 'Action' | 'Maneuver' | 'Reaction' | 'Free Action' 
  //| 'Adjust Position' | 'Adjust Facing'
  | 'Opportunity Strike' | 'Special';

type OtherTagsForNow = 'Single-Shot' | 'Safelight' | 'Rot Host';

type CreatureEffectTags = 'Flying';

export const SPECIAL_RULE_TAG_NAMES = [
  'Area', 'Cone', 'Cursed', 'Knockback', 'Scatter',
  'Hover',
] as const;

export type SpecialRuleTag = typeof SPECIAL_RULE_TAG_NAMES[number];

export type SpecialRuleTagWithValue = {
  [K in SpecialRuleTag]: { [P in K]: TagValue };
}[SpecialRuleTag];

type SkillChecks = 
  | 'Might' | 'Endurance' // brutal status effects
  | 'Agility' | 'Stealth' 
  | 'Observation' 
  | 'Communication' // chatty
  | 'Stoic' // fear
  | 'Recovery' 
  | 'Corruption'

export type DemonFactionTag
  = 'Ashborn Legion' 
  | 'Stoneveined Choir'
  | 'Vastfathom League'
  | 'Thornwraith Bloom'
  | 'Wanderlost Crew'
  | 'Zephpter Swarm'
  | 'Umbral Nexus'
  | 'Rot Host';

export type PluralizedFactionTag
  = 'Wanderlost Crews'
  | 'Zephpter Swarms'
  | 'Sinners';

export type OtherFactionTag =
  'Forgefiend Syndicate' | 'Hand of Death' | "Heaven's Host"
  | 'Voidfire Conclave' | 'Hagswell Covenant' | 'Sinner';

export type FactionTag
  = DemonFactionTag
  | OtherFactionTag
  | 'Generic';


export type AllValidTags 
  = AttackTypes | Range | SkillChecks 
  | EquipmentTags | LocationTags
  | CreatureEffectTags
  | SpecialRuleTagWithValue | ActionTags
  | DemonFactionTag | OtherFactionTag
  | OtherTagsForNow
  | DamageElement;

export type { AttackTypes, Range, SkillChecks, TagWithValue };
