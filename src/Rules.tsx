import { Route, Routes } from "react-router-dom";
import ThemeSwitcher from "./components/ThemeSwitcher";
import FancyIndexPage from "./pages/FancyIndexPage/FancyIndexPage";
import StoryAndSettingPage from "./pages/LorePage/StoryAndSettingPage";
import StoryPage from "./pages/LorePage/StoryPage/StoryPage";
import SettingPage from "./pages/LorePage/SettingPage/SettingPage";
import HowToPlayPage from "./pages/HowToPlayPage/HowToPlayPage";
import CharacterCreationPage from "./pages/CharacterCreationPage/CharacterCreationPage";
import CharacterCreationRulesPage from "./pages/CharacterCreationPage/CharacterCreationRulesPage";
import CharacterGeneratorPage from "./pages/CharacterCreationPage/CharacterGeneratorPage";
import AdditionalEquipmentPage from "./pages/AdditionalEquipmentPage";
import AdvancedPerksPage from "./pages/AdvancedPerksPage";
import MagicPage from "./pages/MagicPage";
import CreaturesPage from "./pages/CreaturePage/CreaturesPage";
import MagicSpellPage from "./pages/MagicSpellPage";

export default function Rules() {
  return (
    <div className="rules">
      <ThemeSwitcher />
      <Routes>
        <Route path="/" element={<FancyIndexPage />} />
        <Route path="/lore" element={<StoryAndSettingPage />} />
        <Route path="/lore/story" element={<StoryPage />} />
        <Route path="/lore/setting" element={<SettingPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/character-creation" element={<CharacterCreationPage />} />
        <Route path="/character-creation/rules" element={<CharacterCreationRulesPage />} />
        <Route path="/character-creation/generator" element={<CharacterGeneratorPage />} />
        <Route path="/additional-equipment" element={<AdditionalEquipmentPage />} />
        <Route path="/perks" element={<AdvancedPerksPage />} />
        <Route path="/magic" element={<MagicPage />} />
        <Route path="/creatures" element={<CreaturesPage />} />
        <Route path="/magic-spell" element={<MagicSpellPage />} />
      </Routes>
    </div>
  );
}
