import Tools from '../Tools';
import ColumnEntry from '../common-design/ColumnEntry';
import DemonClans from './demon-clans/DemonClans';

function Story() {

  return (<div>

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
      
      <ColumnEntry
        title={{ hx: 3, text: "Other Factions" }}>
        <p>{Tools.getLoremIpsum()}</p>
      </ColumnEntry>

        <ColumnEntry
          title={{ hx: 4, text: "Death's Hand" }}>
          <p>{Tools.getLoremIpsum()}</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "Forgefiend Syndicate" }}>
          <p>{Tools.getLoremIpsum()}</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "Heaven's Host" }}>
          <p>{Tools.getLoremIpsum()}</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "Voidfire Conclave" }}>
          <p>{Tools.getLoremIpsum()}</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "Witch Covens" }}>
          <p>{Tools.getLoremIpsum()}</p>
        </ColumnEntry>

      <ColumnEntry
        title={{ hx: 3, text: "Realms of the Netherworld" }}>
        <p>{Tools.getLoremIpsum()}</p>
      </ColumnEntry>

        <ColumnEntry
          title={{ hx: 4, text: "Infernal" }}>
          <p>Infernal</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "Shoalpocked Expanse" }}>
          <p>Abyss</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "Deepwind Caverns" }}>
          <p>Stoneveined</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "The Zephyrian Spires" }}>
          <p>Nethercurrent</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "Twisted Wilds" }}>
          <p>Verdant</p>
        </ColumnEntry>
        <ColumnEntry
          title={{ hx: 4, text: "Ghastcursed Villages" }}>
          <p>When a village, town, or city fades into obscurity, all but forgotten by the mortal people, where does it go? The Ghastcursed Villages — which, despite the name, can be as vast and sprawling as cities — are the haunting remains of ghost towns of the mortal realms. These rustic, dilapidated settlements bear an uncanny resemblance to human towns, though almost all modern technology has been replaced by ancient, eerie renditions. The creatures of the Umbral Nexus take up residence in these villages, undisturbed by the town’s ever-present hunger to drain the life force of any who dare to linger too long.</p>
        </ColumnEntry>
    </div>
  </div>);
}

export default Story;