import {AttackMode, Dice} from "../../../../../ts-types/types.tsx";
import ClickableDice from "../../../../../common-design/ClickableDice.tsx";

type Props = {
  attackMode: AttackMode;
}
export default function WeaponDamage({ attackMode }: Props) {
    function makeAttackDamageText(attackMode: AttackMode) {
    const dmg = attackMode.damage;
    const displayDmg = {
      l: damageToDisplayString(dmg.l.value),
      lav: getAverageDisplay(dmg.l.value),
      m: damageToDisplayString(dmg.m.value),
      mav: getAverageDisplay(dmg.m.value),
      h: damageToDisplayString(dmg.h.value),
      hav: getAverageDisplay(dmg.h.value),
    };
    
    if (dmg.l.type === dmg.m.type && dmg.m.type === dmg.h.type) {
      return (<>
        <span className='damage-bloc'>
          {IDontWantToRewriteThis10times({displayDice: displayDmg.l, avgObj: displayDmg.lav, damageValue: dmg.l.value})}
        </span>

        <span className={'damage-separator'}> / </span>

        <span className='damage-bloc'>
          {IDontWantToRewriteThis10times({displayDice: displayDmg.m, avgObj: displayDmg.mav, damageValue: dmg.m.value})}
        </span>

        <span className={'damage-separator'}> / </span>

        <span className='damage-bloc'>
          {IDontWantToRewriteThis10times({displayDice: displayDmg.h, avgObj: displayDmg.hav, damageValue: dmg.h.value})}
        </span>
        <span className={'damage-type'}> {dmg.l.type} Damage</span>
      </>);
    }
    return (<>
      <span className='damage-bloc'>
        {IDontWantToRewriteThis10times({displayDice: displayDmg.l, avgObj: displayDmg.lav, damageValue: dmg.l.value})}
      </span>
      <span className={'damage-type'}> {dmg.l.type} Damage</span>
      
      <span className={'damage-separator'}> / </span>
      
      <span className='damage-bloc'>
        {IDontWantToRewriteThis10times({displayDice: displayDmg.m, avgObj: displayDmg.mav, damageValue: dmg.m.value})}
      </span>
      <span className={'damage-type'}> {dmg.l.type} Damage</span>
      
      <span className={'damage-separator'}> / </span>
      
      <span className='damage-bloc'>
        {IDontWantToRewriteThis10times({displayDice: displayDmg.h, avgObj: displayDmg.hav, damageValue: dmg.h.value})}
      </span>
      <span className={'damage-type'}> {dmg.l.type} Damage</span>
    </>);
  }
  
  function damageToDisplayString(damage: number | Dice | Dice[]) {
    if (typeof damage === 'number') {
      return damage.toString();
    } else if (damage.constructor == Array) {
      const diceArray = damage as Dice[];
      return (diceArray).map(d => diceToDisplayString(d)).join(' + ');
    } else {
      const dice = damage as Dice;
      return diceToDisplayString(dice);
    }
  }
  
  function diceToDisplayString(dice: Dice) {
    const amount = dice.amount ?? 1;
    const modifier = dice?.modifier ?? 0;
    const modifierText =
      modifier > 0
        ? ` + ${modifier}`
        : modifier < 0
          ? ` - ${Math.abs(modifier)}`
          : '';
    
    return `${amount}d${dice.sides}${modifierText}`;
  }
  
  function getAverageDisplay(damage: number | Dice | Dice[]) {
    if (typeof damage === 'number') {
      return {
        average: damage,
        shouldShow: false,
      };
    } else if (damage.constructor == Array) {
      const diceArray = damage as Dice[];
      const average = diceArray.reduce((acc, d) => acc + getDiceAverage(d), 0);
      return {
        average: average,
        shouldShow: true,
      };
    } else {
      const dice = damage as Dice;
      const average = getDiceAverage(dice);
      return {
        average: average,
        shouldShow: true,
      };
    }
  }
  
  function getDiceAverage(dice: Dice) {
    const amount = dice.amount ?? 1;
    const min = 1;
    const max = dice.sides;
    const modifier = dice?.modifier ?? 0;
    
    return (amount * ((min + max) / 2)) + modifier;
  }
  type IDontWantToRewriteThis10timesParams = {
    displayDice: string,
    avgObj: { average: number, shouldShow: boolean },
    damageValue: number | Dice | Dice[]
  }
  function IDontWantToRewriteThis10times({ displayDice, avgObj, damageValue }: IDontWantToRewriteThis10timesParams) {
    return (
      <ClickableDice 
        damage={damageValue}
        displayText={displayDice}
        averageValue={avgObj.average}
        shouldShowAverage={avgObj.shouldShow}
      />
    );
  }
  
  return (<span className={'weapon-damage'}>
    {makeAttackDamageText(attackMode)}
  </span>);
}