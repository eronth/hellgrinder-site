import ColumnEntry from "../../common-design/ColumnEntry";
import Tools from "../../Tools";
import { HeaderSizeType } from "../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function HeavensHost ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Heaven's Host" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
