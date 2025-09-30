import { HeaderSize } from "../ts-types/types";
import Hx from "./Hx/Hx";

type Props = {
  column?: number;
  cssClass?: string;
  colSpan?: number;
  title: {
    hx?: HeaderSize,
    text: string
  } | undefined;
  children: string | JSX.Element | JSX.Element[] |undefined;
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

  return (
    <div style={setStyle} className={cssClass}>
      {title && <Hx hx={title.hx} className={cssClass}>{title.text}</Hx>}
      {children}
    </div>
  );
}

export default ColumnEntry;