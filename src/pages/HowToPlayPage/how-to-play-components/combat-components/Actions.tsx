import { movementIcon } from "../../../../utils/commonIcons";
import Arc from "../../../../components/keywords/Arc/Arc";
import Hx from "../../../../components/common/generic/Hx/Hx";
import RuleKeyword from "../../../../components/keywords/RuleKeyword";
import SkillCheck from "../../../../components/keywords/SkillCheck/SkillCheck";
import { HeaderSize } from "../../../../ts-types/types";
import HitCheck from "../../../../components/keywords/HitCheck/HitCheck";
import Range from "../../../../components/keywords/Range/Range";

export default function Actions() {
  const innerHx: HeaderSize = 4;
  const innestHx: HeaderSize = 5;
  return (<>
    <Hx hx={3}>Actions</Hx>

    <div className='fluid-readable-columns'>
      <p>
        On your turn, you can take one Action. Listed below is a standard set of
        actions available to you, but you can always attempt to take other actions
        outside of these listed here. The GM will determine how to adjudicate
      </p>

      <Hx hx={innerHx}>Attack</Hx>
      <p>
        As with other checks, roll 3d6 dice to make a Hit Check for your attack. You will deal damage and effects as described by the weapon.
      </p>
      <p>
        If you hit, you deal the weapon's damage to your target, 
        detailed in the weapon as <b>X / Y / Z</b>, where X is damage dealt
        on a Rank 1 Success, Y is the damage dealt on a Rank 2 
        Success, and Z is damage dealt on a Rank 3 Success.
      </p>
      <div>
        <Hx hx={innestHx}>Range</Hx>
        <p>
          Weapons have different ranges. Some weapons have multiple ranges.
        </p>
        <ul>
          <li>
            <Range type='adjacent' /> is 1 hex.
          </li>
          <li>
            <Range type='short' /> is 1-3 hexes.
          </li>
          <li>
            <Range type='medium' /> is 4-8 hexes.
          </li>
          <li>
            <Range type='long' /> is 9-12.
          </li>
          <li>
            Beyond 12 Hexes, you are firing in <Range type='extreme' />, which increase
            for every 3 Hexes beyond Long Range's maximum distance.
            <br />
            For example, First Extreme Range is 13-15, Second Extreme Range is 16-18, and so on.
          </li>
        </ul>
        <Hx hx={innestHx}>Range Penalties</Hx>
        <p>
            Shooting outside a
            weapon's range is usually permitted, but gets -3 per range increment.
            Melee attacks cannot
            be performed outside the weapon's range.
        </p>
      </div>

      <Hx hx={innerHx}>Charge</Hx>
      <p>
        Move up to your Move Speed. If you move at least 3 hexes, you may make a [Melee Attack] against a target.
        If you hit, you get +2 to the attack's Damage.
      </p>
      
      <Hx hx={innerHx}>Covering Fire</Hx>
      <p>
        Choose a 2 hex cone in your front arc of a range listed on your weapon.
        Make a <SkillCheck tags={['Shooting']} />, <SkillCheck tags={['Arcane']} />,
        or <SkillCheck tags={['Throwing']} />, so long as you have an equipped weapon
        with the same tag. Rank 2+ Success grants -2 to <HitCheck tags={[]} plural /> for
        the attacks made by creatures in that cone until the start of your next turn.
      </p>
      
      <Hx hx={innerHx}>Hunker Down</Hx>
      <p>
        If you are near cover, you can take a defensive position behind the cover to double your bonuses from cover.
      </p>
      
      <Hx hx={innerHx}>Overwatch</Hx>
      <p>
        Select a 2-hex arc cone in your <Arc type="front" /> to 
        "Watch" until the start of your next turn. When a creature
        first enters the Watched Area, you can make an Attack
        against them with +2 to the <HitCheck tags={[]} />. Once you make an
        attack, Overwatch ends.
      </p>
      
      <Hx hx={innerHx}>Restrain</Hx>
      <p>
        Make a <SkillCheck tags={['Might', 'Agility']} /> against
        a target's <SkillCheck tags={['Might', 'Agility']} />. If you succeed, the target
        is <RuleKeyword keyword="Restrained" /> until
        the start of your next turn. While a target is restrained this way
        this way,
        you may spend your {movementIcon} to move the target
        1 hex in any direction.
      </p>
      
      <Hx hx={innerHx}>Study Target</Hx>
      <p>
        Make an -X <SkillCheck tags={['Observation']} /> for a target, where X is the target's tier, minus 1.
        If you succeed, you learn any two pieces of information about the target of your choice.
        Things such as:
        - resistances, weaknesses, and absorbance
        - current health and max health
        - attacks and their effects
        - special actions and effects
      </p>
      
      <Hx hx={innerHx}>Shove</Hx>
      <p>
        Make a +4 <SkillCheck tags={['Might']} /> against a 
        target's <SkillCheck tags={['Might', 'Endurance']} />.
        If you succeed, the target is Shoved 1
        hex in a direction of your choice.
      </p>
      
      <Hx hx={innerHx}>Sprint</Hx>
      <p>
        Move up to your Move Speed +2. Gain +2 
        to <SkillCheck tags={['Agility']} plural /> until the start of your next turn.
      </p>
          
    </div>
  </>);
}
