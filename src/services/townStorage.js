import { createNewTown, sanitizeTown } from '../domain/townRules.js';

const STORAGE_KEY = 'little-town-save-v3';

export function loadTown() {
  try { return sanitizeTown(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { return createNewTown(); }
}

export function persistTown(town) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(town)); return true; }
  catch { return false; }
}
