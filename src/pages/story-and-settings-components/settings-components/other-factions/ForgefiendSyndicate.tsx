import Hx from "../../../../common-design/Hx/Hx";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function ForgefiendSyndicate ({ hx }: Props) {
  return (<>
    <Hx hx={hx}>Forgefiend Syndicate</Hx>
    <p>
      The Forgefiend Syndicate is anything but fiendish. Instead, they are a faction of tormented survivors who managed
      to escape torture by fleeing into the harshest regions of Hell. Through sheer will and ingenuity, they’ve learned
      to forge brimsteel — Hell’s (previously) unyielding metal — into tools of survival and defense.
    </p>
    <p>
      The Syndicate remains wary of outsiders, but they’ve found themselves forming uneasy alliances with the new human
      visitors, often out of necessity. They offer to forge powerful brimsteel weapons for humanity and grant access to
      rare Netherworld materials. In return, the Syndicate craves blueprints and shipments of human technology, seeing
      it as a means to strengthen their survival in Hell’s unforgiving depths.
    </p>
  </>)
}
