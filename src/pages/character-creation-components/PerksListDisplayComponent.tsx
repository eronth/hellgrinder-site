import PerkComponent from "./perks/PerkComponent.tsx";
import Perks from "../../common-design/equipment/perks.tsx";
import Tools from "../../common-design/Tools.tsx";

export default function PerksListDisplayComponent() {
  

  const sortedPerks = Tools.sortPerks(Perks);

  return (<>
    <div>
      <h3>Perks</h3>
      <p>You can use Perk Points to gain Perks of your choice. Perks will give you minor benefits to help round out your character.</p>
    </div>

    <div>
      <h4>Perk Options</h4>
      <div className='col-handler'>
        {sortedPerks.map((p, i) => <PerkComponent key={`perk-${i}`} perk={p} />)}
      </div>
    </div>
  </>);
}