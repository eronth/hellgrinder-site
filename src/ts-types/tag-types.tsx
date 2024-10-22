type TagWithValue = {
  tag: string;
  value: number;
};

type AttackTypes = 'Attack' | 'Melee' | 'Shooting' | 'Arcane' | 'Thrown' | 'Special';

type Range = 'Adjacent Range' | 'Short Range' | 'Medium Range' | 'Long Range' | 'Extreme Range';

type EquipmentTags = 'One-Handed' | 'Grenade' | 'Two-Handed' | 'Armor' | 'Gadget'
| 'Lightweight' | 'Heavy' | 'Illuminate' | 'Concealable' | 'Consumable';

type ActionTags = 'Attack' | 'Defend' | 'Move' | 'Action' | 'Maneuver'  | 'Opportunity Strike' | 'Special';

type CreatureEffectTags = 'Flying' 
  | {tag: 'Hover', value: number } 
  
type AttackEffectTags
  = {tag: 'Area', value: number}
  | {tag: 'Knockback', value: number}

type SkillChecks = 
  | 'Might' | 'Endurance' // brutal status effects
  | 'Agility' | 'Stealth' 
  | 'Observation' 
  | 'Communication' // chatty
  | 'Stoic' // fear
  | 'Recovery' 
  | 'Corruption'


type AllValidTags 
  = AttackTypes | Range | SkillChecks | EquipmentTags | CreatureEffectTags 
  | AttackEffectTags | ActionTags;
;

export type { AttackTypes, Range, SkillChecks, AllValidTags, TagWithValue};