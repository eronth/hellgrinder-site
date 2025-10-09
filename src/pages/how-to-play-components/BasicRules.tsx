import Hx from "../../common-design/Hx/Hx";
import RuleKeyword from "../../common-design/RuleKeyword";
import SkillCheck from "../../common-design/SkillCheck/SkillCheck";
import BasicCheckResultsTable from "./BasicCheckResultsTable";

export default function BasicRules() {
  const innerHx = 'h3';

  return (<>
    <Hx hx={2}>Basics</Hx>
    
    <div className='fluid-readable-columns'>
      
      <Hx hx={innerHx}>Operations</Hx>
      <p>The game of Hellgrinder is intentionally simple to pick up. The game offers a quick character creation and
        streamlined combat/roleplay experience, with the bulk of the system focused on combat tactics and
        interactions.</p>
        
      <Hx hx={innerHx}>Heroic Medals</Hx>
      <p><RuleKeyword keyword="Heroic Medals" /> are earned throughout the game and can be spent to create Heroic Moments whereupon an action
        is boosted. Sometimes you may earn specialized Medals, which can be used as <RuleKeyword keyword="Heroic Medals" /> or for a perk
        described by that medal type.</p>
      
      <p>Here are some ways <RuleKeyword keyword="Heroic Medals" /> can be spent:</p>
      <Hx>Hero Time!</Hx>
      <ul>
        <li>
          <b>Spend 1 <RuleKeyword keyword="Heroic Medals">Heroic Medal</RuleKeyword></b>: Change the result of one dice up or down by 1.
        </li>
        <li>
          <b>Spend 3 <RuleKeyword keyword="Heroic Medals">Heroic Medal</RuleKeyword></b>: Set the value of any dice.
        </li>
      </ul>
      <Hx>Calling Reinforcement!</Hx>
      <ul>
        <li>
          <b>Spend 1 Heroic Medal</b>: If one of your player allies is dead or otherwise non-playable, you may call
          for a
          reinforcement. The player creates a new character (if they haven’t yet), and arrives as a reinforcement at
          the end of the current round. The cost of this ability increases by 1 for each time it’s been used this
          combat.
        </li>
      </ul>
      <Hx>Quick Thinking</Hx>
      <ul>
        <li>
          <b>Spend 1 Heroic Medal after a turn ends</b>: Take an extra action, right now, even if it is not your
          turn.
        </li>
        <li>
          <b>Spend 2 Heroic Medals after a turn ends</b>: Take your turn early, skipping the next turn you would
          have had. This does
          not affect the back-and-forth turn order.
        </li>
        <li>
          <b>Spend 4 Heroic Medals after a turn ends</b>: Take a turn immediately, but you do not need to skip a
          turn. This does
          not affect the back-and-forth turn order.
        </li>
      </ul>
      
      <Hx hx={innerHx}>Skill Checks</Hx>
      <p>
        A Skill Check is performed by rolling 3d6. Most skill checks will have Tags associated with them. When you
        make
        Skill Check, add any bonuses you have that match Tags on the check to the final result. This determines your
        Success Rank based on the result rolled.
      </p>
      <Hx>Critical Success and Failure</Hx>
      <p>
        A result of all 1s triggers a Hell’s Wrath event, which can change depending on your current enemies and
        environment. It is always additional complications.
      </p>
      <p>
        Rolling all 6s triggers a Hellish Triumph, and you get +1 to rolls for a bit (tbd).
      </p>
      <p>
        
        When you roll a Hell’s Wrath or Hellish Triumph, you trigger a Deal with the Devil moment. Roll on the
        Deal table X times, and you are presented each result as an offer. You can choose to accept or decline any or
        all of the offers.
      </p>
      <Hx>Difficulty</Hx>
      <div>Depending on the difficulty of the action, a Skill Check result can be modified from -4 to +2.</div>
      <ul>
        <li>Easy: +2</li>
        <li>Normal: 0</li>
        <li>Hard: -2</li>
        <li>Extremely Difficult: -4</li>
      </ul>
      <Hx>Common Tags</Hx>
      <p>
        The types of skill checks and attack checks can be as varied as needed, but generally should stick to a
        handful
        of types. Characters can earn bonuses in skills outside of the following lists, and any action can have
        whatever tags
        seem suitable. However, here is a list of common check tags already supported by the game's rules.
      </p>
      <p>Various Attack Checks: Melee, Shooting, Arcane, Thrown</p>
      <p>Various Skill Checks: Might, Endurance, Agility, Stealth, Observation, Communication, Stoic, Recovery,
        Corruption</p>
      <Hx hx={3}>Corruption</Hx>
      <p>
        Corruption is a measure of how much the demonic forces have influenced you. It can be gained through various
        means, such as making a deal
        with the devil, or being exposed to the demonic forces for too long. The more corruption you have, the more
        likely you are to be influenced
        by the demonic forces.
      </p>

      <Hx>Corrupt Powers</Hx>
      <p>
        Whenever you make a check, you can choose to adjust the result of the dice by any amount. You then gain
        that much Corruption. If that amount is 3 or more, immediately make a Corruption Test. Otherwise, make a
        Corruption Test after the encounter ends.
      </p>
      
      <Hx>Corruption Test</Hx>
      <p>
        Occasionally, the GM will force you to make a Corruption Test
        by rolling a <SkillCheck tags={['Corruption']} />. When
        you have to make a Corruption Test, you roll 3d6. If the result is less than your current Corruption,
        you fail the check. When you fail, roll 2d6 and take the lowest value to determine what happens.
      </p>
      <ol>
        <li><b>Creeping Evil</b>: Gain 1 Corruption.</li>
        <li><b>Nauseating</b>: Gain 1 Corruption and lose 1 Health.</li>
        <li><b>Invitation to Death</b>: The GM chooses a Damage Type. You gain Weak 1 for the chosen Type.</li>
        <li><b>Bout of Madness</b>: Your bout of madness causes you to attack an ally. Choose one ally. You and that
          ally both make <SkillCheck tags={['Endurance']} plural />. If their result is higher than yours, you gain an Injury.
          Otherwise, they gain an Injury.
        </li>
        <li><b>Madness Manifest</b>: You lose control of your character. They turn into a Mad Cultist who summons 2
          minions, and attack.
        </li>
        <li><b>Absolute Corruption</b>: You lose control of your character. They turn into a Demonic Vessel, summon 2
          minions, and attack.
        </li>
      </ol>
    </div>
    
    <BasicCheckResultsTable />
  </>);
}
