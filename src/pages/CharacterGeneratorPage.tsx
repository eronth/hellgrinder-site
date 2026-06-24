import Page from "../common-design/Page";
import SubPageNav from "../common-design/nav/SubPageNav";
import { TabType } from "../ts-types/types";
import CharacterGenerator from "./character-creation-components/CharacterGenerator/CharacterGenerator";

const CHARACTER_CREATION_SUB_PAGES = [
  { label: "Creation Rules", path: "/character-creation/rules" },
  { label: "Character Generator", path: "/character-creation/generator" },
];

export default function CharacterGeneratorPage() {
  const page: TabType = "character-creation";

  return (
    <Page pageType={page}>
      <SubPageNav
        parentLabel="Character Creation"
        parentPath="/character-creation"
        subPages={CHARACTER_CREATION_SUB_PAGES}
        currentPath="/character-creation/generator"
      />
      <CharacterGenerator />
    </Page>
  );
}
