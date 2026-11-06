import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Building2, CircleHelp } from 'lucide-react';
import { Header } from '../components/Header.jsx';
import { CityGrid } from '../components/CityGrid.jsx';
import { BuildPanel } from '../components/BuildPanel.jsx';
import { BuildingDialog } from '../components/BuildingDialog.jsx';
import { QuizPanel } from '../components/QuizPanel.jsx';
import { useTownGame } from '../hooks/useTownGame.js';
import { useQuiz } from '../hooks/useQuiz.js';

export function App() {
  const game = useTownGame();
  const quiz = useQuiz();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [section, setSection] = useState('town');

  useEffect(() => {
    if (!game.notice) return undefined;
    const timer = window.setTimeout(game.clearNotice, 2300);
    return () => window.clearTimeout(timer);
  }, [game.notice, game.clearNotice]);

  function report(result) { if (result?.message) game.notify(result.message); }
  function handlePlot(id) { report(game.build(id)); }
  function handleBuilding(building) {
    if (building.ready) { game.notify('Сначала соберите монетку'); return; }
    if (building.type === 'townhall') { game.notify('Ратуша — сердце вашего города'); return; }
    setSelectedBuilding(building);
  }
  function handleCollect(building, event) { event.stopPropagation(); report(game.collectTax(building.id)); }
  function resetTown() { if (window.confirm('Начать город заново?')) { report(game.resetTown()); setSelectedBuilding(null); } }
  function upgrade() { const result = game.upgrade(selectedBuilding.id); report(result); if (result.ok) setSelectedBuilding(null); }
  function demolish() { const result = game.demolish(selectedBuilding.id); report(result); if (result.ok) setSelectedBuilding(null); }

  return <main className="shell" id="top">
    <Header town={game.town} stats={game.stats} level={game.level} progress={game.progress} onToggleDayNight={game.toggleDayNight} />
    <nav className="section-tabs" aria-label="Разделы игры">
      <button className={section === 'town' ? 'active' : ''} onClick={() => setSection('town')}><Building2 size={15} /> Город</button>
      <button className={section === 'quiz' ? 'active' : ''} onClick={() => setSection('quiz')}><CircleHelp size={15} /> Викторина</button>
    </nav>
    {section === 'town' ? <section className="workspace">
      <CityGrid buildingById={game.buildingById} night={game.town.night} selectedType={game.selectedType} onEmptyPlot={handlePlot} onBuildingClick={handleBuilding} onTaxClick={handleCollect} />
      <BuildPanel coins={game.town.coins} selectedType={game.selectedType} buildingCount={game.town.buildings.length - 1} onChoose={game.chooseBuilding} onClearSelection={() => game.chooseBuilding(game.selectedType)} onReset={resetTown} />
    </section> : <QuizPanel quiz={quiz} onReturn={() => setSection('town')} />}
    <footer><span>городок <span className="footer-dot">©</span> 2026</span><span>Создано с заботой о каждом жителе</span></footer>
    <AnimatePresence>{selectedBuilding && <BuildingDialog building={selectedBuilding} town={game.town} onClose={() => setSelectedBuilding(null)} onUpgrade={upgrade} onDemolish={demolish} />}</AnimatePresence>
    <AnimatePresence>{game.notice && <motion.div className="toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><Sparkles size={15} />{game.notice}</motion.div>}</AnimatePresence>
  </main>;
}
