import ColumnEntry from "../../common-design/ColumnEntry";
import Kit from "./kits/Kit";
import CombatKits from "../../common-design/equipment/combat-kits";
import SupportKits from "../../common-design/equipment/support-kits";


export default function KitsListDisplayComponent() {
  return (<><ColumnEntry title={{ hx: 'h3', text: 'Tactical Kit' }}>
    <p>Your tactical kit choices determine the starting skills and equipment your character has. To start, choose one Combat Kit and one Support Kit for your character to use.</p>
  </ColumnEntry>

  <ColumnEntry title={{ hx: 'h4', text: 'Combat Kits' }}>
    <div className='col-handler'>
      <Kit kit={CombatKits.breachAndClear}></Kit>
      <Kit kit={CombatKits.demonHunter}></Kit>
      <Kit kit={CombatKits.flamethrower}></Kit>
      <Kit kit={CombatKits.grenadier}></Kit>
      <Kit kit={CombatKits.helltouched}></Kit>
      <Kit kit={CombatKits.perky}></Kit>
      <Kit kit={CombatKits.prototype}></Kit>
      <Kit kit={CombatKits.riot}></Kit>
      <Kit kit={CombatKits.sniper}></Kit>
      <Kit kit={CombatKits.soldier}></Kit>
      <Kit kit={CombatKits.warrior}></Kit>
    </div>
    <Kit needsCols={true} kit={CombatKits.relicworker}></Kit>
  </ColumnEntry>
  <hr />
  <ColumnEntry title={{ hx: 'h4', text: 'Support Kits' }}>
    <div className='col-handler'>
      <Kit kit={SupportKits.cardMystic}></Kit>
      <Kit kit={SupportKits.grenadeStash}></Kit>
      <Kit kit={SupportKits.medic}></Kit>
      <Kit kit={SupportKits.recon}></Kit>
      <Kit kit={SupportKits.shadowOp}></Kit>
      <Kit kit={SupportKits.sigilBearer}></Kit>
    </div>
  </ColumnEntry></>);
}