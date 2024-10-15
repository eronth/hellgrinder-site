import { DealWithTheDevilRow } from "../../../ts-types/table-types";
import DevilDealTableRow from "./DevilDealTableRow";

export default function DevilDealTable() {

  const rowData: DealWithTheDevilRow[] = [
    {
      result: 1,
      name: "Demonic Army",
      boon: "The Devil grants you a demonic army of your own - 666 demons to command.",
      cost: "You are unable to gain or lose corruption, as the idea loses all meaning. You never fully connect with the denizens of your demonic army."
    }, {
      result: 2,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 3,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 4,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 5,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 6,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 7,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 8,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 9,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 10,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 11,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }, {
      result: 12,
      name: "The Devil's Due",
      boon: "The Devil will take one of your items.",
      cost: "1d6 Sanity"
    }
  ];

  return (
    <table className="devil-deal-table">
      <thead>
        <tr>
          <th>Roll Result</th>
          <th colSpan={3}>Name</th>
          <th colSpan={3}>Boon</th>
          <th colSpan={3}>Cost</th>
        </tr>
      </thead>
      <tbody>
        {
          rowData.map((row, i) => 
            <DevilDealTableRow key={`injury-table-row-${i}`} data={row} />)
        }
      </tbody>
    </table>);
  }