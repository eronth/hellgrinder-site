import Page from "../common-design/Page";
import { TabType } from "../ts-types/types";
import BloodflipButton from "./story-and-settings-components/settings-components/BloodflipButton/BloodflipButton";
import SettingContent from "./story-and-settings-components/settings-components/SettingPage";

export default function SettingPage() {
  const page: TabType = "lore";

  return (
    <Page pageType={page}>
      <BloodflipButton />
      <SettingContent />
    </Page>
  );
}
