import ColumnEntry from "../../../common-design/ColumnEntry";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function ZephpterHorde ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Zephpter Horde" }}>
      <p>Zephyr/Nethercurrent</p>
    </ColumnEntry>
  )
}
