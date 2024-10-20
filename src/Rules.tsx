import { Route, Routes } from "react-router-dom";
import StoryPage from "./pages/StoryPage";
import SettingPage from "./pages/SettingPage";
import HowToPlay from "./rules-components/rules-section/HowToPlay";
import CharacterCreation from "./rules-components/character-creation-section/CharacterCreation";
import FancyIndexPage from "./FancyIndexPage";

export default function Rules() {
  return (
    <div className="rules">
      <Routes>
        <Route path="/" element={<FancyIndexPage />} />
        
        <Route path="/story" element={<StoryPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        
        {/* </Routes><Route path="/additional-equipment" element={<AdditionalEquipment />} /> */}
        {/* </Routes><Route path="/advanced-perks" element={<AdvancedPerks />} /> */}
        {/* </Routes><Route path="/items" element={<Items />} /> */}
        {/* </Routes><Route path="/magic" element={<Magic />} /> */}
      </Routes>
    </div>
  );
}
