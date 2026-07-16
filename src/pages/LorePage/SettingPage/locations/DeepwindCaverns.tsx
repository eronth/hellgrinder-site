import Hx from "../../../../components/common/generic/Hx/Hx";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function DeepblindCaverns ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Deepblind Caverns</Hx>
    <p>
      The Deepblind Caverns are home to the Stoneveined Choir.
      Their long stone passages are perfect to carry the
      reverberations of the Choir's grinding song. It is said
      that the longer you spend in the Deepblind Caverns,
      the more melodious the grinding becomes.
    </p>
    <p>Traversing the Caverns is no easy task. Tight squeezes,
      harsh climbs, and unsteady footing awaits all who dare.
      And if you can push past the obstacles, the darkness still
      persists. The deeper you delve, the harsher the darkness
      becomes, eventually blotting out the strongest of lights.
      The only light left to penetrate darkness this deep is Safelight.
    </p>
    <p>
      Should you reach such darkened depths, you need not worry. For
      there is a song to guide you. Listen to it's grinding
      melody! You're not lost, child. You're finally found.
    </p>
  </>)
}
