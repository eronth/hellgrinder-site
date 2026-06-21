import { Link } from "react-router-dom";
import Page from "../common-design/Page";
import { TabType } from "../ts-types/types";
import "./StoryAndSettingPage.css";

export default function StoryAndSettingPage() {
  const page: TabType = 'lore';

  return (
    <Page pageType={page} pageClassName="story-setting-chooser-page">
      <section className="story-setting-chooser" aria-label="Story and setting choices">
        <Link to="/lore/story" className="story-setting-card">
          <h2>The Story</h2>
          <p>
            Read the big-picture timeline of the invasion, the rise of Safelight, and how the Hellgrinder changed war.
          </p>
          <span className="story-setting-card-cta">Open Story</span>
        </Link>

        <Link to="/lore/setting" className="story-setting-card">
          <h2>The Setting</h2>
          <p>
            Explore demon clans, rival factions, and hostile locations shaping every operation in Hell.
          </p>
          <span className="story-setting-card-cta">Open Setting</span>
        </Link>
      </section>
    </Page>
  );
}
