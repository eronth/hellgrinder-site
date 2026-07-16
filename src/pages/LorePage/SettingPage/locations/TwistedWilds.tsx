import Hx from "../../../../components/common/generic/Hx/Hx";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function TwistedWilds ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Twisted Wilds</Hx>
    <p>
      The Twisted Wilds home to, or perhapse simply an extension of,
      the Thornwraith Bloom. Various gnarled, thorny, toxic,
      abrasive, vined, and sporous plant-like forms make up the ground,
      canopy, and walls of this hellish wilderness. 
    </p>
    <p>
      The various plants and creatures of the Twisted Wilds seem
      to exist purely to serve the Thornwraith Bloom, trying to bring
      any who enter the realm into their fold. Those who dive into the
      Wilds must tread carefully and come prepared, or they'll soon find
      themselves sympathetic to the Thornwraith's desire to grow.
    </p>
    <p>
      Rumor whispers of the a powerful seed at the heart of the
      Twisted Wilds. The Thronwraith Seed. The Tanglenot Core.
      The Twisted Heart. The source of all of the Thornwraith Bloom.
      Those who dive deep in search of it tend not to return.
    </p>
  </>);
}
