import { HeaderSize } from "../ts-types/types";

type Props = {
  column?: number;
  cssClass?: string;
  colSpan?: number;
  title: {
    hx?: HeaderSize,
    text: string
  } | undefined;
  children: string | JSX.Element | JSX.Element[] | undefined;
};

function ColumnEntry({cssClass, column, colSpan, title, children}: Props) {
  
  let finalCol: number | string | undefined = column;
  if (column && colSpan) {
    finalCol = `${column} / span ${colSpan}`;
  } else if (colSpan) {
    finalCol = `span ${colSpan}`;
  }
  
  const setStyle = {
    gridColumn: finalCol
  };

  function getHeaderSetup() {
    // If there is no title, return null
    if (!title) { return null; }

    // Convert hx value to the 'hx' format if it is a number
    let hx: number | string = title.hx ? title.hx : 'defaults';
    if (typeof hx === 'number') { hx = hx.toString(); }
    if (hx[0] !== 'h') { hx = 'h' + hx; }

    switch (hx) {
      case 'h1':
        return <h1>{title.text}</h1>;
      case 'h2':
        return <h2>{title.text}</h2>;
      case 'h3':
        return <h3>{title.text}</h3>;
      case 'h4':
        return <h4>{title.text}</h4>;
      case 'h5':
        return <h5>{title.text}</h5>;
      case 'h6':
        return <h6>{title.text}</h6>;
      default:
        return <div className="simple-header">{title.text}</div>;
    }
  }

  return (
    <div style={setStyle} className={cssClass}>
      {getHeaderSetup()}
      {children}
    </div>
  );
}

export default ColumnEntry;