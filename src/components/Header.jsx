import { Coins, Heart, Moon, Star, Sun, Users } from 'lucide-react';

export function Header({ town, stats, level, progress, onToggleDayNight }) {
  return <>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Любимый город Вики: к началу страницы"><span className="brand-icon">В<span>·</span></span><span>Любимый город Вики<small>ЧАСТНЫЙ ПЛАН ГОРОДА</small></span></a>
      <div className="resource-row">
        <Resource icon={Coins} label="БЮДЖЕТ" value={town.coins.toLocaleString('ru-RU')} color="gold" />
        <Resource icon={Users} label="ЖИТЕЛИ" value={stats.population} color="blue" />
        <Resource icon={Heart} label="НАСТРОЕНИЕ" value={`${stats.happiness}%`} color="pink" />
      </div>
      <button className="round-btn" title={town.night ? 'Включить день' : 'Включить ночь'} onClick={onToggleDayNight}>
        {town.night ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </header>
    <section className="hero">
      <div><div className="eyebrow"><span className="live-dot" /> ГОРОД ЖИВЁТ</div><h1>Небольшой город<br />с большими <em>планами.</em></h1><p>Стройте жильё, берегите ритм улиц и собирайте доход для следующего квартала.</p></div>
      <div className="level-card"><span className="level-icon"><Star size={19} /></span><div><small>МУНИЦИПАЛЬНЫЙ УРОВЕНЬ</small><strong>{String(level).padStart(2, '0')} <span>· Поселение</span></strong><div className="progress"><i style={{ width: `${progress}%` }} /></div><small>{town.buildings.length - 1} из {level * 3} построек до нового уровня</small></div></div>
    </section>
  </>;
}

function Resource({ icon: Icon, label, value, color }) {
  return <div className="resource"><span className={`resource-icon ${color}`}><Icon size={16} /></span><span><small>{label}</small><b>{value}</b></span></div>;
}
