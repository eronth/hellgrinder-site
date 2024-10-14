import Reference from "./Reference";

type Props = {
  className?: string;
  children: string | JSX.Element | JSX.Element[] | undefined;
};

function Faction({className, children}: Props) {
  return (
    <Reference className={`faction ${className}`}>
      {children}
    </Reference>
  );
}

export default Faction;