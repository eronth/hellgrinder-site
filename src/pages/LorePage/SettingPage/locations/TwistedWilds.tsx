import Hx from "../../../../components/common/generic/Hx/Hx";
import Tools from "../../../../utils/tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function TwistedWilds ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Twisted Wilds</Hx>
    <p>Verdant... {Tools.getLoremIpsum()}</p>
  </>)
}
