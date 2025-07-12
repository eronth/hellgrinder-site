import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFolder, faSave, faDownload, faUpload, faTrash, faLightbulb, faBolt } from '@fortawesome/free-solid-svg-icons';
import { CharacterDesign } from './CharacterGenerator';
import { CharacterStorage } from '../../../common-design/utils/CharacterStorage';
import './ImportExportPanel.css';

interface Props {
  characters: CharacterDesign[];
  selectedCharacterId?: string;
  onCharactersImported: (characters: CharacterDesign[], selectedCharacterId?: string) => void;
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
        <FontAwesomeIcon icon={faFolder} /> Character Data Management
        <span className={`toggle-arrow ${isExpanded ? 'expanded' : ''}`}>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </button>

      {isExpanded && (
        <div className="panel-content">
          <div className="panel-section">
            <h4><FontAwesomeIcon icon={faSave} /> Save & Load</h4>
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
            <h4><FontAwesomeIcon icon={faBolt} /> Quick Actions</h4>
            <p className="section-description">
              Manage your character data with these convenient options.
            </p>
            <div className="action-buttons">
              <button 
                className="export-btn"
                onClick={handleExport}
                disabled={characters.length === 0}
                title="Download all characters as JSON file"
              >
                <FontAwesomeIcon icon={faDownload} /> Export ({characters.length})
              </button>
              
              <button 
                className="import-btn"
                onClick={handleImportClick}
                disabled={isImporting}
                title="Load characters from JSON file"
              >
                {isImporting ? (
                  <><FontAwesomeIcon icon={faUpload} /> Importing...</>
                ) : (
                  <><FontAwesomeIcon icon={faUpload} /> Import</>
                )}
              </button>
              
              <button 
                className="clear-btn danger-btn"
                onClick={handleClearStorage}
                disabled={!storageInfo.hasData}
                title="Remove all saved character data"
              >
                <FontAwesomeIcon icon={faTrash} /> Clear All
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
            <div className="action-note">
              <strong>Note:</strong> Importing will replace all current characters. Export first to backup your data.
            </div>
          </div>

          <div className="panel-footer">
            <div className="tips">
              <h5><FontAwesomeIcon icon={faLightbulb} />Tips:</h5>
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
