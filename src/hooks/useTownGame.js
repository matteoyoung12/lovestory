import { useCallback, useEffect, useMemo, useState } from 'react';
import { BUILDINGS, GRID_CELLS } from '../domain/buildings.js';
import { createNewTown, demolitionRefund, getTownStats, incomeFor, levelProgress, makeTaxesReady, townLevel, upgradeCost } from '../domain/townRules.js';
import { loadTown, persistTown } from '../services/townStorage.js';

const TAX_INTERVAL = 5000;
const DAY_CYCLE_INTERVAL = 30000;

export function useTownGame() {
  const [town, setTown] = useState(loadTown);
  const [selectedType, setSelectedType] = useState(null);
  const [notice, setNotice] = useState('');

  const stats = useMemo(() => getTownStats(town), [town]);
  const townData = useMemo(() => ({ stats, level: townLevel(town), progress: levelProgress(town), buildingById: new Map(town.buildings.map(building => [building.id, building])) }), [town, stats]);

  useEffect(() => { persistTown(town); }, [town]);
  useEffect(() => { document.body.dataset.theme = town.night ? 'night' : 'day'; }, [town.night]);
  useEffect(() => { const id = window.setInterval(() => setTown(makeTaxesReady), TAX_INTERVAL); return () => window.clearInterval(id); }, []);
  useEffect(() => { const id = window.setInterval(() => setTown(current => ({ ...current, night: !current.night })), DAY_CYCLE_INTERVAL); return () => window.clearInterval(id); }, []);

  const notify = useCallback((message) => setNotice(message), []);
  const clearNotice = useCallback(() => setNotice(''), []);
  const chooseBuilding = useCallback((type) => setSelectedType(current => current === type ? null : type), []);
  const toggleDayNight = useCallback(() => setTown(current => ({ ...current, night: !current.night })), []);

  const build = useCallback((plotId) => {
    if (!selectedType) return { ok: false, message: 'Выберите здание в каталоге' };
    const type = BUILDINGS[selectedType];
    if (!type || plotId < 0 || plotId >= GRID_CELLS) return { ok: false, message: 'Этот участок недоступен' };
    if (town.buildings.some(building => building.id === plotId)) return { ok: false, message: 'Участок уже занят' };
    if (town.coins < type.price) return { ok: false, message: 'Не хватает монет' };
    setTown(current => ({ ...current, coins: current.coins - type.price, buildings: [...current.buildings, { id: plotId, type: selectedType, level: 1, ready: false }] }));
    setSelectedType(null);
    return { ok: true, message: `${type.name} построен` };
  }, [selectedType, town.buildings, town.coins]);

  const collectTax = useCallback((buildingId) => {
    const building = town.buildings.find(item => item.id === buildingId);
    if (!building?.ready) return { ok: false, message: 'Доход ещё не накопился' };
    const amount = incomeFor(building, town);
    setTown(current => ({ ...current, coins: current.coins + amount, buildings: current.buildings.map(item => item.id === buildingId ? { ...item, ready: false } : item) }));
    return { ok: true, amount, message: `+${amount} монет` };
  }, [town]);

  const upgrade = useCallback((buildingId) => {
    const building = town.buildings.find(item => item.id === buildingId);
    if (!building || building.type === 'townhall') return { ok: false, message: 'Эту постройку улучшить нельзя' };
    const price = upgradeCost(building);
    if (town.coins < price) return { ok: false, message: 'Не хватает монет для улучшения' };
    setTown(current => ({ ...current, coins: current.coins - price, buildings: current.buildings.map(item => item.id === buildingId ? { ...item, level: item.level + 1 } : item) }));
    return { ok: true, message: 'Здание улучшено' };
  }, [town]);

  const demolish = useCallback((buildingId) => {
    const building = town.buildings.find(item => item.id === buildingId);
    if (!building || building.type === 'townhall') return { ok: false, message: 'Ратушу нельзя снести' };
    const refund = demolitionRefund(building);
    setTown(current => ({ ...current, coins: current.coins + refund, buildings: current.buildings.filter(item => item.id !== buildingId) }));
    return { ok: true, refund, message: `Возвращено ${refund} монет` };
  }, [town]);

  const resetTown = useCallback(() => { setTown(createNewTown()); setSelectedType(null); return { ok: true, message: 'Новый город готов к строительству' }; }, []);
  return { town, ...townData, selectedType, notice, clearNotice, notify, chooseBuilding, toggleDayNight, build, collectTax, upgrade, demolish, resetTown };
}
