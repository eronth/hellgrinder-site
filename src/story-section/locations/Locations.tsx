import ColumnEntry from "../../common-design/ColumnEntry";
import Tools from "../../Tools";
import DeepblindCaverns from "./DeepwindCaverns";
import GhastcursedVillages from "./GhastcursedVillages";
import InfernalLocation from "./InfernalLocation";
import ShoalpockedExpanse from "./ShoalpockedExpanse";
import TwistedWilds from "./TwistedWilds";
import WarpwindingPathways from "./WarpwindingPathways";
import ZephyrianSpires from "./ZephyrianSpires";



export default function OtherFactions() {
  const factionHxLevel = 'h4';

  return (<>
    <ColumnEntry
      title={{ hx: 'h3', text: 'Realms of the Netherworld' }}>
      <p>Other Factions survive...</p>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>

    {/* Various individual realms */}
    <DeepblindCaverns hx={factionHxLevel} />
    <GhastcursedVillages hx={factionHxLevel} />
    <InfernalLocation hx={factionHxLevel} />
    <ShoalpockedExpanse hx={factionHxLevel} />
    <TwistedWilds hx={factionHxLevel} />
    <ZephyrianSpires hx={factionHxLevel} />
    <WarpwindingPathways hx={factionHxLevel} />

  </>);
}
