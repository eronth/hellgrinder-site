import { Route, Routes } from "react-router-dom";
import FancyIndexPage from "./pages/FancyIndexPage";
import StoryPage from "./pages/StoryPage";
import SettingPage from "./pages/SettingPage";
import HowToPlayPage from "./pages/HowToPlayPage";
import CharacterCreationPage from "./pages/CharacterCreationPage";
import CharacterGeneratorPage from "./pages/CharacterGeneratorPage";
import AdditionalEquipmentPage from "./pages/AdditionalEquipmentPage";
import AdvancedPerksPage from "./pages/AdvancedPerksPage";
import MagicPage from "./pages/MagicPage";
import CreaturesPage from "./pages/CreaturesPage";
import MagicSpellPage from "./pages/MagicSpellPage";

export default function Rules() {
  return (<>
    <div className="rules">
      <Routes>
        <Route path="/" element={<FancyIndexPage />} />
        
        <Route path="/story" element={<StoryPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/character-creation" element={<CharacterCreationPage />} />
        <Route path="/character-generator" element={<CharacterGeneratorPage />} />
        <Route path="/additional-equipment" element={<AdditionalEquipmentPage />} />
        <Route path="/advanced-perks" element={<AdvancedPerksPage />} />
        <Route path="/magic" element={<MagicPage />} />
        <Route path="/creatures" element={<CreaturesPage />} />
      </Routes>
    </div>
    <div>
      <Routes>
          <Route path="/magic-spell" element={<MagicSpellPage />} />
      </Routes>
    </div>
  </>);
}
