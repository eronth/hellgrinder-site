import { useState } from "react";

type Props = {
  label?: {
    left?: string;
    right?: string;
  };
  toggled: boolean;
  onClick: any;
}
export const Toggle = ({ label, toggled, onClick }: Props) => {
  
  const [isToggled, setToggle] = useState(toggled);
  const leftTextComponent = label?.left
    ? <span className={'left label'}>{label.left}</span>
    : null;
  const rightTextComponent = label?.right
    ? <span className={'right label'}>{label.right}</span>
    : null
  
  const callback = () => {
      const newVal = !isToggled;
    setToggle(newVal);
    onClick(newVal);
  }
  
  return (
    <label className={'toggle ' + (isToggled ? 'toggled' : 'untoggled')}>
      {leftTextComponent}
      <span className={'toggler'} >
        <input type={'checkbox'}
               defaultChecked={isToggled}
               onClick={callback} />
      </span>
      {rightTextComponent}
    </label>
  );
}
