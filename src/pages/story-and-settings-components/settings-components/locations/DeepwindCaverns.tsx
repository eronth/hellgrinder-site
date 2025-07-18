import ColumnEntry from "../../../../common-design/ColumnEntry";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";
type Props = {
  hx: HeaderSize;
};
export default function DeepblindCaverns ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Deepblind Caverns" }}>
      <p>Stoneveined... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
