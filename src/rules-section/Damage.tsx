import ColumnEntry from "../common-design/ColumnEntry";

export default function Damage() {

  return (<>

  <ColumnEntry title={{ hx: 'h3', text: 'Dealing Damage' }}>
    <p>Whenever you take damage, you reduce your current health by that much. In some cases, armor might reduce the damage you take by a given value. Damage reduced this way can never be reduced below 0.</p>
  </ColumnEntry>

  <ColumnEntry title={{ hx: 'h4', text: 'Damage Types' }}>
    <p>There are several damage types in the world of Hellgrinder. Many clans of demons are attuned to one type or another, typically imbuing their attacks with that type and granting them resistance against it.</p>
    <div>Damage types are as follows:</div>
    <ol className="roman" start="0">
      <li>Metal</li>
      <li>Infernal</li>
      <li>Abyssal</li>
      <li>Verdant</li>
      <li>Chthonic</li>
      <li>Zephyr/Nethercurrent</li>
      <li>Voidyr</li>
    </ol>
  </ColumnEntry>

  <ColumnEntry title={{ hx: 'h4', text: 'Weakness and Resistance' }}>
    <p>Many creatures have Weakness or Resistance to damage types, and some Kits, Perks, or other gear might grant player characters Weakness or Resistance as well. These effects change how much damage you take from attack, and are often shorthanded.</p>
    <p>Weakness {"<type>"} X - Shorthand: “Weak {"<type>"} X” - Increase damage taken of the listed type by X.</p>
    <p>Resistance {"<type>"} X - Shorthand “Resist {"<type>"} X” - Reduce damage taken of the listed type by X.</p>
  </ColumnEntry>
  
  <ColumnEntry title={{ hx: 'h4', text: 'Injuries' }}>
    <p>If your health is 0 or less, you take an Injury (rolled on a table) then add [Max Health] to your current. Each time you take an Injury, take an injury of a type you do not have.</p>
    <ul>
      <li>Light Injury: -1 to all rolls or -2 to all rolls of a specific category. Light injuries can be recovered in downtime.</li>
      <li>Serious Injury: -2 to all rolls, or major penalties to specific skills/rolls/mobility. More difficult to recover, though can be reduced to a light injury of the same roll result.</li>
      <li>Critical Wound: Almost impossible to recover without lucky rolls or the intervention of Heroic Medals. Maybe an extremely small chance to get a second serious injury instead of dying.</li>
    </ul>
  </ColumnEntry>

  [INSERT TABLE OF INJURIES]

  
  </>);
}