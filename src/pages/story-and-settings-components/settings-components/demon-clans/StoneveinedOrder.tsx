import RuleKeyword from "../../../../common-design/RuleKeyword";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function StoneveinedOrder ({ hx }: Props) {
  const buttonText = {
    offer: 'Sing the Chorus',
    renounce: 'Silence the Echoes'
  };
  return (
    <DemonClanComponent title="Stoneveined Choir" hx={hx} buttonText={buttonText}>
      <p>
        The Stoneveined Choir are enigmatic chthonic-aligned beings,
        hewn from the very bedrock of Hell itself. Their forms are
        fused with ancient stone, veins of glowing mineral
        pulsing with a faint, unnatural light.
        Some bear embedded <RuleKeyword keyword="Safelight Shards" />,
        crystalline growths that grant them strange resilience.
        Those infused with Safelight seem calmer, their movements
        slower and less hostile—yet even in docility, they are
        never truly benign.
      </p>
      <p>
        They move with ponderous inevitability, as though in rhythm with the
        tectonic pulse of Hell. Wherever they pass, the scraping and grinding
        of stone fills the caverns, forming a dissonant harmony—an alien hymn
        that unsettles the marrow of all who hear it. Their intentions remain
        obscure, even to other infernal factions, but their presence bends the
        world itself: walls shift, passages collapse, and landscapes twist as
        though compelled to resonate with their endless song.
      </p>
      <p>
        When the Lords of the Choir stir, their vast bodies shudder like
        mountains breaking free of the earth. Each footfall shakes the cavern
        and sends echoes crashing like an organ’s roar. Though not innately
        wrathful, any who assail them find the stone itself rising in
        retaliation: shards, hounds, and serpents of living rock birthed from
        the Lord’s own form. It is less a counterattack than a natural
        reflex—a defense of both body and realm.
      </p>
      <p>
        Whispers claim the Stoneveined Choir have endured since the creation
        of Hell, perhaps as its wardens, perhaps as something far darker. Some
        say their hymn is not mere resonance but a liturgy, a song of shaping
        that slowly remakes Hell itself in ways no mortal ear can comprehend.
      </p>
    </DemonClanComponent>
  )
}
