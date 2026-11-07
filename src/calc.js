// テスト対象のシンプルな関数群
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('0 では割れません');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
