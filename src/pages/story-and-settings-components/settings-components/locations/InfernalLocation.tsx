import Hx from "../../../../common-design/Hx/Hx";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function InfernalLocation ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Infernal Location</Hx>
    <p>Infernal... {Tools.getLoremIpsum()}</p>
  </>)
}
