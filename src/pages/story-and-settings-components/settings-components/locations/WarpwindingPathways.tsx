import ColumnEntry from "../../../../common-design/ColumnEntry";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function WarpwindingPathways ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Warpwinding Pathways" }}>
      <p>
        In-between the controlled regions of hell, where borders do not clash,
        lie the Warpwinding Pathways. These pathways are not roads, but rather
        twisting, winding trails that can lead to nowhere; and sometimes to 
        everywhere. They are not of any recognizable material, but rather 
        something indescribable and alien. They are firm and solid, yet also
        permeable and fluid. They do not yield to force, yet can be easily 
        harvested and reshaped. They are open paths to exactly where you need
        to go, but also to places you never wanted to be. You can be lost for
        days, weeks, or even years in the Warpwinding Pathways, and yet
        somehow find your way home in an instant.
        The uncertain nature of the Warpwinding Pathways makes them a last
        resort when travelling, as they can impede progress indefinitely.
      </p>
      <p>
        Some say that the pathways themselves are actually alive, and that
        becoming one with The Pathway is the key to safely navigating them.
        Others say that getting lost in the pathway <i>is</i> the one
        path to bliss. Nevertheless, most find the pathways uncomfortable
        and disorienting, and prefer to avoid them if at all possible.
      </p>
    </ColumnEntry>
  )
}
