import Kit from "./kits/Kit";
import CombatKits from "../../../data/equipment/combat-kits";
import SupportKits from "../../../data/equipment/support-kits";
import Hx from "../../../components/common/generic/Hx/Hx";


export default function KitsListDisplayComponent() {
  const innerHx = 3;
  return (<>
    <Hx hx={innerHx}>Tactical Kit</Hx>
    <p>
      Your tactical kit choices determine the starting skills and
      equipment your character has. To start, choose one Combat Kit and one Support Kit for your character to use.
    </p>

    <Hx hx={innerHx}>Combat Kits</Hx>
    <div className='col-handler'>
      {Object.entries(CombatKits).map(([kitName, kit]) => {
        if (kitName === 'relicworker') { return null; }
        return <Kit key={kitName} kit={kit} />
      })}
    </div>
    <Kit kit={CombatKits.relicworker} needsCols />

    <hr />

    <Hx hx={innerHx}>Support Kits</Hx>
    <div className='col-handler'>
      {Object.entries(SupportKits).map(([kitName, kit]) => {
        if (kitName === 'trapper') { return null; }
        return <Kit key={kitName} kit={kit} />
      })}
    </div>
    <Kit kit={SupportKits.trapper} needsCols />
  </>);
}