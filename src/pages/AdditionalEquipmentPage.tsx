import Page from "../common-design/Page.tsx";
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

  return (<Page pageType={page}>
    <h2>Equipment</h2>
    <p>
      The equipment listed on this page is not meant for players to start with. Instead, it is a list of
      equipment to be given out as rewards or found in the world. This equipment is often meant to be more
      powerful than some of the standard equipment. Some equipment is considered "Advanced" equipment,
      while it requires no special training to use, it should be rewarded less often than other equipment.
    </p>
    <hr />
    <h2>Weapons</h2>
    
    <h3>Melee Weapons</h3>
    <h4>Basic Melee Weapons</h4>
    <div className={'col-handler'}>
      {sortedMeleeWeapons.map((w, i) =>
        w.isAdvancedItem ? null : <WeaponComponent key={`basic-melee-weapon-${i}`} weapon={w} />)
      }
    </div>

    <h4>Advanced Melee Weapons</h4>
    <div className={'col-handler'}>
      {sortedMeleeWeapons.map((w, i) =>
        w.isAdvancedItem ? <WeaponComponent key={`advanced-melee-weapon-${i}`} weapon={w} /> : null)
      }
    </div>
    
    <h3>Shooting Weapons</h3>
    <h4>Basic Shooting Weapons</h4>
    <div className={'col-handler'}>
      {sortedShootingWeapons.map((w, i) =>
        w.isAdvancedItem ? null : <WeaponComponent key={`basic-shooting-weapon-${i}`} weapon={w} />)
      }
    </div>

    <h4>Advanced Shooting Weapons</h4>
    <div className={'col-handler'}>
      {sortedShootingWeapons.map((w, i) =>
        w.isAdvancedItem ? null : <WeaponComponent key={`advanced-shooting-weapon-${i}`} weapon={w} />)
      }
    </div>
    
    <h3>Thrown Weapons</h3>
    <h4>Basic Thrown Weapons</h4>
    <div className={'col-handler'}>
      {sortedThrownWeapons.map((w, i) =>
        w.isAdvancedItem ? null : <WeaponComponent key={`basic-thrown-weapon-${i}`} weapon={w} />)
      }
    </div>

    <h4>Advanced Thrown Weapons</h4>
    <div className={'col-handler'}>
      {sortedThrownWeapons.map((w, i) =>
        w.isAdvancedItem ? <WeaponComponent key={`advanced-thrown-weapon-${i}`} weapon={w} /> : null)
      }
    </div>
    
    <h3>Spells</h3>
    <p>
      When found in the world
      they are often in the form of gems, spell pages, orbs of energy or other mystical items which
      you can use to learn the spell.
      Once learned, spells act much like weapons, able to be equipped in the same way and used to make attacks.
    </p>
    <h4>Basic Arcane Weapons</h4>
    <div className={'col-handler'}>
      {sortedArcaneWeapons.map((w, i) =>
        w.isAdvancedItem ? null : <WeaponComponent key={`basic-spell-${i}`} weapon={w} />)
      }
    </div>

    <h4>Advanced Arcane Weapons</h4>
    <div className={'col-handler'}>
      {sortedArcaneWeapons.map((w, i) =>
        w.isAdvancedItem ? <WeaponComponent key={`advanced-spell-${i}`} weapon={w} /> : null)
      }
    </div>
    
    <hr />
    <h2>Wands and Staves</h2>
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

    <h4>Basic Wands and Staves</h4>
    <div className={'col-handler'}>
      {sortedWandsAndStaves.map((w, i) =>
        <ItemComponent key={`wand-${i}`} item={w} />)
      }
    </div>
    
    <hr />
    <h2>Protection</h2>
    <h3>Armor</h3>
    <h4>Basic Armor</h4>
    <div className={'col-handler'}>
      {sortedArmor.map((w, i) =>
        w.isAdvancedItem ? null: <ItemComponent key={`basic-armor-${i}`} item={w} />)
      }
    </div>

    <h4>Advanced Armor</h4>
    <div className={'col-handler'}>
      {sortedArmor.map((w, i) =>
        w.isAdvancedItem ? <ItemComponent key={`advanced-armor-${i}`} item={w} /> : null)
      }
    </div>
    
    <hr />
    <h2>Other Gear</h2>
    <h3>Gear</h3>
    <h4>Basic Gear</h4>
    <div className={'col-handler'}>
      {sortedGear.map((w, i) =>
        w.isAdvancedItem ? null : <ItemComponent key={`basic-gear-${i}`} item={w} />)
      }
    </div>

    <h4>Advanced Gear</h4>
    <div className={'col-handler'}>
      {sortedGear.map((w, i) =>
        w.isAdvancedItem ? <ItemComponent key={`advanced-gear-${i}`} item={w} /> : null)
      }
    </div>
  </Page>);
}