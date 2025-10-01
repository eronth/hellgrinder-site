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
        abyssal-aligned demons that dwell in the darkest
        depths, born from the crushing cold of Hell’s oceans of
        nothingness. Their forms are elusive and alien, shifting
        like the murky water that hides them. Some have elongated,
        serpent-like bodies with translucent skin that reveals a
        network of pulsating veins. Others bear multiple
        limbs that undulate like the tentacles of deep-sea
        horrors. Yet others still are a mass of mouths, whispering
        the forbidden hymns. Their eyes glow dimly, piercing through the
        darkness, while their touch brings the icy chill of the depths.
      </p>
      <p>
        Spawned from the vast, unseen trenches of hell,
        they serve the Abyssal Sovereigns, rising from the
        fathomless deep to drag their prey into the cold abyss. 
        Each Vastfathom demon seeks knowledge beyond knowledge,
        learning beyond what is meant to be known, twisting and
        warping themselves in pursuit of forbidden truths.
        They are often found clutching ancient, abyssal-logged tomes,
        whispering secrets of the deep to those who dare to listen.
      </p>
      <p>
        The League is broken into cult-like groups, each devoted to a different
        Abyssal Sovereign and their own interpretation of the forbidden knowledge.
        Members of the Vastfathom League are often scholars, mystics,
        and seekers of arcane wisdom, willing to risk their sanity
        for a glimpse into the abyssal truths. Each Abyssal High Council Member
        has unlocked vast sorcerous powers, which they use to bend the will of
        those who try to resist them. Those who obey are rewarded with
        powers of their own.
      </p>
    </DemonClanComponent>
  )
}
