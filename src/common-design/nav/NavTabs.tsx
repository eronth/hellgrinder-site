import { Link } from 'react-router-dom';
import { TabType } from '../../ts-types/types';


type Props = {
  selectedTab: TabType;
}

const NavTabs = ({selectedTab}: Props) => {
  
  function getClassForTab(tab: TabType) {
    const sel = 'selected-tab';
    const unsel = 'unselected-tab';
    return tab == selectedTab ? sel : unsel;
  }

  return (
    <nav className="navbar navtabs">
      <Link to="/story" className={getClassForTab('story')}>
        <div>Story</div>
      </Link>
      <Link to="/setting" className={getClassForTab('setting')}>
        <div>Setting</div>
      </Link>
      <Link to="/how-to-play" className={getClassForTab('how-to-play')}>
        <div>How to Play</div>
      </Link>
      <Link to="/character-creation" className={getClassForTab('character-creation')}>
        <div>Character Creation</div>
      </Link>
      <Link to="/additional-equipment" className={getClassForTab('additional-equipment')}>
        <div>Equipment</div>
      </Link>
      <Link to="/perks" className={getClassForTab('advanced-perks')}>
        <div>Advanced</div>
      </Link>
      <Link to="/magic" className={getClassForTab('magic')}>
        <div>Magic</div>
      </Link>
      <Link to="/creatures" className={getClassForTab('creatures')}>
        <div>Creatures</div>
      </Link>
    </nav>
  );
}

export default NavTabs;