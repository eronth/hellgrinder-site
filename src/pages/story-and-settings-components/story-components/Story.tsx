import Hx from '../../../common-design/Hx/Hx';
import Faction from '../../../common-design/story-references/Faction';
import TM from '../../../common-design/TM';

function Story() {

  const majorHeader = 'h3';
  const minorHeader = 'h4';

  return (<>
    <Hx hx={majorHeader}>The Situation</Hx>
    <div className='lore-columns'>
      {/*<!-- Hell's Invasion -->*/}
      <Hx hx={minorHeader}>Hell's Invasion</Hx>
      <p>
        In the far off year of 2001, hell broke loose... literally. Gaping holes opened in the earth as demons of all clans
        poured into the world, looking for souls to harvest and lands to conquer. The world was in chaos, and the first
        24 hours of the invasion saw the deaths of millions. Governments worldwide quickly mobilized their military forces
        to combat the new threat.
      </p>
      <p>
        The demons' natural strength were superior to the average human, and the mastery of magic created new threats, but
        the demons were not invincible. The humans had technology on their side, and the demons were not prepared for the
        might of the modern military infrastructure. Anywhere the militaries of earth met demons in warfare, demons were
        crushed. Units tasked with pushing demons back to the hells they came from were quickly trained and deployed,
        and the war on soon hell began.
      </p>

      {/*<!-- The war on hell -->*/}
      <Hx hx={minorHeader}>The War on Hell</Hx>
      <p>
        When humankind began to push through the gates into hell itself, they quickly discovered that the demons were not
        the only threat. The various landscapes of hell was as dangerous and varied as the demons themselves, and the
        humans quickly found themselves fighting for their lives against the very ground they walked on. The demons had no
        such issues, and the humans' advances were quickly halted.
      </p>
      <p>
        Humanity needed a new weapons and equipment, something that could turn the tide of the war. They needed something
        that could combat the demons and the hellish landscapes. They needed something that could even the odds as they
        marched deeper into the depths. They needed access to the Arcane.
      </p>

      {/*<!-- Materials and research... -->*/}
      <Hx hx={minorHeader}>Netherworld Materials</Hx>
      <p>
        The materials of hell were unlike anything found on earth. Each region had a new and strange set of substances to
        study. With each advance came new materials, with new materials came new studies and discoveries, and with new
        discovery came new advancement in weapons, armor, and knowledge of the Arcane.
      </p>
      <p>
        In order to spur soldiers to push into the depths to secure the resources, the military began to offer rewards
        for the discovery of new material nodes and the capture of new territories. Promises of wealth, power, and
        lands to rule over were given to those who could secure the most valuable resources.
      </p>
      <p>
        Unfortunately, seeking such materials proved difficult. Hell would warp its pathways, making it hard to repeat
        journeys to known resource nodes.
      </p>

      <Hx hx={minorHeader}>Resources of Value</Hx>
      <p>
        The most valuable resources that were quickly discovered were:
      </p>
      <ul>
        <li>Brimstone and brimsteel from the Infernal Location (TODO: FIX ME).</li>
        <li>Demonhides and apathal coral from the Shoalpocked Expanse.</li>
        <li>Nearly any large foliage from the Twisted Wilds.</li>
        <li>Inversion cores and fool's dirt from the Deepblind Caverns.</li>
        <li>Ghostrot essences, everblood pools, and ichormud from the Ghastcursed Villages.</li>
        <li>Aukageolt and it's various related minerals from the Zephyrian Spires.</li>
      </ul>

      {/*<!-- Safelight discovered... -->*/}
      <Hx hx={minorHeader}>Safelight Discovered</Hx>
      <p>
        That was before the discovery of a new material that
        came to be known as Safelight<TM/> by the research team that first discovered it's . Safelight<TM/> seemed
        like a
        little touch of heaven in the depths of hell. Research into the material quickly determined large quantities
        warded off demons, creating a safe zone for humans to build more permanent camps and fortifications — proper
        bases to operate out of. Beyond that, Safelight could be used in smaller quantities to recover even some of the
        most grievous wounds, allowing squads of soldiers to act more independently and with greater courage.
      </p>

      {/*<!-- The Safelight project... -->*/}
      <Hx hx={minorHeader}>The Safelight Project</Hx>
      <p>
        Once the potential of Safelight was discovered, the military, with the help of Afterworld Research Corp, quickly
        began to invest in the material. Operations were set up to secure the material, bring back samples for study, and
        to begin distribution of Safelight Shards to the front lines. The Safelight Project was born.
      </p>
      <p>
        Under the Safelight Project, all soldiers were guaranteed at least two Safelight Shards to carry with them, along
        with a <i>mostly</i> updated list of known Safelight havens, so long as they kept securing and retrieving valuable
        resources. The project is largely considered a success, and the front lines began to push deeper into hell.
      </p>
    </div>

    <hr />

    {/*<!-- The Hellgrinder -->*/}
    <Hx hx={majorHeader}>The Hellgrinder</Hx>
    <div className={'lore-columns'}>
      <p>
        The Hellgrinder was the next invention by Afterworld Research Corp
        under the Safelight Project. The Hellgrinder
        was a specialized drill, imbued with tiny flecks of
        Safelight<TM /> that allowed it to bore through the toughest
        walls of Hell and create passageways that resisted the
        warping of Hell's pathways.
      </p>
      <p>
        Though slow to operate, the
        Hellgrinder was a massive success, and the military quickly
        began to use it to create new predictable paths
        between Safelight Havens and forward operations.
      </p>
      <p>
        The Hellgrinder was developed in a number of sizes and
        designs for a a variety of vehicle options.
      </p>

      <Hx hx={minorHeader}>Hellshaper</Hx>
      <p>
        Hellshapers are large boring machines, capable of making pathways large enough for heavy tanks and artillery to
        pass through. Hellshapers move exceedingly slow, meaning each one needs to be allocated to a carefully planned
        operation.
      </p>
      <p>
        Hellshapers are also the most expensive to operate, requiring a large crew and a large amount of resources
        to keep running. Generally, operations not deploying from Safelight Havens might deploy from a Hellshaper instead, as
        it acts as a barely mobile base of its own.
      </p>

      <Hx hx={minorHeader}>ARC Grinder</Hx>
      <p>
        The Advanced Recon Carrier (ARC) Grinders are medium sized boring machines, capable of making pathways large enough for light tanks and
        armored personnel carriers to pass through. ARC Grinders move at a moderate pace, and can be deployed in a variety
        of operations.
      </p>
      <p>
        One of the most common uses of an ARC Grinder is establishing a new Safelight Haven, as it can
        be equipped with a larger Safelight Gemstone on to act as a small pocket of safety wherever it deploys. The mechanism
        is designed to be broken down and reassembled into more permanent shelter.
      </p>

      <Hx hx={minorHeader}>Squad Transport</Hx>
      <p>
        The simple name Squad Transport is apt. It is a relatively small boring machine, with enough room for a
        squad of soldiers inside. It can be deployed to quickly move soldiers to their next operation or objective,
        and provides enough space for a squad to rest and recover between operations.
      </p>
      <p>
        Squad Transports are equipped with small to medium sized Safelight Gemstones, a precaution for the soldiers
        now isolated from their larger division.
      </p>

      <Hx hx={minorHeader}>Tactical Insertion Strike Craft (TISC)</Hx>
      <p>
        A squad can use 1-3 TISCs to quickly deploy to a designated location. Each TISC is capable of holding up to 3 soldiers
        and their gear. All TISCs sport extra armor in key locations, allowing it to act as cover for soldiers as they exit
        the craft, usually into combat. A TISC carries no Safelight Gemestones, aside from the shards carried by the soldiers
        inside.
      </p>

      <Hx hx={minorHeader}>Scouter Pod</Hx>
      <p>
        A Scouter Pod is a small, single person boring machine. It is used to scout ahead of the main force, looking for
        advantageous positions or weaknesses in enemy defenses. A Scouter Pod can often be deployed with more precision
        than a TISC, allowing for advantageous positioning of a single soldier.
      </p>
      <p>
        Scouter Pods are less commonly produced, and not all squads are equipped with them. Those that find them in their
        equipment list enjoy more robust tactics when deploying to new operations, and can sometimes employ one for a
        mid-operation repositioning. A squad might only have one, or two if they are lucky.
      </p>
    </div>

    <hr />

    {/*<!-- Soldiers -->*/}
    <Hx hx={majorHeader}>Those who Delve</Hx>
    <div className='lore-columns'>
      <Hx hx={minorHeader}>Soldiers</Hx>
      <p>
        The soldiers who delve deep into Hell are officially designated as the <b>Descent Corps</b>,
        though on Earth they are sometimes praised as <b>Redeemers</b>. 
        Most simply call them <b>Delvers</b>. Among the deployed, cynicism runs deep;
        soldiers of the Decent Corps often refer to themselves
        as <b>Wyrmfood</b>, as a show of hopelessness.
      </p>
      <p>
        The standard infantryman of a Delver team is often referred to as a Grunt, 
        though this term is not officially recognized by the military. They are responsible
        for the bulk of the fighting and reconnaissance beyond the safe zones.
      </p>
      <p>    
        The path-boring teams are known by the soldiers as <b>Grind Corps</b>, sometimes
        called <b>Gravediggers</b> by those who believe humanity is barreling towards its own ruin
        through these operations.
        They are supported by the <b>Drill Rats</b> or <b>Pit Rats</b>; soldiers in charge of
        the maintenance of the Hellgrinders and related equipment.
      </p>
      <p>
        <b>EchoTechs</b> — or simply <b>ETs</b> — manage communication arrays, 
        maintaining chatter both within Hell <i>and</i> between the
        underworld and Earth.
      </p>
      <p>
        The <b>Long-Haulers</b> keep the front stocked with munitions, food, and oxygen,
        walking the same carved tunnels day after day to ensure the Delvers are never cut off.
        Their route work is constant and perilous; they must constantly correct changes in the
        terrain or eliminate new demon threats else they risk cutting off the front
        lines from their supplies.
      </p>
      <p>
        A team's <b>Artifactors</b> work with the new resources of hell to
        create improved weapons, armor, and equipment
        to help soldiers survive and delve the harsh environments
        of hell.
      </p>
      <p>
        Teams will occasionally have an artifactor
        deployed with them for on-the-spot repairs and as-needed
        inventions and constructions. With how new the
        resources of hell are to humans, many of these inventions
        and constructions are inherently unsafe
        and may have unintended side effects. Still, soldiers
        are often thankful to have a Delver-Engineer on their team.
      </p>
      <p>
        With the advent of Safelight, medical personnel rarely
        deploy deep into hell, instead staying well behind front
        lines as a last resort for medical needs. Their focus is on
        creating stim pacs and other enhancing drugs to keep soldiers
        in the field longer.
      </p>

      <Hx hx={minorHeader}>Denizens' Names</Hx>
      <p>
        The denizens of Hell have their own names for the intrusive humanity.
        The <Faction>Legion</Faction> refers to the soldiers as "<b>False Flames</b>", alluding to
        the human penchant for fire
        and explosive technology, none of which matches the "true fire" of infernal power.
      </p>
      <p>
        The <Faction>Vastfathom League</Faction> calls the soldiers "<b>Acolytes</b>",
        indicating their belief that 
        humans have arrived in hell to join the League itself, even if they do not yet know it.
      </p>
      <p>
        The <Faction>Umbral Nexus</Faction> refers to Delvers as "<b>Exhumers</b>",
        believing they are here
        to dig up and steal the secrets of the darkness.
      </p>
      <p>
        Meanwhile, the <Faction>Thornwraith Bloom</Faction>, speaking only through connected thoughts, seems to
        see the soldiers as new limbs to connect to <b>The Bloom</b>. Those who don't or won't
        submit their mind are the "<b>Infestation</b>".
      </p>
      <p>
        The Stoneveined Choir call soldiers the "<b>Noise</b>" or the "<b>Dissodants</b>",
        believing them to be a disruption to the hymns they sing.
      </p>
    </div>

  </>);
}

export default Story;