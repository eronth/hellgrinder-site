import { CharacterDesign } from "../../pages/character-creation-components/CharacterGenerator/CharacterGenerator";

const STORAGE_KEY = 'hellgrinder_characters';
const STORAGE_VERSION = '1.0.0';

export interface StorageData {
  version: string;
  characters: CharacterDesign[];
  lastSaved: string;
  selectedCharacterId?: string;
}

export interface ExportData extends StorageData {
  exportDate: string;
  appName: string;
}

/**
 * Character Storage Utility
 * Handles persistence, import/export for Hellgrinder character data
 */
export class CharacterStorage {
  
  /**
   * Save characters to localStorage
   */
  static saveCharacters(characters: CharacterDesign[], selectedCharacterId?: string): boolean {
    try {
      const data: StorageData = {
        version: STORAGE_VERSION,
        characters: characters,
        lastSaved: new Date().toISOString(),
        selectedCharacterId: selectedCharacterId
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log(`Saved ${characters.length} characters to localStorage`);
      return true;
    } catch (error) {
      console.error('Failed to save characters:', error);
      return false;
    }
  }

  /**
   * Load characters from localStorage
   */
  static loadCharacters(): { characters: CharacterDesign[], selectedCharacterId?: string } {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        console.log('No saved characters found');
        return { characters: [] };
      }

      const data: StorageData = JSON.parse(stored);
      
      // Version compatibility check
      if (data.version !== STORAGE_VERSION) {
        console.warn(`Version mismatch: stored ${data.version}, current ${STORAGE_VERSION}`);
        // Could implement migration logic here if needed
      }

      // Fix corrupted status effects data - remove the effects array from serialized objects
      const cleanedCharacters = data.characters.map(char => ({
        ...char,
        statusEffects: char.statusEffects.map(statusEffect => {
          // If the effect has been serialized, it might have lost its React elements
          // Remove the effects property to avoid rendering issues
          if (statusEffect.effect && typeof statusEffect.effect === 'object') {
            const { effects, ...cleanEffect } = statusEffect.effect as any;
            return {
              ...statusEffect,
              effect: cleanEffect
            };
          }
          return statusEffect;
        })
      }));

      console.log(`Loaded ${cleanedCharacters.length} characters from localStorage`);
      return { 
        characters: cleanedCharacters || [], 
        selectedCharacterId: data.selectedCharacterId 
      };
    } catch (error) {
      console.error('Failed to load characters:', error);
      return { characters: [] };
    }
  }

  /**
   * Clear all saved characters
   */
  static clearStorage(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Cleared character storage');
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  }

  /**
   * Export characters to JSON file
   */
  static exportCharacters(characters: CharacterDesign[], selectedCharacterId?: string): void {
    try {
      const exportData: ExportData = {
        version: STORAGE_VERSION,
        characters: characters,
        lastSaved: new Date().toISOString(),
        selectedCharacterId: selectedCharacterId,
        exportDate: new Date().toISOString(),
        appName: 'Hellgrinder Character Generator'
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `hellgrinder_characters_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`Exported ${characters.length} characters`);
    } catch (error) {
      console.error('Failed to export characters:', error);
      throw new Error('Failed to export characters. Please try again.');
    }
  }

  /**
   * Import characters from JSON file
   */
  static importCharacters(file: File): Promise<{ characters: CharacterDesign[], selectedCharacterId?: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          
          // Validate the imported data structure
          if (!CharacterStorage.validateImportData(data)) {
            reject(new Error('Invalid file format. Please select a valid Hellgrinder character file.'));
            return;
          }

          // Extract characters and validate each one
          const characters = data.characters.map((char: CharacterDesign) => CharacterStorage.validateCharacter(char));

          console.log(`Successfully imported ${characters.length} characters`);
          resolve({ 
            characters: characters,
            selectedCharacterId: data.selectedCharacterId 
          });
        } catch (error) {
          console.error('Failed to parse import file:', error);
          reject(new Error('Failed to parse file. Please ensure it\'s a valid JSON file.'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file. Please try again.'));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Validate imported data structure
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static validateImportData(data: any): boolean {
    return (
      data &&
      typeof data === 'object' &&
      data.version &&
      Array.isArray(data.characters) &&
      data.appName === 'Hellgrinder Character Generator'
    );
  }

  /**
   * Validate and sanitize individual character data
   */
  private static validateCharacter(char: CharacterDesign): CharacterDesign {
    // Ensure all required fields exist with defaults
    return {
      id: char.id || `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: char.name || 'Imported Character',
      stats: {
        health: char.stats?.health || { current: 6, max: 6 },
        injuries: char.stats?.injuries || 0,
        speed: char.stats?.speed || 5,
        corruption: char.stats?.corruption || 0,
        perkPoints: char.stats?.perkPoints || 2,
        safelightShards: char.stats?.safelightShards || 2,
        attackBonus: char.stats?.attackBonus || 'Melee',
        customSkill: char.stats?.customSkill || ''
      },
      startingCombatKits: char.startingCombatKits || 1,
      startingSupportKits: char.startingSupportKits || 1,
      kits: Array.isArray(char.kits) ? char.kits : [],
      perks: Array.isArray(char.perks) ? char.perks : [],
      bonuses: Array.isArray(char.bonuses) ? char.bonuses : [],
      specializationBonus: char.specializationBonus || '',
      specializationPenalty: char.specializationPenalty || '',
      inventory: {
        weapons: Array.isArray(char.inventory?.weapons) ? char.inventory.weapons : [],
        items: Array.isArray(char.inventory?.items) ? char.inventory.items : []
      },
      statusEffects: Array.isArray(char.statusEffects) ? char.statusEffects : []
    };
  }

  /**
   * Get storage info for debugging/display
   */
  static getStorageInfo(): { hasData: boolean, characterCount: number, lastSaved?: string, storageSize: number } {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return { hasData: false, characterCount: 0, storageSize: 0 };
      }

      const data: StorageData = JSON.parse(stored);
      return {
        hasData: true,
        characterCount: data.characters.length,
        lastSaved: data.lastSaved,
        storageSize: new Blob([stored]).size
      };
    } catch (e) {
      console.error('Failed to get storage info:', e);
      return { hasData: false, characterCount: 0, storageSize: 0 };
    }
  }

  /**
   * Auto-save characters (debounced)
   */
  private static autoSaveTimeout: number | null = null;

  static autoSave(characters: CharacterDesign[], selectedCharacterId?: string, delay: number = 1000): void {
    if (CharacterStorage.autoSaveTimeout) {
      clearTimeout(CharacterStorage.autoSaveTimeout);
    }
    
    CharacterStorage.autoSaveTimeout = setTimeout(() => {
      CharacterStorage.saveCharacters(characters, selectedCharacterId);
    }, delay);
  }
}
