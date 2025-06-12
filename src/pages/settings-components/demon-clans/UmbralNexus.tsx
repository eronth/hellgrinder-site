import ColumnEntry from "../../../common-design/ColumnEntry";
import { HeaderSize } from "../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function UmbralNexus ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Umbral Nexus" }}>
      <p>The Umbral Nexus is composed of Voidyr-aligned demons that bear an unsettling resemblance 
        to humans, save for a few grotesque distortions. They bear arms with extra joints, smiles that stretch unnaturally wide, or eyes that sprout in strange places.</p>
      <p>These creatures inspire dark rumors—some say they were once human, individuals who, without any infernal influence, twisted their own bodies and minds into a new kind of demon. Devoid of a life force of their own, they now hunger to drain it from humankind.</p>
    </ColumnEntry>
  )
}
