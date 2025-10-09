import Hx from "../../common-design/Hx/Hx.tsx";
import Tools from "../../common-design/Tools";
import Actions from "../../pages/how-to-play-components/combat-components/Actions";
import Damage from "../../pages/how-to-play-components/combat-components/Damage";
import Maneuvers from "../../pages/how-to-play-components/combat-components/Maneuvers";
import StatusEffectComponent from "../../common-design/game-terms/StatusEffectComponent";
import StatusEffects from "../../common-design/game-terms/status-effects.tsx"

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
        <li>Front Arc - The three hexes hex directly in front of you make your Front arc.</li>
        <li>Peripheral Flank Arc - The two hexes to either side of your Front Arc are your Left and Right Peripheral Arcs.</li>
        <li>Rear Flank Arc - The hex directly behind you is your Rear Arc.</li>
      </ul>
      <ul>
        <li>[Range Attacks] that pass through your [Peripheral Arc] and [Melee Attacks] that originate from your [Peripheral Arc] get +1 on Hit Checks and Damage against you.</li>
        <li>[Range Attacks] that pass through your [Rear Rear] and [Melee Attacks] that originate from your [Rear Arc] get +3 on Hit Checks and +1 to Damage against you.</li>
      </ul>

      <Hx hx={innerHx}>Opportunity Strikes</Hx>
      <p>When you move within [Adjacent Range] of a creature's [Front Arc] or [Peripheral Arc],
        they can make a free attack against you. Demons are quick, and typically have an infinite number of these attacks. Humans, however, can't make another Opportunity Strike until the start of their turn.</p>
    </div>

    <Maneuvers />
    <Actions />

    <Hx hx={innerHx}>Cover</Hx>
    <p>{Tools.getLoremIpsum()}</p>

    <Damage />

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