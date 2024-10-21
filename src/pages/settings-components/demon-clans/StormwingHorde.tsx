import ColumnEntry from "../../../common-design/ColumnEntry";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function StormwingHorde ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Stormwing/Nethercurrent Horde" }}>
      <p>Zephyr/Nethercurrent</p>
    </ColumnEntry>
  )
}
