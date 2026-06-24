import Hx from "../../../../components/common/generic/Hx/Hx";
import Tools from "../../../../utils/tools";
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
