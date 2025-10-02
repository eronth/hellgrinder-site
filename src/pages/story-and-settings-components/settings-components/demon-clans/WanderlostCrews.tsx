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
        who have lost their way, unable to return to earth. Though they
        are not demons, they have stooped
        to using sinful magic and playing corrupt politics to survive the
        hellscape and chaos of this realm; making them often as vile and
        dangerous as any other demon clan.
      </p>
      <p>
        Though technically fractured and disorganized, the crews are united by
        their shared goal of a thriving humanity and controlling territory.
        They are not bound by any one leader or ruling body, making them a
        relatively resilient group; not being thrown into disarray by the
        loss of a single key figure. However, this also means that they are
        more prone to infighting and betrayal, as each clan vies for power
        and resources.
      </p>
      <p>
        In order to grasp the horrific powers, the members of the crews
        must engage in the darkest feast, consuming the flesh and blood of
        others. The act gives them great power, but drives them further into
        madness and demanity.
      </p>
    </DemonClanComponent>
  );
}
