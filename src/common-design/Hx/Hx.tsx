import { ReactNode } from "react";
import { HeaderSize } from "../../ts-types/types";

type Props = {
  hx?: HeaderSize;
  className?: string;
  children: ReactNode;
};
export default function Hx({ hx, className, children }: Props) {

  function getHeaderSetup() {
    // If there is no title, return null
    //if (!title) { return null; }

    // Convert hx value to the 'hx' format if it is a number
    let hx_c: number | string = hx ? hx : 'defaults';
    if (typeof hx_c === 'number') { hx_c = hx_c.toString(); }
    if (hx_c[0] !== 'h') { hx_c = 'h' + hx_c; }

    switch (hx_c) {
      case 'h1':
        return <h1 className={className}>{children}</h1>;
      case 'h2':
        return <h2 className={className}>{children}</h2>;
      case 'h3':
        return <h3 className={className}>{children}</h3>;
      case 'h4':
        return <h4 className={className}>{children}</h4>;
      case 'h5':
        return <h5 className={className}>{children}</h5>;
      case 'h6':
        return <h6 className={className}>{children}</h6>;
      default:
        return <div className={`simple-header${className ? ' '+className : ""}`}>{children}</div>;
    }
  }

  return (
    <>{getHeaderSetup()}</>
  );
}
