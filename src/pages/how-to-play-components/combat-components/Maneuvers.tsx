import ColumnEntry from "../../../common-design/ColumnEntry";
import { movementIcon } from "../../../common-design/CommonIcons";
import HitCheck from "../../../common-design/HitCheck/HitCheck";
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
          At the start of your turn, you gain a number of Maneuver Points{movementIcon} equal to your Move Speed. You can spend these points to
          move a number of hexes equal to the points spent.
        </p>
        <p>
          Additionally, you spend your {movementIcon} to perform
          any of the following Maneuvers
        </p>
        <ul>
          <div className='col-handler'>
            <div>
              <div className="simple-header">
                Call Out
                <span className="movement-cost">
                  Cost: 2{movementIcon}
                </span>
              </div>
              <p>
                Grants all valid allies +1 to the 
                next <HitCheck tags={['Medium Range']} /> or <HitCheck tags={['Long Range']} /> they
                make against foes 
                within <RuleKeyword keyword="Long Range" /> of
                your <RuleKeyword keyword="Front Arc" />.
              </p>
            </div>

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
              <p>
                Remove the <StatusKeyword effect="entangled" /> condition
                without requiring a check.
              </p>
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
                Guard
                <span className="movement-cost">
                  Cost: 4{movementIcon}
                </span>
              </div>
              <p>
                Attacks against
                your <RuleKeyword keyword="Front Arc" /> get
                -2 to their Hit Check and Damage.
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
                Make an <SkillCheck tags={['Agility', 'Might']} />. You 
                move a number of hexes up to your Success Rank, jumping over all hexes
                between your starting and ending hex. On a Failure, you move
                one hex and fall prone.
                You must spend {movementIcon} equal
                to the hexes you move (in addition to the 1{movementIcon} to use the
                Maneuver).
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
                Swap Weapons
                <span className="movement-cost">
                  Cost: 3{movementIcon}
                </span>
              </div>
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
            </div>

            <div>
              <div className="simple-header">
                Take Aim
                <span className="movement-cost">
                  Cost: 3{movementIcon}
                </span>
              </div>
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
  </>);
}
