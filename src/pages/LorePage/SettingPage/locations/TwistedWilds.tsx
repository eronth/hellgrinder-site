import Hx from "../../../../common-design/Hx/Hx";
import Tools from "../../../../common-design/Tools";
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
