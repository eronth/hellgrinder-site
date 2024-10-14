import Story from "./story-section/Story";
import HowToPlay from "./rules-section/HowToPlay";

function Rules() {
  return (
    <div>
      <div className="main-title">
        <h1>Hellgrinder</h1>
      </div>
      <Story />
      <HowToPlay />
    </div>
  );
}

export default Rules;