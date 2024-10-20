import { DealWithTheDevilRow } from "../../../ts-types/table-types";

type Props = {
  data: DealWithTheDevilRow;
};
export default function DevilDealTableRow({ data }: Props) {
  function romanize(num: number): string {
    if (num === 1) return 'I';
    if (num === 2) return 'II';
    if (num === 3) return 'III';
    if (num === 4) return 'IV';
    if (num === 5) return 'V';
    if (num === 6) return 'VI';
    if (num === 7) return 'VII';
    if (num === 8) return 'VIII';
    if (num === 9) return 'IX';
    if (num === 10) return 'X';
    if (num === 11) return 'XI';
    if (num === 12) return 'XII';
    if (num === 13) return 'XIII';
    if (num === 14) return 'XIV';
    if (num === 15) return 'XV';
    if (num === 16) return 'XVI';
    if (num === 17) return 'XVII';
    if (num === 18) return 'XVIII';
    if (num === 19) return 'XIX';
    if (num === 20) return 'XX';
    if (num === 21) return 'XXI';
    return '';
  }

  return (<>
    <tr>
      <td className='center-num'>
        {romanize(data.result)}
      </td>

      <td colSpan={3}>
        <b>{data.name}</b>
      </td>

      <td colSpan={3}>
        {data.boon}
      </td>
      
      <td colSpan={3}>
        {data.cost}
      </td>
    </tr>
  </>);
}