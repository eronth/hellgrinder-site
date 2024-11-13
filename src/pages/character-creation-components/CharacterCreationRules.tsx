import CreationCoreRules from "./CreationCoreRules.tsx";
import KitsListDisplayComponent from "./KitsListDisplayComponent.tsx";
import PerksListDisplayComponent from "./PerksListDisplayComponent.tsx";

export default function CharacterCreationRules() {
  
  return (<>
    <CreationCoreRules />
    <hr />
    <KitsListDisplayComponent />
    <hr />
    <PerksListDisplayComponent />
    <hr />
  </>);
}