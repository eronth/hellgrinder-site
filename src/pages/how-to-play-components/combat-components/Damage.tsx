import Hx from "../../../common-design/Hx/Hx";
import InjuryTable from "./InjuryTable/InjuryTable";

export default function Damage() {
  const innerHx = 4;

  return (<>
    <Hx hx='3'>Damage</Hx>

    <div className='fluid-readable-columns'>
      <Hx hx={innerHx}>Taking Damage</Hx>
      <p>
        Whenever you take damage, you reduce your current health by that much. In some cases, armor might reduce the damage
        you take by a given value. Damage reduced this way can never be reduced below 0.
      </p>

      <Hx hx={innerHx}>Damage Types</Hx>
      <p>
        There are several damage types in the world of Hellgrinder. Many clans of demons are attuned to one type or another,
        typically imbuing their attacks with that type and granting them resistance against it.
      </p>
      <div>The standard damage types are as follows:</div>
      <ol className="roman" start={0}>
        <li>Metal</li>
        <li>Infernal</li>
        <li>Abyssal</li>
        <li>Verdant</li>
        <li>Chthonic</li>
        <li>Nethercurrent</li>
        <li>Voidyr</li>
      </ol>
      
      <Hx hx={innerHx}>Weakness, Resistance, and Absorbance</Hx>
      <p>
        Many creatures have Weakness, Resistance, or Absorbance to damage types, and some Kits, Perks, or other gear
        might grant player characters these effects as well. These effects change how much damage you take from attack,
        and are often shorthanded.
      </p>
      <p>
        Weakness {"<type>"} X
        <br />
        <span className={'reminder-text'}>Shorthand — “Weak {"<type>"} X”</span>
        <br/>
        Increase damage taken of the listed type by X.
      </p>
      <p>
        Resistance {"<type>"} X
        <br/>
        <span className={'reminder-text'}>Shorthand — “Resist {"<type>"} X”</span>
        <br/>
        Reduce damage taken of the listed type by X.
      </p>
      <p>
        Absorbance {"<type>"} X
        <br />
        <span className={'reminder-text'}>Shorthand — “Absorb {"<type>"} X”</span>
        <br />
        Reduce damage taken from the listed type by X and gain
        health equal to the damage reduced.
      </p>

      <Hx hx={innerHx}>Injuries</Hx>
      <p>
        If your health reaches 0, you take an Injury (rolled on a table). Then, restore your health back to max,
        and apply any remaining damage.
        Each time you take an Injury, take an injury of a type you do not have, starting with a Light Injury.
        If you would take an Injury but already have one of each type, you instead die.
      </p>
      <ul>
        <li><b>Light Injury</b>: Gain -1 to all rolls or -2 to all rolls of a specific category. Light injuries can be recovered in downtime.</li>
        <li><b>Serious Injury</b>: Gain -2 to all rolls, or major penalties to specific skills/rolls/mobility. More difficult to recover, though can be reduced to a light injury of the same roll result.</li>
        <li><b>Critical Injury</b>: Almost impossible to recover without lucky rolls or the intervention of Heroic Medals. Maybe an extremely small chance to get a second serious injury instead of dying.</li>
      </ul>

      <Hx>Permanent Injuries</Hx>
      <p>
        In rare cases, you may pick up a Permanent Injury. When you do, you will roll either a Light or Serious injury
        (as instructed by the effect that gave you the Permanent Injury). This injury is permanent and cannot be recovered
        by normal means, but it also does not count against your Light or Serious Injury count.
      </p>
      
    </div>

    {/* Table Showing injuries */}
    <div>
      <h4>Table of Injuries</h4>
      <InjuryTable />
    </div>
  </>);
}