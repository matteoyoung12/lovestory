export const SURVEY_ITEMS = [
  {
    id: 'football', emoji: '⚽', title: 'Кто лучший футболист?', type: 'single',
    choices: [{ id: 'ronaldo', label: 'Криштиану Роналду', love: true }, { id: 'messi', label: 'Лионель Месси' }, { id: 'mbappe', label: 'Килиан Мбаппе' }],
  },
  {
    id: 'judo', emoji: '🥋', title: 'Кто лучший дзюдоист?', type: 'multiple',
    choices: [{ id: 'riner', label: 'Тедди Ринер', love: true }, { id: 'ono', label: 'Оно Сёхэй', love: true }, { id: 'other-judo', label: 'Другой чемпион' }],
  },
  {
    id: 'food', emoji: '🍽️', title: 'Какое блюдо самое любимое?', type: 'multiple',
    choices: [{ id: 'pasta', label: 'Паста', love: true }, { id: 'rice-cutlets', label: 'Рис с котлетами', love: true }, { id: 'pizza', label: 'Пицца' }],
  },
];

export const VIKIS_FAVOURITES = [
  '⚽ Криштиану Роналду',
  '🥋 Тедди Ринер и Оно Сёхэй',
  '🍝 Паста и рис с котлетами',
];
