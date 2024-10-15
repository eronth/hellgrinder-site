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
          <ul>
            <li>Front Arc - The three hexes hex directly in front of you make your Front arc.</li>
            <li>Peripheral Flank Arc - The two hexes to either side of your Front Arc are your Left and Right Peripheral Arcs.</li>
            <li>Rear Flank Arc - The hex directly behind you is your Rear Arc.</li>
          </ul>
        </p>
        <ul>
          <li>[Range Attacks] that pass through your [Peripheral Arc] and [Melee Attacks] that originate from your [Peripheral Arc] get +1 on Hit Checks and Damage against you.</li>
          <li>[Range Attacks] that pass through your [Rear Rear] and [Melee Attacks] that originate from your [Rear Arc] get +3 on Hit Checks and +1 to Damage against you.</li>
        </ul>
        <p>Actions with the [Adjust Position] tag allow you to change facing.</p>
      </ColumnEntry>
    
      <Maneuvers />
      <Actions />

      <ColumnEntry title={{ hx: 'h3', text: 'Cover' }}>
        <p>{Tools.getLoremIpsum()}</p>
      </ColumnEntry>

      <Damage />

      <ColumnEntry title={{ hx: 'h3', text: 'Status Effects' }}>
        <p>Slowed X - Reduce move speed by X. Can't reduce below 1.</p>
      </ColumnEntry>

  </>);
}