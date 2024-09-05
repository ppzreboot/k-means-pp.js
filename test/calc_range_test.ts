import { assertEquals } from '@std/assert'
import { calc_range } from '../lib/utils.ts'

Deno.test('calc_range()', () => {
  assertEquals(
    calc_range({
      dimension: 2,
      data: [
        [0, 2],
      ],
    }),
    {
      min: [0, 2],
      max: [0, 2],
    }
  )
})

Deno.test('calc_range() 1d', () => {
  assertEquals(
    calc_range({
      dimension: 1,
      data: [
        [0],
        [-1],
        [4],
      ],
    }),
    {
      min: [-1],
      max: [4],
    }
  )
})

Deno.test('calc_range() 2d', () => {
  assertEquals(
    calc_range({
      dimension: 2,
      data: [
        [0, 2],
        [-1, 0],
        [4, 1],
      ],
    }),
    {
      min: [-1, 0],
      max: [4, 2],
    }
  )
})

Deno.test('calc_range() 3d', () => {
  assertEquals(
    calc_range({
      dimension: 3,
      data: [
        [10, 2, 0],
        [-1, 0, 2],
        [4, 1, 100],
        [0.1, 33, -20.3],
        [0, 5, 100.1],
      ],
    }),
    {
      min: [-1, 0, -20.3],
      max: [10, 33, 100.1],
    }
  )
})
