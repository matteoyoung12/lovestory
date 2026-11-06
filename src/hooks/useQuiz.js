import { useMemo, useState } from 'react';
import { QUIZ_QUESTIONS, getEndlessHint } from '../domain/quizData.js';

function shuffledQuestions(previousId) {
  const pool = [...QUIZ_QUESTIONS].sort(() => Math.random() - .5);
  if (pool[0]?.id === previousId && pool.length > 1) [pool[0], pool[1]] = [pool[1], pool[0]];
  return pool;
}

export function useQuiz() {
  const [deck, setDeck] = useState(() => shuffledQuestions());
  const [position, setPosition] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [hintCount, setHintCount] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const question = deck[position];
  const answered = answer !== null;
  const isCorrect = answered && answer === question.answer;
  const hint = useMemo(() => hintCount ? getEndlessHint(question, hintCount) : null, [question, hintCount]);

  function chooseAnswer(index) {
    if (answered) return;
    setAnswer(index);
    if (index === question.answer) {
      setScore(value => value + 1);
      setStreak(value => { const next = value + 1; setBestStreak(best => Math.max(best, next)); return next; });
    } else setStreak(0);
  }

  function nextQuestion() {
    const isLast = position === deck.length - 1;
    if (isLast) { setDeck(shuffledQuestions(question.id)); setPosition(0); }
    else setPosition(value => value + 1);
    setAnswer(null); setHintCount(0);
  }

  return { question, answer, answered, isCorrect, hintCount, hint, score, streak, bestStreak, chooseAnswer, nextQuestion, requestHint: () => setHintCount(value => value + 1) };
}
