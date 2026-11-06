import { motion } from 'framer-motion';
import { Plus, Sun } from 'lucide-react';
import { BUILDINGS, GRID_CELLS } from '../domain/buildings.js';

export function CityGrid({ buildingById, night, selectedType, onEmptyPlot, onBuildingClick, onTaxClick }) {
  return <section className="city-panel">
    <div className="section-heading"><div><span className="eyebrow">ПЛАН ГОРОДА · КВАРТАЛ 01</span><h2>Улица Вики</h2></div><span className="weather"><Sun size={15} /> {night ? 'Поздний вечер' : 'Ясный день'} <i>·</i> 21°</span></div>
    <div className="town">
      <div className="town-grid">{Array.from({ length: GRID_CELLS }, (_, id) => {
        const building = buildingById.get(id);
        return <Plot key={id} building={building} selectedType={selectedType} onEmpty={() => onEmptyPlot(id)} onClick={() => onBuildingClick(building)} onTaxClick={(event) => onTaxClick(building, event)} />;
      })}</div>
      <div className="map-road road-h" /><div className="map-road road-v" /><div className="map-label">✦ УЛИЦА ВИКИ</div>
    </div>
    <div className="map-footer"><span><i className="legend-dot available" /> Свободно</span><span><i className="legend-dot occupied" /> Занято</span><span className="save-status"><span className="live-dot" /> Сохранено автоматически</span></div>
  </section>;
}

function Plot({ building, selectedType, onEmpty, onClick, onTaxClick }) {
  if (!building) return <motion.button className="plot empty" whileTap={{ scale: .94 }} onClick={onEmpty} aria-label="Свободный участок">{selectedType && <Plus size={18} />}</motion.button>;
  const type = BUILDINGS[building.type];
  return <motion.button className={`plot plot-${type.color} built`} whileTap={{ scale: .94 }} onClick={onClick} aria-label={type.name}>
    <span className="plot-emoji">{type.icon}</span>{building.type !== 'townhall' && <span className="plot-level">{building.level}</span>}
    {building.ready && <motion.span className="coin-pop" initial={{ scale: 0 }} animate={{ scale: 1, y: [0, -4, 0] }} onClick={onTaxClick}>🪙</motion.span>}
  </motion.button>;
}
