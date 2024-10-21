import ColumnEntry from "../../../common-design/ColumnEntry";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function StoneveinedOrder ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Stoneveined Order" }}>
      <p>The Stoneveined Order are enigmatic chthonic-aligned beings, formed from the very bedrock of hell itself. Their bodies are fused with the ancient stone, veins of glowing mineral running through their skin, pulsing with a faint inner light. These demons are sometimes found embedded with Safelight Shards, glowing crystals that seem to offer them protection or power. Safelight infused Stoneveined tend to be more docile than others, but that doesn’t mean they’re completely peaceful.</p>
      <p>The Stoneveined move slowly and deliberately, as if in tune with the deep, tectonic forces of hell. Their motives are obscure, even to other infernal factions, but their presence is undeniable—wherever they appear, hell itself seems to shift and warp. It is said that the Stoneveined Order has existed since the very creation of hell, rumored to serve as caretakers of the realm itself. Yet some rumors have whispers of an even darker purpose for these soldiers.</p>
    </ColumnEntry>
  )
}
