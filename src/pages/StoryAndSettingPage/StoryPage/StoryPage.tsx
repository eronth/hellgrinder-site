import Page from "../../../common-design/Page";
import { TabType } from "../../../ts-types/types";
import Story from "./StoryContent";

export default function StoryPage() {
  const page: TabType = "lore";

  return (
    <Page pageType={page}>
      <Story />
    </Page>
  );
}
