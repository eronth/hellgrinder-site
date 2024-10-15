import InjuryTableRow from "./InjuryTableRow";

export default function InjuryTable() {

  return (<>
  <table className="injuries-table">
    <thead>
      <tr>
        <th>Roll</th>
        <th colSpan={3}>Light Injury</th>
        <th colSpan={3}>Serious Injury</th>
        <th colSpan={3}>Critical Injury</th>
      </tr>
    </thead>
    <tbody>
      <InjuryTableRow />
      <tr>
        <td>3-4</td>
        <td colSpan={3}>Concussion: -2 to all rolls</td>
        <td colSpan={3}>Concussion: -2 to all rolls</td>
        <td colSpan={3}>Concussion: -2 to all rolls</td>
      </tr>
      <tr>
        <td>5-6</td>
        <td colSpan={3}>Deep Gash: -2 to all rolls</td>
        <td colSpan={3}>Deep Gash: -2 to all rolls</td>
        <td colSpan={3}>Deep Gash: -2 to all rolls</td>
      </tr>
      <tr>
        <td>7-8</td>
        <td colSpan={3}>Internal Bleeding: -2 to all rolls</td>
        <td colSpan={3}>Internal Bleeding: -2 to all rolls</td>
        <td colSpan={3}>Internal Bleeding: -2 to all rolls</td>
      </tr>
      <tr>
        <td>9-10</td>
        <td colSpan={3}>Fractured Skull: -2 to all rolls</td>
        <td colSpan={3}>Fractured Skull: -2 to all rolls</td>
        <td colSpan={3}>Fractured Skull: -2 to all rolls</td>
      </tr>
      <tr>
        <td>11-12</td>
        <td colSpan={3}>Severed Limb: -2 to all rolls</td>
        <td colSpan={3}>Severed Limb: -2 to all rolls</td>
        <td colSpan={3}>Severed Limb: -2 to all rolls</td>
      </tr>
      <tr>
        <td>13-14</td>
        <td colSpan={3}>Internal Organ Damage: -2 to all rolls</td>
        <td colSpan={3}>Internal Organ Damage: -2 to all rolls</td>
        <td colSpan={3}>Internal Organ Damage: -2 to all rolls</td>
      </tr>
      <tr>
        <td>15-16</td>
        <td colSpan={3}>Blinded: -2 to all rolls</td>
        <td colSpan={3}>Blinded: -2 to all rolls</td>
        <td colSpan={3}>Blinded: -2 to all rolls</td>
      </tr>
      <tr>
        <td>17-18</td>
        <td colSpan={3}>Deafened: -2 to all rolls</td>
        <td colSpan={3}>Deafened: -2 to all rolls</td>
        <td colSpan={3}>Deafened: -2 to all rolls</td>
      </tr>
    </tbody>
  </table>
  </>);
}