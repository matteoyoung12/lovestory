import { useEffect, useState } from 'react';

const STORAGE_KEY = 'viki-favourite-poll-v1';

function loadAnswers() {
  try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY)); return data && typeof data === 'object' ? data : {}; }
  catch { return {}; }
}

export function useSurvey() {
  const [answers, setAnswers] = useState(loadAnswers);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); }, [answers]);

  function choose(questionId, choiceId, multiple) {
    setAnswers(current => {
      const selected = current[questionId] ?? [];
      const next = multiple
        ? (selected.includes(choiceId) ? selected.filter(id => id !== choiceId) : [...selected, choiceId])
        : (selected[0] === choiceId ? [] : [choiceId]);
      return { ...current, [questionId]: next };
    });
  }

  function isSelected(questionId, choiceId) { return (answers[questionId] ?? []).includes(choiceId); }
  return { answers, choose, isSelected };
}
