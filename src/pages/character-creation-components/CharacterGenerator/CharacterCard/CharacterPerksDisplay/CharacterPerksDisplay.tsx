import PerkComponent from "../../../perks/PerkComponent";
import { CharacterDesign } from "../../CharacterGenerator";
import { Perk } from "../../../../../ts-types/types";

type Props = {
  character: CharacterDesign
};
export default function CharacterPerksDisplay({ character }: Props) {
  
  // Group identical perks and count them
  function groupPerks(perks: Perk[]): Array<{ perk: Perk; count: number }> {
    const perkGroups = new Map<string, { perk: Perk; count: number }>();
    
    perks.forEach(perk => {
      const key = perk.name; // Group by perk name
      if (perkGroups.has(key)) {
        perkGroups.get(key)!.count++;
      } else {
        perkGroups.set(key, { perk: perk, count: 1 });
      }
    });
    
    // Sort alphabetically by perk name
    return Array.from(perkGroups.values()).sort((a, b) => 
      a.perk.name.localeCompare(b.perk.name)
    );
  }

  return (<>
    {groupPerks(character.perks).map((perkGroup, i) =>
      <PerkComponent
        key={`perk-${i}`} 
        perk={perkGroup.perk} 
        count={perkGroup.count}
      />
    )}
  </>);
}
