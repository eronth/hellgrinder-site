import Faction from "../../../../common-design/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";

type Props = {
  hx: HeaderSize;
};
export default function ZephpterHorde ({ hx }: Props) {
  const buttonText = {
    offer: 'Join the Frenzy',
    renounce: 'Calm the Storm'
  };
  return (
    <DemonClanComponent title={"Zephpter Hordes"} hx={hx} buttonText={buttonText}>
      <p>
        The <Faction>Zephpter Hordes</Faction> are nethercurrent-aligned
        creatures that infest the jagged walls of the Zephyrian Spires. Small
        and insectile, they move with savage, lightning-fast precision, wings
        crackling with sparks as they dart through the storm clouds. Individually
        they are little more than a nuisance, but together they become a living
        tempest, overwhelming prey with sheer speed and numbers.
      </p>
      <p>
        When they fly, they streak like bolts of lightning across the skies,
        vanishing into the clouds only to strike again in blinding flashes.
        Any unfortunate soul caught in a Zephpter storm is assailed by hundreds
        of crackling bolts, each transforming into another frenzied Zephpter
        until the swarm becomes an unbroken wall of wings and thunder.
      </p>
      <p>
        The Hordes are chaotic and fiercely territorial, swarming against 
        anything that disturbs their storms. They are drawn to sources of 
        energy — arcane currents, electrical devices, even the heartbeat
        of the living — and
        will defend these currents with feral zeal. Their small size and
        impossible agility make them nearly untouchable, a blur of sparks and
        wings.
      </p>
      <p>
        Each Horde orbits a vast, churning stormfront — a vortex of wind and
        nethercurrent that seems to possess a will of its own. Whether these
        titanic storms are mindless forces or the true masters of the Hordes is
        hotly debated among Earth's scholars, but all agree: wherever a Zephpter
        storm moves, devastation follows. To face them is not to fight an enemy,
        but to stand against the fury of the storm itself.
      </p>

    </DemonClanComponent>
  )
}
