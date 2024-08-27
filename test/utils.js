import test from 'node:test'
import assert from 'node:assert'
import { distance } from '../utils.js'

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
