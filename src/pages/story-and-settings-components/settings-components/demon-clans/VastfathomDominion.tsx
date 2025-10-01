import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function VastfathomDominion ({ hx }: Props) {
  const buttonText = {
    offer: 'Whisper the Oath',
    renounce: 'Seal the Forbidden Tome'
  };
  return (
    <DemonClanComponent title={"Vastfathom League"} hx={hx} buttonText={buttonText}>
      <p>
        The <Faction>Vastfathom League</Faction> are
        abyssal-aligned demons that dwell in the deepest
        depths of Hell—crushing oceans of
        nothingness. Their forms are elusive and alien, shifting
        as if seen through dark waters. Some stretch into
        serpent-like silhouettes, translucent skin revealing pulsating veins
        beneath. Others undulate with countless limbs, tentacles stirring like
        deep-sea horrors. Still others are nothing but writhing masses of
        mouths, ceaselessly whispering forbidden hymns that churn the sanity of
        all who hear. All sport dim eyes which pierce through the black, and
        their touch carries the icy chill of the depths.
      </p>
      <p>
        Spawned from the vast unseen trenches in which Hell folds in upon itself,
        they serve the Abyssal Sovereigns—eldritch rulers said to dream beneath
        the cold waters. The League rises at their command, dragging prey into the
        suffocating dark. Each Vastfathom demon seeks knowledge beyond knowledge,
        learning beyond what is meant to be known, twisting and
        warping themselves in pursuit of forbidden truths.
        They clutch abyssal-logged tomes and mind-stained tablets,
        whispering secrets of the deep to those who dare to listen.
      </p>
      <p>
        The League fractures into cults, each devoted to a different
        Sovereign and their interpretation of the abyssal mysteries.
        Members are scholars, mystics, and zealots — eager to drown their
        reason for a glimpse of knowledge beyond comprehension.
        Their High Councilors, the chosen of the Sovereigns, wield
        sorcerous powers vast enough to bend wills with a word,
        rewarding obedience with fragments of power while casting dissenters
        into eternal silence. To follow the League is to trade one’s soul for
        an endless descent into the deep, dark expanse.
      </p>
    </DemonClanComponent>
  )
}
