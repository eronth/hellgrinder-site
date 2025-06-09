import React from "react";
import {StatusEffect} from "../../ts-types/types.tsx";

type Props = StatusEffect;
export default function StatusEffectComponent({
  name,
  description,
  effects,
  x,
  y
}: Props) {

  const xDisplay = `<span class='x-display'>${x}</span>`;
  const yDisplay = `<span class='y-display'>${y}</span>`
  function formatValue(value: string) {
    if (x) { value = value.replaceAll('[[X]]', xDisplay); }
    if (y) { value = value.replaceAll('[[Y]]', yDisplay); }
    return value;
  }
  
  const xNodeDisplay = (key?: string) => {
    return (key
      ? (<span className='x-display' key={key}>{x}</span>)
      : (<span className='x-display'>{x}</span>)
    );
  }
  const yNodeDisplay = (key?: string) => {
    return (key
      ? (<span className='y-display' key={key}>{y}</span>)
      : (<span className='y-display'>{y}</span>)
    );
  }
  const formatReactNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      // Split the string by [[X]] and [[Y]] placeholders and replace with React nodes
      let parts: (string | React.ReactNode)[] = [node];
      
      // Replace [[X]] with xNodeDisplay result
      if (x !== undefined) {
        parts = parts.flatMap((part, i) => {
          if (typeof part === 'string') {
            return part.split('[[X]]').reduce((acc, segment, index) => {
              if (index === 0) return [segment];
              return [...acc, xNodeDisplay('x-part-arr-'+index+'-and-part-'+i), segment];
            }, [] as (string | React.ReactNode)[]);
          }
          return part;
        });
      }
      
      // Replace [[Y]] with yNodeDisplay
      if (y !== undefined) {
        parts = parts.flatMap((part, i) => {
          if (typeof part === 'string') {
            return part.split('[[Y]]').reduce((acc, segment, index) => {
              if (index === 0) return [segment];
              return [...acc, yNodeDisplay('y-part-arr-'+index+'-and-part-'+i), segment];
            }, [] as (string | React.ReactNode)[]);
          }
          return part;
        });
      }

      // Filter out empty strings and return
      const filteredParts = parts.filter(part => part !== '');
      return filteredParts.length === 1 ? filteredParts[0] : <>{filteredParts}</>;
    }
    
    if (React.isValidElement(node)) {
      // Clone the element and recursively format its children
      return React.cloneElement(node, {
        ...node.props,
        children: React.Children.map(node.props.children, child => formatReactNode(child))
      });
    }
    
    // For other types (numbers, arrays, null, undefined, etc.), return as-is
    return node;
  };

  return (<>
    <div className={'status-effect'}>
      <div className={'simple-header'} dangerouslySetInnerHTML={{ __html:formatValue(name) }}></div>
      {/* {description.map((desc, index) => {
        return (
          );
          })} */}
      <span dangerouslySetInnerHTML={{ __html:formatValue(description) }}></span>
      {effects?.map((effect, index) => {
        return (
          <span key={`status-effect-effect-${index}`}>
            {formatReactNode(effect)}
          </span>
        );
      })}
    </div>
  </>);
}