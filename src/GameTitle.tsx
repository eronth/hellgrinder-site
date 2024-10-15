
export default function GameTitle() {

  const title = (
    <span className='title'>
      <span className='first-letter'>H</span>
      ellgrinde
      <span className='final-letter'>r</span>
    </span>
  );

  const titlesDesigns: JSX.Element[] = [
    <h1 className='lancelot'>
      {title}
    </h1>,
    <h1>
      {title}
    </h1>
  ];


  function getRandInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandElement<T>(arr: T[]): T {
    return arr[getRandInt(0, arr.length - 1)];
  }

  return (<span className='title-region'>{getRandElement(titlesDesigns)}</span>);
}