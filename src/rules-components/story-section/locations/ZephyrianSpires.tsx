import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSizeType } from "../../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function ZephyrianSpires ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Zephyrian Spires" }}>
      <p>Nethercurrent... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
