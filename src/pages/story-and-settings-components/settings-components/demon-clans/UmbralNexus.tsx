import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function UmbralNexus ({ hx }: Props) {
  const buttonText = {
    offer: 'Submit to the Darkness',
    renounce: 'Find the Light'
  };
  return (
    <DemonClanComponent title={"Umbral Nexus"} hx={hx} buttonText={buttonText}>
      <p>
        The <Faction>Umbral Nexus</Faction> is composed of Voidyr-aligned
        demons that bear an unsettling resemblance to humans, marred by
        grotesque distortions. Some carry arms with too many joints, others
        smiles that stretch far beyond the bounds of the face, or eyes that
        sprout in places no eye should ever be. To look upon them is to feel
        that something once familiar has gone irreparably wrong.
      </p>
      <p>
        Cloaked in shadows that writhe like living things, they slowly extend
        their influence into the darkness around them. Given time, they can
        seize control of another’s shadow, twisting it into an extension of
        themselves. Once claimed, they can mimic their target — but only the
        aspects the target refuses to see within themselves. In this way, they
        become near-perfect predators, stepping from shadow, reflection, dream,
        or photograph to stalk their chosen prey.
      </p>
      <p>
        Dark rumors persist that the Umbral Nexus were once human—outcasts who,
        without infernal corruption, twisted themselves into demons through
        despair and self-denial. They embody the complete loss of belonging,
        warped into alien forms by isolation. Drawn to places of abandonment
        and silence, they linger in ruined homes, forgotten offices, and
        decayed workplaces — feeding on those who, like them, have been left
        behind. Where the Umbral gather, shadows thicken, and the memory of
        those who vanish there is soon erased, as though they had never been.
      </p>
    </DemonClanComponent>
  )
}
