import ColumnEntry from "../../common-design/ColumnEntry";
import Tools from "../../Tools";
import { HeaderSizeType } from "../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function VoidfireConclave ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Voidfire Conclave" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
