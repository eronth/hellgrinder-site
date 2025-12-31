import GameTitle from "../GameTitle/GameTitle";
import NavTabs from "./nav/NavTabs";
import { TabType } from "../ts-types/types";

type Props = {
  children: React.ReactNode;
  pageType: TabType;
};
export default function Page({ children, pageType }: Props) {
  return (
    <div className={`page ${pageType}`}>
      <GameTitle />
      <NavTabs selectedTab={pageType} />
      <hr />
      {children}
      <hr />
    </div>
  );
}
