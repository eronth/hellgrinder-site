import Reference from "./Reference";

type Props = {
  className?: string;
  children: string | JSX.Element | JSX.Element[] | undefined;
};

function Location({className, children}: Props) {
  return (
    <Reference className={`location ${className}`}>
      {children}
    </Reference>
  );
}

export default Location;