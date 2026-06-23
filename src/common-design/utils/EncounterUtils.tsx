import { Encounter, EncounterCreature } from '../../ts-types/encounter-types';
import { CreatureTier } from '../../ts-types/creature-types';

export function getCreatureTierCounts(encounter: Encounter): Record<CreatureTier, number> {
  const counts: Record<CreatureTier, number> = {
    'Minion': 0,
    'Spawn': 0,
    'Elite': 0,
    'Tormentor': 0,
    'Archfiend': 0,
    'Lord': 0,
    'Overlord': 0,
  };

  encounter.creatures.forEach((encounterCreature: EncounterCreature) => {
    const tier = encounterCreature.creature.tier;
    counts[tier]++;
  });

  return counts;
}

export function formatTierCounts(counts: Record<CreatureTier, number>): string {
  const parts: string[] = [];

  const tiers: CreatureTier[] = ['Minion', 'Spawn', 'Elite', 'Tormentor', 'Archfiend', 'Lord', 'Overlord'];

  tiers.forEach(tier => {
    if (counts[tier] > 0) {
      parts.push(`${counts[tier]} ${tier}${counts[tier] > 1 ? 's' : ''}`);
    }
  });

  return parts.length > 0 ? `(${parts.join(', ')})` : '';
}
