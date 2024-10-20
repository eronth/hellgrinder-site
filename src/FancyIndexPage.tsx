import GameTitle from "./GameTitle";
import NavTabs from "./common-design/nav/NavTabs";

export default function FancyIndexPage() {
  return (<div className='fancy-index'>
    <GameTitle />
    <NavTabs selectedTab="home" />
  </div>);
}