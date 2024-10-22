import { Creature } from '../../ts-types/creature-types';

const ct0 = 'Minion';
const ct1 = 'Spawn';
const ct2 = 'Elite';
const ct3 = 'Tormentor';
const ct4 = 'Arhfiend';
const ct5 = 'Lord';
const ct6 = 'Overlord';

function sortCreatures(creatures: { [key: string]: Creature }): Creature[] {
  // First, separate creatures by type/tier
  let ct0Creatures = Object.values(creatures).filter(c => c.type === ct0);
  let ct1Creatures = Object.values(creatures).filter(c => c.type === ct1);
  let ct2Creatures = Object.values(creatures).filter(c => c.type === ct2);
  let ct3Creatures = Object.values(creatures).filter(c => c.type === ct3);
  let ct4Creatures = Object.values(creatures).filter(c => c.type === ct4);
  let ct5Creatures = Object.values(creatures).filter(c => c.type === ct5);
  let ct6Creatures = Object.values(creatures).filter(c => c.type === ct6);

  // Next, sort each tier by name
  ct0Creatures = ct0Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct1Creatures = ct1Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct2Creatures = ct2Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct3Creatures = ct3Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct4Creatures = ct4Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct5Creatures = ct5Creatures.sort((a, b) => a.name.localeCompare(b.name));
  ct6Creatures = ct6Creatures.sort((a, b) => a.name.localeCompare(b.name));

  // Finally, combine all lists and return
  return [...ct0Creatures, ...ct1Creatures, ...ct2Creatures, ...ct3Creatures, ...ct4Creatures, ...ct5Creatures, ...ct6Creatures];
}

export default { sortCreatures };