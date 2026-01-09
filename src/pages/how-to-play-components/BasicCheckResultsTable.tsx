import CheckResultsGrid from "./CheckResultsGrid/CheckResultsGrid";

export default function BasicCheckResultsTable() {
  return (
    <CheckResultsGrid
      showNumeral={true}
      results={{
        r0: 'You fail at whatever you\'re attempting to accomplish.',
        r1: 'You succeed at a minor level. You partially succeed at your efforts, or some complications that arise with the success.',
        r2: 'You succeed at your task. There are no extra complications from your efforts.',
        r3: 'You succeed at your task with a flourish. You often gain extra benefits for your efforts, or a bonus to your next Skill Check.',
      }}
    />
  )
};
