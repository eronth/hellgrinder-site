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
        to humans, save for a few grotesque distortions. They bear
        arms with extra joints, smiles that stretch unnaturally wide,
        or eyes that sprout in strange places.
      </p>
      <p>
        These creatures inspire dark rumors—some say they were once
        human, individuals who, without any infernal influence, twisted
        their own bodies and minds into a new kind of demon. Devoid of
        a life force of their own, they now hunger to drain it from
        humankind.
      </p>
    </DemonClanComponent>
  )
}
