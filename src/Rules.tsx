import { Route, Routes } from "react-router-dom";
import FancyIndexPage from "./FancyIndexPage";
import StoryPage from "./pages/StoryPage";
import SettingPage from "./pages/SettingPage";
import HowToPlayPage from "./pages/HowToPlayPage";
import CharacterCreationPage from "./pages/CharacterCreationPage";
import AdditionalEquipmentPage from "./pages/AdditionalEquipmentPage";
import AdvancedPerksPage from "./pages/AdvancedPerksPage";
import MagicPage from "./pages/MagicPage";

export default function Rules() {
  return (
    <div className="rules">
      <Routes>
        <Route path="/" element={<FancyIndexPage />} />
        
        <Route path="/story" element={<StoryPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/character-creation" element={<CharacterCreationPage />} />
        
        <Route path="/additional-equipment" element={<AdditionalEquipmentPage />} />
        <Route path="/advanced-perks" element={<AdvancedPerksPage />} />
        <Route path="/magic" element={<MagicPage />} />
      </Routes>
    </div>
  );
}
