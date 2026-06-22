import Page from "../../../common-design/Page";
import { TabType } from "../../../ts-types/types";
import LoreSubNav from "../LoreSubNav";
import StoryContent from "./StoryContent";

export default function StoryPage() {
  const page: TabType = "lore";

  return (
    <Page pageType={page}>
      <LoreSubNav current="story" />
      <StoryContent />
    </Page>
  );
}
