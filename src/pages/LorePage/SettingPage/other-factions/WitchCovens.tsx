import Hx from "../../../../common-design/Hx/Hx";
import Tools from "../../../../common-design/Tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function WitchCovens ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Witch Covens</Hx>
    <p>{Tools.getLoremIpsum()}</p>
  </>)
}
