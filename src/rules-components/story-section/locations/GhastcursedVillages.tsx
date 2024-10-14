import ColumnEntry from "../../../common-design/ColumnEntry";
import { HeaderSizeType } from "../../../ts-types/types";

type Props = {
  hx: HeaderSizeType;
};
export default function GhastcursedVillages ({ hx }: Props) {
  return (
    <ColumnEntry title={{ hx: hx, text: "Ghastcursed Villages" }}>
      <p>When a village, town, or city fades into obscurity, all but forgotten by the mortal people, where does it go? The Ghastcursed Villages — which, despite the name, can be as vast and sprawling as cities — are the haunting remains of ghost towns of the mortal realms. These rustic, dilapidated settlements bear an uncanny resemblance to human towns, though almost all modern technology has been replaced by ancient, eerie renditions. The creatures of the Umbral Nexus take up residence in these villages, undisturbed by the town’s ever-present hunger to drain the life force of any who dare to linger too long.</p>
    </ColumnEntry>
  )
}
