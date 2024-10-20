import { Link } from 'react-router-dom';

type Tabs = "home" | "story" | "setting" | "how-to-play" | "character-creation" | "additional-equipment" | "advanced-perks" | "items";

type Props = {
  selectedTab: Tabs;
}

const NavTabs = ({selectedTab}: Props) => {
  
  function getClassForTab(tab: Tabs) {
    const sel = 'selected-tab';
    const unsel = 'unselected-tab';
    return tab == selectedTab ? sel : unsel;
  }

  return (
    <nav className="navbar navtabs">
      <div className={getClassForTab('home')}>
        <Link to="/">Home</Link>
      </div>
      <div className={getClassForTab('story')}>
        <Link to="/story">Story</Link>
      </div>
      <div className={getClassForTab('setting')}>
        <Link to="/setting">Setting</Link>
      </div>
      <div className={getClassForTab('how-to-play')}>
        <Link to="/how-to-play">How to Play</Link>
      </div>
      <div className={getClassForTab('character-creation')}>
        <Link to="/character-creation">Character Creation</Link>
      </div>
      <div className={getClassForTab('additional-equipment')}>
        <Link to="/additional-equipment">Additional Equipment</Link>
      </div>
      <div className={getClassForTab('advanced-perks')}>
        <Link to="/advanced-perks">Advanced Perks</Link>
      </div>
      <div className={getClassForTab('items')}>
        <Link to="/items">Items</Link>
      </div>
    </nav>
  );
}

export default NavTabs;