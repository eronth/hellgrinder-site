import ColumnEntry from "../../common-design/ColumnEntry";
import Faction from "../../common-design/story-references/Faction";
import { HeaderSizeType } from "../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function VastfathomDominion ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Vastfathom Dominion" }}>
      <p>The <Faction>Vastfathom Dominion</Faction> are abyssal-aligned demons that dwell in the darkest depths, born from the crushing cold of Hell’s oceans of nothingness. Their forms are elusive and alien, shifting like the murky water that hides them. Some have elongated, serpent-like bodies with translucent skin that reveals a network of pulsating veins, while others bear multiple limbs that undulate like the tentacles of deep-sea horrors. Their eyes glow dimly, piercing through the darkness, while their touch brings the icy chill of the depths.</p>
      <p>Spawned from the vast, unseen trenches of hell, they serve the Abyssal Sovereigns, rising from the fathomless deep to drag their prey into the cold abyss.</p>
    </ColumnEntry>
  )
}
