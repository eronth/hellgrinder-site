import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSizeType } from "../../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function TwistedWilds ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Twisted Wilds" }}>
      <p>Verdant... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
