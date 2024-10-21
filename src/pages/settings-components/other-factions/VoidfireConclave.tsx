import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function VoidfireConclave ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Voidfire Conclave" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
