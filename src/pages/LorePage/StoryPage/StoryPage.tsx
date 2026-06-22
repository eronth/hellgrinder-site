import Page from "../../../common-design/Page";
import { TabType } from "../../../ts-types/types";
import StoryContent from "./StoryContent";

export default function StoryPage() {
  const page: TabType = "lore";

  return (
    <Page pageType={page}>
      <StoryContent />
    </Page>
  );
}
