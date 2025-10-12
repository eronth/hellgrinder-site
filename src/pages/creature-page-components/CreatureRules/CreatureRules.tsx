import Hx from "../../../common-design/Hx/Hx";
import Tools from "../../../common-design/Tools";
import CreatureCard from "../CreatureCard/CreatureCard";
import GenCreatures from "../../../common-design/creatures/generic-creatures";
import { transformCreatureToFaction } from "../FactionTransformUtils";
import { armorIcon } from "../../../common-design/CommonIcons";

export default function CreatureRules() {
  const innerHx = 4;

  const creature = GenCreatures['imp'];
  const selectedFaction = 'Ashborn Legion';

  const transformedCreature 
    = transformCreatureToFaction(creature, selectedFaction);

  return (<>
    <Hx hx={2}>Creatures</Hx>
    <Hx hx={3}>Reading a Creature Card</Hx>
    <CreatureCard
      data={transformedCreature}
      onAddToEncounter={null}
      isExample={true}
    />
    <div className='fluid-readable-columns'>
        
      <Hx hx={innerHx}>Building an encounter</Hx>
      <p>
        Choose a number of {Tools.creatureTiers.t2} creatures equal 
        to the number of players + 1. When picking creatures, you can
        create a Cohort of lower tier creatures instead. A Cohort is a
        group of creatures that act on the same turn. You can choose
        a {Tools.creatureTiers.t1} Cohort of 2 creatures or
        a {Tools.creatureTiers.t0} Cohort of 4 creatures instead
        for each {Tools.creatureTiers.t2} creature you replace.
      </p>
      <p>
        For example, with 4 players, you might plan an encounter of 
        2 {Tools.creatureTiers.t2}s, 
        2 groups of {Tools.creatureTiers.t1}s (each with 2 creatures),
        and 1 group of 4 {Tools.creatureTiers.t0}s for a total of
        5 included things.
      </p>

      <Hx hx={innerHx}>Creature Cohort</Hx>
      <p>
        Creatures chosen as part of a Cohort do not need to all be the
        same exact creature, though it is reccomended you usually keep
        it mostly consistent within a Cohort.
      </p>
      <p>
        When creatures are taking their turn, entire Cohorts take their
        turns at the same time. Each creature in the Cohort activates,
        and you can use their Maneuvers and Actions in any order you
        see fit until the Cohort's turn ends. Generally speaking, a Cohort
        of creatures will focus the same one or two characters, unless the Cohort
        is particularly tactically minded or currently in complete disarray.
      </p>
    </div>
  </>);
}