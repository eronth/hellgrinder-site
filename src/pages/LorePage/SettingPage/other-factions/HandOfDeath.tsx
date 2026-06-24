import Hx from "../../../../components/common/generic/Hx/Hx";
import Tools from "../../../../utils/tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function HandOfDeath ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Hand of Death</Hx>
    <p>{Tools.getLoremIpsum()}</p>
  </>)
}
