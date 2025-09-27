import InjuryTableRow from "./InjuryTableRow";
import { InjuryRow } from "../../../ts-types/table-types";
import StatusKeyword from "../../../common-design/StatusKeyword";
import { movementIcon } from "../../../common-design/CommonIcons";
import SkillCheck from "../../../common-design/SkillCheck/SkillCheck";

export default function InjuryTable() {
  const rowData: InjuryRow[] = [
    {
      result: { min: 1, max: 2 },
      injury: {
        light: { name: 'Broken Foot', description: <>-2 to <SkillCheck tags={["Agility"]} plural /></> },
        serious: { name: 'Shattered Leg', description: <>You have -2{movementIcon}.</> },
        critical: { name: 'Legless', description: <>
          You gain the penalties for Broken Foot and Shattered Leg. 
          Additionally, you are always prone. Each hex you move causes you to tak 1 damage. Allies can
          carry you to prevent this damage.
        </> }
      }
    }, {
      result: { min: 3, max: 4 },
      injury: {
        light: { name: 'Concussion', description: <>
          -2 to <SkillCheck tags={["Observation"]} plural /> and <SkillCheck tags={["Communication"]} plural />.
        </> },
        serious: { name: 'Cracked Skull', description: <>
          -3 to <SkillCheck tags={["Recovery"]} plural />.
        </> },
        critical: { name: 'Crushed Skull', description: <>
          Attempt a <SkillCheck tags={["Endurance", "Stoic", "Recovery"]} />.
          <br />On a Rank 3 Success you survive with -3 to all Skill Checks.
          <br />On a Rank 2 Success you survive severe bleeding, taking 2 damage at the end of each of your turns.
          <br />On a Rank 1 Success or Failure, you die.
        </> }
      }
    }, {
      result: { min: 5, max: 6 },
      injury: {
        light: { name: 'Deep Cut', description: <>
          Take 3 damage. Your max health is reduced by 1.
        </> },
        serious: { name: 'Severe Gash', description: <>
          When you take damage from Push It, you take double instead.
        </> },
        critical: { name: 'Internal Bleeding', description: <>
          At the start and end of your turn, take 1 damage.
        </> }
      }
    }, {
      result: { min: 7, max: 8 },
      injury: {
        light: { name: 'Rattled', description: <>-2 to <SkillCheck tags={["Stealth"]} plural /> and <SkillCheck tags={["Observation"]} plural />.</> },
        serious: { name: 'Shattered Confidence', description: <>
          -2 to <SkillCheck tags={["Thrown"]} plural /> and
          -2 to all damage dealt with attacks (minimum 1).
        </> },
        critical: { name: 'Soul Rend', description: <>
          Every time you take damage, you gain a random status effect chosen by the GM.
        </> }
      }
    }, {
      result: { min: 9, max: 10 },
      injury: {
        light: { name: 'Tainted', description: <>
          Gain 2 Corruption and -2 to <SkillCheck tags={["Corruption"]} plural />.
        </> },
        serious: { name: 'Creeping Corruption', description: <>
          Gain 2 Corruption and make a Corruption Test. Every time you would make
          a Corruption Test, you make two tests instead.
        </> },
        critical: { name: 'Lingering Curse', description: <>
          You are <StatusKeyword effect="cursed" />. You cannot remove this status while this injury remains.
        </> }
      }
    }, {
      result: { min: 11, max: 12 },
      injury: {
        light: { name: 'Heavy Bruising', description: <>-2 to <SkillCheck tags={["Might"]} plural /> and <SkillCheck tags={["Agility"]} plural />.</> },
        serious: { name: 'Bruised Organs', description: <>-2 to all Skill Checks.</> },
        critical: { name: 'Mangled', description: <>You are now <StatusKeyword effect="insideOut" />.</> }
      }
    }, {
      result: { min: 13, max: 14 },
      injury: {
        light: { name: 'Shaken', description: <>-2 to <SkillCheck tags={["Stoic"]} plural />.</> },
        serious: { name: 'Indifferent', description: <>
          Gain Indifference.
        </> },
        critical: { name: 'Dreadful Existence',
          description: <>You have one stack of <StatusKeyword effect="dread" />. You can never reduce your Dread below 1.</> }
      }
    }, {
      result: { min: 15, max: 16 },
      injury: {
        light: { name: 'Broken Jaw', description: <>You are <StatusKeyword effect="silenced" x={1} />.</> },
        serious: { name: 'Shattered Teeth', description: <>
          You are <StatusKeyword effect="silenced" x={3} />.
          You have -4 to <SkillCheck tags={["Communication"]} plural />.
        </> },
        critical: { name: 'Throat Rupture', description: <>
          You are <StatusKeyword effect="silenced" x={5} />. At the start of each of your turns,
          make a <SkillCheck tags={["Endurance", "Recovery"]} />. Take 5 - (Success Rank) damage.
        </> }
      }
    }, {
      result: { min: 17, max: 18 },
      injury: {
        light: { name: 'Broken Ribs', description: <>You have -2 to all Skill Checks</> },
        serious: { name: 'Punctured Lung', description: <>You can not use an Action and Maneuvers in the same turn.</> },
        critical: { name: 'Final Breath', description: <>
          This is it, you're at the end. At the start of your next turn, take your Final Breath.
          During your turn, ignore all injuries and act as normal. At the end of your turn,
          exhale. As you exhale,
          your soul departs your body and you die.
          </>
        }
      }
    }
  ];

  return (
  <table className="injuries-table">
    <thead>
      <tr>
        <th className="roll-column">Roll</th>
        <th colSpan={3}>Light Injury</th>
        <th colSpan={3}>Serious Injury</th>
        <th colSpan={3}>Critical Injury</th>
      </tr>
    </thead>
    <tbody>
      {
        rowData.map((row, i) => 
          <InjuryTableRow key={`injury-table-row-${i}`} data={row} />)
      }
    </tbody>
  </table>);
}