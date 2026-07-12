import { Route, Routes } from "react-router-dom";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import FancyIndexPage from "./pages/FancyIndexPage/FancyIndexPage";
import StoryAndSettingPage from "./pages/LorePage/StoryAndSettingPage";
import StoryPage from "./pages/LorePage/StoryPage/StoryPage";
import SettingPage from "./pages/LorePage/SettingPage/SettingPage";
import HowToPlayPage from "./pages/HowToPlayPage/HowToPlayPage";
import CharacterCreationPage from "./pages/CharacterCreationPage/CharacterCreationPage";
import CharacterCreationRulesPage from "./pages/CharacterCreationPage/CharacterCreationRulesPage";
import CharacterGeneratorPage from "./pages/CharacterCreationPage/CharacterGeneratorPage";
import EquipmentAndPerksPage from "./pages/EquipmentAndPerksPage";
import MagicPage from "./pages/MagicPage";
import CreaturesPage from "./pages/CreaturePage/CreaturesPage";
import MagicSpellPage from "./pages/MagicSpellPage";
import ReferencePage from "./pages/ReferencePage/ReferencePage";

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
        <Route path="/equipment-and-perks" element={<EquipmentAndPerksPage />} />
        <Route path="/reference" element={<ReferencePage />} />
        {/* Legacy routes kept so existing links/bookmarks still resolve. */}
        <Route path="/additional-equipment" element={<EquipmentAndPerksPage />} />
        <Route path="/perks" element={<EquipmentAndPerksPage />} />
        <Route path="/magic" element={<MagicPage />} />
        <Route path="/creatures" element={<CreaturesPage />} />
        <Route path="/magic-spell" element={<MagicSpellPage />} />
      </Routes>
    </div>
  );
}
