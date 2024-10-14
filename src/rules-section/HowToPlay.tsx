import ColumnEntry from "../common-design/ColumnEntry";
import RestAndRecover from "./RestAndRecover";
import Combat from "./Combat";

export default function HowToPlay() {

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
        <div className="simple-header">Hero Time!</div>
        <ul>
          <li>Spend 1 Heroic Medal: Change the result of one dice up or down by 1.</li>
          <li>Spend 3 Heroic Medal: Set the value of any dice.</li>
        </ul>
        <div className="simple-header">Calling Reinforcement!</div>
        <ul>
          <li>Spend 1 Heroic Medal: If one of your player allies is dead or otherwise non-playable, you may call for a reinforcement. The player creates a new character (if they haven’t yet), and arrives as a reinforcement at the end of the next round. The cost of this ability increases by 1 for each time it’s been used this combat.</li>
        </ul>
      </ColumnEntry>

      <ColumnEntry
        title = {{ hx: 'h3', text: 'Skill Checks' }}>
        <p>A skill check is performed by rolling 3d6. A result of all 1s triggers a Hell’s Wrath event, which changes depending on your current enemy/environment. Rolling all 6s triggers a Hellish Triumph, and you get +1 to rolls for a bit (tbd). When you roll a Hell’s Wrath or Hellish Triumph, you trigger a Deal with the Devil moment. Roll on the deal table X times, and you are presented each result as an offer.</p>
        <p>[INSERT TABLE]</p>
        <div className="simple-header">Difficulty</div>
        <div>Depending on the difficulty of the action, a Skill Check result can be modified from -4 to +2.</div>
        <ul>
          <li>Easy: +2</li>
          <li>Normal: 0</li>
          <li>Hard: -2</li>
          <li>Very Hard: -4</li>
        </ul>
        <p>The types of skill checks and attack checks can be as varied as needed, but generally should stick to a handful of types. Here is a list of common checks supported by the game.</p>
        <p>Common Checks:</p>
        <p>Various Attack Checks: (shooting, melee, arcane, thrown),</p>
        <p>Various Skill Checks: Recovery, Endurance, Stealth, Agility, {"<add more here>"}</p>
      </ColumnEntry>

      <RestAndRecover />
      <Combat />

      <ColumnEntry title={{ hx: 'h2', text: 'A Deal with the Devil' }}>
        <p>Occasionally, you are presented with a moment where you can make a deal (or deals) with the Devil. A powerful entity, one which does not seem to fully align with the demonic forces, can grant you a powerful boon, but it comes with a cost.</p>
        <p>[INSERT TABLE HERE]</p>
      </ColumnEntry>


    </div>
  </>);
}
