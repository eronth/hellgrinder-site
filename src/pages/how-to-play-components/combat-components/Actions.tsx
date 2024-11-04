
export default function Actions() {

  return (<>
    <h3>Actions</h3>
    <p>You have access to some actions.</p>

    <div className='col-handler'>
      <div>
        <h4>Attack</h4>
        <p>Make an attack check.</p>
        <p>
          Roll 3d6 dice to make a Hit Check for your attack. You will deal damage and effects as described by the weapon.
        </p>
        <p>
          If you hit, you deal the weapon’s damage to your target, detailed in the weapon as X/Y/Z, where X is damage dealt
          on a Rank 1 Success, Y is the damage dealt on a Rank 2 Success, and Z is damage dealt on a Rank 3 Success.
        </p>
        <p>
          Range: Weapons have different ranges. Some weapons have multiple ranges. Use whichever range is least punishing
          when determining penalties for attacking outside your range.
        </p>
        <ul>
          <li>
            Short Range is 1-3 hexes.
          </li>
          <li>
            Medium Range is 4-8 hexes.
          </li>
          <li>
            Long Range is 9-12.
          </li>
          <li>
            Beyond 12 Hexes, you are firing in Extreme Ranges, which increase for every 3 Hexes beyond Long Range maximum.
            <br />
            For example, First Extreme Range is 13-15, Second Extreme Range is 16-18, and so on. Shooting outside a
            weapon’s range is permitted, but gets -3 per range increment.
          </li>
        </ul>
      </div>
      
      <div>
        <h4>Charge</h4>
        <p>
          Move up to your Move Speed. If you move at least 3 hexes, you may make a [Melee Attack] against a target.
          If you hit, you get +2 to the attack's Damage.
        </p>
        
        <h4>Covering Fire</h4>
        <p>
          Choose a 2 hex cone in your front arc of a range listed on your weapon. Make a [Shooting] Skill Check, [Arcane]
          Skill Check, or [Throwing] Skill Check, so long as you have an equipped weapon with the same tag. Rank 2+ Success
          grants -2 to Hit Checks for the attacks made by creatures in that cone until the start of your next turn.
        </p>
        
        <h4>Hunker Down</h4>
        <p>
          If you are near cover, you can take a defensive position behind the cover to double your bonuses from cover.
        </p>
        
        <h4>Overwatch</h4>
        <p>
          Select a 2-hex arc cone in your [Front Arc] to "Watch" until the start of your next turn. When a creature
          first enters the Watched Area, you can make an Attack against them with +2 to the Hit Check. Once you make an
          attack, Overwatch ends.
        </p>
      </div>
      
      <div>
        <h4>Restrain</h4>
        <p>
          Make a [Might Agility] Check against a target's [Might Agility] Check. If you succeed, the target is
          Restrained
          until the start of your next turn. While restrained this way, you may spend movement points to move the target
          1 hex in any direction.
        </p>
        
        <h4>Study Target</h4>
        <p>
          Make an -X [Observation] Skill Check for a target, where X is the target's tier, minus 1.
          If you succeed, you learn any two pieces of information about the target of your choice.
          Things such as:
          - resistances, weaknesses, and absorbance
          - current health and max health
          - attacks and their effects
          - special actions and effects
        </p>
        
        <h4>Shove</h4>
        <p>
          Make a +4 [Might] Check against a target's [Might Endurance] Check. If you succeed, the target is Shoved 1
          hex in a direction of your choice.
        </p>
        
        <h4>Sprint</h4>
        <p>
          Move up to your Move Speed +2. Gain +2 to [Agility] Skill Checks until the start of your next turn.
        </p>
      </div>
    
    </div>
  </>);
}
