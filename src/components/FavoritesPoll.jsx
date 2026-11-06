import { Heart, Sparkles } from 'lucide-react';
import { SURVEY_ITEMS, VIKIS_FAVOURITES } from '../domain/surveyData.js';
import { useSurvey } from '../hooks/useSurvey.js';

export function FavoritesPoll() {
  const survey = useSurvey();
  const answerCount = Object.values(survey.answers).flat().length;
  return <section className="poll-page">
    <header className="poll-header"><span className="eyebrow">НЕ ТЕСТ, А ВЫБОР СЕРДЦЕМ</span><h3>Любимое у Вики <Heart size={25} fill="currentColor" /></h3><p>Ответьте на вопросы и сравните свой вкус с любимыми ответами Вики.</p></header>
    <div className="poll-layout">
      <div className="poll-list">{SURVEY_ITEMS.map(item => <article className="poll-card" key={item.id}><div className="poll-question"><span>{item.emoji}</span><div><b>{item.title}</b><small>{item.type === 'multiple' ? 'Можно выбрать несколько вариантов' : 'Выберите один вариант'}</small></div></div><div className="poll-options">{item.choices.map(choice => { const selected = survey.isSelected(item.id, choice.id); return <button className={selected ? 'selected' : ''} key={choice.id} onClick={() => survey.choose(item.id, choice.id, item.type === 'multiple')}><span className="choice-heart">{selected ? '♥' : '♡'}</span>{choice.label}{choice.love && <span className="viki-choice">Вики любит</span>}</button>; })}</div></article>)}</div>
      <aside className="love-card"><div className="love-signs"><span>♥</span><span>♥</span><span>♥</span></div><Sparkles size={18} /><span className="eyebrow">ВЫБОР ВИКИ</span><h4>С любовью<br />к самым лучшим</h4><ul>{VIKIS_FAVOURITES.map(favourite => <li key={favourite}>{favourite}</li>)}</ul><p>{answerCount ? `Ваших отметок: ${answerCount} ♥` : 'Нажмите на сердечко, чтобы отметить свой вариант.'}</p></aside>
    </div>
  </section>;
}
