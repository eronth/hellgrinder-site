import { Dice } from "../ts-types/types.tsx";

export type DiceRollResult = {
  total: number;
  rolls: number[];
  modifier: number;
};

export class DiceRoller {
  /**
   * Roll a single die with the specified number of sides
   */
  static rollDie(sides: number): number {
    return Math.floor(Math.random() * sides) + 1;
  }

  /**
   * Roll dice based on a Dice object
   */
  static rollDice(dice: Dice): DiceRollResult {
    const amount = dice.amount ?? 1;
    const sides = dice.sides;
    const modifier = dice.modifier ?? 0;

    const rolls: number[] = [];
    for (let i = 0; i < amount; i++) {
      rolls.push(this.rollDie(sides));
    }

    const rollTotal = rolls.reduce((sum, roll) => sum + roll, 0);
    const total = rollTotal + modifier;

    return {
      total,
      rolls,
      modifier
    };
  }

  /**
   * Roll complex damage (can be number, single dice, or array of dice)
   */
  static rollDamage(damage: number | Dice | Dice[]): number {
    if (typeof damage === 'number') {
      return damage;
    } else if (Array.isArray(damage)) {
      return damage.reduce((total, dice) => total + this.rollDice(dice).total, 0);
    } else {
      return this.rollDice(damage).total;
    }
  }

  /**
   * Format a dice roll result for display
   */
  static formatRollResult(result: DiceRollResult): string {
    if (result.rolls.length === 1 && result.modifier === 0) {
      return `${result.total}`;
    }
    
    const rollsDisplay = result.rolls.join(', ');
    const modifierDisplay = result.modifier !== 0 
      ? (result.modifier > 0 ? ` + ${result.modifier}` : ` - ${Math.abs(result.modifier)}`)
      : '';
    
    return `${result.total} [${rollsDisplay}${modifierDisplay}]`;
  }
}
