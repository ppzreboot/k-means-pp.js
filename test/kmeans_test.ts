import { assertEquals, assertGreaterOrEqual, assertLessOrEqual } from '@std/assert'
import { k_means } from '../lib/kmeans.ts'
import { calc_range } from '../lib/utils.ts'

Deno.test('k_means()', () => {
  const k = 4
  const points = {
    dimension: 3,
    data: [
      [1,2,3],
      [0, 270, 103],
      [3,4,5],
      [0,0,0],
      [100, 200, 1],
      [0, 310, 120],
      [10, 320, 90],
      [100, 201, 3],
      [0, 300, 100],
      [1000, 2000, 1],
    ],
  }
  const range = calc_range(points)
  const means = k_means(points, k, range)

  assertEquals(means.length, k)

  const [mean1, mean2] = means
  assertLessOrEqual(mean1[0], range.max[0])
  assertLessOrEqual(mean1[1], range.max[1])
  assertLessOrEqual(mean1[2], range.max[2])
  assertGreaterOrEqual(mean2[0], range.min[0])
  assertGreaterOrEqual(mean2[1], range.min[1])
  assertGreaterOrEqual(mean2[2], range.min[2])
})
