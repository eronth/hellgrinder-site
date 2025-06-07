// Components
import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import GenericToNongenericTable from "./creature-page-components/GenericToNongenericTable";
import Tools from "../common-design/Tools";
import CreatureCard from "./creature-page-components/CreatureCard";
// Types
import { TabType } from "../ts-types/types";
// Data
import GenCreatures from "../common-design/creatures/generic-creatures";
import ZephpterCreatures from "../common-design/creatures/zephpter-creatures";
import Sinners from "../common-design/creatures/sinner-creatures";

export default function CreaturesPage() {
  const page: TabType = 'creatures';

  return (<div className={'page ' + page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
    <h2>Enemies</h2>
      <p>Enemies mark the threats the players may face in combat. An enemy doesn’t follow the same injury system as players do. Instead, when an enemy hits 0 health, they are defeated. Generally, it is up to the player who deals the final hit whether a defeated enemy is left unconscious, as a corpse, or completely banished from the area. Some enemies may have abilities based on which defeat state is chosen, but most are simply defeated at that point.</p>
    <hr />
    <p>There are many types of creatures in the Underworld.</p>
    <>
      <h3>Enemy Tiers</h3>
      {/* TODO Pull this in dynamically. */}
      {/* TODO Add descriptions to each tier. */}
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
    {/*
    TODO create these creatures
    <li>Imp</li>
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
          <CreatureCard key={`generic-creature-${creature.name}-${i}`} data={creature} />
      )}
    </div>
    
    <hr />
    
    <h3>Sinners</h3>
    <p>
      Sinners are often thought to be the damned, compelled to eternal punishment for their sins. Though this is unconfirmed.
      Sinners are default passive and often willing to help, though their compelled punishment often leads them to be
      incapable of providing much help beyond information. Should a sinner be prevented from completing its task, it will
      become extremely aggressive towards the ones who interrupt.
    </p>
    <div className={'col-handler'}>
      {Tools
        .sortCreatures(Sinners)
        .map((creature, i) =>
          <CreatureCard key={`sinner-creature-${creature.name}-${i}`} data={creature} />
      )}
    </div>

    <hr />

    <h3>Zephpter</h3>
    <p>
      
    </p>
    <div className={'col-handler'}>
      {Tools
        .sortCreatures(ZephpterCreatures)
        .map((creature, i) =>
          <CreatureCard key={`zephpter-creature-${creature.name}-${i}`} data={creature} />
      )}
    </div>
    
  </div>);
}