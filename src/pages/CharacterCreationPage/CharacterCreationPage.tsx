import { Link } from "react-router-dom";
import Page from "../../common-design/Page";
import { TabType } from "../../ts-types/types";
import "./CharacterCreationChooser.css";

export default function CharacterCreationPage() {
  const page: TabType = 'character-creation';

  return (
    <Page pageType={page} pageClassName="character-creation-chooser-page">
      <section className="character-creation-chooser" aria-label="Character creation section choices">
        <Link to="/character-creation/rules" className="character-creation-chooser-card">
          <h2>Creation Rules</h2>
          <p>
            Read the rules for building a character: core stats, kits, and perks.
          </p>
          <span className="character-creation-chooser-card-cta">Open Rules</span>
        </Link>

        <Link to="/character-creation/generator" className="character-creation-chooser-card">
          <h2>Character Generator</h2>
          <p>
            Build and manage your character with an interactive sheet.
          </p>
          <span className="character-creation-chooser-card-cta">Open Generator</span>
        </Link>
      </section>
    </Page>
  );
}
