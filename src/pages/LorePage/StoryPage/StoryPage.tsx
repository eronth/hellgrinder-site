import Page from "../../../components/common/Page/Page";
import SubPageNav from "../../../components/nav/SubPageNav";
import { TabType } from "../../../ts-types/types";
import StoryContent from "./StoryContent";

const LORE_SUB_PAGES = [
  { label: "Story", path: "/lore/story" },
  { label: "Setting", path: "/lore/setting" },
];

export default function StoryPage() {
  const page: TabType = "lore";

  return (
    <Page pageType={page}>
      <SubPageNav
        parentLabel="Lore"
        parentPath="/lore"
        subPages={LORE_SUB_PAGES}
        currentPath="/lore/story"
      />
      <StoryContent />
    </Page>
  );
}
