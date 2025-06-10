import { Perk } from "../../../ts-types/types";

type Props = {
  perk: Perk;
  count?: number;
};

export default function PerkComponent({ perk, count = 1 }: Props) {
  // Helper function to generate enhanced description with combined bonuses
  const getEnhancedDescription = () => {
    if (count <= 1) return perk.description;
    
    let enhancedDescription = perk.description;
    
    // Add combined bonus information
    const bonuses = [];
    
    if (perk.healthModifier) {
      bonuses.push(`+${perk.healthModifier * count} Max Health`);
    }
    
    if (perk.speedModifier) {
      bonuses.push(`${perk.speedModifier > 0 ? '+' : ''}${perk.speedModifier * count} Speed`);
    }
    
    if (perk.startingCorruption) {
      bonuses.push(`+${perk.startingCorruption * count} Corruption`);
    }
    
    if (perk.injuriesModifier) {
      bonuses.push(`${perk.injuriesModifier > 0 ? '+' : ''}${perk.injuriesModifier * count} Injuries`);
    }
    
    if (perk.safelightShardsModifier) {
      bonuses.push(`${perk.safelightShardsModifier > 0 ? '+' : ''}${perk.safelightShardsModifier * count} Safelight Shards`);
    }
    
    if (bonuses.length > 0) {
      enhancedDescription += `\n\nCombined Bonuses (x${count}): ${bonuses.join(', ')}.`;
    }
    
    return enhancedDescription;
  };

  return (<>
    <div className='perk'>
      <div className='headrow'>
        <div className='name'>
          {perk.name}
          {count > 1 && <span className='perk-count'>×{count}</span>}
        </div>
        <div className='cost'>
          Cost: {perk.cost} Perk Point{perk.cost !== 1 ? "s" : ""}
          {count > 1 && <span className='total-cost'> (Total: {perk.cost * count})</span>}
        </div>
      </div>
      <div className='description' style={{ whiteSpace: 'pre-line' }}>
        {getEnhancedDescription()}
      </div>
    </div>
  </>);
}