const square = require('./calculate');

test('kuadrat dari angka positif harus bener', () => {
  expect(square(4)).toBe(16);
});

test('kuadrat dari angka negatif harus bener', () => {
  expect(square(-3)).toBe(9);
});

test('kuadrat dari nol harus nol', () => {
  expect(square(0)).toBe(0);
});