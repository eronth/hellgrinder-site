import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import Actions from "./combat-components/Actions";
import Damage from "./combat-components/Damage";
import Maneuvers from "./combat-components/Maneuvers";


export default function Combat() {
  return (<>
    <h2>Combat</h2>
    
      <p>Combat takes place on a hex-based grid. You can perform one maneuver and one action per turn. Some actions are available to all characters, regardless of kit.</p>

      <ColumnEntry title={{ hx: 'h3', text: 'Turn Order/Initiative' }}>
        <p>Players go first unless surprised or fighting against a foe that circumvents this rule. Players pick one of their characters to act, who then takes their turn. On their turn, the character can perform their Action and Maneuver, in any order.</p>
        <p>Once their turn is over, the DM chooses an enemy or enemy group to act in the same manner.</p>
        <p>Players can then choose a character who has not acted this round to take a turn. This repeats back and forth until all characters (both player and DM) have taken their turns. Once this has happened, you begin the next round with the same side that started the first round.</p>
      </ColumnEntry>

      <ColumnEntry title={{ hx: 'h3', text: 'Facing' }}>
        <p>
          On the grid, you have a facing.
        </p>
        <ul>
          <li>Front Arc - The three hexes hex directly in front of you make your Front arc.</li>
          <li>Peripheral Flank Arc - The two hexes to either side of your Front Arc are your Left and Right Peripheral Arcs.</li>
          <li>Rear Flank Arc - The hex directly behind you is your Rear Arc.</li>
        </ul>
        <ul>
          <li>[Range Attacks] that pass through your [Peripheral Arc] and [Melee Attacks] that originate from your [Peripheral Arc] get +1 on Hit Checks and Damage against you.</li>
          <li>[Range Attacks] that pass through your [Rear Rear] and [Melee Attacks] that originate from your [Rear Arc] get +3 on Hit Checks and +1 to Damage against you.</li>
        </ul>
        <p>Actions with the [Adjust Position] tag allow you to change facing.</p>
      </ColumnEntry>

      <ColumnEntry title={{ hx: 'h3', text: 'Opportunity Strike' }}>
        <p>When you move within [Melee Range] of a creature's [Front Arc] or [Peripheral Arc], they can make a free attack against you. Demons are quick, and typically have an infinite number of these attacks. Humans, however, can't make another Opportunity Strike until the start of their turn.</p>
      </ColumnEntry>
    
      <Maneuvers />
      <Actions />

      <ColumnEntry title={{ hx: 'h3', text: 'Cover' }}>
        <p>{Tools.getLoremIpsum()}</p>
      </ColumnEntry>

      <Damage />

      <ColumnEntry title={{ hx: 'h3', text: 'Status Effects' }}>
        <div className='col-handler'>
          <ColumnEntry title={{ text: 'Blinded X' }}>
            <p>You have reduced visibility. You have -X to [Observation Skill Checks] and -X to [Range Attack Hit Checks]. For every 3 levels of Blinded you have, your ranges get shortened.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Brittle X' }}>
            <p>Any time you take damage, you take an additional X damage.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Doomed X' }}>
            <p>Any time you get an Injury, get a X additional Injuries of the same tier. When you regain health for any reason (including getting Injuries), you gain X less health.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Enfeebled X' }}>
            <p>You feel weak, as if your strength is sapped. You gain -X to [Endurance Skill Checks] and -X to [Melee Attack Hit Checks] and Damage.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Envigorated' }}>
            <p>You get an extra Maneuver each turn. Healing gives you an additional +2 Health.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Frenzied' }}>
            <p>You must make an Attack on each of your turns. If you don't make an Attack during one of your turns, you gain 4 Corruption</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Imolated X for Y' }}>
            <p>You have been set on fire. You burn for Y turns, taking damage each turn. You take X Infernal Damage at the end of your turn, then roll an [Endurance Skill Check]. On a major success, the burning ends early.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Lost X' }}>
            <p>Any time you gain Corruption, gain X additional corruption.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Shaken' }}>
            <p>You can either take an Action or a Maneuver, but not both.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Silenced X' }}>
            <p>You have -X to [Arcane Attack Hit Checks] and [Arcane Attack] Damage. </p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Slowed X' }}>
            <p>You're struggling to move. Reduce move speed by X. Can't reduce below 1.</p>
          </ColumnEntry>

          <ColumnEntry title={{ text: 'Terrified' }}>
            <p>Trying to do any Maneuver requires an extra [Stoic Skill Check]. On a failure, your Maneuver is used without any benefit.</p>
            <p>All [Hit Checks] get a -3 penalty.</p>
          </ColumnEntry>

        </div>
      </ColumnEntry>

  </>);
}