import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function WarpwindingPathways ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Warpwinding Pathways" }}>
      <p>In-between... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
