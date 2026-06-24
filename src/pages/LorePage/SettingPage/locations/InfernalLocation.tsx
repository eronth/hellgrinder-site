import Hx from "../../../../components/common/generic/Hx/Hx";
import Tools from "../../../../utils/tools";
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
