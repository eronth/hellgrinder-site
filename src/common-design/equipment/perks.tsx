import type { PerkType } from '../../ts-types/types';

const exObj: {
  durable: PerkType,
  evil: PerkType,
  hellspawn: PerkType,
  mindful: PerkType,
  nimble: PerkType,
  sinister: PerkType,
  stoic: PerkType,
  veteran: PerkType,
} = {
  durable: {
    name: 'Durable', cost: 1,
    description: 'You have always been a bit more sturdy. You have +1 Max Health and Resist 1 to your choice of Damage Type.',
  },
  evil: {
    name: 'Evil', cost: -1,
    description: 'You start with 4 Corruption.',
  },
  hellspawn: {
    name: 'Hellspawn', cost: 2,
    description: 'You are a creature of the nether realms, or at least partially. Choose a Damage Type. Your melee attacks can deal that type of damage. You also gain Absorb <type> 1.',
  },
  mindful: {
    name: 'Mindful', cost: 1,
    description: 'You make Corruption Tests with a +2 bonus.',
  },
  nimble: {
    name: 'Nimble', cost: 1,
    description: 'You are quick on your feet. You gain +1 [Agility Skill Checks].',
  },
  sinister: {
    name: 'Sinister', cost: 2,
    description: 'You are unperterbed by the horrors of the realm. Whenever you gain Corruption, reduce the amount gained by 1 (to minimum of 1).',
  },
  stoic: {
    name: 'Stoic', cost: 1,
    description: 'You stand firm in the face of danger. You regain +1 Health on a Recovery Check. When terrified, make a [Endurance Skill Check] to end the status early.',
  },
  veteran: {
    name: 'Veteran', cost: 2,
    description: 'You have seen many battles. Start with a random Light Injury, this counts as a Perminant Injury instead, and cannot be removed by normal means. You gain +3 to all [Shooting], [Melee], [Arcane], or [Thrown] Hit Checks.',
  }
};

export default exObj;