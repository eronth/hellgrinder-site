import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function HandOfDeath ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Hand of Death" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
