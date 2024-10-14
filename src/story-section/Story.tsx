import Tools from '../Tools';
import ColumnEntry from '../common-design/ColumnEntry';
import DemonClans from './demon-clans/DemonClans';
import OtherFactions from './other-factions/OtherFactions';
import Locations from './locations/Locations';

function Story() {

  return (<>

    <h2>Story</h2>

    <div className='col-handler'>
      <ColumnEntry
        title={{ hx: 'h3', text: 'Hell\'s Invasion' }}>
        <p>{Tools.getLoremIpsum()}</p>
      </ColumnEntry>

      <ColumnEntry
        title={{ hx: 'h3', text: 'The War on Hell' }}>
        <p>{Tools.getLoremIpsum()}</p>
      </ColumnEntry>
      
      <br />

      <DemonClans />
      <OtherFactions />

      <Locations />
    </div>
  </>);
}

export default Story;