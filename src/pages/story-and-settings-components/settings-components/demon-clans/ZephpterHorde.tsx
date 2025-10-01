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
        The Zephpter Hordes are filled with nethercurrent-aligned demonic critters that reside
        along the walls of the Zephyrian Spires. They are small, insect-like creatures with
        savage, lightning-fast movements and a penchant for swarming their prey.
        The Zephpter can fly through the lingering clouds as a bolt of lightning, allowing them
        to quickly close in on their prey. If an unfortunate soul is caught in a Zephpter
        storm, they are struck with hundreds of bolts of lightning which instantly transform
        into a frenzied Zephpter swarm.
      </p>
      <p>
        The Zephpter Hordes are known for their chaotic nature, often swarming in large numbers
        and attacking anything that disturbs their territory. They are drawn to sources of
        energy, such as electrical devices or magical artifacts, and will fiercely defend
        these sources from intruders. Their small size and agility make them difficult to catch.
      </p>
      <p>
        Each Zephpter Horde mindlessly follows a titanic storm — churning and swirling with nethercurrent.
        Scholars debate the sentience of these
        storms, but all agree that they are a force of hell to be reckoned with. 
      </p>
    </DemonClanComponent>
  )
}
