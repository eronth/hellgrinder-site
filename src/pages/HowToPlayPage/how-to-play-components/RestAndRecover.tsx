import Hx from "../../../components/common/generic/Hx/Hx";
import SkillCheck from "../../../components/keywords/SkillCheck/SkillCheck";
import Safelight from "../../../components/keywords/Safelight/Safelight";
import CheckResultsGrid from "./CheckResultsGrid/CheckResultsGrid";

export default function RestAndRecover() {
  const innerHx = 3;

  return (<>
    <Hx hx={2}>Rest and Recover</Hx>
      
    <div className='fluid-readable-columns'>
      <Hx hx={innerHx}>Resting in Hell</Hx>
      <p>
        In order to rest safely in a realm as threatening as Hell, you need something arcane to assist
        you. Luckily, researchers have discovered the existence of gems capable of repelling demonic 
        invasions. Dubbed “Safelight Gems” by the soldiers who use them, these gems have been invaluable
        in the fight against hellspawn.
      </p>

      <Hx hx={innerHx}>Types of Safelight</Hx>
      <Hx><Safelight tier={3} /></Hx>
      <p>
        These safelight crystal clusters create something of a safe-haven for those
        operating in Hell. Typically serving as large bases or the occasional settlement, these geodes
        are a welcome sight for any battered squad.
      </p>
      <p>
        While within range of a <Safelight tier={3} />,
        characters completely recharge their <Safelight plural /> and can expect virtually no demon
        interference, allowing for a complete recovery. If players spend just a few hours in the safety
        of a <Safelight tier={3} />, they completely heal all Injuries (including Critical Injuries)
        and heal up to their max health.
      </p>
    
      <Hx><Safelight tier={2} /></Hx>
      <p>
        These gemstones are extremely large and dense, making them impossible to move
        without the assistance of heavy machinery. Spending a charge on 
        a <Safelight tier={2} />
        recharges all <Safelight plural /> and grants enough safety for sleep and recovery. Players
        can attempt a Recovery Check with a bonus of +5.
      </p>

      <Hx><Safelight /></Hx>
      <p>
        These shards are small enough to be carried by individual
        soldiers. Unfortunately, breaking chunks
        from a <Safelight tier={3} /> or <Safelight tier={2} /> is not possible
        without proper equipment, so soldiers are assigned a
        limited number while scientists work on further
        advancements in SafeLite™ technology. With just a 
        moment of meditation, a character can grant themselves
        a few minutes of safety. When they do so,
        they roll a <SkillCheck tags={['Recovery']} /> with +2.
      </p>
      <p>
        <Safelight plural /> often bind themselves to their
        owner in mysterious ways. They tend to be non-transferrable,
        and break upon the owner's death. All <Safelight plural />
        owned by player characters start this way.
      </p>
      <p>
        <Safelight tier={0} /><br />
        <Safelight tier={1} /><br />
        <Safelight tier={2} /><br />
        <Safelight tier={3} /><br />

      </p>

      <Hx hx={innerHx}>Recovery Test</Hx>
      <p>
        When you use a Safelight object to recover, you roll a <SkillCheck tags={['Recovery']} />. 
        When you do, the amount you heal differs based on your success Rank.
        Remember, you gain a bonus to your roll based on what
        kind of Safelight object you are using.
      </p>
      <CheckResultsGrid results={{
        r0: <>Heal 2 health.</>,
        r1: <>Remove one Light Injury, heal 3 health.</>,
        r2: <>Remove one Light Injury, heal to max health.</>,
        r3: <>(Remove one Light Injury and reduce one Serious Injury to Light) OR (completely 
        remove one Serious Injury).</>,
      }} />
    </div>
  </>);
}
