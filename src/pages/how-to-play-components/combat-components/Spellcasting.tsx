import { movementIcon } from "../../../common-design/CommonIcons";
import Hx from "../../../common-design/Hx/Hx";
import SkillCheck from "../../../common-design/SkillCheck/SkillCheck";
import CheckResultsGrid from "../CheckResultsGrid/CheckResultsGrid";
import IndividualManeuver from "./IndividualManeuver";


export default function Spellcasting() {
  return (<>
    <Hx hx={3}>Spellcasting</Hx>

    <div className='fluid-readable-columns'>
      <p>
        During character creation or over the course of gameplay,
        characters may learn spells. To cast a spell, you must channel magic
        through your hands. Spells can be One-Handed or Two-Handed, and thus
        require you to have the same number of hands channelled to cast them.
      </p>
      <p>
        When you channel magic,
        you do not choose a specific spell to cast.
        Instead, are ready to cast any
        spells you know; so long as you have the requisite
        number of hands channelled.
      </p>

      <Hx hx={4}>Special Maneuver</Hx>
      <IndividualManeuver title='Channel Magic' cost={3}>
        <p>
          This is a special version of the "Swap Equipment" maneuver,
          specifically for preparing to cast spells via channeling.
          When doing so, you stow one or more items then attempt
          to channel your magic through your hands to cast spells. This counts as
          your "Swap Equipment" maneuver for the turn, so you can only
          attempt to use one of these maneuvers per turn.
        </p>
        <p>
          Roll an <SkillCheck tags={['Arcane']} /> to
          attempt to channel the magic through your hands.
        </p>
        <CheckResultsGrid className="swap-equipment-grid" results={{
          r1: <>Equipment successfully stowed and magic channeled.</>,
          r2: <>You do not spend {movementIcon} to complete the channeling.</>,
          r3: <>You do not spend {movementIcon} to complete the channeling. You may
            choose to use "Swap Equipment" or “Channel Magic” again this turn as a Maneuver.</>,
        }} />
      </IndividualManeuver>


      <Hx hx={4}>Learning Spells</Hx>
      <p>
        Spells can be learned throughout the hells in a variety of ways.
        Spells have a list of tags to choose from (typically damage type). When a 
        player first learns a spell, typically they can choose which tag they'd 
        like the spell to be, though sometimes the GM may have specific tags in 
        mind for a spell. The chosen tag cannot be changed, and affects the spell's
        effects.
      </p>

      <Hx hx={5}>Glyphs</Hx>
      <p>
        A glyph is any inscription, etching or other spell mark which can permanently
        confir the knowledge of a spell to a character. When a character learns a spell through
        a glyph, they
        can never lose access to that spell.
      </p>
      <p>
        Glyphs tend to warp when read, and often
        a glyph can only be used by a limited 
        number of characters before it warps and fades, disabling access to learn the spell.
        Characters can typically tell what spell a glyph contains by examining it.
        Due to the warping nature of glyphs, players do not need to pick the same
        tags for the spell as previously selected by other players who learned the 
        spell through the same glyph.
      </p>
      <p>
        Occasionally a glyph comes with a cost or drawback to learning the spell, which may not
        be immediately apparent.
      </p>

      <Hx hx={5}>Spell Remnants</Hx>
      <p>
        Spell remnants are the fragmented remains of objects used in powerful spells.
        Arcane gems, spell pages, lodestones, or other such mystical items serve as 
        catalysts for learning spells. When held, a character can remember the echo of
        the spell from the Spell Remnant, learning the spell within it.
      </p>
      <p>
        Losing possession of a Spell Remnant does not cause you to immediately
        forget the spell,
        but if 
        another creature uses the Spell Remnant to learn the spell, you can no longer
        use that spell until learned again.
      </p>



      <Hx hx={4}>Arcane Equipment and Items</Hx>
      <p>
        There are many arcane items in the hells that 
        can be used to assist with spellcasting. When weilding such equipment,
        you do not need to first channel magic to use the item or cast spells
        while holding it.
        However, you do need to be holding the item with the same number of hands
        as would be required to cast the spell normally.
      </p>

      <Hx hx={5}>Spell Focii</Hx>
      <p>
        Spell Focii  include wands, staves, orbs, and other such items used to cast spells.
        Focii can be used to enhance the effects of spells cast through it.
        Any spell cast through a focus gains the benefits listed for that focus.
      </p>

      <Hx hx={5}>Infused Vessel</Hx>
      <p>
        Infused Vessels are items which have the arcane powers of a particular spell bound
        within them. While weilding an Infused Vessel, you can cast the spell contained within.
        This can grant access to spells you might not otherwise know, and can even grant access
        to more powerful versions of spells.
      </p>
      <p>
        Some spells contained within Infused Vessels have a limited number of uses before the
        vessel becomes inert.
        If you use the last charge of an Infused Vessel, you can continue to cast
        other spells you know through it for the remainder of the encounter due to latent
        magic still present. After the encounter it becomes completely inert, no longer
        acting as a magical device.
      </p>
    </div>
  </>);
}