export default function BasicCheckResultsTable() {
  return (
    <table className="basic-check-result-table">
      <tbody>
      <tr>
        <th>Result</th>
        <th>Rank</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>4-7</td>
        <td>Rank&nbsp;0</td>
        <td>You fail at whatever you're attempting to accomplish.</td>
      </tr>
      <tr>
        <td>8-11</td>
        <td>Rank&nbsp;1</td>
        <td>
          You succeed at a minor level. You partially succeed at your efforts, or some complications
          that arise with the success.
        </td>
      </tr>
      <tr>
        <td>12-15</td>
        <td>Rank&nbsp;2</td>
        <td>
          You succeed at your task. There are no extra complications from your efforts.
        </td>
      </tr>
      <tr>
        <td>16-18</td>
        <td>Rank&nbsp;3</td>
        <td>
          You succeed at your task with a flourish. You often gain extra benefits for your efforts, or
          a bonus to your next Skill Check.
        </td>
      </tr>
      </tbody>
    </table>
  )
};
