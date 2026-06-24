import Hx from "../../../../components/common/generic/Hx/Hx";
import { movementIcon } from "../../../../utils/commonIcons";
import React from "react";

type Props = {
  title: string;
  cost: number | React.ReactNode;
  children: React.ReactNode;
};

export default function IndividualManeuver({title, cost, children}: Props) {
  const costDisplay = (typeof cost === 'number' 
    ? `${cost}${movementIcon}`
    : cost);

  return (<>
    <div>
      <Hx>
        {title}
        <span className="movement-cost">
          Cost: {costDisplay}
        </span>
      </Hx>
      {children}
    </div>
  </>);
}
