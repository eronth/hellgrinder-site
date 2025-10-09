import { movementIcon } from "../../../common-design/CommonIcons";
import HitCheck from "../../../common-design/HitCheck/HitCheck";
import Hx from "../../../common-design/Hx/Hx";
import RuleKeyword from "../../../common-design/RuleKeyword";
import SkillCheck from "../../../common-design/SkillCheck/SkillCheck";
import StatusKeyword from "../../../common-design/StatusKeyword";
import IndividualManeuver from "./IndividualManeuver";
import './Maneuvers.css';

export default function Maneuvers() {

  return (<>
    <Hx hx={3}>Maneuvers</Hx>

    <div className='fluid-readable-columns'>
      <p>You have access to some maneuvers.</p>
    
      <Hx hx={4}>Move</Hx>
      <p>
        At the start of your turn, you gain a number of Maneuver Points{movementIcon} equal to your Move Speed. You can spend these points to
        move a number of hexes equal to the points spent.
      </p>
      <p>
        Additionally, you spend your {movementIcon} to perform
        any of the following Maneuvers
      </p>
      <IndividualManeuver title="Call Out" cost={2}>
        <p>
          Grants all valid allies +1 to the 
          next <HitCheck tags={['Medium Range']} /> or <HitCheck tags={['Long Range']} /> they
          make against foes 
          within <RuleKeyword keyword="Long Range" /> of
          your <RuleKeyword keyword="Front Arc" />.
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Change Facing' cost={<>Free for first, 1{movementIcon} after</>}>
        <p>
          Change what direction you're facing, to adjust your Front, Peripheral,
          and Rear Arcs. The first Change Facing you make on your turn is free, 
          each after the first costs 1{movementIcon}.
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Climb' cost={<>1{movementIcon} per hex climbed</>}>
        <p>
          Move 1 hex up a vertical surface. In some cases, a
          Skill Check may be needed to keep from falling off (such as
          if the surface is particularly
          smooth or slippery) or to avoid taking damage (such
          as when a surface is sharp or covered
          in thorny brambles).
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Crawl' cost={2}>
        <p>
          Move 1 hex while Prone.
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Detangle' cost={3}>
        <p>
          Remove the <StatusKeyword effect="entangled" /> condition
          without requiring a check.
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Dive' cost={1}>
        <p>
          Make a <SkillCheck tags={['Agility', 'Might']} />. On a Rank 2 Success you can move 2 hexes and drop prone.
          On a Rank 1 Success you move 1 hex and drop prone. On a Rank 0, you fall prone without moving.
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Guard' cost={4}>
        <p>
          Attacks against
          your <RuleKeyword keyword="Front Arc" /> get
          -2 to their Hit Check and Damage.
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Leap' cost={<>1{movementIcon} per hex moved</>}>
        <p>
          Make an <SkillCheck tags={['Agility', 'Might']} />. You 
          move a number of hexes up to your Success Rank, jumping over all hexes
          between your starting and ending hex. On a Failure, you move
          one hex and fall prone.
          You must spend {movementIcon} equal
          to the hexes you move (in addition to the 1{movementIcon} to use the
          Maneuver).
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Stand Up' cost={3}>
        <p>Swap from Prone to Standing.</p>
      </IndividualManeuver>

      <IndividualManeuver title='Step' cost={5}>
        <p>
          Move 2 step without triggering opportunity attacks.
          -- Stuff about not attacking. --
        </p>
      </IndividualManeuver>

      <IndividualManeuver title='Swap Weapons' cost={3}>
        <p>
          Roll an <SkillCheck tags={['Agility']} /> to attempt
          to swap your equipment. You may only attempt to Swap Weapons once per turn.
        </p>
        <ul>
          <li>Rank 1: Items successfully swapped.</li>
          <li>Rank 2: You do not spend {movementIcon} to complete the swap.</li>
          <li>Rank 3: You do not spend {movementIcon} to complete the swap. You may
            choose to use “Swap Weapons” again this turn as a Maneuver.</li>
        </ul>
      </IndividualManeuver>

      <IndividualManeuver title='Take Aim' cost={3}>
        <div>Choose one of the following effects:</div>
        <ul>
          <li>
            Gain +1 to the
            next <HitCheck tags={['Melee']} /> you
            make and get +1 to that attack's Damage.
          </li>
          <li>
            Gain +3 to the 
            next <HitCheck tags={['Shooting']} /> or <HitCheck tags={['Ranged', 'Arcane']} /> you
            make.
          </li>
        </ul>
      </IndividualManeuver>

      <IndividualManeuver title='Trudge' cost={2}>
        <p>Move 1 space through super-difficult terrain.</p>
      </IndividualManeuver>
        
    </div>
  </>);
}
