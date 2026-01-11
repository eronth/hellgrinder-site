import { HeaderSize } from "../../../../ts-types/types";
import AshbornLegion from "./AshbornLegion";
import StoneveinedOrder from "./StoneveinedOrder";
import ZephpterSwarm from "./ZephpterSwarm.tsx";
import ThornwraithCovenant from "./ThornwraithCovenant";
import UmbralNexus from "./UmbralNexus";
import VastfathomDominion from "./VastfathomDominion";
import WanderlostCrews from "./WanderlostCrews.tsx";
import Hx from "../../../../common-design/Hx/Hx.tsx";

export default function DemonClans() {
  const titleHxLevel: HeaderSize = 3;
  const factionHxLevel = (titleHxLevel + 1) as HeaderSize;

  return (<>
    <Hx hx={titleHxLevel}>Demon Clans</Hx>
    <p>
      The infernal depths of Hell teem with countless demon clans,
      but seven (six?) stand above all others in power and influence.
      These formidable factions, each aligned with a primordial force,
      have shaped the very essence of the underworld. Known collectively
      as the Sovereign Sextet, these clans vie for supremacy in an eternal
      power struggle that has begun to spill into the mortal realm.
    </p>
    
    <div className='col-handler'>
      {/* Individual Clans */}
      <AshbornLegion hx={factionHxLevel} />
      <StoneveinedOrder hx={factionHxLevel} />
      <ThornwraithCovenant hx={factionHxLevel} />
      <UmbralNexus hx={factionHxLevel} />
      <VastfathomDominion hx={factionHxLevel} />
      <ZephpterSwarm hx={factionHxLevel} />
      <WanderlostCrews hx={factionHxLevel} />
    </div>
  </>);
}
