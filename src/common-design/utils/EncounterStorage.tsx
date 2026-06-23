import _ from "lodash";
import { Encoderizer } from "./Encoderizer";
import { Decoderizer } from "./Decoderizer";
import { Encounter, EncounterSet } from "../../ts-types/encounter-types";

const STORAGE_KEY = 'hellgrinder_encounters';
const STORAGE_VERSION = '2.0.0';

export interface EncounterStorageData {
  version: string;
  encounters: Record<string, Encounter>;
  activeEncounterId: string;
  order?: string[];
  lastSaved: string;
  currentEncounter?: Encounter; // Legacy support
}

export interface EncounterExportData {
  version: string;
  encounter: Encounter;
  exportDate: string;
  appName: string;
}

/**
 * Encounter Storage Utility
 * Handles persistence, import/export for Hellgrinder encounter data
 */
export class EncounterStorage {

  private static generateId(): string {
    return `encounter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create a default encounter
   */
  private static createDefaultEncounter(): Encounter {
    return {
      id: this.generateId(),
      name: 'Encounter 1',
      creatures: []
    };
  }

  /**
   * Save all encounters to localStorage
   */
  static saveEncounterSet(encounterSet: EncounterSet): boolean {
    try {
      const encountersCopy = _.cloneDeep(encounterSet.encounters);
      const encodedEncounters: Record<string, Encounter> = {};

      Object.entries(encountersCopy).forEach(([id, encounter]) => {
        encodedEncounters[id] = Encoderizer.encoderizer(encounter);
      });

      const data: EncounterStorageData = {
        version: STORAGE_VERSION,
        encounters: encodedEncounters,
        activeEncounterId: encounterSet.activeEncounterId,
        order: encounterSet.order,
        lastSaved: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log(`Saved ${Object.keys(encodedEncounters).length} encounters to localStorage`);
      return true;
    } catch (error) {
      console.error('Failed to save encounter set:', error);
      return false;
    }
  }

  /**
   * Load all encounters from localStorage
   */
  static loadEncounterSet(): EncounterSet {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        console.log('No saved encounters found, creating default');
        const defaultEncounter = this.createDefaultEncounter();
        return {
          encounters: { [defaultEncounter.id]: defaultEncounter },
          activeEncounterId: defaultEncounter.id,
          order: [defaultEncounter.id]
        };
      }

      const data: EncounterStorageData = JSON.parse(stored);

      // Handle legacy single encounter format (version 1.0.0)
      if (data.version === '1.0.0' && data.currentEncounter) {
        console.log('Migrating from legacy encounter format');
        const encounter: Encounter = {
          id: this.generateId(),
          name: 'Imported Encounter',
          creatures: data.currentEncounter.creatures
        };
        return {
          encounters: { [encounter.id]: encounter },
          activeEncounterId: encounter.id,
          order: [encounter.id]
        };
      }

      // Decode encounters
      const decodedEncounters: Record<string, Encounter> = {};
      Object.entries(data.encounters).forEach(([id, encounter]) => {
        decodedEncounters[id] = Decoderizer.decoderizer(_.cloneDeep(encounter));
      });

      // Validate active encounter ID exists
      let activeId = data.activeEncounterId;
      if (!decodedEncounters[activeId]) {
        activeId = Object.keys(decodedEncounters)[0] || this.createDefaultEncounter().id;
      }

      // Validate and rebuild order array
      let order = data.order || [];
      // Ensure all encounter IDs are in the order array
      const encounterIds = Object.keys(decodedEncounters);
      order = order.filter(id => decodedEncounters[id]);
      encounterIds.forEach(id => {
        if (!order.includes(id)) {
          order.push(id);
        }
      });

      const result: EncounterSet = {
        encounters: decodedEncounters,
        activeEncounterId: activeId,
        order
      };

      console.log(`Loaded ${Object.keys(decodedEncounters).length} encounters from localStorage`);
      return result;
    } catch (error) {
      console.error('Failed to load encounter set:', error);
      const defaultEncounter = this.createDefaultEncounter();
      return {
        encounters: { [defaultEncounter.id]: defaultEncounter },
        activeEncounterId: defaultEncounter.id,
        order: [defaultEncounter.id]
      };
    }
  }

  /**
   * Load current encounter from localStorage (legacy method for backwards compatibility)
   */
  static loadCurrentEncounter(): Encounter {
    const encounterSet = this.loadEncounterSet();
    return encounterSet.encounters[encounterSet.activeEncounterId];
  }

  /**
   * Save current encounter to localStorage (legacy method for backwards compatibility)
   */
  static saveCurrentEncounter(encounter: Encounter): boolean {
    // Load existing set
    const encounterSet = this.loadEncounterSet();

    // Update or create the active encounter
    if (!encounter.id) {
      encounter.id = this.generateId();
    }
    if (!encounter.name) {
      encounter.name = 'Unnamed Encounter';
    }

    encounterSet.encounters[encounter.id] = encounter;
    encounterSet.activeEncounterId = encounter.id;

    return this.saveEncounterSet(encounterSet);
  }

  /**
   * Clear all saved encounters
   */
  static clearEncounterStorage(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Cleared all encounters from storage');
      return true;
    } catch (error) {
      console.error('Failed to clear encounter storage:', error);
      return false;
    }
  }

  /**
   * Create a new encounter
   */
  static createEncounter(name: string, encounterSet: EncounterSet): EncounterSet {
    const newEncounter: Encounter = {
      id: this.generateId(),
      name: name || 'New Encounter',
      creatures: []
    };

    return {
      ...encounterSet,
      encounters: {
        ...encounterSet.encounters,
        [newEncounter.id]: newEncounter
      },
      activeEncounterId: newEncounter.id,
      order: [...encounterSet.order, newEncounter.id]
    };
  }

  /**
   * Delete an encounter
   */
  static deleteEncounter(encounterId: string, encounterSet: EncounterSet): EncounterSet {
    const updatedEncounters = { ...encounterSet.encounters };
    delete updatedEncounters[encounterId];
    const updatedOrder = encounterSet.order.filter(id => id !== encounterId);

    // If we deleted the active one, switch to the first available
    let activeId = encounterSet.activeEncounterId;
    if (activeId === encounterId || !updatedEncounters[activeId]) {
      activeId = updatedOrder[0];
      if (!activeId) {
        // If no encounters left, create a default one
        const defaultEncounter = this.createDefaultEncounter();
        updatedEncounters[defaultEncounter.id] = defaultEncounter;
        activeId = defaultEncounter.id;
        updatedOrder.push(defaultEncounter.id);
      }
    }

    return {
      encounters: updatedEncounters,
      activeEncounterId: activeId,
      order: updatedOrder
    };
  }

  /**
   * Rename an encounter
   */
  static renameEncounter(encounterId: string, newName: string, encounterSet: EncounterSet): EncounterSet {
    if (!encounterSet.encounters[encounterId]) {
      return encounterSet;
    }

    const updated = { ...encounterSet.encounters };
    updated[encounterId] = {
      ...updated[encounterId],
      name: newName
    };

    return {
      ...encounterSet,
      encounters: updated
    };
  }

  /**
   * Reorder encounters
   */
  static reorderEncounters(newOrder: string[], encounterSet: EncounterSet): EncounterSet {
    return {
      ...encounterSet,
      order: newOrder
    };
  }

  /**
   * Export encounter to JSON file
   */
  static exportEncounter(encounter: Encounter): void {
    try {
      const exportData: EncounterExportData = {
        version: STORAGE_VERSION,
        encounter: encounter,
        exportDate: new Date().toISOString(),
        appName: 'Hellgrinder Encounter Builder'
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hellgrinder-encounter-${encounter.name}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('Encounter exported successfully');
    } catch (error) {
      console.error('Failed to export encounter:', error);
    }
  }

  /**
   * Import encounter from file
   */
  static importEncounter(file: File): Promise<Encounter> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const data: any = JSON.parse(content);

          let encounter: Encounter;

          // Handle both new and legacy formats
          if (data.encounter) {
            encounter = data.encounter;
          } else if (data.currentEncounter) {
            encounter = {
              id: this.generateId(),
              name: 'Imported Encounter',
              creatures: data.currentEncounter.creatures
            };
          } else {
            throw new Error('Invalid encounter file format');
          }

          // Validate data structure
          if (!Array.isArray(encounter.creatures)) {
            throw new Error('Invalid encounter creatures array');
          }

          // Ensure encounter has required fields
          if (!encounter.id) encounter.id = this.generateId();
          if (!encounter.name) encounter.name = 'Imported Encounter';

          console.log('Encounter imported successfully');
          resolve(encounter);
        } catch (error) {
          console.error('Failed to parse encounter file:', error);
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Get storage statistics
   */
  static getStorageInfo(): { hasData: boolean; lastSaved?: string; encounterCount: number; totalCreatures: number } {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return { hasData: false, encounterCount: 0, totalCreatures: 0 };
      }

      const data: EncounterStorageData = JSON.parse(stored);
      let totalCreatures = 0;
      Object.values(data.encounters).forEach(encounter => {
        totalCreatures += encounter.creatures.length;
      });

      return {
        hasData: true,
        lastSaved: data.lastSaved,
        encounterCount: Object.keys(data.encounters).length,
        totalCreatures
      };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { hasData: false, encounterCount: 0, totalCreatures: 0 };
    }
  }
}

