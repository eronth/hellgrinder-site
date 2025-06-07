import ColumnEntry from "../../../common-design/ColumnEntry";
import Tools from "../../../common-design/Tools";
import DeepblindCaverns from "./DeepwindCaverns";
import GhastcursedVillages from "./GhastcursedVillages";
import InfernalLocation from "./InfernalLocation";
import ShoalpockedExpanse from "./ShoalpockedExpanse";
import TwistedWilds from "./TwistedWilds";
import WarpwindingPathways from "./WarpwindingPathways";
import ZephyrianSpires from "./ZephyrianSpires";



export default function OtherFactions() {
  const locationHxLevel = 'h4';

  return (<>
    <ColumnEntry
      title={{ hx: 'h3', text: 'Realms of the Netherworld' }}>
      <p>Other Factions survive...</p>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>

    <div className='col-handler'>
      {/* Various individual realms */}
      <DeepblindCaverns hx={locationHxLevel} />
      <GhastcursedVillages hx={locationHxLevel} />
      <InfernalLocation hx={locationHxLevel} />
      <ShoalpockedExpanse hx={locationHxLevel} />
      <TwistedWilds hx={locationHxLevel} />
      <ZephyrianSpires hx={locationHxLevel} />
      <WarpwindingPathways hx={locationHxLevel} />
    </div>

  </>);
}
