import ColumnEntry from "../../common-design/ColumnEntry";
import Tools from "../../Tools";
import { HeaderSizeType } from "../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function WitchCovens ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Witch Covens" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
