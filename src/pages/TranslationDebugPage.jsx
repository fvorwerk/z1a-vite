import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// List of all supported languages
const LANGUAGES = ['en', 'de', 'ru', 'bg', 'be', 'sr', 'uk', 'mk', 'tr', 'ar'];

function TranslationDebugPage() {
  const [translations, setTranslations] = useState({});
  const [allKeys, setAllKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'missing', 'present'
  const [selectedLanguages, setSelectedLanguages] = useState(LANGUAGES);
  const [referenceLanguage, setReferenceLanguage] = useState('en');
  const [editMode, setEditMode] = useState(false);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [changes, setChanges] = useState({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportLanguage, setExportLanguage] = useState('');
  const [exportReferenceLanguage, setExportReferenceLanguage] = useState('en');

  useEffect(() => {
    async function loadTranslations() {
      try {
        const translationData = {};
        const keySet = new Set();
        
        // Load translation files for each language
        for (const lang of LANGUAGES) {
          try {
            const module = await import(`../locales/${lang}/translation.json`);
            translationData[lang] = module.default || {};
            
            // Collect all keys
            Object.keys(translationData[lang]).forEach(key => keySet.add(key));
          } catch (err) {
            console.error(`Failed to load ${lang} translations:`, err);
            translationData[lang] = {};
          }
        }
        
        setTranslations(translationData);
        setAllKeys(Array.from(keySet).sort());
        setLoading(false);
      } catch (error) {
        console.error("Error loading translations:", error);
        setLoading(false);
      }
    }
    
    loadTranslations();
  }, []);

  // Function to check if a key exists in a language
  const hasTranslation = (lang, key) => {
    return translations[lang] && translations[lang][key] !== undefined;
  };

  // Filter keys based on search term and filter option
  const filteredKeys = allKeys.filter(key => {
    // Filter by search term
    if (searchTerm && !key.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by missing/present translations
    if (filter === 'missing') {
      return selectedLanguages.some(lang => !hasTranslation(lang, key));
    } else if (filter === 'present') {
      return selectedLanguages.every(lang => hasTranslation(lang, key));
    }
    
    return true;
  });

  // Toggle language selection
  const toggleLanguage = (lang) => {
    if (selectedLanguages.includes(lang)) {
      // Don't remove if it's the last language
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  // Function to handle edit of a translation
  const handleEdit = (lang, key, value) => {
    setEditingCell({ lang, key });
    setEditValue(value || '');
  };

  // Function to save edited translation
  const saveEdit = () => {
    if (!editingCell) return;
    
    const { lang, key } = editingCell;
    
    // Update local state
    setTranslations(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: editValue
      }
    }));
    
    // Track changes for potential export
    setChanges(prev => ({
      ...prev,
      [lang]: {
        ...(prev[lang] || {}),
        [key]: editValue
      }
    }));
    
    setEditingCell(null);
  };

  // Function to export changes as JSON
  const exportChanges = () => {
    const blob = new Blob([JSON.stringify(changes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translation_changes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Function to copy a translation key to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Could add a small notification here
        console.log('Copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Function to get missing keys for a specific language compared to a reference language
  const getMissingKeys = (lang, refLang) => {
    const missingKeys = {};
    
    // For each key in the reference language
    Object.keys(translations[refLang] || {}).forEach(key => {
      // If the key doesn't exist in target language, add it to missing keys
      if (!hasTranslation(lang, key)) {
        missingKeys[key] = translations[refLang][key];
      }
    });
    
    return missingKeys;
  };

  // Function to export missing keys for a specific language
  const exportMissingKeys = (lang, refLang) => {
    const missingKeys = getMissingKeys(lang, refLang);
    
    // Format data for export
    const data = {
      referenceLanguage: refLang,
      targetLanguage: lang,
      missingKeys
    };
    
    // Create prompt text for AI translation
    const promptText = `Please translate the following strings from ${refLang.toUpperCase()} to ${lang.toUpperCase()}:\n\n` +
      Object.entries(missingKeys).map(([key, value]) => {
        return `Key: ${key}\nText: ${value}\n`;
      }).join('\n');
    
    // Export both JSON and prompt format
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `missing_keys_${lang}_vs_${refLang}.json`;
    jsonLink.click();
    
    const promptBlob = new Blob([promptText], { type: 'text/plain' });
    const promptUrl = URL.createObjectURL(promptBlob);
    const promptLink = document.createElement('a');
    promptLink.href = promptUrl;
    promptLink.download = `translate_${lang}_from_${refLang}.txt`;
    promptLink.click();
    
    setShowExportModal(false);
  };

  // Calculate missing translations stats
  const getMissingTranslationsCount = (lang, refLang) => {
    if (!translations[lang] || !translations[refLang]) return 0;
    
    return Object.keys(translations[refLang]).filter(key => 
      !hasTranslation(lang, key)
    ).length;
  };

  if (loading) {
    return <div className="p-8">Loading translation data...</div>;
  }

  return (
    <div className="p-4 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Translation Debug Tool</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded ${editMode ? 'bg-green-500' : 'bg-gray-500'} text-white`}
          >
            {editMode ? 'Edit Mode: ON' : 'Edit Mode: OFF'}
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white"
          >
            Export Missing Keys
          </button>
          <button 
            onClick={exportChanges}
            disabled={Object.keys(changes).length === 0}
            className={`px-4 py-2 rounded ${Object.keys(changes).length === 0 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Export Changes
          </button>
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Export Missing Keys Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Export Missing Keys</h3>
            
            <div className="mb-4">
              <label className="block mb-2">Target Language:</label>
              <select 
                className="w-full p-2 border rounded"
                value={exportLanguage}
                onChange={(e) => setExportLanguage(e.target.value)}
              >
                <option value="">Select a language</option>
                {LANGUAGES.filter(lang => lang !== 'en' && lang !== 'de').map(lang => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()} 
                    ({getMissingTranslationsCount(lang, 'en')} missing from EN, 
                    {getMissingTranslationsCount(lang, 'de')} missing from DE)
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Reference Language:</label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 py-2 px-4 rounded ${exportReferenceLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setExportReferenceLanguage('en')}
                >
                  English
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded ${exportReferenceLanguage === 'de' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setExportReferenceLanguage('de')}
                >
                  German
                </button>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowExportModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => exportMissingKeys(exportLanguage, exportReferenceLanguage)}
                disabled={!exportLanguage}
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6 bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Stats & Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h3 className="font-medium mb-2">Statistics</h3>
            <ul>
              <li>Total unique keys: {allKeys.length}</li>
              <li>Filtered keys: {filteredKeys.length}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Search & Filter</h3>
            <input
              type="text"
              placeholder="Search keys..."
              className="border p-2 rounded w-full mb-2"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <select 
              className="border p-2 rounded w-full" 
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">Show all keys</option>
              <option value="missing">Show keys with missing translations</option>
              <option value="present">Show keys with all translations</option>
            </select>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Reference Language</h3>
            <select 
              className="border p-2 rounded w-full"
              value={referenceLanguage} 
              onChange={e => setReferenceLanguage(e.target.value)}
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Languages to Display</h3>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-3 py-1 rounded ${
                  selectedLanguages.includes(lang) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 px-4 py-2 text-left">
                Key
                <button 
                  className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  onClick={() => copyToClipboard(filteredKeys.join('\n'))}
                >
                  Copy All
                </button>
              </th>
              {selectedLanguages.map(lang => (
                <th key={lang} className="px-4 py-2 text-left">
                  {lang.toUpperCase()} 
                  <span className="text-xs ml-1">
                    ({Object.keys(translations[lang] || {}).length})
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredKeys.map(key => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="sticky left-0 z-10 bg-white px-4 py-2 font-mono text-sm border-r flex items-center">
                  <span>{key}</span>
                  <button 
                    className="ml-2 opacity-30 hover:opacity-100"
                    onClick={() => copyToClipboard(key)}
                    title="Copy key"
                  >
                    📋
                  </button>
                </td>
                {selectedLanguages.map(lang => {
                  const hasTranslationValue = hasTranslation(lang, key);
                  const isReference = lang === referenceLanguage;
                  const isEditing = editingCell && editingCell.lang === lang && editingCell.key === key;
                  
                  return (
                    <td 
                      key={`${lang}-${key}`} 
                      className={`px-4 py-2 ${!hasTranslationValue ? 'bg-red-50' : ''} ${isReference ? 'bg-blue-50' : ''}`}
                      onClick={() => editMode && handleEdit(lang, key, hasTranslationValue ? translations[lang][key] : '')}
                    >
                      {isEditing ? (
                        <div className="flex">
                          <textarea
                            className="w-full border p-1 font-mono text-sm"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            autoFocus
                            rows={Math.min(5, (editValue.match(/\n/g) || []).length + 2)}
                          />
                          <div className="flex flex-col ml-1">
                            <button className="bg-green-500 text-white p-1 text-xs" onClick={saveEdit}>✓</button>
                            <button className="bg-red-500 text-white p-1 text-xs mt-1" onClick={() => setEditingCell(null)}>✕</button>
                          </div>
                        </div>
                      ) : hasTranslationValue ? (
                        <div className="font-mono text-sm whitespace-pre-wrap group flex justify-between items-start">
                          <span>{translations[lang][key]}</span>
                          <button 
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(translations[lang][key]);
                            }}
                            title="Copy value"
                          >
                            📋
                          </button>
                        </div>
                      ) : (
                        <span className="text-red-500 text-sm">
                          {editMode ? "Click to add" : "Missing"}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TranslationDebugPage;
