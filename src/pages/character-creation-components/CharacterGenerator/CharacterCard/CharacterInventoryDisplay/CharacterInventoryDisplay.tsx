import ItemComponent from "../../../kits/item/ItemComponent";
import WeaponComponent from "../../../kits/weapon/WeaponComponent";
import { CharacterDesign } from "../../CharacterGenerator";

type Props = {
  character: CharacterDesign;
};
export default function CharacterPerksDisplay({
  character
}: Props) {
  return (<>
    {/* Display inventory items */}
    {(character.inventory.weapons.length > 0 || character.inventory.items.length > 0) && (
      <div className="inventory-display">
        <div className="inventory-title">Acquired Equipment</div>
        <div className="col-handler">
          {character.inventory.weapons.map((w, i) =>
            <WeaponComponent key={`inventory-weapon-${i}`} weapon={w} />
          )}
          {character.inventory.items.map((item, i) =>
            <ItemComponent key={`inventory-item-${i}`} item={item} />
          )}
        </div>
      </div>
    )}
  </>);
}
