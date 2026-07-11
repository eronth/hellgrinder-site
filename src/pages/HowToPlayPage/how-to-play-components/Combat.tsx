import Arc from "../../../components/keywords/Arc/Arc";
import Hx from "../../../components/common/generic/Hx/Hx";
import Tools from "../../../utils/tools.tsx";
import StatusEffectComponent from "../../../components/common/StatusEffectComponent/StatusEffectComponent.tsx";
import StatusEffects from "../../../data/status-effects.tsx"
// Combat Components
import Actions from "./combat-components/Actions";
import Maneuvers from "./combat-components/Maneuvers";
import Spellcasting from "./combat-components/Spellcasting.tsx";

export default function Combat() {
  const sortedStatusEffects = Tools.sortStatusEffects(StatusEffects);
  const innerHx = 3;
  
  return (<>
    <Hx hx={2}>Combat</Hx>
    
    <div className='fluid-readable-columns'>
      <p>
        Combat takes place on a hex-based grid. You can 
        perform <s>one maneuver and</s> one action 
        per turn. Some actions are available to all characters,
        regardless of kit.
      </p>

      <Hx hx={innerHx}>Turn Order/Initiative</Hx>
      <p>
        Players go first unless surprised or fighting against a foe that 
        circumvents this rule. Players pick one of their characters to act,
        who then takes their turn. On their turn, the character can 
        perform their Action <s>and Maneuver, in any order</s>.
      </p>
      <p>
        Once their turn is over, the DM chooses an enemy or enemy group to act in the same manner.
      </p>
      <p>
        Players can then choose a character who has not acted this round to take a turn. This repeats back and forth until all characters (both player and DM) have taken their turns. Once this has happened, you begin the next round with the same side that started the first round.
      </p>
      
      <Hx hx={innerHx}>Facing</Hx>
      <p>
        On the grid, you have a facing.
      </p>
      <ul>
        <li><Arc type="front" /> - The three hexes directly in front of you make your Front Arc.</li>
        <li><Arc type="peripheral">Peripheral Flank Arc</Arc> - The two hexes to either side of your Front Arc are your Left and Right Peripheral Arcs.</li>
        <li><Arc type="rear">Rear Flank Arc</Arc> - The hex directly behind you is your Rear Arc.</li>
      </ul>
      <ul>
        <li>[Range Attacks] that pass through your <Arc type="peripheral" /> and [Melee Attacks] that originate from your <Arc type="peripheral" /> get +1 on Hit Checks and Damage against you.</li>
        <li>[Range Attacks] that pass through your <Arc type="rear" /> and [Melee Attacks] that originate from your <Arc type="rear" /> get +3 on Hit Checks and +1 to Damage against you.</li>
      </ul>

      <Hx hx={innerHx}>Opportunity Strikes</Hx>
      <p>When you move within [Adjacent Range] of a creature's <Arc type="front" /> or <Arc type="peripheral" />,
        they can make a free attack against you. Demons are quick, and typically have an infinite number of these attacks. Humans, however, can't make another Opportunity Strike until the start of their turn.</p>
    </div>

    <Maneuvers />
    <Actions />
    <Spellcasting />

    <Hx hx={innerHx}>Cover</Hx>
    <p>{Tools.getLoremIpsum()}</p>

    <Hx hx={innerHx}>Status Effects</Hx>
    <div className='col-handler'>
      {sortedStatusEffects.map((se, i) =>
        <StatusEffectComponent key={`status-effect-${i}`}
          name={se.name}
          description={se.description}
          effects={se.effects}
          x={se.x} y={se.y}
        />
      )}
    </div>

  </>);
}