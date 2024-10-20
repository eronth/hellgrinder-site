import GameTitle from "./GameTitle";
import NavCluster from "./common-design/nav/NavCluster";

export default function FancyIndexPage() {
  return (<div className='fancy-index'>
    <GameTitle />
    <NavCluster />
  </div>);
}