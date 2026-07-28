import React, { useState } from 'react';
import { X, Eye, Code, Check } from 'lucide-react';

export default function SubmitModal({ isOpen, onClose, onAddEffect }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Buttons');
  const [cssCode, setCssCode] = useState(`.my-custom-effect {\n  padding: 10px 20px;\n  background: #6366f1;\n  color: white;\n  border-radius: 6px;\n}`);
  const [htmlCode, setHtmlCode] = useState(`<button class="my-custom-effect">My Button</button>`);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;

    const newEffect = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      css: cssCode,
      html: htmlCode,
      isCustom: true
    };

    onAddEffect(newEffect);
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
      onClose();
      setTitle('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 text-slate-100 shadow-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Aggiungi Effetto alla Library</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Titolo Effetto</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="es. Glowing Button"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="Buttons">Buttons</option>
              <option value="Inputs">Inputs</option>
              <option value="Cards">Cards</option>
              <option value="Loaders">Loaders</option>
              <option value="Hover">Hover</option>
            </select>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="mb-4">
          <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Live Preview
          </label>
          <div className="h-28 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-center overflow-hidden relative p-4">
            <style>{cssCode}</style>
            <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
          </div>
        </div>

        {/* Code Editors */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
              <Code className="w-3.5 h-3.5" /> HTML
            </label>
            <textarea
              rows={4}
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
              <Code className="w-3.5 h-3.5" /> CSS
            </label>
            <textarea
              rows={4}
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-violet-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-xs bg-slate-800 rounded-lg hover:bg-slate-700">
            Annulla
          </button>
          <button 
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-4 py-2 text-xs bg-violet-600 hover:bg-violet-500 rounded-lg font-medium flex items-center gap-1 disabled:opacity-50"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : 'Salva nella Library'}
          </button>
        </div>
      </div>
    </div>
  );
}