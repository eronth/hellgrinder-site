import DamageType from "../../../../components/keywords/DamageType/DamageType";
import Hx from "../../../../components/common/generic/Hx/Hx";
import InjuryTable from "./InjuryTable/InjuryTable";

export default function Damage() {
  const innerHx = 4;

  return (<>
    <Hx hx='3'>Damage</Hx>

    <div className='fluid-readable-columns'>
      <Hx hx={innerHx}>Taking Damage</Hx>
      <p>
        Whenever you take damage, you reduce your current health by that much. In some cases, armor might reduce the damage
        you take by a given value. Damage reduced this way can never be reduced below 0.
      </p>

      <Hx hx={innerHx}>Damage Types</Hx>
      <p>
        There are several damage types in the world of Hellgrinder. Many clans of demons are attuned to one type or another,
        typically imbuing their attacks with that type and granting them resistance against it.
      </p>
      <div>The standard damage types are as follows:</div>
      <ol className="roman" start={0}>
        <li><DamageType type="Metal" /></li>
        <li><DamageType type="Infernal" /></li>
        <li><DamageType type="Abyssal" /></li>
        <li><DamageType type="Verdant" /></li>
        <li><DamageType type="Chthonic" /></li>
        <li><DamageType type="Nethercurrent" /></li>
        <li><DamageType type="Voidyr" /></li>
      </ol>
      
      <Hx hx={innerHx}>Weakness, Resistance, and Absorbance</Hx>
      <p>
        Many creatures have Weakness, Resistance, or Absorbance to damage types, and some Kits, Perks, or other gear
        might grant player characters these effects as well. These effects change how much damage you take from attack,
        and are often shorthanded.
      </p>
      <p>
        Weakness {"<type>"} X
        <br />
        <span className={'reminder-text'}>Shorthand — “Weak {"<type>"} X”</span>
        <br/>
        Increase damage taken of the listed type by X.
      </p>
      <p>
        Resistance {"<type>"} X
        <br/>
        <span className={'reminder-text'}>Shorthand — “Resist {"<type>"} X”</span>
        <br/>
        Reduce damage taken of the listed type by X.
      </p>
      <p>
        Absorbance {"<type>"} X
        <br />
        <span className={'reminder-text'}>Shorthand — “Absorb {"<type>"} X”</span>
        <br />
        Reduce damage taken from the listed type by X and gain
        health equal to the damage reduced.
      </p>

      <Hx hx={innerHx}>Injuries</Hx>
      <p>
        If your health reaches 0, you take an Injury. Roll 1d6 and add
        any relevant Brutality modifier (such as from a creature's Brutality level)
        to the result. Determine your Injury from the table below.
      </p>
      <p>
        Then, restore your health back to max. Immediately apply half
        of the excess damage (rounded)
        down to yourself. If this would reduce your health to 0 or
        lower, repeat the process.
        You then take half damage, applied after modifiers, (minimum 1) 
        until the start of your next turn.
      </p>
      <p>
        Each time you take an Injury, take an injury of a type you do not have, 
        starting with a Light Injury.
        If you would take an Injury but already have one of each type, you instead die.
      </p>
      <ul>
        <li><b>Light Injury</b>: Gain -1 to all rolls or -2 to all rolls of a specific category. Light injuries can be recovered in downtime.</li>
        <li><b>Serious Injury</b>: Gain -2 to all rolls, or major penalties to specific skills/rolls/mobility. More difficult to recover, though can be reduced to a light injury of the same roll result.</li>
        <li><b>Critical Injury</b>: Almost impossible to recover without lucky rolls or the intervention of Heroic Medals. Maybe an extremely small chance to get a second serious injury instead of dying.</li>
      </ul>

      <Hx>Permanent Injuries</Hx>
      <p>
        In rare cases, you may pick up a Permanent Injury. When you do, you will roll either a Light or Serious injury
        (as instructed by the effect that gave you the Permanent Injury). This injury is permanent and cannot be recovered
        by normal means, but it also does not count against your Light or Serious Injury count.
      </p>

      <Hx hx={innerHx}>Squad and Reinforcements</Hx>
      <p>
        Your group is a squad of roughly 15 soldiers — 15 reserve and as many active soldiers as there are 
        players — each with their own roles in the fight through Hell. The players will play just a handful 
        of these soldiers on any Operation.
        If the entire squad is ever depleted, that squad completely fails their mission.
        It is up to the GM what happens when a mission is failed — if another squad can try
        to swoop in later to clean up the mess or if the mission is abandoned.
      </p>
      <p>
        Whenever a player character falls in combat, the team
        is reinforced by a squadmate who is then generated and
        played by the player whose character died.
        It is generally assumed a squadmate will figure out
        some way to group up with the players' characters, no
        matter how unlikely that would seem in the moment.
      </p>
      <p>
        The reinforcing player roll a Reinforcement Delay Roll by rolling 1d6 divided by 2 rounded down
        (this is notably different rounding for those of you familiar with d3).
        The result indicates the number of rounds the reinforcement
        spends getting to the squad (0 being immediately at the start of their next turn). Players can
        spend Heroic Medals to reinforce immediately, ignoring the result of the result of the
        Reinforcement Delay Roll.
      </p>
      <p>
        Players can reinforce from the squad outside of combat for
        free, and can spend Heroic Medals to reinforce mid-combat as needed.
      </p>
      <Hx>Rout</Hx>
      <p>
        If a character dies with no reinforcements available, the squad
        fails. Their morale breakes, and they flee into the depths of hell –
        result (&lt; wtf is the word I want here?) unknown. A new squad will
        need to be sent in to complete the mission, or the mission will be
        completely abandoned by high command.
      </p>

      <Hx hx={innerHx}>Gaining Squad Members</Hx>
      <p>
        At the GM's purview, there can be more members added to
        squads. In the chaotic
        combat zone of hell, these new members can be anything:
        rescued survivors from a
        previous attack; the remaining members of another battered
        squad; new recruits sent
        to the frontlines; etc. With things as uncoordinated as
        they are, it is likely that
        most existing squads contain none of their original
        members. It matters not, so long 
        as the squad continues to fight.
      </p>
      
    </div>

    {/* Table Showing injuries */}
    <div>
      <h4>Table of Injuries</h4>
      <InjuryTable />
    </div>
  </>);
}