import GameTitle from "../../GameTitle/GameTitle";
import NavCluster from "../../components/nav/NavCluster";
//import './FancyIndexPage.css';

export default function FancyIndexPage() {
  return (<div className='fancy-index'>
    <GameTitle isIndex={true} />
    <NavCluster />
  </div>);
}
