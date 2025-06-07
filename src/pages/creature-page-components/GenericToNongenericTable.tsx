import GenericToNongenericRow from "./GenericToNongenericRow";

export default function GenericToNongenericTable() {
  return (<>
   <table className="generic-to-nongeneric-table">
      <tbody>
        <tr>
          <th>Faction</th>
          <th>Core Type</th>
          <th>Promoting Type</th>
          <th>Rejecting Type</th>
          <th>Disrupting Type</th>
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
            {/* TODO add special bonus */}
          </>,
        }} />
        <GenericToNongenericRow data={{
          name: "Ashborn Legion",
          primary: "Infernal",
          absorb: "Verdant",
          weaknesses: ["Abyssal", "Chthonic"],
          special: <>
            {/* TODO add special bonus */}
          </>,
        }} />
        <GenericToNongenericRow data={{
          name: "Wanderlost Clans", //TODO add story elements for them
          primary: "Metal",
          absorb: "Chthonic",
          weaknesses: ["Infernal", "Nethercurrent"],
          special: <>
            {/* TODO add special bonus */}
          </>,
        }} />
        <GenericToNongenericRow data={{
          name: "Zephpter Horde", // TODO officially make this rename happen
          primary: "Nethercurrent",
          absorb: "Voidyr",
          weaknesses: ["Chthonic", "Metal"],
          special: <>
            Randomly either gain [Hover] or increase Move Speed by +2.
            <br />Creatures that are CT2 or greater, they gain [Flying] instead of [Hover]
            <br />(If the creature already has [Hover] or [Flying], they gain +2 Move Speed.).
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