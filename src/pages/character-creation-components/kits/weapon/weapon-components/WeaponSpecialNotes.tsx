type Props = {
  className?: string;
  effects?: string[];
};

export default function WeaponSpecialNotes({ className, effects }: Props) {

  function getWeaponNotesList() {
    if (!effects) {
      return null;
    } else if (effects.length === 1) {
      return <>
        <div className={className}><b>Special</b>: {effects[0]}</div>
      </>;
    } else {
      return <>
        <div className={className}><b>Special</b>:</div>
        <ul className={className}>
          {effects.map((e, i) => <li key={`weapon-special-${i}`}>{e}</li>)}
        </ul>
      </>;
    }
  }

  return (<>{getWeaponNotesList()}</>);
}