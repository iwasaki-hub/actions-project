const { describe, it } = require("node:test");
const assert = require("node:assert");
const { add, subtract, multiply, divide } = require("../src/calc");

// 浮動小数点の誤差を許容して比較するヘルパー
function assertClose(actual, expected, epsilon = 1e-9) {
  assert.ok(
    Math.abs(actual - expected) < epsilon,
    `${actual} は ${expected} に近い値であるべき`,
  );
}

describe("add: 足し算", () => {
  it("正の整数同士", () => {
    assert.strictEqual(add(2, 3), 5);
  });

  it("負の数を含む", () => {
    assert.strictEqual(add(-2, -3), -5);
    assert.strictEqual(add(-2, 5), 3);
  });

  it("0 を足しても変わらない", () => {
    assert.strictEqual(add(7, 0), 7);
  });

  it("小数（誤差を許容）", () => {
    assertClose(add(0.1, 0.2), 0.3);
  });

  it("交換法則が成り立つ", () => {
    assert.strictEqual(add(4, 9), add(9, 4));
  });
});

describe("subtract: 引き算", () => {
  it("正の整数同士", () => {
    assert.strictEqual(subtract(5, 3), 2);
  });

  it("結果が負になる", () => {
    assert.strictEqual(subtract(3, 5), -2);
  });

  it("負の数を引く", () => {
    assert.strictEqual(subtract(3, -5), 8);
  });

  it("自分自身を引くと 0", () => {
    assert.strictEqual(subtract(42, 42), 0);
  });
});

describe("multiply: 掛け算", () => {
  it("正の整数同士", () => {
    assert.strictEqual(multiply(4, 5), 20);
  });

  it("0 を掛けると 0", () => {
    assert.strictEqual(multiply(123, 0), 0);
  });

  it("負の数を掛ける", () => {
    assert.strictEqual(multiply(-4, 5), -20);
    assert.strictEqual(multiply(-4, -5), 20);
  });

  it("小数（誤差を許容）", () => {
    assertClose(multiply(0.1, 3), 0.3);
  });
});

describe("divide: 割り算", () => {
  it("割り切れる場合", () => {
    assert.strictEqual(divide(10, 2), 5);
  });

  it("割り切れない場合は小数になる", () => {
    assertClose(divide(1, 3), 0.3333333333);
  });

  it("負の数を含む", () => {
    assert.strictEqual(divide(-10, 2), -5);
    assert.strictEqual(divide(-10, -2), 5);
  });

  it("0 を割ると 0", () => {
    assert.strictEqual(divide(0, 5), 0);
  });

  it("0 で割ると例外", () => {
    assert.throws(() => divide(1, 0), /0 では割れません/);
  });

  it("0 を 0 で割っても例外", () => {
    assert.throws(() => divide(0, 0), /0 では割れません/);
  });
});
