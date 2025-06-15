import ColumnEntry from "../../../common-design/ColumnEntry";

export default function Maneuvers() {

  return (<>
    <ColumnEntry title={{ hx: 'h3', text: 'Maneuvers' }}>
      <p>You have access to some maneuvers.</p>
    </ColumnEntry>

      <ColumnEntry title={{ hx: 'h4', text: 'Move' }}>
        <p>
          You gain a number of Movement Points equal to your Move Speed. You can spend these points to
          move a number of hexes equal to the points spent.
        </p>
        <p>
          Additionally, you can take any of the following actions as part of a move using your movement points.
          In some cases, you must spend additional Movement Points and/or pass the associated Skill Check.
        </p>
        <ul>
          <div className='col-handler'>
            <ColumnEntry title={{ text: 'Change Facing' }}>
              <p>Change what direction you're facing, to adjust your Front, Peripheral, and Rear Arcs. The first Change Facing you make on your turn is free, each after the first costs 1 Movement Point.</p>
            </ColumnEntry>

            <ColumnEntry title={{ text: 'Climb' }}>
              <p>Move 1 hex up a vertical surface. Costs 1 Movement Point. In some cases, a
                Skill Check may be needed to keep from falling off (such as if the surface is particularly
                smooth or slippery) or to avoid taking damage (such as when a surface is sharp or covered in thorny brambles).</p>
            </ColumnEntry>

            <ColumnEntry title={{ text: 'Crawl' }}>
              <p>Move 1 hex while Prone. Costs 2 Movement Points.</p>
            </ColumnEntry>

            <ColumnEntry title={{ text: 'Dive' }}>
              <p>
                Spend 1 movement and make a [Agility Might] Skill Check. On a Rank 2 Success you can move 2 hexes and drop prone.
                On a Rank 1 Success you move 1 hex and drop prone. On a Rank 0, you fall prone without moving.
              </p>
            </ColumnEntry>

            <ColumnEntry title={{ text: 'Leap' }}>
              <p>
                Make an [Agility Might] Skill Check. You move a number of hexes up to your Success Rank, jumping over all hexes
                between your starting and ending hex. On a Failure, you move one hex and fall prone. You must spend movement points 
                equal to the hexes you move.
              </p>
            </ColumnEntry>

            <ColumnEntry title={{ text: 'Stand Up' }}>
              <p>Swap from Prone to Standing. Costs 3 Movement Points.</p>
            </ColumnEntry>

            <ColumnEntry title={{ text: 'Step' }}>
              <p>Move 2 step without triggering opportunity attacks. Costs 5 Movement Points.</p>
            </ColumnEntry>
            
            <ColumnEntry title={{ text: 'Trudge' }}>
              <p></p>
            </ColumnEntry>
          </div>
        </ul>
      </ColumnEntry>

    <div className='col-handler'>
      <div>
        <h4>Call Out</h4>
        <p>
          Grants all valid allies +1 to the next Medium or Long Range attack they
          make against foes within Long Range of your front-arc.
        </p>

        <h4>Guard</h4>
        <p>Attacks against your front get -2 to their Hit Check and Damage.</p>
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
