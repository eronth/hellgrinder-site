import Hx from "../../common-design/Hx/Hx";
import CharacterStartingStatsTable from "./CharacterGenerator/CharacterStartingStatsTable";

export default function CreationCoreRules() {
  const innerHeaders = 'h3';
  return (<>
    <Hx hx='h2'>Create a Character</Hx>

    <div className='lore-columns'>

      <Hx hx={innerHeaders}>Steps</Hx>
      <p>When you create a character, you start with the following stat values. Kit and Perk choices can modify these. Unlike many other similar games, you won’t need to choose to put “points” into some array of starting stats. </p>
      <p>The next options require some selection, but can be done via random selection as well. If it’s your first time playing Hellgrinder and creating a character, I advise randomly selecting every option. No need to pour over everything to craft a perfect soldier just to die to the first squad of infernals to assault the squad.</p>
      <p>Next, you will select one Combat Kit and one Support Kit. Your Combat Kit will have a major influence on how you engage foes in combat, while your Support Kit will have a more general role to help round out your character as you see fit.</p>
      <p>Once your kits are chosen, you will spend up to 2 Perk Points to select perks. Unused Perk Points can be saved after character creation, but I recommend just spending them.</p>


      <Hx hx={innerHeaders}>Starting Stats</Hx>
      <p>
        Characters in Hellgrinder have little choice when it
        comes to starting stats. Most of the customization comes
        from Kit and Perk choices, instead. Therefore, starting stats
        for all characters shown on the table below.
      </p>
      <p>
        When choosing your Custom Skill, select any Skill that's NOT provided in the rules. Players are encouraged to
        be creative here, and GMs should work with players to ensure the chosen skill makes sense. The chosen
        skill should be something that can be reasonably expected to come up in play, but not something universally applicable.
        It especially should be something that rarely, if ever, affects attack rolls.
      </p>

      <Hx hx={innerHeaders}>Optional: Specializations</Hx>
      <p>Your GM may choose to play with the specialization rules. If so, choose two of the following tags. Your character will get +3 to [Checks] involving the first chosen tag, and -5 to all [Checks] involving the second chosen tag.</p>
      <p>The options: Stealth, Observation, .....</p>


      <Hx hx={innerHeaders}>Progression</Hx>
      <p>
        Character progression is handled as a group. As a squad delves
        deeper into the pits of the Underworld, everyone is getting stronger
        and obtaining better equipment. To explain the extra gear, equipment
        can be found, delivered by High Command, crafted, or anything else you
        think of.
      </p>
      <p>
        <b>Since progression is squad based, new characters that get generated
        to replace old ones should have access to the advancement options as well.</b>
      </p>
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
    </div>
    <CharacterStartingStatsTable />
  </>);
}