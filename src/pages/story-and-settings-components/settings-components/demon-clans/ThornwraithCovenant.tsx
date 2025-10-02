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
        Unlike other hellish factions, they thrive in primal 
        unity, their forms a fusion of plant and beast. Vines coil
        around to form limbs, bark-like skin 
        covers their bodies, and their eyes glow with a feral, greenish light.
        Many bear antlers or
        thorn-covered spines, while others have claws of twisted roots.
      </p>
      <p>
        Behind the actions of the beasts lies a collective consciousness, a hive mind that
        binds them together. This shared mind allows them to communicate silently and
        coordinate their movements with uncanny precision, making them formidable opponents in battle.
        The hive mind, often referred to as "The Bloom", grants a mysterious connection and purpose
        to each member of the <Faction>Thornwraith</Faction>.
      </p>
      <p>
        They move as one, their connection to each other and the natural world evident in their
        every action, functioning more like a pack or tribe than an army. Despite
        their savage appearance, the <Faction>Thornwraith</Faction> are deeply attuned to the life forces
        around them, though their presence in hell remains a mystery. They are often seen cultivating 
        small patches of overgrown wilderness in the Underworld — areas somehow untouched by the 
        surrounding destructive environment. It is suspected that these growths permit the spread
        of the hive mind.
      </p>
      <p>
        The Bloom compels its members to harvest any and all resources for the growth of the wilds.
        Any are welcome to join the <Faction>Thornwraith Bloom</Faction>, but once you do, your body
        and individuality are subsumed by the collective will. Rejecting the will of the Bloom
        comes at a terrible cost.
      </p>
    </DemonClanComponent>
  )
}
