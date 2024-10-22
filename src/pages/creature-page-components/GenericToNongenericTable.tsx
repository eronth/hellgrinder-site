import GenericToNongenericRow from "./GenericToNongenericRow";

export default function GenericToNongenericTable() {
  return (<>
   <table>
      <tbody>
        <tr>
          <th>Faction</th>
          <th>Resist Primary<br />Absorb Primary</th>
          <th>Absorb Secondary</th>
          <th>Weak Primary</th>
          <th>Weak Secondary</th>
          <th>Special Bonus</th>
        </tr>
        <GenericToNongenericRow data={{
          name: "Thornwraith Conclave",
          primary: "Verdant",
          absorb: "Abyssal",
          weaknesses: ["Metal", "Voidyr"],
          special: <>
            The first time a Thornwraith is hit with Nethercurrent, they take 4 Infernal Damage (ignores resistances).
            <br />Thornwraith has a 50% chance to resist any status effect.
            <br />Thornwraith has [Resist Infernal 2].
          </>
        }} />
        <GenericToNongenericRow data={{
          name: "Stoneveined Order",
          primary: "Chthonic",
          absorb: "Infernal",
          weaknesses: ["Verdant", "Voidyr"],
          special: <>
            Gain Resist Nethercurrent for each listed Resist as well.
            <br />Stoneveined gets extra health based on type (Familiar: +1, Minion +2, Spawn +3, Elite +4, Tormentor +5, Archfiend +6, Lord +7, Overlord +8).
            <br />Stoneveined can add [Knockback 1] to any attack they make and reduces knockback by -1 for any attack they take..
          </>,
        }} />
        <GenericToNongenericRow data={{
          name: "Vastfathom Dominion",
          primary: "Abyssal",
          absorb: "Metal",
          weaknesses: ["Chthonic", "Nethercurrent"],
          special: <>

          </>,
        }} />
        <GenericToNongenericRow data={{
          name: "Ashborn Legion",
          primary: "Infernal",
          absorb: "Verdant",
          weaknesses: ["Abyssal", "Chthonic"],
          special: <>

          </>,
        }} />
        <GenericToNongenericRow data={{
          name: "Wanderlost Clans",
          primary: "Metal",
          absorb: "Chthonic",
          weaknesses: ["Infernal", "Nethercurrent"],
          special: <>
          
          </>,
        }} />
        <GenericToNongenericRow data={{
          name: "Zephpter Horde",
          primary: "Nethercurrent",
          absorb: "Voidyr",
          weaknesses: ["Chthonic", "Metal"],
          special: <>
            Randomly either gain [Hover] or increase Move Speed by +1.
            <br />25% chance for attacks to deal Abyssal instead of Nethercurrent.
          </>,
        }} />
        <GenericToNongenericRow data={{
          name: "Umbral Nexus",
          primary: "Voidyr",
          absorb: "Nethercurrent",
          weaknesses: ["Abyssal", "Infernal"],
          special: <>
            Gain [Resist Metal 5] against non-blessed metals.
            <br />Gain [Weak Blessed Metal 5] and [Weak Blessed Fire 5].
          </>,
        }} />
      </tbody>
    </table>
  </>);
}