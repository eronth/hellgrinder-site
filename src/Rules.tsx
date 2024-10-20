import { Route, Routes } from "react-router-dom";
import Story from "./rules-components/story-section/Story";
import HowToPlay from "./rules-components/rules-section/HowToPlay";
import CharacterCreation from "./rules-components/character-creation-section/CharacterCreation";
import GameTitle from "./GameTitle";
import FancyIndexPage from "./FancyIndexPage";

export default function Rules() {
  return (
    <div className="rules">
      {/* <GameTitle />
      <Story />
      <HowToPlay />
      <CharacterCreation /> */}
      <Routes>
        <Route path="/" element={<FancyIndexPage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        <Route path="/old" element={<div>
          <GameTitle />
          <Story />
          <HowToPlay />
          <CharacterCreation />
          </div>
        } />
      </Routes>
    </div>
  );
}
