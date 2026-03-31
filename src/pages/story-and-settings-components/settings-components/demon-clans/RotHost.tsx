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
        “Rot Host” is the term used for an individual or group
        suffering from the demonic disease, {/* Siprophage/Nirkaphage/Nosophage/ */}
        Machalophage. Many think the disease is the creation
        of some unknown demon lord, while others believe the disease IS a demon lord spreading through the world from hell. If it truly is the work of some demon lord, he may be attempting to warp the world into his own personal domain.
      </p>
      <p>
        After demons were pushed back into hell, this disease began to spread from many of the still-open gateways, infecting humans who got too close. Those infected began aging and rotting; they lose their grasp on their own thoughts, beginning to mindlessly seek others to infect. A Rot Host rarely speaks, and when they do it’s not often fully coherent phrases. In the incredibly rare chance a Rot Host is coherent (and not simply the screams of the remaining mind-fragments of the person they once were), they speak of the coming Great Exhaustion and Great Exhumation – two events they believe are nigh.
      </p>
    </DemonClanComponent>
  )
}
