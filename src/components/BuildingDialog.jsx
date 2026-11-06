import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BUILDINGS } from '../domain/buildings.js';
import { incomeFor, upgradeCost } from '../domain/townRules.js';

export function BuildingDialog({ building, town, onClose, onUpgrade, onDemolish }) {
  const type = BUILDINGS[building.type];
  const price = upgradeCost(building);
  const income = incomeFor(building, town);
  return <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.div className="dialog" initial={{ y: 18, scale: .97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 12, scale: .98 }} onClick={event => event.stopPropagation()}>
      <button className="dialog-close" onClick={onClose} aria-label="Закрыть"><X size={18} /></button>
      <div className={`dialog-art ${type.color}`}>{type.icon}</div><span className="eyebrow">{type.kind.toUpperCase()}</span><h2>{type.name}</h2><p>{type.detail}</p>
      <div className="dialog-stats"><div>УРОВЕНЬ<strong>{building.level}</strong></div><div>ДОХОД ЗА СБОР<strong>{type.income ? `◉ ${income}` : '—'}</strong></div></div>
      <div className="dialog-actions"><button className="upgrade-btn" disabled={town.coins < price} onClick={onUpgrade}>Улучшить <span>·</span> ◉ {price}</button><button className="demolish-btn" onClick={onDemolish}>Снести</button></div>
    </motion.div>
  </motion.div>;
}
