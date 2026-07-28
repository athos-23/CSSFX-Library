import React, { useState, useEffect } from 'react';
import { Search, Plus, Settings, Sparkles, Heart } from 'lucide-react';
import { DEFAULT_EFFECTS } from './data/default-effects';
import { loadUserData, saveUserData } from './services/storage';
import EffectCard from './components/EffectCard';
import SubmitModal from './components/SubmitModal';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [customEffects, setCustomEffects] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    async function init() {
      const data = await loadUserData();
      setCustomEffects(data.custom || []);
      setFavorites(data.favorites || []);
    }
    init();
  }, []);

  useEffect(() => {
    saveUserData({ custom: customEffects, favorites });
  }, [customEffects, favorites]);

  const allEffects = [...DEFAULT_EFFECTS, ...customEffects];
  const categories = ['All', 'Buttons', 'Backgrounds', 'Hover', 'Borders', 'Cards'];

  const filteredEffects = allEffects.filter(effect => {
    const matchesSearch = effect.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          effect.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || effect.category === selectedCategory;
    const matchesFav = showOnlyFavs ? favorites.includes(effect.id) : true;
    return matchesSearch && matchesCategory && matchesFav;
  });

  const handleAddEffect = (newEffect) => {
    setCustomEffects(prev => [newEffect, ...prev]);
  };

  const handleDeleteEffect = (id) => {
    setCustomEffects(prev => prev.filter(e => e.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleImportData = (importedData) => {
    if (importedData.custom) setCustomEffects(importedData.custom);
    if (importedData.favorites) setFavorites(importedData.favorites);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-violet-500" /> CSSFX
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Libreria effetti CSS ({allEffects.length} disponibili)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" /> Live Preview / Salva
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 transition"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/60 p-4 border border-slate-800/80 rounded-2xl">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cerca effetto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setShowOnlyFavs(!showOnlyFavs)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              showOnlyFavs
                ? 'bg-rose-600 text-white'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> Preferiti ({favorites.length})
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEffects.map(effect => (
          <EffectCard
            key={effect.id}
            effect={effect}
            isFavorite={favorites.includes(effect.id)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteEffect}
          />
        ))}
      </main>

      <SubmitModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onAddEffect={handleAddEffect}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        allData={{ custom: customEffects, favorites }}
        onImportData={handleImportData}
      />
    </div>
  );
}