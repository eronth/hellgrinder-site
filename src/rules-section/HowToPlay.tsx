import ColumnEntry from "../common-design/ColumnEntry";

function HowToPlay() {

  return (<>

    <h2>How to Play</h2>

    <div className='col-handler'>
      <ColumnEntry
        title={{ hx: 'h3', text: 'Operations' }}>
        <p>The game of Hellgrinder is intentionally simple to pick up.</p>
      </ColumnEntry>

      <ColumnEntry
        title={{ hx: 'h3', text: 'Heroic Medals' }}>
        <p>Heroic Medals are earned throughout the game and can be spent to create Heroic Moments whereupon an action is boosted. Sometimes you may earn specialized Medals, which can be used as Heroic Medals or for a perk described by that medal type.</p>

        <p>Here are some ways Heroic Medals can be spent:</p>
        <p>Hero Time!</p>
        <p>Spend 1 Heroic Medal: Change the result of one dice up or down by 1.</p>
        <p>Spend 3 Heroic Medal: Set the value of any dice.</p>
        <p>Calling Reinforcement!</p>
        <p>Spend 1 Heroic Medal: If one of your player allies is dead or otherwise non-playable, you may call for a reinforcement. The player creates a new character (if they haven’t yet), and arrives as a reinforcement at the end of the next round. The cost of this ability increases by 1 for each time it’s been used this combat.</p>
      </ColumnEntry>

    </div>
  </>);
}

export default HowToPlay;