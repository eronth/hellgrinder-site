import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function ThornwraithCovenant ({ hx }: Props) {
  const buttonText = {
    offer: 'Accept the Hivemind',
    renounce: 'Find Your Self'
  };
  return (
    <DemonClanComponent title="Thornwraith Brood" hx={hx} buttonText={buttonText}>
      <p>
        The <Faction>Thornwraith Bloom</Faction> — also known
        as the <Faction>Thornwraith Brood</Faction> —
        are a verdant-aligned clan,
        an anomaly in the burning wastelands of hell. Unlike other
        infernal factions, they thrive in primal 
        unity, their forms a fusion of plant and beast. Vines coil
        around their limbs, bark-like skin 
        covers their bodies, and their eyes glow with a feral, greenish light. Some bear antlers or
        thorn-covered spines, while others have claws of twisted roots.
      </p>
      <p>
        They move as one, their connection to each other and the natural world evident in their
        every action, functioning more like a pack or tribe than an army. Despite
        their savage appearance, the <Faction>Thornwraith</Faction> are deeply attuned to the life forces
        around them, though their presence in hell remains a mystery. They are often seen cultivating 
        small patches of overgrown wilderness in the Underworld — areas somehow untouched by the 
        surrounding destructive environment.
      </p>
    </DemonClanComponent>
  )
}
