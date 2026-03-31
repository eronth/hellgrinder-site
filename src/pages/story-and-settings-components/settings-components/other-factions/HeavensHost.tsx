
import Hx from "../../../../common-design/Hx/Hx";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function HeavensHost ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Heaven's Host</Hx>
    <p>
      Visually, the members of Heaven's Host appear to be what could
      only be described as angels. They trawl hell seeking to smite 
      the evil within — but something seems wrong. These angels
      will strike out at humans, claiming they are corrupt demons.
      They sometimes release demonic creatures, claiming that
      there is still good in the hellion's heart. They lash out
      inconsistently and brutally, seeming to have lost sight of
      their original goals.
    </p>
    <p>
      Humans who encounter Heaven's Host claim they are corrupted by
      hell, and that they should be attacked on sight. Then again,
      that's exactly what Heaven's Host says about us.
    </p>
  </>)
}
