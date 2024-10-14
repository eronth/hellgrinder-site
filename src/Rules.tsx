import Story from "./story-section/Story";
import HowToPlay from "./rules-section/HowToPlay";
import CharacterCreation from "./rules-section/CharacterCreation";

export default function Rules() {
  return (
    <div>
      <div className="main-title">
        <h1>Hellgrinder</h1>
      </div>
      <Story />
      <HowToPlay />
      <CharacterCreation />
    </div>
  );
}
