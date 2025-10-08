import Hx from "../../../../common-design/Hx/Hx";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";
type Props = {
  hx: HeaderSize;
};
export default function DeepblindCaverns ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Deepblind Caverns</Hx>
    <p>Stoneveined... {Tools.getLoremIpsum()}</p>
  </>)
}
