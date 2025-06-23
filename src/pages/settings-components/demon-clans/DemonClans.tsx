import ColumnEntry from "../../../common-design/ColumnEntry";
import AshbornLegion from "./AshbornLegion";
import StoneveinedOrder from "./StoneveinedOrder";
import ZephpterHorde from "./ZephpterHorde.tsx";
import ThornwraithCovenant from "./ThornwraithCovenant";
import UmbralNexus from "./UmbralNexus";
import VastfathomDominion from "./VastfathomDominion";
import { HeaderSize } from "../../../ts-types/types";
import WanderlostCrews from "./WanderlostCrews.tsx";

export default function DemonClans() {
  const titleHxLevel: HeaderSize = 3;
  const factionHxLevel = (titleHxLevel + 1) as HeaderSize;

  return (<>
    <ColumnEntry
      title={{ hx: titleHxLevel, text: 'Demon Clans' }}>
      <p>The infernal depths of Hell teem with countless demon clans, but seven (six?) stand above all others in power and influence. These formidable factions, each aligned with a primordial force, have shaped the very essence of the underworld. Known collectively as the Sovereign Sextet, these clans vie for supremacy in an eternal power struggle that has begun to spill into the mortal realm.</p>
    </ColumnEntry>
    
    <div className='col-handler'>
      {/* Individual Clans */}
      <AshbornLegion hx={factionHxLevel} />
      <StoneveinedOrder hx={factionHxLevel} />
      <ThornwraithCovenant hx={factionHxLevel} />
      <UmbralNexus hx={factionHxLevel} />
      <VastfathomDominion hx={factionHxLevel} />
      <ZephpterHorde hx={factionHxLevel} />
      <WanderlostCrews hx={factionHxLevel} />
    </div>
  </>);
}
