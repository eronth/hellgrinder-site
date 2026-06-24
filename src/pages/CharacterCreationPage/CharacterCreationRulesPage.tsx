import Page from "../../common-design/Page";
import SubPageNav from "../../common-design/nav/SubPageNav";
import { TabType } from "../../ts-types/types";
import CharacterCreationRules from "./character-creation-components/CharacterCreationRules";

const CHARACTER_CREATION_SUB_PAGES = [
  { label: "Creation Rules", path: "/character-creation/rules" },
  { label: "Character Generator", path: "/character-creation/generator" },
];

export default function CharacterCreationRulesPage() {
  const page: TabType = "character-creation";

  return (
    <Page pageType={page}>
      <SubPageNav
        parentLabel="Character Creation"
        parentPath="/character-creation"
        subPages={CHARACTER_CREATION_SUB_PAGES}
        currentPath="/character-creation/rules"
      />
      <CharacterCreationRules />
    </Page>
  );
}
