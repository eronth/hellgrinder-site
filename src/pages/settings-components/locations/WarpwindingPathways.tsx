import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSizeType } from "../../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function WarpwindingPathways ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Warpwinding Pathways" }}>
      <p>In-between... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
