import ColumnEntry from "../../../common-design/ColumnEntry";
import { movementIcon } from "../../../common-design/CommonIcons";
import RuleKeyword from "../../../common-design/RuleKeyword";
import SkillCheck from "../../../common-design/SkillCheck/SkillCheck";
import StatusKeyword from "../../../common-design/StatusKeyword";
import './Maneuvers.css';

export default function Maneuvers() {

  return (<>
    <ColumnEntry title={{ hx: 'h3', text: 'Maneuvers' }}>
      <p>You have access to some maneuvers.</p>
    </ColumnEntry>

      <ColumnEntry title={{ hx: 'h4', text: 'Move' }}>
        <p>
          At the start of your turn, you gain a number of Movement Points{movementIcon} equal to your Move Speed. You can spend these points to
          move a number of hexes equal to the points spent.
        </p>
        <p>
          Additionally, you can take any of the following actions as part of a move using your movement points.
          In some cases, you must spend additional Movement Points and/or pass the associated Skill Check.
        </p>
        <ul>
          <div className='col-handler'>
            <div>
              <div className="simple-header">
                Change Facing
                <span className="movement-cost">
                  Cost: Free for first, 1{movementIcon} after
                </span>
              </div>
              <p>Change what direction you're facing, to adjust your Front, Peripheral,
                and Rear Arcs. The first Change Facing you make on your turn is free, 
                each after the first costs 1{movementIcon}.</p>
            </div>

            <div>
              <div className="simple-header">
                Climb
                <span className="movement-cost">
                  Cost: 1{movementIcon} per hex climbed
                </span>
              </div>
              <p>
                Move 1 hex up a vertical surface. In some cases, a
                Skill Check may be needed to keep from falling off (such as if the surface is particularly
                smooth or slippery) or to avoid taking damage (such as when a surface is sharp or covered
                in thorny brambles).
              </p>
            </div>

            <div>
              <div className="simple-header">
                Crawl
                <span className="movement-cost">
                  Cost: 2{movementIcon}
                </span>
              </div>
              <p>Move 1 hex while Prone.</p>
            </div>

            <div>
              <div className="simple-header">
                Detangle
                <span className="movement-cost">
                  Cost: 3{movementIcon}
                </span>
              </div>
              <p>Remove the <StatusKeyword effect="entangled" /> condition.</p>
            </div>

            <div>
              <div className="simple-header">
                Dive
                <span className="movement-cost">
                  Cost: 1{movementIcon}
                </span>
              </div>
              <p>
                Make a <SkillCheck tags={['Agility', 'Might']} />. On a Rank 2 Success you can move 2 hexes and drop prone.
                On a Rank 1 Success you move 1 hex and drop prone. On a Rank 0, you fall prone without moving.
              </p>
            </div>

            <div>
              <div className="simple-header">
                Leap
                <span className="movement-cost">
                  Cost: 1{movementIcon} per hex moved
                </span>
              </div>
              <p>
                Make an <SkillCheck tags={['Agility', 'Might']} />. You move a number of hexes up to your Success Rank, jumping over all hexes
                between your starting and ending hex. On a Failure, you move one hex and fall prone. You must spend movement points 
                equal to the hexes you move.
              </p>
            </div>

            <div>
              <div className="simple-header">Stand&nbsp;Up
                <span className="movement-cost">
                  Cost: 3{movementIcon}
                </span>
              </div>
              <p>Swap from Prone to Standing.</p>
            </div>

            <div>
              <div className="simple-header">
                Step
                <span className="movement-cost">
                  Cost: 5{movementIcon}
                </span>
              </div>
              <p>
                Move 2 step without triggering opportunity attacks.
                -- Stuff about not attacking. --
              </p>
            </div>
            
            <div>
              <div className="simple-header">
                Trudge
                <span className="movement-cost">
                  Cost: 2{movementIcon}
                </span>
              </div>
              <p>Move 1 space through super-difficult terrain.</p>
            </div>
          </div>
        </ul>
      </ColumnEntry>

    <div className='col-handler'>
      <div>
        <h4>Call Out</h4>
        <p>
          Grants all valid allies +1 to the next [Medium Range Attack] or [Long Range Attack] they
          make against foes within Long Range of your <RuleKeyword keyword="Front Arc" />.
        </p>

        <h4>Guard</h4>
        <p>Attacks against your <RuleKeyword keyword="Front Arc" /> get -2 to their Hit Check and Damage.</p>
      </div>
      
      <div>
        <h4>Take Aim</h4>
        <div>Choose one of the following effects:</div>
        <ul>
          <li>Gain +1 to the next [Melee Attack] Hit Check you make and get +1 to that attack's Damage.</li>
          <li>Gain +3 to the next [Shooting Attack] or [Arcane Attack] Hit Check you make.</li>
        </ul>
      </div>

      <div>
        <h4>Swap Weapons</h4>
        <p>Roll an Agility Check.</p>
        <ul>
          <li>Rank 1: Nothing special, but the Maneuver is still used.</li>
          <li>Rank 2: Your Maneuver is not used up to complete the swap. You may not use “Swap Weapons” Maneuver again this turn.</li>
          <li>Rank 3: Your Maneuver is not used up to complete the swap. You may choose  use “Swap Weapons” again this turn as a Maneuver.</li>
        </ul>
      </div>
    
    </div>
  </>);
}
