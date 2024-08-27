import test from 'node:test'
import assert from 'node:assert'
import { calc_mean, distance, find_min } from '../utils.js'

test('distance between (0, 3) and (4, 0)', () => {
  assert.strictEqual(distance(2, [0, 3], [4, 0]), 5)
  assert.notStrictEqual(distance(2, [0, 3], [4, 0]), 6)
  assert.strictEqual(distance(2, [0, 3, 1], [4, 0, 2]), 5)
  assert.strictEqual(distance(2, [3, 0], [0, 4]), 5)
})

test('distance between (3, 0, 0) and (0, 4, 0)', () => {
  assert.strictEqual(distance(3, [3, 0, 0], [0, 4, 0]), 5)
  assert.strictEqual(distance(3, [3, 0, 0], [0, 0, 4]), 5)
  assert.strictEqual(distance(3, [3, 0, 0], [4, 0, 0]), 1)
})

test('find_min', () => {
  assert.deepStrictEqual(
    find_min([0,1,2,3]),
    [0, 0],
  )
  assert.deepStrictEqual(
    find_min([233, 100, 1, 3]),
    [2, 1],
  )
})

test('calc_mean', () => {
  assert.deepStrictEqual(
    calc_mean(1, [[0], [1]]),
    [.5],
  )
  assert.deepStrictEqual(
    calc_mean(2, [[0, 1], [1, 0]]),
    [0.5, 0.5],
  )
  assert.deepStrictEqual(
    calc_mean(2, [[0, 1]]),
    [0, 1],
  )
  assert.deepStrictEqual(
    calc_mean(2, [[1, 1], [2, 2], [3, 3]]),
    [2, 2],
  )
  assert.deepStrictEqual(
    calc_mean(3, [
      [0, 0, 0], [1, 1, 1], [2, 2, 2]
    ]),
    [1, 1, 1],
  )
  assert.deepStrictEqual(
    calc_mean(3, [
      [0, 0, 0], [1, 1, 1]
    ]),
    [0.5, 0.5, 0.5],
  )
})