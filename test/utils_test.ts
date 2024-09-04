import { assertEquals, assertNotEquals } from '@std/assert'
import { calc_mean, calc_distance, find_min } from '../lib/utils.ts'

Deno.test('distance between (0, 3) and (4, 0)', () => {
  assertEquals(calc_distance(2, [0, 3], [4, 0]), 5)
  assertNotEquals(calc_distance(2, [0, 3], [4, 0]), 6)
  assertEquals(calc_distance(2, [0, 3, 1], [4, 0, 2]), 5)
  assertEquals(calc_distance(2, [3, 0], [0, 4]), 5)
})

Deno.test('distance between (3, 0, 0) and (0, 4, 0)', () => {
  assertEquals(calc_distance(3, [3, 0, 0], [0, 4, 0]), 5)
  assertEquals(calc_distance(3, [3, 0, 0], [0, 0, 4]), 5)
  assertEquals(calc_distance(3, [3, 0, 0], [4, 0, 0]), 1)
})

Deno.test('find_min', () => {
  assertEquals(
    find_min([0,1,2,3]),
    [0, 0],
  )
  assertEquals(
    find_min([233, 100, 1, 3]),
    [2, 1],
  )
})

Deno.test('calc_mean', () => {
  assertEquals(
    calc_mean(1, [[0], [1]]),
    [.5],
  )
  assertEquals(
    calc_mean(2, [[0, 1], [1, 0]]),
    [0.5, 0.5],
  )
  assertEquals(
    calc_mean(2, [[0, 1]]),
    [0, 1],
  )
  assertEquals(
    calc_mean(2, [[1, 1], [2, 2], [3, 3]]),
    [2, 2],
  )
  assertEquals(
    calc_mean(3, [
      [0, 0, 0], [1, 1, 1], [2, 2, 2]
    ]),
    [1, 1, 1],
  )
  assertEquals(
    calc_mean(3, [
      [0, 0, 0], [1, 1, 1]
    ]),
    [0.5, 0.5, 0.5],
  )
})
