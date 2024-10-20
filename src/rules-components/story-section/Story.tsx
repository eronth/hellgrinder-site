import Tools from '../../common-design/Tools';
import ColumnEntry from '../../common-design/ColumnEntry';

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
    </div>
    
    

  </>);
}

export default Story;