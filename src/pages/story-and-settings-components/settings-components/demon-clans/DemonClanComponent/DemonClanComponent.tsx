import { ReactNode } from "react";
import { HeaderSize } from "../../../../../ts-types/types";
import Hx from "../../../../../common-design/Hx/Hx";
import "./DemonClanComponent.css";
import { useTheme } from "../../../../../hooks/useTheme";
import { FactionTheme } from "../../../../../types/theme";
import { DemonFactionTags, OtherFactionTags, PluralizedFactionTags } from "../../../../../ts-types/tag-types";

type Props = {
  title: DemonFactionTags | OtherFactionTags | PluralizedFactionTags;
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

  return (<div className="demon-clan-component">
    <Hx className={`title ${factionCoreName.toLocaleLowerCase()} ${isAccepted ? 'selected' : ''}`} hx={hx}>
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
