import Faction from "../../../../components/keywords/story-references/Faction";
import { HeaderSize } from "../../../../ts-types/types";
import DemonClanComponent from "./DemonClanComponent/DemonClanComponent";


type Props = {
  hx: HeaderSize;
};
export default function RotHost({ hx }: Props) {
  const buttonText = {
    offer: 'Wither to Persist',
    renounce: 'Regenerate'
  };
  return (
    <DemonClanComponent title='Rot Host' hx={hx} buttonText={buttonText}>
      <p>
        “<Faction>Rot Host</Faction>” is the term used for an individual or group
        suffering from the demonic disease, {/* Siprophage/Nirkaphage/Nosophage/ */}
        Machalophage. Many think the disease is the creation
        of some unknown demon lord, while others believe the
        disease <b><i>is</i></b> a demon lord manifest,
        spreading through the mortal world from hell.
        If it truly is the work of some demon lord, he may be
        attempting to warp the world into his personal domain.
      </p>
      <p>
        After demons were pushed back into hell, this disease
        began to spread from many of the still-open gateways,
        infecting humans who got too close. Those infected begin
        aging and rotting; they lose their grasp on their own thoughts,
        mindlessly seek others to infect.
      </p>
      <p>
        A <Faction>Rot Host</Faction> rarely speaks. When they do,
        it's rarely in fully coherent phrases. In the incredibly 
        rare case a <Faction>Rot Host</Faction> is coherent
        (and not simply the screams of the remaining
        mind-fragments of the person they once were), they speak
        of the coming Great Exhaustion and Great Exhumation — two
        events they believe are nigh.
      </p>
    </DemonClanComponent>
  )
}
