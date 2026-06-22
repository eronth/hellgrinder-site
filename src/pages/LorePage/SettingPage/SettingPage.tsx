import Page from "../../../common-design/Page";
import { TabType } from "../../../ts-types/types";
import LoreSubNav from "../LoreSubNav";
import BloodflipButton from "./BloodflipButton/BloodflipButton";
import SettingContent from "./SettingContent";

export default function SettingPage() {
  const page: TabType = "lore";

  return (
    <Page pageType={page}>
      <LoreSubNav current="setting" />
      <BloodflipButton />
      <SettingContent />
    </Page>
  );
}
