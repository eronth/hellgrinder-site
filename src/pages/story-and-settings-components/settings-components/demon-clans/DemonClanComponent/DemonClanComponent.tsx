import { ReactNode } from "react";
import { HeaderSize } from "../../../../../ts-types/types";
import Hx from "../../../../../common-design/Hx/Hx";
import "./DemonClanComponent.css";
import { useTheme } from "../../../../../hooks/useTheme";
import { FactionTheme } from "../../../../../types/theme";

type Props = {
  title: string;
  hx: HeaderSize;
  children: ReactNode;
  buttonText: {
    offer: string;
    renounce: string;
  }
};
export default function DemonClanComponent ({ title, hx, buttonText, children }: Props) {
  const { factionTheme,setFactionTheme } = useTheme();

  const { offer, renounce } = buttonText;

  // Title to css class
  const titleClass = title.toLowerCase().replace(/\s+/g, '-');
  const titleArr = title.split(' ');
  const factionCoreName = titleArr[0];
  const factionStructure = titleArr[titleArr.length - 1];

  const isAccepted = factionTheme === factionCoreName.toLowerCase();

  const onClickOath = () => {
    if (isAccepted) {
      setFactionTheme('default');
      return;
    }
    setFactionTheme(factionCoreName.toLowerCase() as FactionTheme);
  };
  // Swear
  // Submit
  // Pledge
  // Vow
  // Oath
  // Allegiance
  // Bond
  // Covenant
  // Pact
  // Promise
  // Commitment
  // Assurance
  // Undertaking
  // Agreement
  // Contract
  // Alliance
  // Fealty
  // Loyalty

  // Swear Fealty
  // Submit your Mind
  // Pledge your Soul
  // Vow your... soul?
  // Take the Oath
  // Accept the Darkness

  return (<div className="demon-clan-component">
    <Hx className={`title ${factionCoreName.toLocaleLowerCase()}`} hx={hx}>
      {title}
      <button
        className="oath-button"
        onClick={onClickOath}
      >
        {isAccepted ? renounce : offer}
      </button>
    </Hx>
    {children}
  </div>)
};
