import { Dice } from "../ts-types/types.tsx";


export default {
  // d2
  /** Average of 1d2 is 1.5 **/
  get1d2: (modifier?: number): Dice => ({ sides: 2, modifier: modifier }),
  /** Average of 2d2 is 3 **/
  get2d2: (modifier?: number): Dice => ({ amount: 2, sides: 2, modifier: modifier }),
  /** Average of 3d2 is 4.5 **/
  get3d2: (modifier?: number): Dice => ({ amount: 3, sides: 2, modifier: modifier }),

  // d4
  /** Average of 1d4 is 2.5 **/
  get1d4: (modifier?: number): Dice => ({ sides: 4, modifier: modifier }),
  /** Average of 2d4 is 5 **/
  get2d4: (modifier?: number): Dice => ({ amount: 2, sides: 4, modifier: modifier }),
  /** Average of 3d4 is 7.5 **/
  get3d4: (modifier?: number): Dice => ({ amount: 3, sides: 4, modifier: modifier }),
  /** Average of 4d4 is 10 **/
  get4d4: (modifier?: number): Dice => ({ amount: 4, sides: 4, modifier: modifier }),

  // d6
  /** Average of 1d6 is 3.5 **/
  get1d6: (modifier?: number): Dice => ({ sides: 6, modifier: modifier }),
  /** Average of 2d6 is 7 **/
  get2d6: (modifier?: number): Dice => ({ amount: 2, sides: 6, modifier: modifier }),
  /** Average of 3d6 is 10.5 **/
  get3d6: (modifier?: number): Dice => ({ amount: 3, sides: 6, modifier: modifier }),
  
  // d8
  /** Average of 1d8 is 4.5 **/
  get1d8: (modifier?: number): Dice => ({ sides: 8, modifier: modifier }),
  /** Average of 2d8 is 9 **/
  get2d8: (modifier?: number): Dice => ({ amount: 2, sides: 8, modifier: modifier }),
  
  // d10
  /** Average of 1d10 is 5.5 **/
  get1d10: (modifier?: number): Dice => ({ sides: 10, modifier: modifier }),
  /** Average of 2d10 is 11 **/
  get2d10: (modifier?: number): Dice => ({ amount: 2, sides: 10, modifier: modifier }),
  
  // d12
  /** Average of 1d12 is 6.5 **/
  get1d12: (modifier?: number): Dice => ({ sides: 12, modifier: modifier }),
  /** Average of 2d12 is 13 **/
  get2d12: (modifier?: number): Dice => ({ amount: 2, sides: 12, modifier: modifier }),
}
