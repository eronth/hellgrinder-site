import ColumnEntry from "../../../common-design/ColumnEntry";
import AshbornLegion from "./AshbornLegion";
import StoneveinedOrder from "./StoneveinedOrder";
import StormwingHorde from "./StormwingHorde";
import ThornwraithConclave from "./ThornwraithConclave";
import UmbralNexus from "./UmbralNexus";
import VastfathomDominion from "./VastfathomDominion";

export default function DemonClans() {
  const factionHxLevel = 'h4';

  return (<>
    <ColumnEntry
      title={{ hx: 'h3', text: 'Demon Clans' }}>
      <p>The infernal depths of Hell teem with countless demon clans, but seven (six?) stand above all others in power and influence. These formidable factions, each aligned with a primordial force, have shaped the very essence of the underworld. Known collectively as the Sovereign Sextet, these clans vie for supremacy in an eternal power struggle that has begun to spill into the mortal realm.</p>
    </ColumnEntry>
    
    <div className='col-handler'>
      {/* Individual Clans */}
      <AshbornLegion hx={factionHxLevel} />
      <StoneveinedOrder hx={factionHxLevel} />
      <StormwingHorde hx={factionHxLevel} />
      <ThornwraithConclave hx={factionHxLevel} />
      <UmbralNexus hx={factionHxLevel} />
      <VastfathomDominion hx={factionHxLevel} />
    </div>
  </>);
}
