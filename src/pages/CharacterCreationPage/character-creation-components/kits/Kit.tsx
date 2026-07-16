import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import SimpleLockButton from '../../../../components/common/SimpleLockButton/SimpleLockButton';
import type { Item, Kit } from '../../../../ts-types/types';
import WeaponComponent from './weapon/WeaponComponent';
import ItemComponent from './item/ItemComponent.tsx';
import Training from './training/TrainingComponent';
import { ChoiceInteraction } from './weapon/weapon-components/SelectableTags.tsx';
import './Kit.css';

export type WeaponChoiceInteractions = Record<string, ChoiceInteraction>;

export type ItemChoiceInteraction = {
  selectedNames: string[];
  choiceCount: number;
  locked: boolean;
  onToggle: (itemName: string) => void;
  onRandomize: () => void;
  onToggleLock: () => void;
};

type Props = {
  needsCols?: boolean;
  kit: Kit;
  weaponChoiceInteractions?: WeaponChoiceInteractions;
  hideChoiceItems?: boolean;
  itemChoiceInteraction?: ItemChoiceInteraction;
};

function ItemChoiceSection({ items, interaction }: { items: Item[]; interaction: ItemChoiceInteraction }) {
  const { selectedNames, choiceCount, locked, onToggle, onRandomize, onToggleLock } = interaction;
  const allChosen = selectedNames.length >= choiceCount;
  const displayItems = locked ? items.filter(i => selectedNames.includes(i.name)) : items;

  return (
    <div className="item-choice-section">
      <div className="item-choice-header">
        <span className="item-choice-count">{selectedNames.length}/{choiceCount} chosen</span>
        <button
          className="choice-action-btn"
          onClick={onRandomize}
          disabled={locked}
          title="Randomize choices"
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </button>
        <SimpleLockButton
          locked={locked}
          onToggle={onToggleLock}
          disabled={!allChosen}
          lockedTitle="Unlock to change"
          unlockedTitle="Lock selection"
          className="choice-action-btn"
        />
      </div>
      <div className="item-choice-list">
        {displayItems.map((item, i) => {
          const isSelected = selectedNames.includes(item.name);
          return (
            <div
              key={i}
              className={`item-choice-card ${isSelected ? 'selected' : ''} ${locked ? '' : 'interactive'}`}
              onClick={() => !locked && onToggle(item.name)}
            >
              <ItemComponent item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Kit({ needsCols, kit, weaponChoiceInteractions, hideChoiceItems, itemChoiceInteraction }: Props) {
  const regularItems = kit.items.filter(i => !i.isChoiceItem);
  const choiceItems = kit.items.filter(i => i.isChoiceItem);

  function getKitBenefitPieces() {
    return (<>
      {kit.weapons.map((w, wi) =>
        <WeaponComponent
          weapon={w}
          key={`kit-${kit.name}-weapon-${wi}`}
          choiceInteraction={weaponChoiceInteractions?.[w.name]}
        />
      )}
      {regularItems.map((item, ii) =>
        <ItemComponent item={item} key={`kit-${kit.name}-item-${ii}`} />
      )}
      {choiceItems.length > 0 && !hideChoiceItems && (
        itemChoiceInteraction
          ? <ItemChoiceSection items={choiceItems} interaction={itemChoiceInteraction} />
          : choiceItems.map((item, ii) =>
              <ItemComponent item={item} key={`kit-${kit.name}-choice-item-${ii}`} />
            )
      )}
      {kit.trainings.map((t, ti) =>
        <Training training={t} key={`kit-${kit.name}-training-${ti}`} />
      )}
    </>);
  }

  function getKitBenefitsLayedOut() {
    if (needsCols) {
      return (<div className='col-handler'>{getKitBenefitPieces()}</div>);
    } else {
      return (<>{getKitBenefitPieces()}</>);
    }
  }

  return (<div className='kit'>
    <div className='kit-name'>{kit.name}</div>
    <div className='kit-description'>{kit.description}</div>
    <div className='benefits-label'>Kit Benefits:</div>
    <div className="benefits">
      {getKitBenefitsLayedOut()}
    </div>
  </div>);
}
