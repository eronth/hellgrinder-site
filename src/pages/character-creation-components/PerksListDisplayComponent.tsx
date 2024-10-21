import ColumnEntry from "../../common-design/ColumnEntry.tsx";
import Perk from "./perks/Perk.tsx";
import Perks from "../../common-design/equipment/perks.tsx";

export default function PerksListDisplayComponent() {
  return (<>
    <ColumnEntry title={{ hx: 'h3', text: 'Perks' }}>
      <p>You can use Perk Points to gain Perks of your choice. Perks will give you minor benefits to help round out your character.</p>
    </ColumnEntry>

    <ColumnEntry title={{ hx: 'h4', text: 'Perk Options' }}>
      <div className='col-handler'>
        <Perk perk={Perks.durable} />
        <Perk perk={Perks.evil} />
        <Perk perk={Perks.hellspawn} />
        <Perk perk={Perks.mindful} />
        <Perk perk={Perks.nimble} />
        <Perk perk={Perks.sinister} />
        <Perk perk={Perks.stoic} />
        <Perk perk={Perks.veteran} />
      </div>
    </ColumnEntry>
  </>);
}