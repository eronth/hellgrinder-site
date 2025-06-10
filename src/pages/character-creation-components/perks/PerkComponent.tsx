import { Perk } from "../../../ts-types/types";

type Props = {
  perk: Perk;
  count?: number;
};

export default function PerkComponent({ perk, count = 1 }: Props) {
  return (<>
    <div className='perk'>
      <div className='headrow'>
        <div className='name'>
          {perk.name}
          {count > 1 && <span className='perk-count'>x{count}</span>}
        </div>
        <div className='cost'>
          Cost: {perk.cost} Perk Point{ perk.cost != 1 ? "s" : "" }
          {count > 1 && <span className='total-cost'> (Total: {perk.cost * count})</span>}
        </div>
      </div>
      <div className='description'>{perk.description}</div>
    </div>
  </>);
}