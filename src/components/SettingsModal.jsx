import React, { useRef } from 'react';
import { X, Download, Upload } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, allData, onImportData }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData, null, 2));
    const a = document.createElement('a');
    a.href = jsonStr;
    a.download = `cssfx_backup_${Date.now()}.json`;
    a.click();
    a.remove();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed) {
          onImportData(parsed);
          alert('Dati importati con successo!');
          onClose();
        }
      } catch (err) {
        alert('File JSON non valido.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 text-slate-100 shadow-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Impostazioni & Backup</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <h3 className="text-xs font-semibold mb-1 flex items-center gap-1 text-slate-300">
              <Download className="w-4 h-4 text-violet-400" /> Esporta Backup (.json)
            </h3>
            <p className="text-xs text-slate-500 mb-3">Salva i tuoi effetti in un file JSON.</p>
            <button 
              onClick={handleExport}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg"
            >
              Scarica JSON
            </button>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <h3 className="text-xs font-semibold mb-1 flex items-center gap-1 text-slate-300">
              <Upload className="w-4 h-4 text-emerald-400" /> Importa Backup (.json)
            </h3>
            <p className="text-xs text-slate-500 mb-3">Carica un file di backup precedente.</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImport} 
              accept=".json" 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg text-emerald-400"
            >
              Carica JSON
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-xs bg-slate-800 rounded-lg hover:bg-slate-700">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}