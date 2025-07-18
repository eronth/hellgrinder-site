
export default function RestAndRecover() {

  return (<>
    <h2>Rest and Recover</h2>
    <p>In order to rest safely in a realm as threatening as Hell, you need something arcane to assist you. Luckily, researchers have discovered the existence of gems capable of repelling demonic invasions. Dubbed “Safelight Gems” by the soldiers who use them, these gems have been invaluable in the fight against hellspawn.</p>
      
    <div className='col-handler'>
      
      <div>
        <div className={'simple-header'}>Safelight Geode</div>
        <p>These safelight crystal clusters create something of a safe-haven for those operating in Hell. Typically serving as large bases or the occasional settlement, these geodes are a welcome sight for any battered squad. While within range of a Safelight Geode, characters completely recharge their Safelight Shards and can expect virtually no demon interference, allowing for a complete recovery. If players spend just a few hours in the safety of a Safelight Geode, they completely heal all Injuries (including Critical Injuries) and heal up to their max health.</p>
      </div>
      <div>
        <div className='simple-header'>Safelight Gemstone</div>
        <p>These gemstones are extremely large and dense, making them impossible to move without the assistance of heavy machinery. Spending a charge on a Safelight Gemstone recharges all Safelight Shards and grants enough safety for sleep and recovery. Players can attempt a Recovery Check with a bonus of +5.</p>
      </div>
      <div>
        <div className='simple-header'>Safelight Shard</div>
        <p>These shards are small enough to be carried by individual soldiers. Unfortunately, breaking chunks from a Safelight Geode or Gemstone is not possible without proper equipment, so soldiers are assigned a limited number while scientists work on further advancements in SafeLiteTM technology. With just a moment of meditation, a character can grant themselves a few minutes of safety. When they do so, they roll Recovery Skill Check with a bonus of +2.</p>
      </div>
      
      
      <div>
        <h3>Recovery Check</h3>
        <p>
          When you use a safelight object to recover, you roll a Recovery Skill Check. When you do, you almost always heal,
          but the amount differs based on your success Rank.
        </p>
        <ul>
          <li>Rank 0 - Heal 2 health.</li>
          <li>Rank 1 - Remove one Light Injury, heal 3 health.</li>
          <li>Rank 2 - Remove one Light Injury, heal to max health.</li>
          <li>Rank 3 - (Remove one Light Injury and reduce one Serious Injury to Light) OR (completely remove one Serious Injury).</li>
        </ul>
      </div>
  
      <div>
        <h3>Squad and Reinforcements</h3>
        <p>
          Your group is a squad of roughly 15 soldiers — 15 reserve and as many active soldiers as there are 
          players — each with their own roles in the fight through Hell. The players will play just a handful 
          of these soldiers on any Operation.
          If the entire squad is ever depleted, that squad completely fails their mission.
          It is up to the GM what happens when a mission is failed — if another squad can try
          to swoop in later to clean up the mess or if the mission is abandoned.
        </p>
        <p>
          Whenever a player character falls in combat, the team is reinforced by a squadmate who is then generated and played by the player whose character died.
          It is generally assumed a squadmate will figure out some way to group up with the players’ characters, no matter how unlikely that would seem in the moment.
          Players can reinforce from the squad outside of combat for free, and can spend Heroic Medals to reinforce mid-combat as needed.
        </p>
      </div>
      
      <div>
        <h3>Gaining Squad Memebers</h3>
        <p>At the GM’s purview, there can be more members added to squads. In the chaotic combat zone of hell, these new members can be anything: rescued survivors from a previous attack; the remaining members of another battered squad; new recruits sent to the frontlines; etc. With things as uncoordinated as they are, it is likely that most existing squads contain none of their original members. It matters not, so long as the squad continues to fight.</p>
      </div>
  
    </div>
  </>);
}