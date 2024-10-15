import ColumnEntry from "../../common-design/ColumnEntry";
import Kit from "./kits/Kit";
import CombatKitDetails from "../../common-design/equipment/combat-kits.tsx";
import SupportKitDetails from "../../common-design/equipment/support-kits.tsx";

export default function CharacterCreation() {
  


  return (<>
    <h2>Create a Character</h2>

    <div className='col-handler'>

      <ColumnEntry title={{ hx: 'h3', text: 'Steps' }}>
        <p>When you create a character, you start with the following stat values. Kit and Perk choices can modify these. Unlike many other similar games, you won’t need to choose to put “points” into some array of starting stats. </p>
        <p>The next options require some selection, but can be done via random selection as well. If it’s your first time playing Hellgrinder and creating a character, I advise randomly selecting every option. No need to pour over everything to craft a perfect soldier just to die to the first squad of infernals to assault the squad.</p>
        <p>Next, you will select one Combat Kit and one Support Kit. Your Combat Kit will have a major influence on how you engage foes in combat, while your Support Kit will have a more general role to help round out your character as you see fit.</p>
        <p>Once your kits are chosen, you will spend up to 2 Perk Points to select perks. Unused Perk Points can be saved after character creation, but I recommend just spending them.</p>
      </ColumnEntry>

      <ColumnEntry title={{ hx: 'h3', text: 'Starting Stats' }}>
        <p>[INSERT TABLE HERE]</p>
      </ColumnEntry>

      <ColumnEntry title={{ hx: 'h3', text: 'Progression' }}>
        <p>Character progression is handled as a group. As a squad delves deeper into the pits of the Underworld, everyone is getting stronger and obtaining better equipment. To explain the extra gear, equipment can be found, delivered by High Command, crafted, or anything else you think of. Since progression is squad based, new characters that get generated to replace old ones should have access to the advancement options as well.</p>
        <p>Squads should earn progression when they hit adventure milestones, at the GM’s purview. Suggested advancement is as follows:</p>
        <ul>
          <li>+1 Perk Point</li>
          <li>+1 Supply Certification Level</li>
          <li>+1 Support Kit</li>
          <li>+1 Perk Point</li>
          <li>+1 Supply Certification Level</li>
          <li>+1 Combat Kit</li>
          <li>???</li>
        </ul>
      </ColumnEntry>
    </div>

      <ColumnEntry title={{ hx: 'h3', text: 'Tatical Kit' }}>
        <p>Your tactical kit choices determine the starting skills and equipment your character has. To start, choose one Combat Kit and one Support Kit for your character to use.</p>
      </ColumnEntry>

      <ColumnEntry title={{ hx: 'h4', text: 'Combat Kits' }}>
        <div className='col-handler'>
          <Kit kit={CombatKitDetails.breachAndClear}></Kit>
          <Kit kit={CombatKitDetails.demonHunter}></Kit>
          <Kit kit={CombatKitDetails.flamethrower}></Kit>
          <Kit kit={CombatKitDetails.grenadier}></Kit>
          <Kit kit={CombatKitDetails.helltouched}></Kit>
          <Kit kit={CombatKitDetails.perky}></Kit>
          <Kit kit={CombatKitDetails.prototype}></Kit>
          <Kit kit={CombatKitDetails.riot}></Kit>
          <Kit kit={CombatKitDetails.sniper}></Kit>
          <Kit kit={CombatKitDetails.soldier}></Kit>
          <Kit kit={CombatKitDetails.warrior}></Kit>
        </div>
        <Kit needsCols={true} kit={CombatKitDetails.relicworker}></Kit>
      </ColumnEntry>

      <ColumnEntry title={{ hx: 'h4', text: 'Support Kits' }}>
        <div className='col-handler'>
          <Kit kit={SupportKitDetails.cardMystic}></Kit>
          <Kit kit={SupportKitDetails.grenadeStash}></Kit>
          <Kit kit={SupportKitDetails.medic}></Kit>
          <Kit kit={SupportKitDetails.recon}></Kit>
          <Kit kit={SupportKitDetails.shadowOp}></Kit>
          <Kit kit={SupportKitDetails.sigilBearer}></Kit>
        </div>
      </ColumnEntry>
    

  </>);
}
