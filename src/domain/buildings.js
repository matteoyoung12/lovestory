/** Building catalogue. Add a record here to introduce a new buildable type. */
export const BUILDINGS = Object.freeze({
  house: { name: 'Дом', kind: 'Жильё', icon: '🏡', price: 65, income: 12, people: 4, mood: 2, color: 'peach', detail: 'Тёплый дом для новых соседей.' },
  shop: { name: 'Кофейня', kind: 'Бизнес', icon: '☕', price: 115, income: 25, people: 0, mood: -3, color: 'lavender', detail: 'Кофе, разговоры и доход для города.' },
  bakery: { name: 'Пекарня', kind: 'Бизнес', icon: '🥐', price: 145, income: 32, people: 0, mood: -2, color: 'yellow', detail: 'Свежая выпечка каждое утро.' },
  park: { name: 'Сквер', kind: 'Отдых', icon: '🌳', price: 80, income: 0, people: 0, mood: 12, color: 'mint', detail: 'Зелёный уголок, где город отдыхает.' },
  townhall: { name: 'Ратуша', kind: 'Центр города', icon: '🏛️', price: 0, income: 0, people: 0, mood: 8, color: 'blue', detail: 'Здесь начинается история города.' },
});

export const BUILDABLE_TYPES = ['house', 'shop', 'bakery', 'park'];
export const TAXABLE_TYPES = new Set(['house', 'shop', 'bakery']);
export const GRID_SIZE = 6;
export const GRID_CELLS = GRID_SIZE * GRID_SIZE;
