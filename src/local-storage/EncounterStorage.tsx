import { Encounter, EncounterCreature, EncounterSet } from '../ts-types/encounter-types';
import CreatureRegistry from '../data/creatures/creature-registry';

const STORAGE_KEY = 'hellgrinder_encounters';
const STORAGE_VERSION = '3.0.0';

interface EncounterCreatureSaved {
  id: string;
  creatureId: string;
  currentHealth: number;
  maxHealth: number;
  notes?: string;
}

interface EncounterSaved {
  id: string;
  name: string;
  creatures: EncounterCreatureSaved[];
}

export interface EncounterSetSaved {
  version: string;
  encounters: Record<string, EncounterSaved>;
  activeEncounterId: string;
  order: string[];
  lastSaved: string;
}

export class EncounterStorage {

  private static generateId(): string {
    return `encounter-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  private static defaultEncounterSet(): EncounterSet {
    const id = this.generateId();
    const encounter: Encounter = { id, name: 'Encounter 1', creatures: [] };
    return { encounters: { [id]: encounter }, activeEncounterId: id, order: [id] };
  }

  private static deserializeCreature(saved: EncounterCreatureSaved): EncounterCreature | null {
    const creature = CreatureRegistry[saved.creatureId];
    if (!creature) {
      console.warn(`Creature '${saved.creatureId}' not found in registry — skipping`);
      return null;
    }
    return {
      id: saved.id,
      creature,
      currentHealth: saved.currentHealth,
      maxHealth: saved.maxHealth,
      notes: saved.notes,
    };
  }

  private static deserializeEncounterSet(data: EncounterSetSaved): EncounterSet {
    const encounters: Record<string, Encounter> = {};

    Object.entries(data.encounters).forEach(([id, saved]) => {
      const creatures = saved.creatures
        .map(c => this.deserializeCreature(c))
        .filter((c): c is EncounterCreature => c !== null);
      encounters[id] = { id: saved.id, name: saved.name, creatures };
    });

    if (Object.keys(encounters).length === 0) return this.defaultEncounterSet();

    let activeId = data.activeEncounterId;
    if (!encounters[activeId]) {
      activeId = data.order.find(id => encounters[id]) ?? Object.keys(encounters)[0];
    }

    const order = data.order.filter(id => encounters[id]);
    Object.keys(encounters).forEach(id => {
      if (!order.includes(id)) order.push(id);
    });

    return { encounters, activeEncounterId: activeId, order };
  }

  private static serializeEncounterSet(encounterSet: EncounterSet): EncounterSetSaved {
    const encounters: Record<string, EncounterSaved> = {};

    Object.entries(encounterSet.encounters).forEach(([id, encounter]) => {
      encounters[id] = {
        id: encounter.id,
        name: encounter.name,
        creatures: encounter.creatures.map(ec => ({
          id: ec.id,
          creatureId: ec.creature.id,
          currentHealth: ec.currentHealth,
          maxHealth: ec.maxHealth,
          notes: ec.notes,
        })),
      };
    });

    return {
      version: STORAGE_VERSION,
      encounters,
      activeEncounterId: encounterSet.activeEncounterId,
      order: encounterSet.order,
      lastSaved: new Date().toISOString(),
    };
  }

  static saveEncounterSet(encounterSet: EncounterSet): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.serializeEncounterSet(encounterSet)));
      return true;
    } catch (error) {
      console.error('Failed to save encounter set:', error);
      return false;
    }
  }

  static loadEncounterSet(): EncounterSet {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return this.defaultEncounterSet();

      const data = JSON.parse(stored) as EncounterSetSaved;
      if (data.version !== STORAGE_VERSION) {
        console.log(`Discarding old encounter format (v${data.version}), starting fresh`);
        return this.defaultEncounterSet();
      }

      return this.deserializeEncounterSet(data);
    } catch (error) {
      console.error('Failed to load encounter set:', error);
      return this.defaultEncounterSet();
    }
  }

  private static sanitizeName(name: string): string {
    return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  private static downloadJson(data: EncounterSetSaved, filename: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static exportEncounterSet(encounterSet: EncounterSet): void {
    try {
      const date = new Date().toISOString().split('T')[0];
      this.downloadJson(this.serializeEncounterSet(encounterSet), `hellgrinder-all-encounters-${date}.json`);
    } catch (error) {
      console.error('Failed to export encounters:', error);
    }
  }

  static exportSingleEncounter(encounter: Encounter): void {
    try {
      const date = new Date().toISOString().split('T')[0];
      const name = this.sanitizeName(encounter.name) || 'encounter';
      const set: EncounterSet = {
        encounters: { [encounter.id]: encounter },
        activeEncounterId: encounter.id,
        order: [encounter.id],
      };
      this.downloadJson(this.serializeEncounterSet(set), `hellgrinder-encounter-${name}-${date}.json`);
    } catch (error) {
      console.error('Failed to export encounter:', error);
    }
  }

  static importEncounterSet(file: File): Promise<Record<string, Encounter>> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string) as EncounterSetSaved;
          if (data.version !== STORAGE_VERSION) {
            throw new Error(`Unsupported file version: ${data.version}`);
          }
          const encounterSet = this.deserializeEncounterSet(data);
          const imported: Record<string, Encounter> = {};
          Object.values(encounterSet.encounters).forEach(encounter => {
            const newId = this.generateId();
            imported[newId] = { ...encounter, id: newId };
          });
          resolve(imported);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  static createEncounter(name: string, encounterSet: EncounterSet): EncounterSet {
    const newEncounter: Encounter = {
      id: this.generateId(),
      name: name || 'New Encounter',
      creatures: []
    };
    return {
      ...encounterSet,
      encounters: { ...encounterSet.encounters, [newEncounter.id]: newEncounter },
      activeEncounterId: newEncounter.id,
      order: [...encounterSet.order, newEncounter.id]
    };
  }

  static deleteEncounter(encounterId: string, encounterSet: EncounterSet): EncounterSet {
    const updated = { ...encounterSet.encounters };
    delete updated[encounterId];
    const order = encounterSet.order.filter(id => id !== encounterId);

    let activeId = encounterSet.activeEncounterId;
    if (activeId === encounterId || !updated[activeId]) {
      activeId = order[0];
      if (!activeId) {
        const def = { id: this.generateId(), name: 'Encounter 1', creatures: [] };
        updated[def.id] = def;
        activeId = def.id;
        order.push(def.id);
      }
    }

    return { encounters: updated, activeEncounterId: activeId, order };
  }

  static renameEncounter(encounterId: string, newName: string, encounterSet: EncounterSet): EncounterSet {
    if (!encounterSet.encounters[encounterId]) return encounterSet;
    return {
      ...encounterSet,
      encounters: {
        ...encounterSet.encounters,
        [encounterId]: { ...encounterSet.encounters[encounterId], name: newName }
      }
    };
  }

  static reorderEncounters(newOrder: string[], encounterSet: EncounterSet): EncounterSet {
    return { ...encounterSet, order: newOrder };
  }
}
