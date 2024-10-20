import { DealWithTheDevilRow } from "../../../ts-types/table-types";
import DevilDealTableRow from "./DevilDealTableRow";

export default function DevilDealTable() {

  const rowData: DealWithTheDevilRow[] = [
    {
      result: 1,
      name: "Demonic Army",
      boon: "The Devil grants you a demonic army of your own - 666 demons to command.",
      cost: "You are unable to gain or lose corruption, as the idea loses all meaning. You never fully connect with the denizens of your demonic army."
    }, {
      result: 2,
      name: "Knowledge of Beyond",
      boon: "Gain +2 to all Skill Checks.",
      cost: "Gain 2 Corruption. Gain -1 to all [Melee] Damage rolls."
    }, {
      result: 3,
      name: "Infernal Insight",
      boon: "Gain the ability to see the weaknesses of enemies you face, granting +3 damage against all foes for the next three encounters.",
      cost: "Gain 5 Corruption."
    }, {
      result: 4,
      name: "Voice of Damnation",
      boon: "You can command the demonic minions of hell. As an action, you can select a demon minion and command them to fight for you.",
      cost: "Gain 2 Corruption. Each minion you command gives you 1 corruption. If you complete a Rest or Recovery with a minion under your command, you gain 2^x corruption, where x is the number of minions you command."
    }, {
      result: 5,
      name: "",
      boon: "",
      cost: ""
    }, {
      result: 6,
      name: "Cult Mask",
      boon: "Choose one demonic faction. You gain +2 to [Communicate] Skill Checks with that faction. Creatures of that faction get -1 to Hit Checks against you.",
      cost: "Madness creeps ever closer. "
    }, {
      result: 7,
      name: "Unholy Lifeforce",
      boon: "Gain any amount of health back, up to your max health. Remove any number of Injuries. You may transfer Injuries removed this way to another creature within [Long Range].",
      cost: "Gain 1 Corruption per health point healed. Gain 5 corruption per Injury removed."
    }, {
      result: 8,
      name: "Unholy Pact",
      boon: "Make a pact with a demon. Choose a damage type, and gain Absorb <type> 2.",
      cost: "You gain Weak 3 of a type of the GM's choice. Gain 1 Corruption."
    }, {
      result: 9,
      name: "",
      boon: "",
      cost: ""
    }, {
      result: 10,
      name: "Cleanse Weakness",
      boon: "Remove any conditions from yourself. Gain a perminant +1 to [Melee] Damage.",
      cost: ""
    }, {
      result: 11,
      name: "Rite of the Phoenix Warped",
      boon: "The next time you are incapacitated, you are prevented from dying. On your next turn, you erupt in a fiery explosion dealing 4 Infernal damage to all around you. You then resurrect, healing to max health and removing all Injuries from yourself.",
      cost: "When you resurrect, gain 7 corruption."
    }, {
      result: 12,
      name: "Hellfire's Wrath",
      boon: "",
      cost: ""
    }
  ];

  return (
    <table className="devil-deal-table">
      <thead>
        <tr>
          <th>Roll Result</th>
          <th colSpan={3}>Name</th>
          <th colSpan={3}>Boon</th>
          <th colSpan={3}>Cost</th>
        </tr>
      </thead>
      <tbody>
        {
          rowData.map((row, i) => 
            <DevilDealTableRow key={`injury-table-row-${i}`} data={row} />)
        }
      </tbody>
    </table>);
  }