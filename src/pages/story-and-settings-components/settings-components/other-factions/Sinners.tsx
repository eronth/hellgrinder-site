import Hx from "../../../../common-design/Hx/Hx";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function Sinners({ hx }: Props) {

  return (<>
    <Hx hx={hx}>Sinners</Hx>
    <p>
      Deep in the netherworld there are malformed, ashen-grey-skinned, humanoid creatures who call themselves "Sinners".
      Each sinner takes on a torturous and seemingly endless task, with little apparent purpose. The task is hypothesized
      by some to be a punishment for a prior unknown crime.
    </p>
    <p>
      Sinners will do anything in their power to continue their task, citing the phrase "The task must be worked" when
      pressed for a reason, noting that they have always worked the task. It is unclear what the tasks actually accomplish,
      and sinners do not seem to remember a time before their task.
    </p>
    <p>
      If efforts are taken to interrupt the task, sinners will become irritated or even violent if
      significantly hindered. A violent sinner is a dangerous foe, as they are incredibly strong and have no regard for
      their own safety (likely due to their seemingly enhanced durability).
    </p>
    <p>
      Sinners will, however, attempt to help human travellers as best they can (noting an unseen bond) so long as it doesn't
      interrupt the task they are working on. They can offer verbal guidance, or occasionally actual physical assistance
      if it can be done quickly. Generally, they will drag whatever is necessary for the task.
    </p>
    <p>
      It is unclear if the human prophets of the past foresaw the sinners and mistook them as being punished for their
      crimes against gods, or if the sinners truly were once human, and have completely lost any sense of their former selves.
    </p>
  </>);
}
