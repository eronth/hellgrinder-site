import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookSkull, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './NavCluster.css';

const NavCluster = () => {
  return (
    <nav className="navbar navcluster">
      {/* Top Row */}
      <Link to="/how-to-play">
        <FontAwesomeIcon icon={faLightbulb} className='icon' />
        How to Play
      </Link>

      <Link to="/character-creation">
        <FontAwesomeIcon icon={faUser} className='icon'/>
        Character Creation
      </Link>

      <Link to="/creatures">
        <FontAwesomeIcon icon={faBookSkull} className='icon' />
        Creatures
      </Link>

      {/* Bottom Row */}
      <Link to="/story-and-setting">Story & Setting</Link>
      <Link to="/additional-equipment">Equipment</Link>
      <Link to="/perks">Perks</Link>


      {/* Unused links */}
      {/* <Link to="/setting">Setting</Link> */}
      {/* <Link to="/magic">Magic</Link> */}
    </nav>
  );
}

export default NavCluster;