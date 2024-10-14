import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import Actions from "./combat-components/Actions";
import Damage from "./combat-components/Damage";
import Maneuvers from "./combat-components/Maneuvers";


export default function Combat() {
  return (<>
    <h2>Combat</h2>
    
    <div className='col-handler'>
      <p>Combat takes place on a hex-based grid. You can perform one maneuver and one action per turn. Some actions are available to all characters, regardless of kit.</p>

      <ColumnEntry title={{ hx: 'h3', text: 'Turn Order/Initiative' }}>
        <p>Players go first unless surprised or fighting against a foe that circumvents this rule. Players pick one of their characters to act, who then takes their turn. On their turn, the character can perform their Action and Maneuver, in any order.</p>
        <p>Once their turn is over, the DM chooses an enemy or enemy group to act in the same manner.</p>
        <p>Players can then choose a character who has not acted this round to take a turn. This repeats back and forth until all characters (both player and DM) have taken their turns. Once this has happened, you begin the next round with the same side that started the first round.</p>
      </ColumnEntry>

      <ColumnEntry title={{ hx: 'h3', text: 'Facing' }}>
        <p>On the grid, you have a facing. The three hexes in front of you are your front arc, the 2 to your sides (that aren’t part of the front arc) are your flank arcs, and behind you is your rear arc.</p>
        <ul>
          <li>Range Attacks that pass through your flank and Melee Attacks that originate from your flank get +1 to hit and damage against you.</li>
          <li>Attacks that pass through your rear and Melee Attacks that originate from your rear get +3 to hit and +1 to damage against you.</li>
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
    </div>

  </>);
}