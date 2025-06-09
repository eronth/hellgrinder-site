import { useState } from "react";
import './Toggle.css';

type Props = {
  className?: string;
  label?: {
    left?: string;
    right?: string;
  };
  toggled: boolean;
  onClick: any;
}
export const Toggle = ({ className, label, toggled, onClick }: Props) => {
  
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
  
  if (className) {
    className = ' ' + className;
  }

  return (<div className={'toggle ' + (isToggled ? 'toggled' : 'untoggled') + className}>
    <label>
      {leftTextComponent}
      <span className={'toggler'} >
        <input type={'checkbox'}
          defaultChecked={isToggled}
          onClick={callback} />
      </span>
      {rightTextComponent}
    </label>
  </div>);
}
