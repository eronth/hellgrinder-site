import React from "react";
import {StatusEffect} from "../../ts-types/types.tsx";
import { formatReactNode, formatTextValue } from "../utils/StatusEffectsUtils.tsx";

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
          <span key={`status-effect-effect-${index}`}> {formatReactNode(effect, { x, y })}</span>
        );
      })}
    </div>
  </>);
}