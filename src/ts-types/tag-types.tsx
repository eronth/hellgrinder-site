type TagWithValue = {
  tag: string;
  value: number;
};

type AttackTypes = 'Attack' | 'Melee' | 'Shooting'
| 'Arcane' | 'Thrown' | 'Special';

type Range = 'Adjacent Range' | 'Short Range' | 'Medium Range' | 'Long Range' | 'Extreme Range'
  | {tag: 'Range', value: number};

type EquipmentTags = 'One-Handed' | 'Grenade' | 'Two-Handed' | 'Armor' | 'Gadget'
| 'Lightweight' | 'Heavy' | 'Illuminate' | 'Concealable' | 'Consumable'
| 'Breach' | 'Shield' | 'Relic';

type ActionTags = 'Attack' | 'Defend' | 'Movement' 
  | 'Action' | 'Maneuver' | 'Reaction' | 'Free Action' 
  //| 'Adjust Position' | 'Adjust Facing'
  | 'Opportunity Strike' | 'Special';

type OtherTagsForNow = 'Single-Shot' | 'Safelight';

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

type DemonFactionTags =
  'Ashborn Legion' | 'Stoneveined Order' | 'Vastfathom Dominion'
  | 'Thornwraith Conclave' | 'Wanderlost Clan'
  | 'Zephpter Horde' | 'Umbral Nexus';

type OtherFactionTags =
  'Forgefiend Syndicate' | 'Hand of Death' | "Heaven's Host"
  | 'Voidfire Conclave' | 'Witch Coven' | 'Sinner';


type AllValidTags 
  = AttackTypes | Range | SkillChecks | EquipmentTags | CreatureEffectTags 
  | AttackEffectTags | ActionTags
  | DemonFactionTags | OtherFactionTags
  | OtherTagsForNow;




export type { AttackTypes, Range, SkillChecks, AllValidTags, TagWithValue };