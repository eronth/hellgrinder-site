import { DamageElement } from "./types";

export type TagValue = number | 'X';

type TagWithValue = {
  tag: string;
  value: TagValue;
};

type AttackTypes = 'Attack' | 'Melee' | 'Shooting'
| 'Arcane' | 'Thrown' | 'Special';

type Range = 'Adjacent Range' | 'Short Range' | 'Medium Range' | 'Long Range' | 'Extreme Range'
  | {tag: 'Range', value: number};

type EquipmentTags = 'One-Handed' | 'Grenade' | 'Two-Handed' | 'Armor' | 'Gadget'
| 'Lightweight' | 'Heavy' | 'Illuminate' | 'Concealable' | 'Consumable'
| 'Breach' | 'Shield' | 'Relic';
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
  tag: SpecialRuleTag;
  value: TagValue;
};

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
