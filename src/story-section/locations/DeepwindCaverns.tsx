import ColumnEntry from "../../common-design/ColumnEntry";
import Tools from "../../Tools";
import { HeaderSizeType } from "../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function DeepblindCaverns ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Deepblind Caverns" }}>
      <p>Stoneveined... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
