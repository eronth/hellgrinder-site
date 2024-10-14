import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSizeType } from "../../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function ShoalpockedExpanse ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Shoalpocked Expanse" }}>
      <p>Abyssal... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
