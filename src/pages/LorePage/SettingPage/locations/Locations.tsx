import Hx from "../../../../components/common/generic/Hx/Hx";
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

    <div className='fluid-readable-columns'>
      <p>
        The demon clans of the Sovereign Heptarchs have enough power
        and influence to warp the very shape of hell to fit their nature.
        As such, each clan of the Sovereign Heptarchy rules over a unique
        domain that grows and changes with their power.
      </p>
      <p>
        The remaining minor clans make do trying merely to survive
        in the harsh landscape shaped by the whims of the Sovereign.
        Occasionally a minor clan will find an unclaimed corner of
        hell and build enough influence to shape it to their own will.
        These cases are extremely rare but can prove to be more
        dangerous than the realms of the Sovereign, as there is no
        intel on what to expect when entering the minor realm.
      </p>
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
