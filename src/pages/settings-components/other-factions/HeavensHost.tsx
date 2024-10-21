import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function HeavensHost ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Heaven's Host" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
