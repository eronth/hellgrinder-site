import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import ColumnEntry from "../common-design/ColumnEntry";
import Combat from "./how-to-play-components/Combat";
import RestAndRecover from "./how-to-play-components/RestAndRecover";
import DevilDealTable from "./how-to-play-components/deal-with-the-devil/DevilDealTable";

export default function HowToPlayPage() {
  const page: TabType = 'how-to-play';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
    <h2>How to Play</h2>

    <div className='col-handler'>
      
      <div>
        <ColumnEntry
          title={{ hx: 'h3', text: 'Operations' }}>
          <p>The game of Hellgrinder is intentionally simple to pick up. The game offers a quick character creation and streamlined combat/roleplay experience, with the bulk of the system focused on combat tactics and interactions.</p>
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
      </div>

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

      <div>
        <ColumnEntry
          title={{ hx: 'h3', text: 'Corruption' }}>
            <p>
              Corruption is a measure of how much the demonic forces have influenced you. It can be gained through various means, such as making a deal
              with the devil, or being exposed to the demonic forces for too long. The more corruption you have, the more likely you are to be influenced
              by the demonic forces.
            </p>
            <p></p>
        </ColumnEntry>

        <ColumnEntry
          title={{ text: 'Corrupt Powers' }}>
          <p>Whenever you make a check, you can choose to adjust the result of the dice by any amount. You then gain that much Corruption. If that amount is 3 or more, immediately make a Corruption Test. Otherwise, make a Corruption Test after the encounter ends.</p>
        </ColumnEntry>

        <ColumnEntry
          title={{ text: 'Corruption Test' }}>
          <p>Occasionally, the GM will force you to make a Corruption Test by rolling a [Corruption Skill Check]. When you have to make a Corruption Skill Check, you roll 3d6. If the result is less than your current Corruption, you fail the check. When you fail, roll 2d6 and take the lowest value to determine what happens.</p>
          <ol>
            <li><b>Dread</b>: Gain 1 Corruption.</li>
            <li><b>Nausiating</b>: Gain 1 Corruption and lose 1 Health.</li>
            <li><b>Invitation</b>: The GM chooses a Damage Type. You gain Weak Type 1.</li>
            <li><b>Bout of Madness</b>: Your bout of madness causes you to attack an ally. Choose one ally. You and that ally both make [Endurance Skill Checks]. If their result is higher than yours, you gain an Injury. Otherwise, they gain an Injury.</li>
            <li><b>Madness Manifest</b>: You lose control of your character. They turn into a Mad Cultist, summon 2 minions, and attack.</li>
            <li><b>Corrupting Warp</b>: You lose control of your character. They turn into a Demonic Vessel, summon 2 minions, and attack.</li>
          </ol>
        </ColumnEntry>
      </div>
    </div>

    <hr />
    <RestAndRecover />
    <hr />
    <Combat />

    <hr />
    <ColumnEntry title={{ hx: 'h2', text: 'A Deal with the Devil' }}>
      <p>Occasionally, you are presented with a moment where you can make a deal (or deals) with the Devil. A powerful entity, one which does not seem to fully align with the demonic forces, can grant you a powerful boon, but it comes with a cost.</p>
      <DevilDealTable />
    </ColumnEntry>
    <hr />
  </div>);
}