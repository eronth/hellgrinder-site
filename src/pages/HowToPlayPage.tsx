import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import ColumnEntry from "../common-design/ColumnEntry";
import BasicRules from "./how-to-play-components/BasicRules";
import Combat from "./how-to-play-components/Combat";
import RestAndRecover from "./how-to-play-components/RestAndRecover";
import DevilDealTable from "./how-to-play-components/deal-with-the-devil/DevilDealTable";

export default function HowToPlayPage() {
  const page: TabType = 'how-to-play';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
    <BasicRules />
    <hr />
    <RestAndRecover />
    <hr />
    <Combat />

    <hr />
    <ColumnEntry title={{ hx: 'h2', text: 'A Deal with the Devil' }}>
      <p>Occasionally, you are presented with a moment where you can make a deal (or deals) with the Devil. A powerful entity, one which does not seem to fully align with the demonic forces, can grant you a powerful boon, but it comes with a cost.</p>
      <DevilDealTable />
    </ColumnEntry>
    <hr />
  </div>);
}