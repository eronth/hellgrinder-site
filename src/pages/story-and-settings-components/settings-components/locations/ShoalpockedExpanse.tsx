import ColumnEntry from "../../../../common-design/ColumnEntry";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function ShoalpockedExpanse ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Shoalpocked Expanse" }}>
      <p>Abyssal... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
