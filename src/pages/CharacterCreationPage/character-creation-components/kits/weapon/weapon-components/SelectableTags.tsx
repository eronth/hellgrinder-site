import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tags from "../../../../../../components/keywords/Tags";
import { AllValidTags } from "../../../../../../ts-types/tag-types";
import { ChoiceTagOption, Weapon } from "../../../../../../ts-types/types";
import { faArrowRotateLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import SimpleLockButton from "../../../../../../components/common/SimpleLockButton/SimpleLockButton";

type Props = {
  choiceTags: Weapon['choiceTags'];
  choiceInteraction?: ChoiceInteraction;
};

export type ChoiceInteraction = {
  selectedTag: ChoiceTagOption | null;
  locked: boolean;
  onSelect: (tag: ChoiceTagOption) => void;
  onRandomize: () => void;
  onToggleLock: () => void;
  onReset: () => void;
};

export default function SelectableTags({
  choiceTags,
  choiceInteraction,
}: Props) {
  if (!choiceTags) { return null; }

  return (<>
    <div className={`choice-tags${choiceInteraction ? ' interactive' : ''}`}>
      <span>{choiceInteraction?.locked ? <>Chose </> : <>Choose </>}{choiceTags.count}:</span>
      <Tags
        tags={choiceTags.tags as AllValidTags[]}
        onTagClick={choiceInteraction && !choiceInteraction.locked
          ? (tag) => choiceInteraction.onSelect(tag as ChoiceTagOption)
          : undefined
        }
        selectedTags={choiceInteraction?.selectedTag
          ? [choiceInteraction.selectedTag as AllValidTags]
          : undefined
        }
        selectedOnly={choiceInteraction?.locked}
      />
      {choiceInteraction && (
        <span className="choice-controls">
          {!choiceInteraction.locked && choiceTags.count > 0 && (
            <button
              className="choice-action-btn choice-reset-btn"
              onClick={choiceInteraction.onReset}
              title="Reset"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
          {!choiceInteraction.locked && (
            <button
              className="choice-action-btn choice-randomize-btn"
              onClick={choiceInteraction.onRandomize}
              title="Randomize"
            >
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </button>
          )}
          <SimpleLockButton
            locked={choiceInteraction.locked}
            onToggle={choiceInteraction.onToggleLock}
            disabled={!choiceInteraction.selectedTag}
            lockedTitle="Unlock to change"
            unlockedTitle="Lock choice"
            className="choice-action-btn"
          />
        </span>
      )}
    </div>
  </>);
}
