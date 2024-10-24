type Props = {
  maxHealth?: number;
  injuries?: number;
  speed?: number;
  corruption?: number;
  perkPoints?: number;
  safelightShards?: number;
};

export default function CharacterStartingStatsTable({
        maxHealth = 6, injuries = 0, speed = 5, corruption = 0,
        perkPoints = 2, safelightShards = 2 }: Props)
  {
  return (
  <table>
    <tbody>
      <tr>
        <td colSpan={3}>{maxHealth} Max Health</td>
        <td colSpan={3}>{injuries} Injuries</td>
        <td colSpan={3}>{speed} Move Speed</td>
      </tr>
      <tr>
        <td colSpan={3}>{corruption} Corruption</td>
        <td colSpan={3}>{perkPoints} Perk Points</td>
        <td colSpan={3}>{safelightShards} Safelight Shards</td>
      </tr>
      <tr>
        <td colSpan={9}>
          +1 to your choice of [Short Range], [Medium Range], [Long Range], or Melee attacks (can be chosen at the end of character creation).
        </td>
      </tr>
    </tbody>
  </table>
  );
}