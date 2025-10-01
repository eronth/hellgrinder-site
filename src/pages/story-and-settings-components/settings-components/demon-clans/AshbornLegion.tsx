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
        The Warlords of the Legion are towering figures clad in
        jagged, obsidian armor that absorbs all light. They drive their underlings
        with ruthless efficiency, their commands echoing like thunder across
        the battlefield. The Warlords organize the hate-filled masses into
        brutal warbands, armed with infernal weapons and armor. They march
        across the lands of hell, charring each into a wasteland only befit the Ashborn.
      </p>
      <p>
        Occasionally, small squads of lesser Ashborn will escape the commands
        of their Warlord. Such Ashborn lose the power of their infernal armor,
        and are forced to scrounge and scavenge for any sort of armaments.
        These rogue Ashborn are often more cunning and adaptable than their
        brethren, relying on guerrilla tactics and ambushes to strike at
        their enemies. They are outcasts, hunted by both the Legion and
        other demon clans alike.
      </p>
    </DemonClanComponent>
  )
}
