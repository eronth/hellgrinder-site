import Page from "../components/common/Page/Page.tsx";
import ScrollspyNav, { ScrollspySection } from "../components/common/ScrollspyNav/ScrollspyNav.tsx";
import { TabType } from "../ts-types/types";
import Tools from "../utils/tools.tsx";
import MeleeWeapons from "../data/equipment/weapons/melee-weapons.tsx";
import ShootingWeapons from "../data/equipment/weapons/shooting-weapons.tsx";
import ThrownWeapons from "../data/equipment/weapons/thrown-weapons.tsx";
import ArcaneWeapons from "../data/equipment/weapons/arcane-weapons.tsx";
import WandsAndStaves from "../data/equipment/weapons/wands-and-staves.tsx";
import Armor from "../data/equipment/armor.tsx";
import Gear from "../data/equipment/gear.tsx";
import Perks from "../data/equipment/perks";
import WeaponComponent from "./CharacterCreationPage/character-creation-components/kits/weapon/WeaponComponent.tsx";
import ItemComponent from "./CharacterCreationPage/character-creation-components/kits/item/ItemComponent.tsx";
import PerkComponent from "./CharacterCreationPage/character-creation-components/perks/PerkComponent";

const sections: ScrollspySection[] = [
  { id: 'perks', label: 'Perks' },
  { id: 'weapons', label: 'Weapons' },
  { id: 'spell-focus', label: 'Spell Focus' },
  { id: 'protection', label: 'Protection' },
  { id: 'other-gear', label: 'Other Gear' },
];

export default function EquipmentAndPerksPage() {
  const page: TabType = 'equipment-and-perks';

  const sortedPerks = Tools.sortPerks(Perks);
  const sortedMeleeWeapons = Tools.sortWeapons(MeleeWeapons);
  const sortedShootingWeapons = Tools.sortWeapons(ShootingWeapons);
  const sortedThrownWeapons = Tools.sortWeapons(ThrownWeapons);
  const sortedArcaneWeapons = Tools.sortWeapons(ArcaneWeapons);
  const sortedWandsAndStaves = Tools.sortItems(WandsAndStaves);
  const sortedArmor = Tools.sortItems(Armor);
  const sortedGear = Tools.sortItems(Gear);

  return (<Page pageType={page}>
    <ScrollspyNav sections={sections} />

    <section id="perks" className="scrollspy-target">
      <h2>Perks</h2>
      <p>
        Perks are special abilities that can be used to enhance your character. Some perks are considered starter perks,
        and can be taken during character creation (if you have hte points for them) or during character advancement. Other
        perks are considered advancement perks, and should only be taken during character advancement. Perks can be taken in
        any order, but some perks may have prerequisites that must be met before they can be taken.
      </p>

      <h4>Starter Perks</h4>
      <div className={'col-handler'}>
        {sortedPerks.map((p, i) =>
          p.isAdvancedItem ? null : <PerkComponent key={`starter-perk-${i}`} perk={p} />)
        }
      </div>

      <h4>Advancement Perks</h4>
      <div className={'col-handler'}>
        {sortedPerks.map((p, i) =>
          p.isAdvancedItem ? <PerkComponent key={`advanced-perk-${i}`} perk={p} /> : null)
        }
      </div>
    </section>

    <hr />

    <section id="weapons" className="scrollspy-target">
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
          w.isAdvancedItem ? <WeaponComponent key={`advanced-shooting-weapon-${i}`} weapon={w} /> : null)
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
        Spells have a list of optional tags (typically damage type).
        When a player first learns a spell, typically they can choose which
        tag they'd like the spell to be, though sometimes the GM may
        have specific tags in mind for a spell. The chosen tag cannot be changed,
        and affects the spell's effects.
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
    </section>

    <hr />

    <section id="spell-focus" className="scrollspy-target">
      <h2>Spell Focus</h2>
      <h3>Wands and Staves</h3>
      <p>
        Wands and staves can be used to augment spell tomes, gems, and attacks. When you equip a wand or staff,
        you may also equip a spell that uses the same number (or less) hands, using the same hand that is
        holding the wand or staff.
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
    </section>

    <hr />

    <section id="protection" className="scrollspy-target">
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
    </section>

    <hr />

    <section id="other-gear" className="scrollspy-target">
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
    </section>
  </Page>);
}
