import { SpecialRuleTag } from "../../ts-types/tag-types";
import { movementIcon } from "../../utils/commonIcons";

type TagDefinition = {
  id: string;
  tag: {
    short: SpecialRuleTag;
    full: string;
  };
  rule: React.ReactNode;
};

const UNSORTED_SPECIAL_TAGS: TagDefinition[] = [
  {
    id: 'area',
    tag: {
      short: 'Area',
      full: 'Area X',
    },
    rule: <>
      Attacks and effects with this tag target a hex
      and each hex within X hexes of your target.
    </>
  },
  {
    id: 'cone',
    tag: {
      short: 'Cone',
      full: 'Cone X',
    },
    rule: <>
        Attacks and effects with this tag target a cone of size X.
        To determine the shape of a cone, look at the pictures
        that aren't here yet. The length of a cone is assumed
        to be Short Range unless the effect lists a different range.
    </>
  },
  {
    id: 'cursed',
    tag: {
      short: 'Cursed',
      full: 'Cursed X',
    },
    rule: <>
      Take X Corruption when using this attack or ability.
    </>
  },
  {
    id: 'knockback',
    tag: {
      short: 'Knockback',
      full: 'X Knockback',
    },
    rule: <>
      A target hit with an attack or ability with this tag is
      shoved X hexes away from the source of the attack or
      ability.
    </>
  },
  {
    id: 'scatter',
    tag: {
      short: 'Scatter',
      full: 'Scatter X',
    },
    rule: <>
      Targets of attacks or abilities with this tag
      are shifted by X hexes in a random direction on 
      a Rank 1 Success, and up to twice X in the direction
      of the GM's choice on a Failure.
    </>
  },
  {
    id: 'hover',
    tag: {
      short: 'Hover',
      full: 'Hover X',
    },
    rule: <>
      Creatures with this ability can choose to hover 
      giving them X{movementIcon} Maneuver. Any movement
      using this Maneuver ignores terrain and hazards on
      the ground. Airborn hazards still affect.
    </>
  }
];

const SPECIAL_RULE_TAGS: TagDefinition[] = UNSORTED_SPECIAL_TAGS
  .sort((a, b) => a.id.localeCompare(b.id))

export default SPECIAL_RULE_TAGS;
  