// Design components
import Page from "../common-design/Page";
import Hx from "../common-design/Hx/Hx";
// Section Components
import BasicRules from "./how-to-play-components/BasicRules";
import Combat from "./how-to-play-components/Combat";
import RestAndRecover from "./how-to-play-components/RestAndRecover";
import DevilDealTable from "./how-to-play-components/deal-with-the-devil/DevilDealTable";
// Types
import { TabType } from "../ts-types/types";

export default function HowToPlayPage() {
  const page: TabType = 'how-to-play';

  return (<Page pageType={page}>
    <BasicRules />
    <hr />
    <RestAndRecover />
    <hr />
    <Combat />

    <hr />

    <Hx hx={2}>A Deal with the&nbsp;Devil</Hx>
    <p>
      Occasionally, you are presented with a moment where you can make a
      deal (or deals) with the Devil. A powerful entity, one which does
      not seem to fully align with the demonic forces, can grant you a
      powerful boon, but it comes with a cost.
    </p>
    <div><DevilDealTable /></div>
  </Page>);
}
