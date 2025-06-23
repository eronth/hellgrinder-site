import Page from "../common-design/Page";
import Story from "./story-components/Story";
import { TabType } from "../ts-types/types";

export default function StoryPage() {
  const page: TabType = 'story';

  return (<Page pageType={page}>
    <Story />
  </Page>);
}