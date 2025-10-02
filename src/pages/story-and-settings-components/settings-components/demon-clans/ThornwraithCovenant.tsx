import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function ThornwraithCovenant ({ hx }: Props) {
  const buttonText = {
    offer: 'Accept the Hivemind',
    renounce: 'Find Your \'Self\''
  };
  return (
    <DemonClanComponent title="Thornwraith Bloom" hx={hx} buttonText={buttonText}>
      <p>
        The <Faction>Thornwraith Bloom</Faction>, also known
        as the <Faction>Thornwraith Brood</Faction>,
        are a verdant-aligned clan — quite the anomaly in the harsh wastelands of hell.
        Their forms are a grotesque
        fusion of beast, root, and fungus. Bark-like hide cracks to reveal
        pulsing mycelial threads beneath. Their limbs are formed of coiling
        vines and sinew, ending in claws of twisted roots. Many sprout
        antlers like petrified branches, while others bristle with thorns,
        fungal caps, or spore-pods that shudder with every movement. Their
        eyes glow with a feral green light, like lanterns buried in rot.
      </p>
      <p>
        Beneath their monstrous forms lies a single will: a hive-mind known as
        <i>The Bloom</i>. Through it, each Thornwraith is bound, their thoughts
        woven together like mycellial-coated roots in soil. They move
        with uncanny precision,
        silent but perfectly in concert, guided by impulses that seem less like
        strategy and more like instinct. To face one Thornwraith is to face the
        collective, for none are ever truly alone.
      </p>
      <p>
        They spread as creeping overgrowths, patches of viridian life clinging
        to existance hell’s desolation. Fungal mats and tangles of thorned roots choke
        ruins and caverns, forming colonies that serve as extensions of the
        hive-mind. Scholars whisper that these growths are not merely terrain,
        but the Bloom itself—each sprout, each spore, a fragment of its
        consciousness. To linger in such places is to risk inhaling the spores
        and hearing the Bloom’s call whispering from within.
      </p>
      <p>
        The Bloom commands endless harvest: flesh, bone, and stone alike are
        torn down and rewoven into the verdant sprawl. Any who enter their
        midst are offered a place in the Bloom’s embrace. But to join is to be
        subsumed—body reshaped, mind dissolved into the collective will. To
        resist is to be strangled, consumed, and repurposed as food for the growth.
        In Hell, the Thornwraith are both garden and grave.
      </p>
    </DemonClanComponent>
  )
}
