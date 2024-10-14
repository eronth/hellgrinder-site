import ColumnEntry from "../../common-design/ColumnEntry";
import Tools from "../../Tools";
import AshbornLegion from "./AshbornLegion";

function DemonClans() {
  return (<>
    <ColumnEntry
      title={{ hx: 'h3', text: 'Demon Clans' }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>

    {/* Individual Clans */}
    <AshbornLegion hx='4'/>
    <ColumnEntry
      title={{ hx: 'h4', text: "Vastfathom Dominion" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
    <ColumnEntry
      title={{ hx: 'h4', text: "Thornwraith Conclave/Covenant" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
    <ColumnEntry
      title={{ hx: 'h4', text: "Stoneveined Order" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
    <ColumnEntry
      title={{ hx: 'h4', text: "Stormwing/Nethercurrent Horde" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
    <ColumnEntry
      title={{ hx: 'h4', text: "Umbral Nexus" }}>
      <p>{Tools.getLoremIpsum()}</p>
    </ColumnEntry>
  </>);
}

export default DemonClans;
