
import Hx from "../../../../common-design/Hx/Hx";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function HeavensHost ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Heaven's Host</Hx>
    <p>{Tools.getLoremIpsum()}</p>
  </>)
}
