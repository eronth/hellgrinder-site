import PerkComponent from "./perks/PerkComponent.tsx";
import Perks from "../../../data/equipment/perks.tsx";
import Tools from "../../../utils/tools.tsx";
import Hx from "../../../components/common/generic/Hx/Hx";

export default function PerksListDisplayComponent() {
  const outerHx = 3;
  const innerHx = 4;

  const sortedPerks = Tools.sortPerks(Perks);

  return (<>
    <div>
      <Hx hx={outerHx}>Perks</Hx>
      <p>You can use Perk Points to gain Perks of your choice. Perks will give you minor benefits to help round out your character.</p>
    </div>

    <div>
      <Hx hx={innerHx}>Perk Options</Hx>
      <div className='fluid-readable-columns'>
        {sortedPerks.map((p, i) => <PerkComponent key={`perk-${i}`} perk={p} />)}
      </div>
    </div>
  </>);
}