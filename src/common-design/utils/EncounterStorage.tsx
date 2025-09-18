
import { Encoderizer } from "./Encoderizer";
import { Decoderizer } from "./Decoderizer";
import { Encounter } from "../../ts-types/encounter-types";

const STORAGE_KEY = 'hellgrinder_encounters';
const STORAGE_VERSION = '1.0.0';

export interface EncounterStorageData {
  version: string;
  encounters: Encounter[];
  lastSaved: string;
  currentEncounter?: Encounter;
}

export interface EncounterExportData extends EncounterStorageData {
  exportDate: string;
  appName: string;
}

/**
 * Encounter Storage Utility
 * Handles persistence, import/export for Hellgrinder encounter data
 */
export class EncounterStorage {


  /**
   * Save current encounter to localStorage
   */
  static saveCurrentEncounter(encounter: Encounter): boolean {
    try {
      const data: EncounterStorageData = {
        version: STORAGE_VERSION,
        encounters: [], // For future: could save multiple encounters
        lastSaved: new Date().toISOString(),
        currentEncounter: encounter
      };

      Encoderizer.encoderizer(encounter);

      console.log('Saving encounter:', data);
      console.log('Stringified data:', JSON.stringify(data));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log(`Saved encounter with ${encounter.creatures.length} creatures to localStorage`);
      return true;
    } catch (error) {
      console.error('Failed to save encounter:', error);
      return false;
    }
  }

  /**
   * Load current encounter from localStorage
   */
  static loadCurrentEncounter(): Encounter {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        console.log('No saved encounter found');
        return { creatures: [] };
      }

      const data: EncounterStorageData = JSON.parse(stored);
      data.currentEncounter = Decoderizer.decoderizer(data.currentEncounter);
      
      // Version compatibility check
      if (data.version !== STORAGE_VERSION) {
        console.warn(`Version mismatch: stored ${data.version}, current ${STORAGE_VERSION}`);
        // Could implement migration logic here if needed
      }

      const encounter = data.currentEncounter || { creatures: [] };
      console.log(`Loaded encounter with ${encounter.creatures.length} creatures from localStorage`);
      return encounter;
    } catch (error) {
      console.error('Failed to load encounter:', error);
      return { creatures: [] };
    }
  }

  /**
   * Clear saved encounter
   */
  static clearEncounterStorage(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Cleared encounter storage');
      return true;
    } catch (error) {
      console.error('Failed to clear encounter storage:', error);
      return false;
    }
  }

  /**
   * Export encounter to JSON file
   */
  static exportEncounter(encounter: Encounter): void {
    try {
      const exportData: EncounterExportData = {
        version: STORAGE_VERSION,
        encounters: [],
        lastSaved: new Date().toISOString(),
        currentEncounter: encounter,
        exportDate: new Date().toISOString(),
        appName: 'Hellgrinder Encounter Builder'
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hellgrinder-encounter-${new Date().toISOString().split('T')[0]}.json`;
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
          const data: EncounterExportData = JSON.parse(content);
          
          // Validate data structure
          if (!data.currentEncounter || !Array.isArray(data.currentEncounter.creatures)) {
            throw new Error('Invalid encounter file format');
          }
          
          console.log('Encounter imported successfully');
          resolve(data.currentEncounter);
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
  static getStorageInfo(): { hasData: boolean; lastSaved?: string; creatureCount: number } {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return { hasData: false, creatureCount: 0 };
      }

      const data: EncounterStorageData = JSON.parse(stored);
      return {
        hasData: true,
        lastSaved: data.lastSaved,
        creatureCount: data.currentEncounter?.creatures.length || 0
      };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { hasData: false, creatureCount: 0 };
    }
  }
}
