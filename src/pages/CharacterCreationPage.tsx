import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import ColumnEntry from "../common-design/ColumnEntry";
import Kit from "./character-creation-components/kits/Kit";
import Perk from "./character-creation-components/perks/Perk";
import CombatKits from "../common-design/equipment/combat-kits.tsx";
import SupportKits from "../common-design/equipment/support-kits.tsx";
import Perks from "../common-design/equipment/perks.tsx";

export default function CharacterCreationPage() {
  const page: TabType = 'character-creation';

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <h2>Create a Character</h2>

    <div className='col-handler'>

      <ColumnEntry title={{ hx: 'h3', text: 'Steps' }}>
        <p>When you create a character, you start with the following stat values. Kit and Perk choices can modify these. Unlike many other similar games, you won’t need to choose to put “points” into some array of starting stats. </p>
        <p>The next options require some selection, but can be done via random selection as well. If it’s your first time playing Hellgrinder and creating a character, I advise randomly selecting every option. No need to pour over everything to craft a perfect soldier just to die to the first squad of infernals to assault the squad.</p>
        <p>Next, you will select one Combat Kit and one Support Kit. Your Combat Kit will have a major influence on how you engage foes in combat, while your Support Kit will have a more general role to help round out your character as you see fit.</p>
        <p>Once your kits are chosen, you will spend up to 2 Perk Points to select perks. Unused Perk Points can be saved after character creation, but I recommend just spending them.</p>
      </ColumnEntry>

      <ColumnEntry title={{ hx: 'h3', text: 'Starting Stats' }}>
        <p>Characters in Hellgrinder have little choice when it comes to starting stats. Most of the customization comes from Kit and Perk choices, instead. Therefore, starting stats for all characters are as follows:</p>
        <table>
          <tbody>
            <tr>
              <td colSpan={3}>6 Max Health</td>
              <td colSpan={3}>0 Injuries</td>
              <td colSpan={3}>5 Move Speed</td>
            </tr>
            <tr>
              <td colSpan={3}>0 Corruption</td>
              <td colSpan={3}>2 Perk Points</td>
              <td colSpan={3}>2 Safelight Shards</td>
            </tr>
            <tr>
              <td colSpan={9}>
                +1 to your choice of [Short Range], [Medium Range], [Long Range], or Melee attacks (can be chosen at the end of character creation).
              </td>
            </tr>
          </tbody>
        </table>
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

    <hr />
    <ColumnEntry title={{ hx: 'h3', text: 'Tactical Kit' }}>
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
    </ColumnEntry>
  
    <hr />

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
      </div>
    </ColumnEntry>
    <hr />
  </div>);
}