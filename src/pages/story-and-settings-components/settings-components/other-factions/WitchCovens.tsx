import ColumnEntry from "../../../../common-design/ColumnEntry";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function WitchCovens ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Witch Covens" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
