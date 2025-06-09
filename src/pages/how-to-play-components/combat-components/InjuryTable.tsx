import InjuryTableRow from "./InjuryTableRow";
import { InjuryRow } from "../../../ts-types/table-types";

export default function InjuryTable() {
  const rowData: InjuryRow[] = [
    {
      result: { min: 1, max: 2 },
      injury: {
        light: { name: 'Broken Foot', description: '-2 to [Agility Skill Checks].' },
        serious: { name: 'Shattered Leg', description: '-2 Move Speed.' },
        critical: { name: 'Bruised: -2 to all rolls', description: 'Bruised: -2 to all rolls' }
      }
    }, {
      result: { min: 3, max: 4 },
      injury: {
        light: { name: 'Concussion', description: '-2 to all rolls' },
        serious: { name: 'Concussion', description: '-2 to all rolls' },
        critical: { name: 'Concussion', description: '-2 to all rolls' }
      }
    }, {
      result: { min: 5, max: 6 },
      injury: {
        light: { name: 'Deep Gash', description: '-2 to all rolls' },
        serious: { name: 'Deep Gash', description: '-2 to all rolls' },
        critical: { name: 'Deep Gash', description: '-2 to all rolls' }
      }
    }, {
      result: { min: 7, max: 8 },
      injury: {
        light: { name: 'Internal Bleeding', description: '-2 to all rolls' },
        serious: { name: 'Internal Bleeding', description: '-2 to all rolls' },
        critical: { name: 'Internal Bleeding', description: '-2 to all rolls' }
      }
    }, {
      result: { min: 9, max: 10 },
      injury: {
        light: { name: 'Broken Ribs', description: '-2 to all rolls' },
        serious: { name: 'Punctured Lung', description: '-2 to all rolls' },
        critical: { name: 'Punctured Lung', description: '-2 to all rolls' }
      }
    }, {
      result: { min: 11, max: 12 },
      injury: {
        light: { name: 'Broken Arm', description: '-2 to all rolls' },
        serious: { name: 'Broken Arm', description: '-2 to all rolls' },
        critical: { name: 'Broken Arm', description: '-2 to all rolls' }
      }
    }, {
      result: { min: 13, max: 14 },
      injury: {
        light: { name: 'Broken Hand', description: '-2 to all rolls' },
        serious: { name: 'Broken Hand', description: '-2 to all rolls' },
        critical: { name: 'Broken Hand', description: '-2 to all rolls' }
      }
    }, {
      result: { min: 15, max: 16 },
      injury: {
        light: { name: 'Broken Jaw', description: '-2 to all rolls' },
        serious: { name: 'Broken Jaw', description: '-2 to all rolls' },
        critical: { name: 'Broken Jaw', description: '-2 to all rolls' }
      }
    }, {
      result: { min: 17, max: 18 },
      injury: {
        light: { name: 'Broken Nose', description: '-2 to all rolls' },
        serious: { name: 'Broken Nose', description: '-2 to all rolls' },
        critical: { name: 'Broken Nose', description: '-2 to all rolls' }
      }
    }
  ];

  return (
  <table className="injuries-table">
    <thead>
      <tr>
        <th className="roll-column">Roll</th>
        <th colSpan={3}>Light Injury</th>
        <th colSpan={3}>Serious Injury</th>
        <th colSpan={3}>Critical Injury</th>
      </tr>
    </thead>
    <tbody>
      {
        rowData.map((row, i) => 
          <InjuryTableRow key={`injury-table-row-${i}`} data={row} />)
      }
    </tbody>
  </table>);
}