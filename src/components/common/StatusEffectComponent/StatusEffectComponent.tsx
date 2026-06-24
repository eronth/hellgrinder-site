import {StatusEffect} from "../../../ts-types/types.tsx";
import { formatReactNode } from "../../../utils/statusEffectUtils.tsx";

type Props = StatusEffect;
export default function StatusEffectComponent({
  name,
  description,
  effects,
  x,
  y
}: Props) {

  return (<>
    <div className={'status-effect'}>
      <div className={'simple-header'}>
        {formatReactNode(name, { x, y })}
      </div>
      {/* {description.map((desc, index) => {
        return (
          );
          })} */}
      <span>{formatReactNode(description, { x, y })}</span>
      {effects?.map((effect, index) => {
        return (
          <span key={`status-effect-text-${index}`}> {formatReactNode(effect, { x, y })}</span>
        );
      })}
    </div>
  </>);
}
