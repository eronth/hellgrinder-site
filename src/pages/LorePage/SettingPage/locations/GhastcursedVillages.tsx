import Hx from "../../../../components/common/generic/Hx/Hx";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function GhastcursedVillages ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Ghastcursed Villages</Hx>
    <p>
      When a village, town, or city fades into obscurity, all
      but forgotten by the mortal people, where does it go? 
      The Ghastcursed Villages — which, despite the name, can be
      as vast and sprawling as cities — are the haunting remains
      of ghost towns and cities of the mortal realms. These typically
      rustic and dilapidated settlements bear an uncanny resemblance
      to human towns, though almost all modern technology has been
      replaced by ancient, unfamiliar, or eerie renditions.
    </p>
    <p>
      The towns are often shrouded in an eerie silence, with an atmosphere
      that feels both ancient and otherworldly. Those who seek respite in 
      such a village will soon find that the town itself
      drains the life-force of any who dare to linger too long.
    </p>
    <p>
      The creatures of the Umbral Nexus take up residence in these
      villages, undisturbed by their town's ever-present hunger.
    </p>
  </>)
}
