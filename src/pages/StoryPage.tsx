import GameTitle from "../GameTitle";
import Story from "./story-components/Story";
import NavTabs from "../common-design/nav/NavTabs";
import { TabType } from "../ts-types/types";

export default function StoryPage() {
  const page: TabType = 'story';

  return (<div className={'page ' + page}>
    <GameTitle />
    <NavTabs selectedTab={page} />
    <Story />
    <hr />
  </div>);
}