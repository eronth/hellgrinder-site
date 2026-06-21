import GameTitle from "../GameTitle/GameTitle";
import NavTabs from "./nav/NavTabs";
import { TabType } from "../ts-types/types";

type Props = {
  children: React.ReactNode;
  pageType: TabType;
  pageClassName?: string;
};
export default function Page({ children, pageType, pageClassName = "" }: Props) {
  return (
    <div className={`page ${pageType} ${pageClassName}`.trim()}>
      <GameTitle />
      <NavTabs selectedTab={pageType} />
      <hr />
      {children}
      <hr />
    </div>
  );
}
