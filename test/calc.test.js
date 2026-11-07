const test = require('node:test');
const assert = require('node:assert');
const { add, subtract, multiply, divide } = require('../src/calc');

test('add: 足し算', () => {
  assert.strictEqual(add(2, 3), 5);
});

test('subtract: 引き算', () => {
  assert.strictEqual(subtract(5, 3), 2);
});

test('multiply: 掛け算', () => {
  assert.strictEqual(multiply(4, 5), 20);
});

test('divide: 割り算', () => {
  assert.strictEqual(divide(10, 2), 5);
});

test('divide: 0 で割ると例外', () => {
  assert.throws(() => divide(1, 0), /0 では割れません/);
});
