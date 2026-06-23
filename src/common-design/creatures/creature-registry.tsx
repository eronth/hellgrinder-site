import { Creature } from '../../ts-types/creature-types';
import GenCreatures from './generic-creatures';
import RotHostCreatures from './test-creatures';
import ZephpterCreatures from './zephpter-creatures';
import Sinners from './sinner-creatures';
import FactionExamples from './faction-examples';

const allCreatures: Creature[] = [
  ...Object.values(GenCreatures),
  ...Object.values(RotHostCreatures),
  ...Object.values(ZephpterCreatures),
  ...Object.values(Sinners),
  ...Object.values(FactionExamples),
];

const CreatureRegistry: Record<string, Creature> = {};
allCreatures.forEach(c => {
  CreatureRegistry[c.id] = c;
});

export default CreatureRegistry;
