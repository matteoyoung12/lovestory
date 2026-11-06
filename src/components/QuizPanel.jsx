import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CircleHelp, Lightbulb, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import { useState } from 'react';
import { FavoritesPoll } from './FavoritesPoll.jsx';

export function QuizPanel({ quiz, onReturn }) {
  const [mode, setMode] = useState('quiz');
  const { question, answer, answered, isCorrect, hintCount, hint, score, streak, bestStreak, chooseAnswer, nextQuestion, requestHint } = quiz;
  return <section className="quiz-page">
    <div className="quiz-header"><div><span className="eyebrow">НЕБОЛЬШАЯ ИГРА О БОЛЬШОМ ГОРОДЕ</span><h2>Викторина Вики</h2><p>Проверьте, как хорошо вы знаете город, его жителей и простые городские секреты.</p></div><button className="back-to-town" onClick={onReturn}>К карте города <ArrowRight size={15} /></button></div>
    <div className="quiz-switch" role="tablist" aria-label="Разделы викторины"><button className={mode === 'quiz' ? 'active' : ''} onClick={() => setMode('quiz')}>Городская викторина</button><button className={mode === 'poll' ? 'active' : ''} onClick={() => setMode('poll')}>Любимое у Вики <span>♥</span></button></div>
    {mode === 'poll' ? <FavoritesPoll /> : <div className="quiz-layout">
      <motion.article className="question-card" key={question.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="question-meta"><span>{question.icon} {question.category}</span><span>ВОПРОС</span></div>
        <h3>{question.question}</h3>
        <div className="answer-list">{question.options.map((option, index) => {
          const status = answered ? (index === question.answer ? 'correct' : index === answer ? 'incorrect' : '') : '';
          return <button key={option} disabled={answered} className={`answer ${status}`} onClick={() => chooseAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>;
        })}</div>
        <AnimatePresence>{answered && <motion.div className={`answer-feedback ${isCorrect ? 'good' : 'try-again'}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><b>{isCorrect ? 'Верно!' : 'Почти!'}</b><p>{question.explanation}</p><button onClick={nextQuestion}>Следующий вопрос <ArrowRight size={15} /></button></motion.div>}</AnimatePresence>
        {!answered && <><button className="hint-button" onClick={requestHint}><Lightbulb size={16} /> Нужна подсказка <span>∞</span></button><AnimatePresence>{hint && <motion.p className="hint-text" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}><CircleHelp size={15} />{hint}</motion.p>}</AnimatePresence></>}
      </motion.article>
      <aside className="quiz-aside">
        <section className="quiz-score"><span className="score-icon"><Trophy size={20} /></span><div><span className="eyebrow">ВАШ РЕЗУЛЬТАТ</span><strong>{score}</strong><p>правильных ответов</p></div></section>
        <section className="streak-card"><div><span>Текущая серия</span><b>{streak}</b></div><div><span>Лучшая серия</span><b>{bestStreak}</b></div></section>
        <section className="infinite-hints"><Sparkles size={18} /><div><b>Подсказки без лимита</b><p>Нажимайте на лампочку столько раз, сколько нужно. Вопрос не исчезнет, а подсказка будет меняться.</p></div><span>{hintCount ? `× ${hintCount}` : '∞'}</span></section>
        <button className="restart-quiz" onClick={nextQuestion}><RotateCcw size={14} /> Пропустить вопрос</button>
      </aside>
    </div>}
  </section>;
}
