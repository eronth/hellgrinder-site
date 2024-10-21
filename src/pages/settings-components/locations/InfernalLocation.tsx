import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function InfernalLocation ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Infernal Location" }}>
      <p>Infernal... {Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  )
}
