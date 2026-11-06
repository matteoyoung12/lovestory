import { BUILDINGS, TAXABLE_TYPES } from './buildings.js';

export const createNewTown = () => ({
  version: 1,
  coins: 240,
  night: false,
  buildings: [
    { id: 14, type: 'townhall', level: 1, ready: false },
    { id: 20, type: 'house', level: 1, ready: false },
  ],
});

export function getTownStats(town) {
  const summary = town.buildings.reduce((stats, building) => {
    const type = BUILDINGS[building.type];
    if (!type) return stats;
    return {
      population: stats.population + type.people * building.level,
      happiness: stats.happiness + type.mood * building.level,
    };
  }, { population: 0, happiness: 50 });
  return { ...summary, happiness: Math.max(0, Math.min(100, summary.happiness)) };
}

export function townLevel(town) { return Math.max(1, Math.floor((town.buildings.length - 1) / 3) + 1); }
export function levelProgress(town) { return ((town.buildings.length - 1) % 3) / 3 * 100; }
export function upgradeCost(building) { return Math.round(BUILDINGS[building.type].price * (1.3 + building.level * .8)); }
export function demolitionRefund(building) { return Math.round(BUILDINGS[building.type].price * building.level * .45); }

export function incomeFor(building, town) {
  const type = BUILDINGS[building.type];
  const { happiness } = getTownStats(town);
  const moodMultiplier = .7 + happiness / 100;
  const nightMultiplier = town.night && ['shop', 'bakery'].includes(building.type) ? .55 : 1;
  return Math.max(1, Math.round(type.income * building.level * moodMultiplier * nightMultiplier));
}

export function makeTaxesReady(town) {
  return { ...town, buildings: town.buildings.map(building => TAXABLE_TYPES.has(building.type) ? { ...building, ready: true } : building) };
}

export function sanitizeTown(value) {
  if (!value || !Array.isArray(value.buildings)) return createNewTown();
  const seen = new Set();
  const buildings = value.buildings.filter(building => {
    const isValid = Number.isInteger(building?.id) && building.id >= 0 && building.id < 36 && BUILDINGS[building.type] && !seen.has(building.id);
    if (isValid) seen.add(building.id);
    return isValid;
  }).map(building => ({ id: building.id, type: building.type, level: Math.max(1, Math.floor(Number(building.level) || 1)), ready: Boolean(building.ready) }));
  return buildings.some(building => building.type === 'townhall')
    ? { version: 1, coins: Math.max(0, Math.floor(Number(value.coins) || 0)), night: Boolean(value.night), buildings }
    : createNewTown();
}
