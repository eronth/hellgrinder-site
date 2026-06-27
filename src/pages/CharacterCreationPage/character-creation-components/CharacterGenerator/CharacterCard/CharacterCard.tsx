import React from "react";
import { CharacterDesign, CharacterKitLocks, CharacterLocks, CharacterStats, DEFAULT_KIT_LOCKS } from "../../../../../ts-types/player-character-types.tsx";
import { Kit, Perk } from "../../../../../ts-types/types.tsx";
import CharacterStatsGrid from "../CharacterStatsGrid/CharacterStatsGrid.tsx";
import InventoryManager from "../InventoryManager";
import StatusEffectsManager from "../StatusEffectsManager/StatusEffectsManager.tsx";
import EditableCharacterName from "./EditableCharacterName/EditableCharacterName.tsx";
import CharacterInventoryDisplay from "./CharacterInventoryDisplay/CharacterInventoryDisplay.tsx";
import DeleteCharacterButton from "./DeleteCharacterButton/DeleteCharacterButton.tsx";
import SpecializationSection from "./SpecializationSection/SpecializationSection.tsx";
import KitSlot from "./KitSlot/KitSlot.tsx";
import PerksSection from "./PerksSection/PerksSection.tsx";
import "./CharacterCard.css";

const BASE_SUPPORT_KITS = 1;

