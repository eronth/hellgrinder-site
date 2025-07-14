import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookSkull, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './NavCluster.css';

const NavCluster = () => {
  return (
    <nav className="navbar navcluster">
      {/* Top Row */}
      <div><Link to="/how-to-play">
        <FontAwesomeIcon icon={faLightbulb} className='icon' />
        How to Play
      </Link></div>

      <div><Link to="/character-creation">
        <FontAwesomeIcon icon={faUser} className='icon'/>
        Character Creation
      </Link></div>

      <div><Link to="/creatures">
        <FontAwesomeIcon icon={faBookSkull} className='icon' />
        Creatures
      </Link></div>

      {/* Bottom Row */}
      <div><Link to="/story-and-setting">Story & Setting</Link></div>
      <div><Link to="/additional-equipment">Equipment</Link></div>
      <div><Link to="/perks">Perks</Link></div>


      {/* Unused links */}
      {/* <div><Link to="/setting">Setting</Link></div> */}
      {/* <div><Link to="/magic">Magic</Link></div> */}
    </nav>
  );
}

export default NavCluster;