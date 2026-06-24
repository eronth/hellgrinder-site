import { CharacterDesign } from "../../CharacterGenerator";
import KitComponent from "../../../kits/Kit.tsx";

type Props = {
  character: CharacterDesign;
}
export default function CharacterKitsDisplay({ character }: Props) {
  return (<>
    {character.kits.map((k, i) =>
      <KitComponent key={`kit-${i}`} kit={k}/>
    )}
  </>);
}