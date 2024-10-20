import ColumnEntry from "../../../common-design/ColumnEntry";
import { HeaderSizeType } from "../../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function StormwingHorde ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Stormwing/Nethercurrent Horde" }}>
      <p>Zephyr/Nethercurrent</p>
    </ColumnEntry>
  )
}
