import { Perk } from "../../../ts-types/types";

type Props = {
  perk: Perk;
};

export default function PerkComponent({ perk }: Props) {
  return (<>
    <div className='perk'>
      <div className='headrow'>
        <div className='name'>
          {perk.name}
        </div>
        <div className='cost'>
          Cost: {perk.cost} Perk Point{ perk.cost != 1 ? "s" : "" }
        </div>
      </div>
      <div className='description'>{perk.description}</div>
    </div>
  </>);
}