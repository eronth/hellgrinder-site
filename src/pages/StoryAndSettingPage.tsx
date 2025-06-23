import React from "react";
import Page from "../common-design/Page";
import { TabType } from "../ts-types/types";
import { Toggle } from "../common-design/Toggle/Toggle";
import SettingPage from "./story-and-settings-components/settings-components/SettingPage";
import Story from "./story-and-settings-components/story-components/Story";
import BloodflipButton from "./story-and-settings-components/settings-components/BloodflipButton/BloodflipButton";

export default function StoryAndSettingPage() {
  const page: TabType = 'story-and-setting';
  const [showStory, setShowStory] = React.useState(true);

  const onToggleClick = () => {
    setShowStory(!showStory);
  };

  return (
    <Page pageType={page}>
      <Toggle 
        label={{ left: 'The Story', right: 'The Setting' }}
        toggled={!showStory}
        onClick={onToggleClick}
      />
      <hr />
      <BloodflipButton />
      {
        showStory
          ? <Story />
          : <SettingPage />
      }
    </Page>
  );
}
