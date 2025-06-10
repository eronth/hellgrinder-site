import React from 'react';
import { CharDesign } from './CharacterGenerator';
import { CharacterStorage } from '../../common-design/utils/CharacterStorage';
import './ImportExportPanel.css';

interface Props {
  characters: CharDesign[];
  selectedCharacterId?: string;
  onCharactersImported: (characters: CharDesign[], selectedCharacterId?: string) => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

export default function ImportExportPanel({ 
  characters, 
  selectedCharacterId, 
  onCharactersImported, 
  onError, 
  onSuccess 
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      CharacterStorage.exportCharacters(characters, selectedCharacterId);
      onSuccess(`Successfully exported ${characters.length} character(s)`);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Export failed');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const { characters: importedCharacters, selectedCharacterId: importedSelectedId } = 
        await CharacterStorage.importCharacters(file);
      
      onCharactersImported(importedCharacters, importedSelectedId);
      onSuccess(`Successfully imported ${importedCharacters.length} character(s)`);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Import failed');
    } finally {
      setIsImporting(false);
      // Reset the file input so the same file can be imported again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearStorage = () => {
    if (window.confirm('Are you sure you want to clear all saved character data? This action cannot be undone.')) {
      CharacterStorage.clearStorage();
      onSuccess('Character storage cleared');
    }
  };

  const storageInfo = CharacterStorage.getStorageInfo();

  return (
    <div className="import-export-panel">
      <button 
        className="panel-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        📁 Character Data Management
        <span className={`toggle-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="panel-content">
          <div className="panel-section">
            <h4>💾 Save & Load</h4>
            <p className="section-description">
              Characters are automatically saved to your browser's local storage.
            </p>
            
            {storageInfo.hasData && (
              <div className="storage-info">
                <div className="info-item">
                  <span className="info-label">Saved Characters:</span>
                  <span className="info-value">{storageInfo.characterCount}</span>
                </div>
                {storageInfo.lastSaved && (
                  <div className="info-item">
                    <span className="info-label">Last Saved:</span>
                    <span className="info-value">
                      {new Date(storageInfo.lastSaved).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-label">Storage Used:</span>
                  <span className="info-value">
                    {(storageInfo.storageSize / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="panel-section">
            <h4>📤 Export Characters</h4>
            <p className="section-description">
              Download all your characters as a JSON file for backup or sharing.
            </p>
            <button 
              className="export-btn"
              onClick={handleExport}
              disabled={characters.length === 0}
            >
              📤 Export All Characters ({characters.length})
            </button>
          </div>

          <div className="panel-section">
            <h4>📥 Import Characters</h4>
            <p className="section-description">
              Load characters from a previously exported JSON file.
            </p>
            <div className="import-controls">
              <button 
                className="import-btn"
                onClick={handleImportClick}
                disabled={isImporting}
              >
                {isImporting ? '📥 Importing...' : '📥 Import Characters'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                aria-label="Select character file to import"
              />
            </div>
            <div className="import-note">
              <strong>Note:</strong> Importing will replace all current characters. 
              Make sure to export your current characters first if you want to keep them.
            </div>
          </div>

          <div className="panel-section danger-section">
            <h4>🗑️ Clear Data</h4>
            <p className="section-description">
              Remove all saved character data from your browser.
            </p>
            <button 
              className="clear-btn danger-btn"
              onClick={handleClearStorage}
              disabled={!storageInfo.hasData}
            >
              🗑️ Clear All Saved Data
            </button>
          </div>

          <div className="panel-footer">
            <div className="tips">
              <h5>💡 Tips:</h5>
              <ul>
                <li>Characters auto-save when you make changes</li>
                <li>Export regularly to backup your characters</li>
                <li>Share character files with other players</li>
                <li>Data is stored locally in your browser</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
