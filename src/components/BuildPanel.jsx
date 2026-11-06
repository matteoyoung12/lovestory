import { ArrowUpRight, Coins, Info, RotateCcw, Sparkles, Store, Trees, House, X, CircleHelp, CircleDollarSign, HeartHandshake } from 'lucide-react';
import { BUILDINGS } from '../domain/buildings.js';

const CATALOG = [['house', House], ['shop', Store], ['bakery', Store], ['park', Trees]];

export function BuildPanel({ coins, selectedType, buildingCount, onChoose, onClearSelection, onReset }) {
  return <aside className="sidebar">
    <section className="build-panel">
      <div className="section-heading"><div><span className="eyebrow">РАСШИРЯЙТЕ ГОРОД</span><h2>Что построим?</h2></div><span className="count-pill">{buildingCount}/35</span></div>
      <p className="intro">Выберите здание, затем свободное место на карте.</p>
      <div className="building-list">{CATALOG.map(([key, Icon]) => <BuildingOption key={key} buildingKey={key} Icon={Icon} active={selectedType === key} coins={coins} onChoose={onChoose} />)}</div>
      {selectedType && <div className="selection-hint"><Info size={14} /> Выберите свободный участок на карте <button onClick={onClearSelection} aria-label="Отменить выбор"><X size={14} /></button></div>}
      <button className="reset-link" onClick={onReset}><RotateCcw size={14} /> Начать сначала</button>
    </section>
    <section className="tip-card"><span className="tip-icon"><Sparkles size={17} /></span><div><b>Маленький совет</b><p>Скверы поднимают настроение и помогают городу зарабатывать больше.</p></div><ArrowUpRight size={16} /></section>
    <section className="game-guide" aria-label="Как играть">
      <div className="guide-title"><CircleHelp size={17} /><div><span className="eyebrow">ПЕРВЫЕ ШАГИ</span><h3>Как играть</h3></div></div>
      <p className="guide-intro">Развивайте любимый город Вики: стройте кварталы, собирайте доход и поддерживайте жителей.</p>
      <ol>
        <li><span>01</span><p><b>Постройте здание</b>Выберите его справа, затем свободный участок на карте.</p></li>
        <li><span>02</span><p><b>Собирайте доход <CircleDollarSign size={12} /></b>Монетка появляется над домами, кофейнями и пекарнями каждые 5 секунд.</p></li>
        <li><span>03</span><p><b>Следите за настроением <HeartHandshake size={12} /></b>Скверы повышают счастье. Чем оно выше, тем больше доход.</p></li>
      </ol>
      <p className="guide-note">Ночью кофейня и пекарня приносят меньше монет. День можно переключить кнопкой в шапке.</p>
    </section>
  </aside>;
}

function BuildingOption({ buildingKey, Icon, active, coins, onChoose }) {
  const building = BUILDINGS[buildingKey];
  const description = building.income ? `до ${building.income} / сбор` : buildingKey === 'park' ? '+12 к настроению' : '+4 жителя';
  return <button onClick={() => onChoose(buildingKey)} disabled={coins < building.price} className={`building-option ${active ? 'chosen' : ''}`}>
    <span className={`option-icon ${building.color}`}>{building.icon}</span><span className="option-copy"><b>{building.name}</b><small>{building.kind} · {description}</small></span><span className="option-price"><Coins size={13} />{building.price}</span>
  </button>;
}
