import { Creature } from './creature-types';

export type EncounterCreature = {
  id: string; // Unique identifier for this encounter instance
  creature: Creature; // Original creature data
  currentHealth: number; // Editable health
  maxHealth: number; // Original max health
  notes?: string; // Optional notes for this creature instance
};

export type Encounter = {
  creatures: EncounterCreature[];
};
