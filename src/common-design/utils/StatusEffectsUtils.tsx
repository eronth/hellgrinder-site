import React from "react";

type Replacers = {
  x?: number | 'X';
  y?: number | 'Y';
};

const xDisplayText =
  (x: number | 'X') =>`<span class='x-display'>${x}</span>`;
const yDisplayText =
  (y: number | 'Y') =>`<span class='y-display'>${y}</span>`;

function formatTextValue(
  value: string, 
  { x, y }: Replacers): string 
{
  if (x) { value = value.replaceAll('[[X]]', xDisplayText(x)); }
  if (y) { value = value.replaceAll('[[Y]]', yDisplayText(y)); }
  return value;
}

const xNodeDisplay = (x: number | 'X', key?: string) => {
  return (key
    ? (<span className='x-display' key={key}>{x}</span>)
    : (<span className='x-display'>{x}</span>)
  );
}
const yNodeDisplay = (y: number | 'Y', key?: string) => {
  return (key
    ? (<span className='y-display' key={key}>{y}</span>)
    : (<span className='y-display'>{y}</span>)
  );
}
const formatReactNode = (node: React.ReactNode, replacers: Replacers): React.ReactNode => {
  if (typeof node === 'string') {
    // Split the string by [[X]] and [[Y]] placeholders and replace with React nodes
    let parts: (string | React.ReactNode)[] = [node];
    
    // Replace [[X]] with xNodeDisplay result
    if (replacers?.x !== undefined) {
      parts = parts.flatMap((part, i) => {
        if (typeof part === 'string') {
          return part.split('[[X]]').reduce((acc, segment, index) => {
            if (index === 0) return [segment];
            return [...acc, xNodeDisplay(replacers.x!, 'x-part-arr-'+index+'-and-part-'+i), segment];
          }, [] as (string | React.ReactNode)[]);
        }
        return part;
      });
    }
    
    // Replace [[Y]] with yNodeDisplay
    if (replacers?.y !== undefined) {
      parts = parts.flatMap((part, i) => {
        if (typeof part === 'string') {
          return part.split('[[Y]]').reduce((acc, segment, index) => {
            if (index === 0) return [segment];
            return [...acc, yNodeDisplay(replacers.y!, 'y-part-arr-'+index+'-and-part-'+i), segment];
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
      children: React.Children.map(node.props.children, child => formatReactNode(child, replacers))
    });
  }
  
  // For other types (numbers, arrays, null, undefined, etc.), return as-is
  return node;
};

export {
  formatTextValue,
  formatReactNode
};
