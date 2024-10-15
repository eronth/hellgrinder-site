import Story from "./rules-components/story-section/Story";
import HowToPlay from "./rules-components/rules-section/HowToPlay";
import CharacterCreation from "./rules-components/character-creation-section/CharacterCreation";
import GameTitle from "./GameTitle";

export default function Rules() {
  return (
    <div className="rules">
      <GameTitle />
      <Story />
      <HowToPlay />
      <CharacterCreation />
    </div>
  );
}
