import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import Tools from "../common-design/Tools";
import Perks from "../common-design/equipment/perks";
import PerkComponent from "./character-creation-components/perks/PerkComponent";

export default function AdvancedPerksPage() {
  const page: TabType = 'advanced-perks';

  const sortedPerks = Tools.sortPerks(Perks);

  return (<div className={'page ' + page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
    <h2>Perks</h2>
    <p>
      Perks are special abilities that can be used to enhance your character. Some perks are considered starter perks,
      and can be taken during character creation (if you have hte points for them) or during character advancement. Other
      perks are considered advancement perks, and should only be taken during character advancement. Perks can be taken in
      any order, but some perks may have prerequisites that must be met before they can be taken.
    </p>

    <h4>Starter Perks</h4>
    <div className={'col-handler'}>
      {sortedPerks.map((p, i) =>
        p.isAdvancedItem ? null : <PerkComponent key={`starter-perk-${i}`} perk={p} />)
      }
    </div>

    <h4>Advancement Perks</h4>
    <div className={'col-handler'}>
      {sortedPerks.map((p, i) =>
        p.isAdvancedItem ? <PerkComponent key={`basic-perk-${i}`} perk={p} /> : null)
      }
    </div>


  </div>);
}