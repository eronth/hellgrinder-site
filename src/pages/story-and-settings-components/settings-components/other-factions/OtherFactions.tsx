import ColumnEntry from "../../../../common-design/ColumnEntry";
import Tools from "../../../../common-design/Tools";
import ForgefiendSyndicate from "./ForgefiendSyndicate";
import HandOfDeath from "./HandOfDeath";
import HeavensHost from "./HeavensHost";
import Sinners from "./Sinners";
import VoidfireConclave from "./VoidfireConclave";
import WitchCovens from "./WitchCovens";


export default function OtherFactions() {
  const factionHxLevel = 'h4';

  return (<>
    <ColumnEntry
      title={{ hx: 'h3', text: 'Other Factions' }}>
      <p>Other Factions survive...</p>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>

    <div className='col-handler'>
      {/* Individual Factions */}
      <ForgefiendSyndicate hx={factionHxLevel} />
      <HandOfDeath hx={factionHxLevel} />
      <HeavensHost hx={factionHxLevel} />
      <Sinners hx={factionHxLevel}/>
      <VoidfireConclave hx={factionHxLevel} />
      <WitchCovens hx={factionHxLevel} />
    </div>

  </>);
}
