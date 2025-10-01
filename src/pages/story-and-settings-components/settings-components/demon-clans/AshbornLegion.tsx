import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function AshbornLegion ({ hx }: Props) {
  const buttonText = {
    offer: 'Swear Your Fealty',
    renounce: 'Betray the Legion'
  };
  return (
    <DemonClanComponent title="Ashborn Legion" hx={hx} buttonText={buttonText}>
      <p>
        The <Faction>Ashborn Legion</Faction> are infernal-aligned
        demons forged in the fires of hell, their very bodies wreathed
        in ash and embers. Though roughly humanoid in shape, the winged-beasts’
        flesh is blackened and cracked like scorched earth, with molten veins
        glowing just beneath the surface. Eyes burn like smoldering coals, and
        their breath carries the heat of a furnace.
      </p>
      <p>
        The creatures are born from swirling hate pods and serve as relentless
        enforcers of the Ashborne Lords, leaving scorched ruins in their wake as
        they march ever onward.
      </p>
    </DemonClanComponent>
  )
}
