import { InjuryRow } from "../../../ts-types/table-types";
import './InjuryTable.css';

type Props = {
  data: InjuryRow;
};

export default function InjuryTableRow({ data }: Props) {
  const lightInjury = data.injury.light;
  const seriousInjury = data.injury.serious;
  const criticalInjury = data.injury.critical;

  return (<>
    <tr>
      <td className="roll-column">
        {data.result.min}&nbsp;-&nbsp;{data.result.max}
      </td>
      <td colSpan={3}>
        <b>{lightInjury.name}</b>: {lightInjury.description}
      </td>
      <td colSpan={3}>
      <b>{seriousInjury.name}</b>: {seriousInjury.description}
      </td>
      <td colSpan={3}>
        <b>{criticalInjury.name}</b>: {criticalInjury.description}
      </td>
    </tr>
  </>);
}