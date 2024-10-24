import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import GenericToNongenericTable from "./creature-page-components/GenericToNongenericTable";
import CreatureCard from "./creature-page-components/CreatureCard";
import Tools from "../common-design/Tools";
import GenCreatures from "../common-design/creatures/generic-creatures";

export default function CreaturesPage() {
  const page: TabType = 'creatures';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
    <h2>Enemies</h2>
      <p>Enemies mark the threats the players may face in combat. An enemy doesn’t follow the same injury system as players do. Instead, when an enemy hits 0 health, they are defeated. Generally, it is up to the player who deals the final hit whether a defeated enemy is left unconscious, as a corpse, or completely banished from the area. Some enemies may have abilities based on which defeat state is chosen, but most are simply defeated at that point.</p>
    <hr />
    <p>There are many types of creatures in the Underworld.</p>
    <>
      <h3>Enemy Tiers</h3>
      <p>Enemy Types: Minion, Hellspawn, Tormentor, Archfiend, Lord, Overlord</p>
      <p>Enemies should be tough. Archfiends should be a hell of a battle, Lords and Overlords should be virtually unbeatable. Probably not worth even statting out.</p>
      <h3>Generic Demons</h3>
    </>
    <>
      <h3>Generic Enemies</h3>
      <p>
        These are generic types of demons, perfect When trying to run demons,
        you can fill out encounters by picking some of these enemies, and updating them accordingly.
        Using the table below, you can see which placeholder value should be swapped for which types.
      </p>
      <GenericToNongenericTable />
    </>
    {/* <li>Imp</li>
    <li>Fiend</li>
    // Imp, Gremlin, Fiend, Abomination, Devil, Bloodsworn
    <li>Abomination</li>
    <li>Devil</li> Bloodsworn
    
      Thornwraith, Zephpter, 

    Pride - Umbral
    Greed - Vastfathom
    Wrath - Ashborn
    Lust - Zephpter
    Envy - Wanderlost (Steals weapons)
    Gluttony - Thornwraith
    Sloth - Stoneveined

    */}
    <div className='col-handler'>
      {Tools
        .sortCreatures(GenCreatures)
        .map((creature, i) => 
          <CreatureCard key={`creature-${creature.name}-${i}`} data={creature} />
      )}
    </div>
    <hr />
  </div>);
}