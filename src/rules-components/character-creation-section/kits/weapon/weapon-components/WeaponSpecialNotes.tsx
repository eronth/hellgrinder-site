type Props = {
  effects?: string[];
};

export default function WeaponSpecialNotes({effects}: Props) {

  function getWeaponNotesList() {
    if (!effects) {
      return null;
    } else if (effects.length === 1) {
      return <>
        <div><b>Special</b>: {effects[0]}</div>
      </>;
    } else {
      return <>
        <div><b>Special</b>:</div>
        <ul>
          {effects.map((e, i) => <li key={`weapon-special-${i}`}>{e}</li>)}
        </ul>
      </>;
    }
  }

  return (<>{getWeaponNotesList()}</>);
}