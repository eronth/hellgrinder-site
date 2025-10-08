import Hx from "../../../../common-design/Hx/Hx";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function ZephyrianSpires ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Zephyrian Spires</Hx>
    <p>Nethercurrent... {Tools.getLoremIpsum()}</p>
  </>)
}
