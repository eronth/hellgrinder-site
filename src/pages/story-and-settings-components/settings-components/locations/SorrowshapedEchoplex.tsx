import ColumnEntry from "../../../../common-design/ColumnEntry";
import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function SorrowshapedEchoplex({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Sorrowshaped Echoplex" }}>
      <p>
        In regions controlled by <Faction>Wanderlost Crews</Faction>, the
        landscape is altered and shaped by their distant and hazy memories
        of life in earthen cities, and the sorrows of knowing they can 
        never return. These areas — known collectively as the 
        Sorrowshaped Echoplex — are almost, but not quite, memories of
        home.
      </p>
      <p>
        The structures resemble malls, offices, shopping districts, and other such
        human structures; but the features are often distorted. Shadows
        that stretch from some unseen light source, inconsistent doorways,
        hallways that stretch a bit too far or too short, and nonsensical
        architecture are all common features of the Echoplex.
      </p>
      <p>
        For members of the Wanderlost Crews, these locations are comforting
        - empowering even! For the rest, they serve as uneasy living, giving
        rise to a sense of dread and confusion. The incorrectness of the
        locations serves to remind that the Wanderlost Crews really are
        no longer to be considered human, and that they now are an established
        part part of the infernal realms.
      </p>
    </ColumnEntry>
  )
}