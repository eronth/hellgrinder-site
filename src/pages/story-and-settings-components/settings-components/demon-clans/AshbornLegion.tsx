import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function AshbornLegion ({ hx }: Props) {
  const buttonText = {
    offer: 'Swear Your Fealty',
    renounce: 'Betray the Legion'
  };
  return (
    <DemonClanComponent title="Ashborn Legion" hx={hx} buttonText={buttonText}>
      <p>
        The <Faction>Ashborn Legion</Faction> are infernal-aligned
        demons forged in the fires of hell, their very bodies wreathed
        in ash and ember. Though roughly humanoid, their winged
        forms are sheathed in cracked flesh like scorched earth,
        molten veins glowing just beneath the surface. Their eyes burn
        like coals, their breath smolders like a furnace, and wherever
        they tread, the air itself stings with heat and cinders.
      </p>
      <p>
        At their head march the Warlords — towering figures clad in
        jagged, obsidian armor that devours the light. Their voices 
        carry like thunder, binding the Legion into ruthless formations.
        Under such command, the hate-filled masses are driven into
        warbands, wielding infernal steel and blackened shields,
        burning their way across Hell. They leave behind
        nothing but charred wastelands only befit the Ashborn.
      </p>
      <p>
        Yet not all remain under the Warlords’ banner. On occasion, a squad 
        of lesser Ashborn break free of command. Such Ashborn lose their infernal
        arms and armor, and are forced to scavenge the battlefield for
        crude weapons and fractured
        defenses. These rogues are despised as deserters, hunted by both Legion
        and rival clans. Yet their desperation breeds cunning: they strike from
        shadow and ruin, practicing ambush and sabotage in place of open war.
        Though few in number, such outcasts are among the most dangerous to
        encounter — for they embody the Legion’s fury, but without its chains.
      </p>
    </DemonClanComponent>
  )
}
