import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function StoneveinedOrder ({ hx }: Props) {
  const buttonText = {
    offer: 'Sing the Chorus',
    renounce: 'Silence the Echoes'
  };
  return (
    <DemonClanComponent title="Stoneveined Choir" hx={hx} buttonText={buttonText}>
      <p>
        The Stoneveined Choir are enigmatic chthonic-aligned beings,
        formed from the very bedrock of hell itself. Their bodies are
        fused with the ancient stone, veins of glowing mineral running
        through their skin, pulsing with a faint inner light. These
        demons are sometimes found embedded with Safelight Shards, glowing
        crystals that seem to offer them protection or power. Safelight
        infused Stoneveined tend to be more docile than others, but that
        doesn’t mean they’re completely peaceful.
      </p>
      <p>
        The Stoneveined move slowly and deliberately, as if in tune
        with the deep, tectonic forces of hell. As they move, the scraping
        and grinding of stone echoes through the caverns, in a dissonant
        yet somehow harmonic melody that instills a sense
        of unease for all who hear it. Their motives are obscure,
        even to other infernal factions, but their presence is
        undeniable—wherever they appear, hell itself seems to shift and
        warp.
      </p>
      <p>
        When Lords of the Stoneveined Choir move, they move deliberately
        and without notice of those around them. Their footsteps
        cause the very ground to tremble, and the air is filled with
        their rackerous song. Though they are not inherently hostile,
        if they are attacked or hindered, pieces of the Lord and the world 
        will spring to life to assault the offenders. It is as if they are
        a natural defense of the Lords.
      </p>
      <p>
        It is said that the Stoneveined Order has existed since
        the very creation of hell, rumored to serve as caretakers of
        the realm itself. Yet some rumors have whispers of an even darker
        purpose for these soldiers.
      </p>
    </DemonClanComponent>
  )
}
