import {StatusEffect} from "../../ts-types/types.tsx";

export default function StatusEffectComponent({name, description, x, y}: StatusEffect) {
    const xDisplay = x
      ? `<span class='x-display'>${x}</span>`
      : null;
    const yDisplay = y
      ? `<span class='y-display'>${y}</span>`
      : null;
  
  function formatValue(value: string) {
    if (xDisplay) {
      value = value.replaceAll('[[X]]', xDisplay);
    }
    if (yDisplay) {
      value = value.replaceAll('[[Y]]', yDisplay);
    }
    return value;
  }
  
  return (<>
    <div className={'status-effect'}>
      <div className={'simple-header'} dangerouslySetInnerHTML={{ __html:formatValue(name) }}></div>
      {description.map((desc, index) => {
        return (
          <p key={`status-effect-description-${index}`} dangerouslySetInnerHTML={{ __html:formatValue(desc) }}></p>
        );
      })}
    </div>
  </>);
}