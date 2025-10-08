import Hx from "../../../../common-design/Hx/Hx";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function ShoalpockedExpanse ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Shoalpocked Expanse</Hx>
    <p>Abyssal... {Tools.getLoremIpsum()}</p>
  </>)
}
