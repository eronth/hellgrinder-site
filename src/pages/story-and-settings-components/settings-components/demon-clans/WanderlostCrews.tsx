import ColumnEntry from "../../../../common-design/ColumnEntry";
import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function WanderlostCrews({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Wanderlost Crews" }}>
      <p>
        The <Faction>Wanderlost Crews</Faction> are scattered clans of humans
        who have lost their way. Though they are not demons, they have stooped
        to using sinful magic and playing corrupt politics to survive the
        hellscape and chaos of this realm; making them as demonically vile
        as any other demon clan.
      </p>
      <p>
        Though technically fractured and disorganized, the crews are united by
        their shared goal of thriving and controlling territory. They are
        not bound by any one leader or or ruling body, making them a
        relatively resilient group; not being thrown into disarray by the
        loss of a single leader. However, this also means that they are
        prone to infighting and betrayal, as each clan vies for power and
        resources.
      </p>
    </ColumnEntry>
  );
}
