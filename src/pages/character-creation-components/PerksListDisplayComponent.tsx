import ColumnEntry from "../../common-design/ColumnEntry.tsx";
import PerkComponent from "./perks/PerkComponent.tsx";
import Perks from "../../common-design/equipment/perks.tsx";
import Tools from "../../common-design/Tools.tsx";

export default function PerksListDisplayComponent() {
  

  const sortedPerks = Tools.sortPerks(Perks);

  return (<>
    <ColumnEntry title={{ hx: 'h3', text: 'Perks' }}>
      <p>You can use Perk Points to gain Perks of your choice. Perks will give you minor benefits to help round out your character.</p>
    </ColumnEntry>

    <ColumnEntry title={{ hx: 'h4', text: 'Perk Options' }}>
      <div className='col-handler'>
        {sortedPerks.map((p, i) => <PerkComponent key={`perk-${i}`} perk={p} />)}
      </div>
    </ColumnEntry>
  </>);
}