import GameTitle from "./GameTitle";
import { Link } from 'react-router-dom';

export default function FancyIndexPage() {
  return (<div className='fancy-index'>
    <GameTitle />
    <nav className="navbar">
      <div><Link to="/">Home</Link></div>
      <div><Link to="/story">Story</Link></div>
      <div><Link to="/setting">Setting</Link></div>
      <div><Link to="/how-to-play">How to Play</Link></div>
      <div><Link to="/character-creation">Character Creation</Link></div>
      <div><Link to="/additional-equipment">Additional Equipment</Link></div>
      <div><Link to="/advanced-perks">Advanced Perks</Link></div>
      <div><Link to="/items">Items</Link></div>
    </nav>
  </div>);
}