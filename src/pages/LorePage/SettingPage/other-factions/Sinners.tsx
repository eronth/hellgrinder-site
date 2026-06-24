import Hx from "../../../../components/common/generic/Hx/Hx";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function Sinners({ hx }: Props) {

  return (<>
    <Hx hx={hx}>Sinners</Hx>
    <p>
      Deep in the netherworld there are malformed, ashen-grey-skinned,
      humanoid creatures who call themselves "Sinners".
      Each sinner takes on a torturous and seemingly endless task
      with little apparent purpose. The task is hypothesized
      by some to be a punishment for some unknown crime.
    </p>
    <p>
      Sinners will do anything in their power to continue their task.
      When pressed for a reason, they often cite the phrase "The task 
      must be worked. The work must be done". Most sinners believe that
      they have always worked their task. It is unclear what, if anything,
      the tasks  actually accomplish, and sinners do not seem to remember
      a time before their task.
    </p>
    <p>
      If efforts are taken to interrupt the task, sinners will become 
      irritated. Pushed further, sinners can become violent if they 
      believe they are being significantly impeded. A violent sinner is a
      dangerous foe, as they are incredibly strong and have no regard for
      their own safety (likely due to their seemingly enhanced durability).
    </p>
    <p>
      Sinners will, however, attempt to help human travellers as best they
      can, noting an unseen bond between them. They are willing to help,
      long as it doesn't interrupt the task they are working on.
      They can offer verbal guidance, or occasionally actual physical
      assistance if it can be done quickly. If so inclined,
      a sinner may try to help in a more significant way, dragging
      with them anything deemed necessary to continue their endless
      task.
    </p>
    <p>
      It is unclear if the human prophets of the past foresaw the
      sinners and mistook them as being punished for their
      crimes against gods, or if the sinners truly were once human
      and have completely lost any sense of their former selves.
    </p>
  </>);
}
