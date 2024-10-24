import { Creature } from '../ts-types/creature-types';
import { Weapon } from '../ts-types/types';
import { Kit } from '../ts-types/types';
import { Perk } from '../ts-types/types';

const deepCopyWeapon = (obj: Weapon): Weapon => JSON.parse(JSON.stringify(obj));
const deepCopyKit = (obj: Kit): Kit => JSON.parse(JSON.stringify(obj));
const deepCopyPerk = (obj: Perk): Perk => JSON.parse(JSON.stringify(obj));

const getLoremIpsum = () =>
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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

const sortKits = (kits: { [key: string]: Kit }): Kit[] => 
  Object.values(kits)
    .sort((a, b) => a.name.localeCompare(b.name));

const sortPerks = (perks: { [key: string]: Perk }): Perk[] => 
  Object.values(perks)
    .sort((a, b) => a.name.localeCompare(b.name));
  // Object.keys(perks)
  //   .sort((a, b) => perks[a].name.localeCompare(perks[b].name))
  //   .map((k) => perks[k]);

// type HeaderTypings = 
//     'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
//     | '1' | '2' | '3' | '4' | '5' | '6'
//     | 1 | 2 | 3 | 4 | 5 | 6;
// const convertHeaderToFull = (hx: HeaderTypings): string => {
//   let returnHx: string = '';

//   if (typeof hx === 'number') { returnHx = hx.toString(); }
//   if (returnHx[0] !== 'h') { returnHx = 'h' + returnHx; }
//   return returnHx;
// }

export default {
  //convertHeaderToFull,
  getLoremIpsum,
  sortKits,
  sortPerks,
  sortCreatures,
  deepCopyWeapon,
  deepCopyKit,
  deepCopyPerk,
};