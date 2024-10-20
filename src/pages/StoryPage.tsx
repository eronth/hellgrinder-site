import GameTitle from "../GameTitle";
import Story from "./story-components/Story";
import NavTabs from "../common-design/nav/NavTabs";

export default function StoryPage() {
  return (<div className='story'>
    <GameTitle />
    <NavTabs selectedTab="story"/>
    <Story />
    <hr />
  </div>);
}