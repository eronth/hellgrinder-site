import ColumnEntry from "../../../../common-design/ColumnEntry";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function ZephpterHorde ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Zephpter Hordes" }}>
      <p>
        The Zephpter Hordes are filled with nethercurrent-aligned demonic critters that reside
        along the walls of the Zephyrian Spires. They are small, insect-like creatures
        that can fly through the lingering clouds as a bolt of lightning.
      </p>
      <p>
        The Zephpter Hordes are known for their chaotic nature, often swarming in large numbers
        and attacking anything that disturbs their territory. They are drawn to sources of
        energy, such as electrical devices or magical artifacts, and will fiercely defend
        these sources from intruders. Their small size and agility make them difficult to catch.
      </p>
    </ColumnEntry>
  )
}
