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
        The <Faction>Umbral Nexus</Faction> is composed of
        Voidyr-aligned demons that bear an unsettling resemblance
        to humans with grotesque distortions. They bear
        arms with extra joints, smiles that stretch unnaturally wide,
        or eyes that sprout in strange places.
      </p>
      <p>
        They are cloaked in shadow that writhe and twist, as if alive. 
        If given enough
        time, they can claim the shadows of those nearby, turning them into
        extensions of their own forms. Once they do so, they can mimic their
        target — but only the aspects the target refuses to see within themselves.
        They become the near-perfect
        predators, able to melt into darkness and strike from
        your shadow, reflection, dreams, and pictures.
      </p>
      <p>
        These creatures inspire dark rumors—some say they were once
        human, individuals who, without any infernal influence, twisted
        their own bodies and minds into a new kind of demon. They are the
        complete loss of a sense of belonging, twisting into something
        alien and monstrous. They are said to be drawn to places of deep
        shadow and isolation, where they can find others who feel like
        outsiders. They are often found in abandoned buildings, forgotten
        homes, or dilapidated workplaces.
      </p>
    </DemonClanComponent>
  )
}
