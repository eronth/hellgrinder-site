import GameTitle from "../GameTitle";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";
import Tools from "../common-design/Tools";
import MeleeWeapons from "../common-design/equipment/weapons/melee-weapons.tsx";
import ShootingWeapons from "../common-design/equipment/weapons/shooting-weapons.tsx";
import ThrownWeapons from "../common-design/equipment/weapons/thrown-weapons.tsx";
import ArcaneWeapons from "../common-design/equipment/weapons/arcane-weapons.tsx";
import WandsAndStaves from "../common-design/equipment/weapons/wands-and-staves.tsx";
import Armor from "../common-design/equipment/armor.tsx";
import Gear from "../common-design/equipment/gear.tsx";
import WeaponComponent from "./character-creation-components/kits/weapon/WeaponComponent.tsx";
import ItemComponent from "./character-creation-components/kits/item/ItemComponent.tsx";

export default function AdditionalEquipmentPage() {
  const page: TabType = 'additional-equipment';
  
  const sortedMeleeWeapons = Tools.sortWeapons(MeleeWeapons);
  const sortedShootingWeapons = Tools.sortWeapons(ShootingWeapons);
  const sortedThrownWeapons = Tools.sortWeapons(ThrownWeapons);
  const sortedArcaneWeapons = Tools.sortWeapons(ArcaneWeapons);
  const sortedWandsAndStaves = Tools.sortItems(WandsAndStaves);
  const sortedArmor = Tools.sortItems(Armor);
  const sortedGear = Tools.sortItems(Gear);

  return (<div className={page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <hr />
    <h2>Equipment</h2>
    <p>
      The equipment listed on this page is not meant for players to start with. Instead, it is a list of
      equipment to be given out as rewards or found in the world. This equipment is often meant to be more
      powerful than some of the standard equipment.
    </p>
    <hr />
    <h2>Weapons</h2>
    
    <h3>Melee Weapons</h3>
    <div className={'col-handler'}>
      {sortedMeleeWeapons.map((w, i) =>
        <WeaponComponent key={`melee-weapon-${i}`} weapon={w} />)
      }
    </div>
    
    <h3>Shooting Weapons</h3>
    <div className={'col-handler'}>
      {sortedShootingWeapons.map((w, i) =>
        <WeaponComponent key={`shooting-weapon-${i}`} weapon={w} />)
      }
    </div>
    
    <h3>Thrown Weapons</h3>
    <div className={'col-handler'}>
      {sortedThrownWeapons.map((w, i) =>
        <WeaponComponent key={`thrown-weapon-${i}`} weapon={w} />)
      }
    </div>
    
    <h3>Spells</h3>
    <p>
      When found in the world
      they are often in the form of gems, spell pages, orbs of energy or other mystical items which
      you can use to learn the spell.
      Once learned, spells act much like weapons, able to be equipped in the same way and used to make attacks.
    </p>
    <div className={'col-handler'}>
      {sortedArcaneWeapons.map((w, i) =>
        <WeaponComponent key={`spell-${i}`} weapon={w} />)
      }
    </div>
    
    <h3>Wands and Staves</h3>
    <p>
      Wands and staves can be used to augment spell tomes, gems, and attacks. When you equip a wand or staff,
      you may also equip a spell that uses the same number (or less) hands, using the same hand that is
      holding the wand or staff. You can swap spells as an equip action.
    </p>
    <p>
      A staff can be made by taking the values of a wand and making the following changes:
    </p>
    <ul>
      <li>Change the bonus to the amount shown in parenthesis.</li>
      <li>Grant a bonus +1d4 damage to attacks made with the staff.</li>
      <li>Remove the [One-handed] tag and add the [Two-handed] tag.</li>
    </ul>
    <div className={'col-handler'}>
      {sortedWandsAndStaves.map((w, i) =>
        <ItemComponent key={`wand-${i}`} item={w} />)
      }
    </div>
    
    <h3>Armor</h3>
    <div className={'col-handler'}>
      {sortedArmor.map((w, i) =>
        <ItemComponent key={`armor-${i}`} item={w} />)
      }
    </div>
    
    
    <h3>Gear</h3>
    <div className={'col-handler'}>
      {sortedGear.map((w, i) =>
        <ItemComponent key={`gear-${i}`} item={w} />)
      }
    </div>
    
    
  </div>);
}