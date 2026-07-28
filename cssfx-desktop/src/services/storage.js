// Gestione salvataggio (predisposto per LocalStorage ora e Tauri FS dopo)
const STORAGE_KEY_CUSTOM = 'cssfx_custom_effects';
const STORAGE_KEY_FAVS = 'cssfx_favorites';

export async function loadUserData() {
  const custom = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM) || '[]');
  const favorites = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVS) || '[]');
  return { custom, favorites };
}

export async function saveUserData(data) {
  if (data.custom) localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(data.custom));
  if (data.favorites) localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(data.favorites));
}