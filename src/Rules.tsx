import Story from "./rules-components/story-section/Story";
import HowToPlay from "./rules-components/rules-section/HowToPlay";
import CharacterCreation from "./rules-components/character-creation-section/CharacterCreation";

export default function Rules() {
  return (
    <div className="rules">
      <div className="main-title">
        <h1>Hellgrinder</h1>
      </div>
      <Story />
      <HowToPlay />
      <CharacterCreation />
    </div>
  );
}
