import Hx from "../../../../components/common/generic/Hx/Hx";
import Tools from "../../../../utils/tools";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function ZephyrianSpires ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Zephyrian Spires</Hx>
    <p>
      The Zephyrian Spires reach endlessly high and unceasingly deep,
      with only precarious outcroppings and brief tunnels to traverse upon.
      The dangerous paths are made worse by the the creatures that stalk them.
      Swarms of the Zephpter Horde glide swift through the air
      to strike swift against invaders.
    </p>
    <p>
      The spires come in two flavors:
      Shifting Spires warp and twist as though the stone that makes them is
      not solid. The sheets of stone constantly grind and twist against
      each-other, though unyielding to other forces.
      When moving through the tunnels and caverns of one of these
      spires, move quickly. Linger too long, and your way back
      out may simply melt away.
    </p>
    <p>
      Enormous stalactite and stalagmite spires reaching from the vast
      emptiness, with floating platforms between. 
      Occasionally a powerful
      jolt of Nethercurrent will course between the spires,
      coursing through several of the floating platforms along the way.
      Travelers must take care when traversing these platforms to 
      reduce or prevent risk of Nethercurrent jolts.
    </p>
  </>)
}
