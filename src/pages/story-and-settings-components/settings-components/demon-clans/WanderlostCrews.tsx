import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function WanderlostCrews({ hx }: Props) {
  const buttonText = {
    offer: 'Join the Feast',
    renounce: 'Refuse the Chalice'
  };
  return (
    <DemonClanComponent title={"Wanderlost Crews"} hx={hx} buttonText={buttonText}>
      <p>
        The <Faction>Wanderlost Crews</Faction> are scattered clans of humans
        who have lost their way, unable to return to Earth. Though they
        are not demons, they have 
        embraced sinful magics and corrupt politics to survive the hellscape;
        often making them as vile and dangerous as any infernal clan. Their
        humanity remains in form only; in spirit, most are little more than
        predators draped in familiar skin.
      </p>
      <p>
        Fractured and clan-based, the Crews are bound together not by loyalty
        or law, but by a shared hunger for dominion. Each clan fights to carve
        out territory from the demons, playing games of betrayal and uneasy alliance. 
        Without
        a single ruler, they cannot be toppled at once, but their constant
        infighting leaves their ambitions stained in blood. What unity they
        have is born of desperation: the belief that if humanity cannot rule
        Hell, it will be ruled by none.
      </p>
      <p>
        To wield their horrific powers, the Crews perform the darkest rite:
        the feast of bone, flesh, and blood. By consuming others — be it demon or
        human — they draw strength and sorcery into themselves. Yet each bite
        drags them further from humanity, minds twisting toward paranoia and
        madness. In time, the Wanderlost become gaunt, shadow-eyed figures
        who whisper like revenants, half-human and half-monster, but wholly
        enthralled to their hunger.
      </p>
    </DemonClanComponent>
  );
}