type Props = {
  character: CharacterDesign;
  characters: CharacterDesign[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterDesign[]>>;
  setSelectedCharacterId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function CharacterCard({
  character,
  characters,
  setCharacters,
  setSelectedCharacterId,
}: Props) {

  // Convention: kits[0] = combat kit, kits[1..] = support kits
  const combatKit: Kit | null = character.kits[0] ?? null;
  const supportKits: Kit[] = character.kits.slice(1);

  function updateCharacterName(newName: string) {
    if (newName.trim() === '') return;
    setCharacters(prev =>
      prev.map(c =>
        c.id === character.id
          ? { ...c, name: newName.trim() }
          : c
      )
    );
  }

  function updateCharacterStats(newStats: CharacterStats) {
    setCharacters(prev =>
      prev.map(c =>
        c.id === character.id
          ? { ...c, stats: { ...character.stats, ...newStats } }
          : c
      )
    );
  }

  function updateCharacter(characterId: string, updates: Partial<CharacterDesign>) {
    setCharacters(prev =>
      prev.map(char =>
        char.id === characterId
          ? { ...char, ...updates }
          : char
      )
    );
  }

  function updateLocks(updates: Partial<CharacterLocks>) {
    updateCharacter(character.id, { locks: { ...character.locks, ...updates } });
  }

  function updateKitLocks(kitIndex: number, updates: Partial<CharacterKitLocks>) {
    const currentKitLocks = [...(character.locks?.kits ?? [])];
    const existing = currentKitLocks[kitIndex] ?? { ...DEFAULT_KIT_LOCKS };
    currentKitLocks[kitIndex] = { ...existing, ...updates };
    updateLocks({ kits: currentKitLocks });
  }

  function handleSetSpecialization(bonus: string, penalty: string) {
    updateCharacter(character.id, { specializationBonus: bonus, specializationPenalty: penalty });
  }

  function handleSetCombatKit(newKit: Kit) {
    const oldKitExtra = combatKit?.extraPerkPoints ?? 0;
    const newKitExtra = newKit.extraPerkPoints ?? 0;
    const newSupportCount = BASE_SUPPORT_KITS + (newKit.extraSupportKits ?? 0);

    // Trim support kits if new kit gives fewer support slots
    const trimmedSupport = supportKits.slice(0, newSupportCount);

    // Adjust perk points by the delta between old and new kit extras
    const perkPointsDelta = newKitExtra - oldKitExtra;

    updateCharacter(character.id, {
      kits: [newKit, ...trimmedSupport],
      startingSupportKits: newSupportCount,
      stats: {
        ...character.stats,
        perkPoints: character.stats.perkPoints + perkPointsDelta,
      },
    });
  }

  function handleSetSupportKit(newKit: Kit, slotIndex: number) {
    const newSupport = [...supportKits];
    newSupport[slotIndex] = newKit;
    updateCharacter(character.id, {
      kits: combatKit ? [combatKit, ...newSupport] : [...newSupport],
    });
  }

  function handleSetPerks(newPerks: Perk[]) {
    const oldSpent = character.perks.reduce((sum, p) => sum + p.cost, 0);
    const newSpent = newPerks.reduce((sum, p) => sum + p.cost, 0);
    const totalBudget = character.stats.perkPoints + oldSpent;
    const newRemaining = totalBudget - newSpent;

    const oldCorruptionFromPerks = character.perks.reduce((sum, p) => sum + (p.startingCorruption ?? 0), 0);
    const newCorruptionFromPerks = newPerks.reduce((sum, p) => sum + (p.startingCorruption ?? 0), 0);
    const corruptionDelta = newCorruptionFromPerks - oldCorruptionFromPerks;

    updateCharacter(character.id, {
      perks: newPerks,
      stats: {
        ...character.stats,
        perkPoints: Math.max(0, newRemaining),
        corruption: character.stats.corruption + corruptionDelta,
      },
    });
  }

  return (<>
    <div className="name-header">
      <div className="character-name">
        <EditableCharacterName
          selectedCharacter={character}
          onUpdateName={updateCharacterName}
        />
      </div>
      <div>
        <StatusEffectsManager
          character={character}
          selectedCharacterId={character.id}
          onUpdateCharacter={updateCharacter}
        />
        {character.id && (
          <DeleteCharacterButton
            character={character}
            setSelectedCharacterId={setSelectedCharacterId}
            characters={characters}
            setCharacters={setCharacters}
          />
        )}
      </div>
    </div>

    <div className="col-handler">
      {/* Column 1: Stats, Specialization, Standard Issue, Perks */}
      <div>
        <CharacterStatsGrid
          currentHealth={character.stats.health.current}
          maxHealth={character.stats.health.max}
          injuries={character.stats.injuries}
          speed={character.stats.speed}
          corruption={character.stats.corruption}
          perkPoints={character.stats.perkPoints}
          safelightShards={character.stats.safelightShards}
          attackBonus={character.stats.attackBonus}
          isEditable={true}
          customSkill={character.stats.customSkill}
          onStatsChange={(newStats) => updateCharacterStats(newStats)}
        />

        <SpecializationSection
          character={character}
          onSetSpecialization={handleSetSpecialization}
          locked={character.locks?.specialization}
          onToggleLock={() => updateLocks({ specialization: !character.locks?.specialization })}
        />

        <div className="standard-issue-kit-block">
          <div className="title">Standard Issue Equipment</div>
          <div className="description">
            This kit contains your standard issue equipment such as
            a flashlight, canteen, flares, rope, and other
            basic operational gear.
          </div>
        </div>

        <PerksSection
          character={character}
          onSetPerks={handleSetPerks}
          locked={character.locks?.perks}
          onToggleLock={() => updateLocks({ perks: !character.locks?.perks })}
        />
      </div>

      {/* Column 2: Combat kit slot */}
      <KitSlot
        kitType="combat"
        kit={combatKit}
        character={character}
        onSetKit={handleSetCombatKit}
        kitLocks={character.locks?.kits[0] ?? DEFAULT_KIT_LOCKS}
        onKitLocksChange={(updates) => updateKitLocks(0, updates)}
      />

      {/* Column 3+: Support kit slots */}
      {Array.from({ length: character.startingSupportKits }, (_, i) => (
        <KitSlot
          key={i}
          kitType="support"
          kit={supportKits[i] ?? null}
          character={character}
          onSetKit={(kit) => handleSetSupportKit(kit, i)}
          kitLocks={character.locks?.kits[1 + i] ?? DEFAULT_KIT_LOCKS}
          onKitLocksChange={(updates) => updateKitLocks(1 + i, updates)}
        />
      ))}
    </div>

    <div className="notes-block">
      <div className="notes-title">Notes</div>
      <textarea
        className="notes-textarea"
        value={character.notes ?? ''}
        onChange={(e) => updateCharacter(character.id, { notes: e.target.value })}
        placeholder="Track anything you want here..."
        rows={5}
      />
    </div>
    <div className="inventory-button-container">
      <InventoryManager
        characters={characters}
        selectedCharacterId={character.id}
        onUpdateCharacter={updateCharacter}
      />
    </div>
    <div>
      <CharacterInventoryDisplay character={character} />
    </div>
  </>);
}
