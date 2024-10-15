import ColumnEntry from "../../../../common-design/ColumnEntry";

export default function Actions() {

  return (<>
    <ColumnEntry title={{ hx: 'h3', text: 'Actions' }}>
      <p></p>
    </ColumnEntry>

    <div className='col-handler'>
      <ColumnEntry title={{ hx: 'h4', text: 'Attack' }}>
        <p>Make an attack check.</p>
        <p>Roll 3d6 dice to make a Hit Check for your attack. You will deal damage and effects as described by the weapon.</p>
        <p>If you hit, you deal the weapon’s damage to your target, detailed in the weapon as X/Y/Z, where X is damage dealt on a Minor Success, Y is the damage dealt on a Moderate Success, and Z is damage dealt on a Full Success.</p>
        <p>Range: Weapons have different ranges. Some weapons have multiple ranges. Use whichever range is least punishing when determining penalties for attacking outside your range.</p>
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
            For example, First Extreme Range is 13-15, Second Extreme Range is 16-18, and so on. Shooting outside a weapon’s range is permitted, but gets -3 per range increment.
          </li>
        </ul>
      </ColumnEntry>

      <div>
        <ColumnEntry title={{ hx: 'h4', text: 'Charge' }}>
          <p>Move up to your Move Speed and make a [Melee Attack] against a target. If you hit, you get +2 to the attack's Damage.</p>
        </ColumnEntry>

        <ColumnEntry title={{ hx: 'h4', text: 'Sprint' }}>
          <p>Move up to your Move Speed +2. Gain +2 to [Agility] Skil Checks.</p>
        </ColumnEntry>

        <ColumnEntry title={{ hx: 'h4', text: 'Covering Fire' }}>
          <p></p>
        </ColumnEntry>
      </div>

      <div>
        <ColumnEntry title={{ hx: 'h4', text: 'Overwatch' }}>
          <p>Select a 2-hex arc cone in your [Front Arc] to "Watch" until the start of your next turn. When a creature first enters the Watched Area, you can make an Attack against them with +2 to the Hit Check.</p>
        </ColumnEntry>

        <ColumnEntry title={{ hx: 'h4', text: 'Hunker Down' }}>
          <p></p>
        </ColumnEntry>
      </div>
      
    </div>
  </>);
}
