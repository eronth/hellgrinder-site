type Props = {
  className?: string;
  children: string | JSX.Element | JSX.Element[] | undefined;
};

function Reference({className, children}: Props) {
  return (<span className={`reference ${className}`}>
    {children}
  </span>);
}

export default Reference;