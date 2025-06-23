import { Link } from 'react-router-dom';
import { TabType } from '../../ts-types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookSkull, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './NavTabs.css';

type Props = {
  selectedTab: TabType;
}

const NavTabs = ({selectedTab}: Props) => {
  
  const navEndDivClass: string = 'nav-tab-bumper';

  function getClassForTab(tab: TabType) {
    const sel = 'selected-tab';
    const unsel = 'unselected-tab';
    return tab == selectedTab ? sel : unsel;
  }


  return (
    <nav className="navbar navtabs">
      <div className={navEndDivClass} />
      <Link to="/story-and-setting" className={getClassForTab('story-and-setting')}>
        <div>Story + Setting</div>
      </Link>
      
      {/* Start tabs with icons! */}
      <Link to="/how-to-play" className={getClassForTab('how-to-play')}>
        <div>
          <FontAwesomeIcon icon={faLightbulb} className='icon' />
          How to Play
        </div>
      </Link>
      <Link to="/character-creation" className={getClassForTab('character-creation')}>
        <div>
          <FontAwesomeIcon icon={faUser} className='icon' />
          Character Creation
        </div>
      </Link>
      <Link to="/creatures" className={getClassForTab('creatures')}>
        <div>
          <FontAwesomeIcon icon={faBookSkull} className='icon' />
          Creatures
        </div>
      </Link>
      {/* End tabs with icons! */}

      <Link to="/additional-equipment" className={getClassForTab('additional-equipment')}>
        <div>Equipment</div>
      </Link>
      <Link to="/perks" className={getClassForTab('advanced-perks')}>
        <div>Perks</div>
      </Link>
      
      <div className={navEndDivClass} />
      {/* Unused links */}
      {/* <Link to="/magic" className={getClassForTab('magic')}>
        <div>Magic</div>
      </Link> */}
    </nav>
  );
}

export default NavTabs;