import { FactionEffectsRow } from "../../ts-types/table-types";

type Props = {
  data: FactionEffectsRow;
};

export default function GenericToNongenericTable({ data }: Props) {
  return (<>
    <tr>
      <td><b>{data.name}</b></td>
      <td>{data.primary}</td>
      <td>{data.absorb}</td>
      <td>{data.weaknesses[0]}</td>
      <td>{data.weaknesses[1]}</td>
      <td>{data.special}</td>
    </tr>
  </>);
}