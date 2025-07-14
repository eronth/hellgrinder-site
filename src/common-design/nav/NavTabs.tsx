import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TabType } from '../../ts-types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookSkull, faLightbulb, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavTabs.css';

type Props = {
  selectedTab: TabType;
}

const NavTabs = ({selectedTab}: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navEndDivClass: string = 'nav-tab-bumper';

  function getClassForTab(tab: TabType) {
    const sel = 'selected-tab';
    const unsel = 'unselected-tab';
    return tab == selectedTab ? sel : unsel;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/how-to-play", tab: "how-to-play" as TabType, label: "How to Play", icon: faLightbulb },
    { to: "/character-creation", tab: "character-creation" as TabType, label: "Character Creation", icon: faUser },
    { to: "/creatures", tab: "creatures" as TabType, label: "Creatures", icon: faBookSkull },
    { to: "/story-and-setting", tab: "story-and-setting" as TabType, label: "Story & Setting" },
    { to: "/additional-equipment", tab: "additional-equipment" as TabType, label: "Equipment" },
    { to: "/perks", tab: "advanced-perks" as TabType, label: "Perks" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Navigation */}
      <nav className="navbar navtabs desktop-nav">
        <div className={navEndDivClass} />
        {navLinks.map(link => (
          <Link 
            key={link.tab}
            to={link.to} 
            className={getClassForTab(link.tab)}
          >
            <div>
              {link.icon && <FontAwesomeIcon icon={link.icon} className='icon' />}
              {link.label}
            </div>
          </Link>
        ))}
        <div className={navEndDivClass} />
      </nav>

      {/* Mobile Sidebar */}
      <nav className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <h3>Navigation</h3>
          <button 
            className="mobile-sidebar-close"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="mobile-sidebar-content">
          {navLinks.map(link => (
            <Link 
              key={link.tab}
              to={link.to} 
              className={`mobile-nav-link ${selectedTab === link.tab ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {link.icon && <FontAwesomeIcon icon={link.icon} className='icon' />}
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default NavTabs;