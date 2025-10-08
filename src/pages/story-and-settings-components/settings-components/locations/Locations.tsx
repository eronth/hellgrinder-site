import Hx from "../../../../common-design/Hx/Hx";
import Tools from "../../../../common-design/Tools";
import DeepblindCaverns from "./DeepwindCaverns";
import GhastcursedVillages from "./GhastcursedVillages";
import InfernalLocation from "./InfernalLocation";
import ShoalpockedExpanse from "./ShoalpockedExpanse";
import SorrowshapedEchoplex from "./SorrowshapedEchoplex";
import TwistedWilds from "./TwistedWilds";
import WarpwindingPathways from "./WarpwindingPathways";
import ZephyrianSpires from "./ZephyrianSpires";


export default function OtherFactions() {
  const locationHxLevel = 'h4';

  return (<>
    <Hx hx={'h3'}>Realms of the Netherworld</Hx>

    <div className='lore-columns'>
      <p>Other Factions survive...</p>
      <p>{Tools.getLoremIpsum()}</p>
      {/* Various individual realms */}
      <DeepblindCaverns hx={locationHxLevel} />
      <GhastcursedVillages hx={locationHxLevel} />
      <InfernalLocation hx={locationHxLevel} />
      <ShoalpockedExpanse hx={locationHxLevel} />
      <TwistedWilds hx={locationHxLevel} />
      <ZephyrianSpires hx={locationHxLevel} />
      <SorrowshapedEchoplex hx={locationHxLevel} />
      <WarpwindingPathways hx={locationHxLevel} />
    </div>

  </>);
}
